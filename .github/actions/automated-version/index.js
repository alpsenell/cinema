const { Toolkit } = require('actions-toolkit');
const { execSync } = require('child_process');

// Run your GitHub Action!
Toolkit.run(async (tools) => {
    const pkg = tools.getPackageJSON();
    const event = tools.context.payload;
    const currentVersion = pkg.version.toString();
    const currentPatchVersion = currentVersion.split('.')[2];
    const commitMessage = process.env['INPUT_COMMIT-MESSAGE'] || 'ci: version bump to {{version}}';
    const majorWords = process.env['INPUT_MAJOR-WORDS'].split(',');
    const skipWords = process.env['INPUT_SKIP-WORDS'].split(',');
    const minorWords = process.env['INPUT_MINOR-WORDS'].split(',');
    const patchWords = process.env['INPUT_PATCH-WORDS'] ? process.env['INPUT_PATCH-WORDS'].split(',') : null;
    const messages = event.commits ? event.commits.map((commit) => commit.message + '\n' + commit.body) : [];

    if (messages.some(message => skipWords.some(word => message.includes(word)))) {
        tools.exit.success('Skipping words are found in commit message, no version update necessary!');

        return;
    }

    console.log('config words:', { majorWords, minorWords, patchWords });

    let version = '';

    if (currentPatchVersion === '99') {
        version = 'minor';
    } else if (
        messages.some(
            (message) => /^([a-zA-Z]+)(\(.+\))?(\!)\:/.test(message) || majorWords.some((word) => message.includes(word)),
        )
    ) {
        version = 'major';
    } else if (messages.some((message) => minorWords.some((word) => message.includes(word)))) {
        version = 'minor';
    } else if (patchWords && messages.some((message) => patchWords.some((word) => message.includes(word)))) {
        version = 'patch';
    }

    console.log('To be updated version:', version);

    if (version === '') {
        tools.exit.success('No version keywords found, skipping bump.');
        return;
    }

    try {
        const current = pkg.version.toString();
        // set git user
        await tools.runInWorkspace('git', [
            'config',
            'user.name',
            `"${process.env.GITHUB_USER || 'Automated Version Bump'}"`,
        ]);
        await tools.runInWorkspace('git', [
            'config',
            'user.email',
            `"${process.env.GITHUB_EMAIL || 'gh-action-bump-version@users.noreply.github.com'}"`,
        ]);

        let currentBranch = /refs\/[a-zA-Z]+\/(.*)/.exec(process.env.GITHUB_REF)[1];
        let isPullRequest = false;
        if (process.env.GITHUB_HEAD_REF) {
            // Comes from a pull request
            currentBranch = process.env.GITHUB_HEAD_REF;
            isPullRequest = true;
        }
        console.log('currentBranch:', currentBranch);
        // do it in the current checked out github branch (DETACHED HEAD)
        // important for further usage of the package.json version
        await tools.runInWorkspace('npm', ['version', '--allow-same-version=true', '--git-tag-version=false', current]);
        console.log('current:', current, '/', 'version:', version);
        let newVersion = execSync(`npm version --git-tag-version=false ${version}`).toString().trim().replace(/^v/, '');

        await tools.runInWorkspace('git', ['commit', '-a', '-m', commitMessage.replace(/{{version}}/g, newVersion)]);

        // now go to the actual branch to perform the same versioning
        if (isPullRequest) {
            // First fetch to get updated local version of branch
            await tools.runInWorkspace('git', ['fetch']);
        }
        await tools.runInWorkspace('git', ['checkout', currentBranch]);
        await tools.runInWorkspace('npm', ['version', '--allow-same-version=true', '--git-tag-version=false', current]);
        console.log('current:', current, '/', 'version:', version);
        newVersion = execSync(`npm version --git-tag-version=false ${version}`).toString().trim().replace(/^v/, '');
        console.log(`::set-output name=newTag::${newVersion}`);
        console.log(process.env);
        const remoteRepo = `https://${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git develop`;
console.log('as');
        await tools.runInWorkspace('git', ['tag', newVersion]);
        await tools.runInWorkspace('git', ['push', remoteRepo, '--follow-tags']);
        await tools.runInWorkspace('git', ['push', remoteRepo, '--tags']);
    } catch (e) {
        tools.log.fatal(e);
        tools.exit.failure('Failed to bump version');
    }

    tools.exit.success('Version bumped successfully!');
});
