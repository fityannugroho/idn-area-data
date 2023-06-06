<h1>Contributing Guidelines</h1>

<h2>Table of Contents</h2>

- [Code Styles](#code-styles)
- [Commit Message Guidelines](#commit-message-guidelines)
  - [Commit Message Format](#commit-message-format)
  - [Type](#type)
  - [Scope](#scope)
  - [Subject](#subject)
  - [Body](#body)
  - [Footer](#footer)
  - [Commit Message Example](#commit-message-example)
- [Submitting an Issue](#submitting-an-issue)
- [Submitting a Pull Request](#submitting-a-pull-request)

---

## Code Styles

To ensure consistency throughout the source code, keep these rules in mind as you are working:

- All features or bug fixes must be tested by one or more specs (unit-tests).
- We follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript). An automated formatter is available (`npm run lint:fix`).

## Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to **more readable messages** that are easy to follow when looking through the **project history**. But also, we use the git commit messages to **generate the project change log**.

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>

<body>

<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer than 100 characters! This allows the message to be easier to read on GitHub as well as in various git tools.

### Type

The commit type must be one of the following:

- `feat`: A new feature.
- `fix`: A bug fix.
- `docs`: Documentation only changes.
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
- `refactor`: A code change that neither fixes a bug nor adds a feature. For example, renaming a variable, moving a function, etc.
- `perf`: A code change that improves performance.
- `test`: Adding missing tests or correcting existing tests.
- `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
- `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs).
- `chore`: Other changes that don't modify src or test files. For example, updating build tasks, package manager configs, etc.
- `revert`: Reverts a previous commit.

### Scope

The scope could be anything specifying place of the commit change.

The following is the list of supported scopes:

- `data/[level]`: for changes made on `data` directory. Replace `level` with 'provinces', 'regencies', 'districts', or 'villages'. For example: `data/provinces`.
- `docs`: for changes made on `docs` directory.
- `test`: for changes made on `test` directory.

If your change affect more than one package, separate the scopes with a comma (e.g. `test,docs`).

### Subject

The subject contains succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes".
- don't capitalize first letter.
- no dot (.) at the end.

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to **reference GitHub issues** that this commit **Closes**.

### Commit Message Example

```
fix(data/province): update province 32-JABAR

Rename "JABAR" to "JAWA BARAT"

Closes #123
```

## Submitting an Issue

Before you submit an issue, please search the issue tracker, maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

You can report the issues by filling out the [new issue form](https://github.com/fityannugroho/idn-area-data/issues/new/choose). Please select the right form template:
- **Bug Report**: if you found a bug in the source code.
- **Feature Request**: if you want a new feature or enhancement.

## Submitting a Pull Request

Before you submit your Pull Request (PR) consider the following guidelines:

1. Search [GitHub Pull Requests](https://github.com/fityannugroho/idn-area-data/pulls) for an open or closed PR that relates to your submission. You don't want to duplicate effort.

1. Fork this repository.

1. Clone the repository

    Use [`git clone`](https://www.git-scm.com/docs/git-clone) command, to clone this repository using HTTPS or SSH.

1. Install the dependencies

    Use `npm install` command, to install all the dependencies.

2. Make your changes in a new git branch:

    ```shell
    git checkout -b my-fix-branch master
    ```

3. Create your patch, **including appropriate test cases**.

4. Make sure you follow our [Code Styles](#code-styles) and [Commit Message Guidelines](#commit-message-guidelines).

5. Run the test suite with this command below and ensure that all tests pass.

    ```shell
    npm run test
    ```

6. Commit your changes using a descriptive commit message that follows our [commit message conventions](#commit-message-guidelines). Adherence to these conventions is necessary because release notes are automatically generated from these messages.

7. Push your branch to GitHub:

    ```shell
    git push origin my-fix-branch
    ```

8.  In GitHub, send a pull request to `idn-area-data:main`.

9.  If we suggest changes then:

  - Make the required updates.
  - Re-run the test suite to ensure tests are still passing.
  - Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase master -i
    git push -f
    ```

That's it! Thank you for your contribution!
