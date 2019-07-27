// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDODLVMuwrvGobMXkI89DktOLgwf0mCM24",
    authDomain: "joaq-lab.firebaseapp.com",
    databaseURL: "https://joaq-lab.firebaseio.com",
    projectId: "joaq-lab",
    storageBucket: "joaq-lab.appspot.com",
    messagingSenderId: "794748950011",
    appId: "1:794748950011:web:815fe385e7317c11"
  },
  userApi: 'http://localhost:5000/joaq-lab/us-central1/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
