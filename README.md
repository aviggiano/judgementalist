# judgementalist

Judgementalist — judge Sherlock contests faster

![screenshot-2023-05-16-19-34-17](https://github.com/aviggiano/judgementalist/assets/3029017/abe5a366-8651-4bd5-a170-a448949a2a4f)

## Overview

Judgmentalist helps you judge Sherlock contests faster by eliminating the cumbersome task of managing multiple markdown files and taking notes on Google spreadsheets. Simply run `npx judgmentallist` in your judging repository and review all the issues related to the contest on your browser. You can then review each issue one by one, assigning severity rankings and making notes as needed.

https://www.loom.com/share/7bab4a0351e742de8b29b091d742b82f

## Usage

```
npx judgementalist
```

## Key Features

- Severity Assignment: The tool allows users to assign severity to each issue. This severity ranking is automatically updated in the UI
- Duplicates Detection: If you come across a duplicate issue, it can be easily identified and managed
- Issue Handling: The tool lets you mark issues for further review. If you're unsure whether something is indeed an issue, you can mark it with a question mark and revisit it later
- Best Issue Recognition: As Sherlock requires you to award the best issue, judgementalist enables you to do this by marking the best issue with a star.
- Automatic File Renaming: When you're done, hit the rocket button to automatically move and rename all your files following Sherlock's requirements

## Contribute

PRs are welcome!

Here are some specific areas where your help would make a big difference:

- Issue Similarity: using pattern matching to suggest issues that are similar so that they can be automatically marked as duplicates
- Automated Rating for Invalid Submissions: automatically rating submissions that don't meet certain criteria. For example, Sherlock marks "centralization risk" as `false`, so it could automatically discard those issues.




