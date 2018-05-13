# ConfigApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Installations steps

## Creation
```
ng new github-summary --style=scss --skip-install
ng set --global packageManager=yarn
yarn install
```

## Bootstrap files
Install the following library
```
$ yarn add --save bootstrap@4.1.1
```

Create the following files
```
|- src/
    |- ssss/
        |- _variables.scss
        |- _mixins.scss
        |- _styles.scss
```
Add following lines in `src/styles.scss`
```
// BOOTSTRAP CSS
@import "~bootstrap/dist/css/bootstrap.css";

// CUSTOM SCSS
@import './scss/variables';
@import './scss/mixins';
@import './scss/styles';

// COMPONENTS SCSS
```
## Ng Bootstrap files
```
$ yarn add @ng-bootstrap/ng-bootstrap@1.1.2
```
## Install tslint configuration
Follow steps of https://gist.github.com/stas-kh/2fc80c11c6db0fc4c64354400e29a2b8
