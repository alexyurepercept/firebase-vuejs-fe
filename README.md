# firebase-auth-fe

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

Add the GoogleMap API key to the src/main.js, make sure Place API and Direction API is enabled in the google cloud console

```
Vue.use(VueGoogleMaps, {
  load: {
    key: //add google api key here,
    libraries: "places,directions"
  },
  installComponents: true
});
```

Add the firebase config in the src/main.js

```
var firebaseConfig = {
  apiKey: //add api key here,
  authDomain: //add auth domain here,
  databaseURL: //add database url here,
  projectId: //add project id here,
  storageBucket: //add storage bucket here,
  messagingSenderId: //add messaging sender id here,
  appId: // add appId herre
};
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
