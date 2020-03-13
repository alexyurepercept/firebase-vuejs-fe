# Code Design

## Folder structure

Due to the small size of the project, the vision is to split the code into the following catalogues:

- components: contains the reusable UI components
- directives: custom reusable html tags
- routes: contains all the url
- store.js: contains the centralized storage for user and other information

## 3rd party libraries

- axios: this is used to send http request, the request always return promise to make it easier to use the await/async syntax, also easy to chain the code
- vue2-google-maps: this is to simplify the usage of google map. The Autocomplete component is easy to plugin into the projecet. The MapElementFactory is easy to be customized to facilite the implementation of the direction service
- bootstrap: bootstrap has been used to accelerate the development and manage the css compatibility between browsers
- firebase: firebase has been used for authentication purpose

## Infrastructure

- Firebase hosting

## CICD

Use circle ci for CICD pipeline

- every master commit will deploy to firebase hosting
- simple and easy to use
- integrate seemlessly with github
- support unit testing on PRs

# Instructions

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Run unit tests

```
npm run test:unit
```

### Deployment

Create .env file in the project root folder
Add the GoogleMap API key to .env

```
VUE_APP_GOOGLE_API_KEY=***
```

Add the firebase config as environment variable to .env

```
VUE_APP_FIREBASE_API_KEY=***
VUE_APP_FIREBASE_AUTH_DOMAIN=***
VUE_APP_FIREBASE_DATABASE_URL=***
VUE_APP_FIREBASE_PROJECT_ID=***
VUE_APP_FIREBASE_STORAGE_BUCKET=***
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=***
VUE_APP_FIREBASE_APP_ID=***
```

install firebase cli

```
npm install -g firebase-tools
```

login firebase

```
firebase login
```

init firebase project, choose firebase hosting

```
firebase init
```

build project

```
npm run build
```

deploy

```
firebase deploy
```
