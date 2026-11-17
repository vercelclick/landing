---
title: "CI/CD & GitHub Actions"
description: "Programmatic access for automated build runners with automatic console log masking."
category: "Automation & AI"
order: 7
---

# CI/CD & Automated Pipelines

Automated continuous integration runners (such as GitHub Actions, GitLab CI, CircleCI, and Docker builds) do not have human fingerprints. For these headless environments, Click provisions **Machine Access Keys**.

---

## 1. Generate a Machine Access Key

On the vault.vercel.click UI, select the desire project(local or cloud); Choose Grant access and select the necessary environment(s) (e.g., `staging` or `production`). Authorize the key generation with your finger print.

Store this key as an encrypted secret in your repository settings (e.g., `CLICK_ACCESS_KEY` in GitHub Secrets).

---

## 2. GitHub Actions Integration

Use Click CLI directly inside your GitHub Actions workflow:

```yaml
name: Test and Build
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Click CLI
        run: |
          curl -LsSf https://github.com/vercelclick/cli/releases/latest/download/click-cli-installer.sh | sh

      - name: Run Tests with Scoped Secrets
        run: |
          click run --access-key="${{ secrets.CLICK_ACCESS_KEY }}" --env=staging -- npm test
```

---

## Automatic Secret Masking

Click CLI automatically hooks stdout and stderr streams in CI environments. Any decrypted secret values printed by your build scripts or test runners are **automatically masked with `***`** to prevent accidental credential leakage in public or private workflow logs.
