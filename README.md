# React Native Platform

jump start your react native project

## Getting Started

### Prerequisites

- NodeJS v8+
- Global node modules
  - [react-devtools](https://github.com/facebook/react-devtools)
  - [eslint](https://eslint.org/docs/user-guide/getting-started)
  - [jest-cli](https://www.npmjs.com/package/jest-cli)
  - [react-native-cli](https://github.com/react-native-community/react-native-cli)
- recommended (optional)
  - [nvm](https://github.com/creationix/nvm) (to install multiple node versions)
  - [peco](https://github.com/peco/peco) (open android emulators from the terminal)

### VSCode

- plugins
  - flowtype.flow-for-vscode
  - dbaeumer.vscode-eslint
  - orta.vscode-jest
  - gcazaciuc.vscode-flow-ide
  - stevencl.adddoccomments

### Installing

A step by step series of examples that tell you how to get a development env running

- clone repo
- `npm install`
- TODO: renaming the project

## Running the app

### Set Environment from script

**YOU MUST SELECT ENVIRONMENT BEFORE RUNNNING THE APP**

Select Environment:  
`source appcenter-post-clone.sh <ENV> // ex.) dev`

#### Options

List Environments:  
`appcenter-post-clone.sh envs`

Clean Environments:  
`appcenter-post-clone.sh clean`

### android emulator

- open android emulator
- `npm run android`

### android device

- connect device to pc/mac
- enable usb debugging on device
- `npm run android`

### ios simulator

- `npm run ios`
- in case of `Command failed: xcrun instruments -s` error
  - open Xcode app
  - Preferences menu
  - Locations tab
  - Command Line Tools dropdown
  - choose Xcode

### ios device

- open the xcode project
- press run on xcode

## Running the tests

### unit tests

- `npm run test`

### ui test

- TODO

## Deployment

TODO

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## Versioning

Add release notes on [RELEASE.md](RELEASE.md)

Given a version number MAJOR.MINOR.PATCH, increment the:

MAJOR version when you make incompatible API changes,  
MINOR version when you add functionality in a backwards-compatible manner, and  
PATCH version when you make backwards-compatible bug fixes.

## Authors

-

## [Documentation](docs/index.md)

---

## Management

### Pre development

- [ ] Create test cases for each feature
- [ ] Plan directory structure beforehand
- [ ] Plan components structure beforehand
- [ ] Write unit tests beforehand
- [ ] Pre configure staging and production environments
- [ ] prepare dictionary file strings
- [ ] database structure
- [ ] pre-determine app flow and behavior
- [ ] spikes for each feature to test if it can be done

### development

- [ ] use BEM
- [ ] never hard code strings
- [ ] always check multiple screen sizes
- [ ] check on devices with notch
- [ ] Test the deployed code
- [ ] upper camel case file names for components, class Home extends Component Home.tsx

### Testing

- [ ] TODO

### UI

- [ ] fonts
- [ ] margins
- [ ] colors
- [ ] orientation change (if supported by app)
- [ ] favicon (web)

### Enhancments (todo):

- [ ] TODO

### Test case sample

Scenario: User tries to log in with invalid credentials

Conditions:

- [ ] Valid email address format

- [ ] Valid password length

Expected:

- [ ] Phone receives 6 digit pin

Tested on:

- [ ] iphone 6

- [ ] iphone X

- [ ] iphone XR

- [ ] android

- [ ] android with notch
