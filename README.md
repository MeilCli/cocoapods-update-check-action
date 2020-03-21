# cocoapods-update-check-action
![](https://github.com/MeilCli/cocoapods-update-check-action/workflows/CI/badge.svg)  
JavaScript based CocoaPods new package version check action for GitHub Actions.

## Required
This action must execute on macOS.

## Example
Slack notification example, using [8398a7/action-slack](https://github.com/8398a7/action-slack):

```yaml
name: Check Package

on: 
  schedule:
    - cron: '0 8 * * 5' # every friday AM 8:00
jobs:
  cocoapod:
    runs-on: macOS-latest
    steps:
    - uses: actions/checkout@v1
    - uses: MeilCli/cocoapods-update-check-action@v2
      id: outdated
    - uses: 8398a7/action-slack@v2
      if: steps.outdated.outputs.has_pod_update != 'false'
      with:
        status: ${{ job.status }}
        text: ${{ steps.outdated.outputs.pod_update_text }}
        author_name: GitHub Actions
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

## input
- `execute_directories`
  - optional
  - execute directories of npm outdated command
  - if multiple directories, write multiline

## output
- `has_pod_update`
  - has new package version information
  - value: `true` or `false`
- `pod_update_text`
  - new package version information text
- `pod_update_json`
  - new package version information json

## License
[MIT License](LICENSE).
