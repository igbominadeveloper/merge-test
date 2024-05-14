/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: './release-rules.config.cjs',
      },
    ],
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json'], // Specify files to commit
        message: 'chore(release): update package.json version to ${nextRelease.version} [skip ci]', // Optional: commit message template
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: ['.next'],
      },
    ],
  ],
};
