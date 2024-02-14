# starter-template

## Description

I created this handful template to use as a boilerplate code to quickly set up a new project that is JavaScript-based and use NPM as a package manager.

It provides a basic tool called "semantic-release", installed as a dev-dependency and configured to work with GitHub Actions in an already configured CI/CD pipeline.

This template has been thought to work along with GitHub flow strategy (you can use semantic-release with other strategies by configuring it differently, though). Every time a feature branch is merged to the main branch, it will trigger semantic-release which will update the changelog, update the version in package.json, and handle the creation of a GitHub release of that version.

## Installation

Download the .zip or just click on "Use this template>Create a new repository" to have yours ready to go. Don't clone it to avoid importing the commit history and the remote url linked to this project or, if you do, delete the .git folder in your project.

You also need to go to your repository's settings, go to Actions>General in the left side menu and at the bottom, in the "Workflow permissions" section, choose the "Read and write permissions" option and save, like in the following screenshot:

![workflow permission screenshot](https://github.com/k41205/starter-template/assets/93975067/2a28ccbb-03f5-407d-9898-0d5cc1c15bd1)

## How it works

You're ready to go and may create a new branch to develop your feature. During your commits tho, you have to stick to the Conventional Commits standard, so that when you finish developing your feature and want to merge your branch to the main, semantic-release can read and analyse your commit's history and work properly. To have a quick start, look at the examples taken from https://semantic-release.gitbook.io/semantic-release/#how-does-it-work:

![image](https://github.com/k41205/starter-template/assets/93975067/11cb6561-557a-4974-ba92-50918188089a)

## Further info

semantic-release documentation: https://semantic-release.gitbook.io/semantic-release/

Conventional Commits: https://www.conventionalcommits.org/en/v1.0.0/

GitHub flow documentation: https://docs.github.com/en/get-started/using-github/github-flow
