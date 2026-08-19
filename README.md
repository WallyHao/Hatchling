# Hatchling

Hatchling is the shared learning repository for the ARES Robocon team. It documents the team's development practices, tools, and technical experience for both new and experienced members.

The site is built with [Docusaurus](https://docusaurus.io/) and published through GitHub Pages.

## Read the Documentation

The published documentation is available at:

<https://wallyhao.github.io/Hatchling/>

Open the site and select **Docs** in the navigation bar. The documentation starts with the [Introduction](https://wallyhao.github.io/Hatchling/docs/intro), which explains the purpose of the repository and how to use the material.

The documentation is organized as a progressive reference rather than a single linear course. You can read it from the beginning when joining the team, or open a specific section from the sidebar when looking for a particular tool, concept, or workflow.

When reading a document:

1. Check the stated prerequisites before starting.
2. Follow the steps in order and run the examples locally when possible.
3. Compare the expected results with your own environment.
4. Read the troubleshooting and related sections before moving on.
5. Report incorrect, outdated, or unclear content through an issue or pull request.

## Contribute Documentation

Contributors write documentation as Markdown or MDX files in the `docs/` directory. The sidebar is generated automatically from this directory, so most new documents do not require changes to `sidebars.ts`.

### Repository Structure

```text
Hatchling/
├── docs/                         # Documentation source files
│   └── intro.mdx                 # Introduction and documentation entry point
├── src/                          # Website components and styles
├── static/                       # Static assets served by the website
├── docusaurus.config.ts          # Site, theme, and deployment configuration
├── sidebars.ts                   # Automatically generated documentation sidebar
├── package.json                  # Scripts and dependencies
├── package-lock.json             # Locked dependency versions
└── .github/workflows/deploy.yml # GitHub Pages deployment workflow
```

Only documentation content should normally be changed when adding a tutorial. Website configuration and application code should be changed only when the documentation system itself needs to be updated.

### Organize Documents

Place a standalone document directly in `docs/`:

```text
docs/
├── intro.mdx
└── development-environment.mdx
```

Use a directory when several documents belong to the same subject:

```text
docs/
├── intro.mdx
└── development/
    ├── _category_.json
    ├── environment-setup.mdx
    └── first-program.mdx
```

The `_category_.json` file controls the category name and its position in the sidebar:

```json
{
  "label": "Development",
  "position": 2,
  "link": {
    "type": "generated-index",
    "description": "Development tools and basic workflows for ARES members."
  }
}
```

Use lowercase, descriptive, hyphen-separated filenames. Prefer names such as `environment-setup.mdx` and `pid-control.mdx` over names such as `page1.mdx` or `notes.mdx`.

### Write a Document

Every document should begin with front matter. `sidebar_position` controls the order of documents in its directory:

````md
---
sidebar_position: 1
---

# Development Environment Setup

## Goal

Explain what the reader will be able to do after completing this document.

## Prerequisites

List the required hardware, software, knowledge, or previous documents.

## Steps

Explain one action at a time. Include commands and expected output where they help the reader verify progress.

```bash
npm install
```

## Troubleshooting

Describe common failures and practical ways to diagnose them.

## Summary

Review the main points and link to the next relevant document.
````

Use headings to make the document easy to scan. Include complete commands, file paths, configuration examples, and assumptions. Explain why a step is required when the reason is not obvious. Keep examples close to the instruction they support.

MDX supports standard Markdown plus JSX components provided by Docusaurus. Standard Markdown is preferred unless an interactive or reusable component provides a clear benefit.

### Preview Changes Locally

Install the project dependencies from the repository root:

```bash
npm install
```

Start the development server:

```bash
npm run start
```

The site is normally available at `http://localhost:3000/Hatchling/`. The development server reloads the page when a document changes.

Run the type checker:

```bash
npm run typecheck
```

Build the production site:

```bash
npm run build
```

Always run `npm run build` before submitting a documentation change. It catches broken links, invalid MDX, and configuration errors that may not be visible during editing.

### Submit a Change

Create a branch from the latest `main` branch:

```bash
git switch main
git pull --ff-only origin main
git switch -c docs/add-environment-guide
```

Review the change locally, then inspect the files and diff:

```bash
git status
git diff --check
git diff
```

Use a Conventional Commits style message. Documentation-only changes should normally use the `docs` type:

```bash
git add docs/
git commit -m "docs: add development environment guide"
git push -u origin docs/add-environment-guide
```

Open a pull request against `main`. A useful pull request should include:

- A short description of what was added or changed.
- The intended audience and prerequisites.
- The commands used to validate the change.
- Screenshots only when a visual change is relevant.
- Links to related issues or documents when applicable.

The GitHub Actions workflow builds and deploys the site when changes are merged into `main`. Do not commit generated `build/` output or dependency directories such as `node_modules/`.

## Writing Standards

- Prefer clear, direct English and consistent technical terminology.
- Write for a reader who may be unfamiliar with the project.
- Use one concept or task per document whenever possible.
- Explain assumptions instead of relying on tribal knowledge.
- Keep instructions reproducible from a clean environment.
- Update related documents when commands, paths, or workflows change.
- Do not include secrets, personal access tokens, private keys, or machine-specific credentials.

## License and Ownership

This repository is maintained for the ARES Robocon team. Contributions should describe team-relevant knowledge and follow the review process above.
