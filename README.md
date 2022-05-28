# cocoapods-update-check-action
[![CI-Master](https://github.com/MeilCli/cocoapods-update-check-action/actions/workflows/ci-master.yml/badge.svg)](https://github.com/MeilCli/cocoapods-update-check-action/actions/workflows/ci-master.yml)  
CocoaPods new package version check action for GitHub Actions.

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
    - uses: MeilCli/cocoapods-update-check-action@v3
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
You can also pin to a [specific release](https://github.com/MeilCli/cocoapods-update-check-action/releases) version in the format `@v3.x.x`

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

## Contributes
[<img src="https://gist.github.com/MeilCli/72686c046982a5c1dcb270a047444f01/raw/82fb28940dcc8f03cc4073a81f6cf53ea7dc13f1/metrics_contributors.svg">](https://github.com/MeilCli/cocoapods-update-check-action/graphs/contributors)

### Could you want to contributes?
see [Contributing.md](./.github/CONTRIBUTING.md)

## License
[<img src="https://gist.github.com/MeilCli/72686c046982a5c1dcb270a047444f01/raw/82fb28940dcc8f03cc4073a81f6cf53ea7dc13f1/metrics_licenses.svg">](LICENSE)
