// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'koukokutori',
    appId: '1:1070658608475:web:f3b7e6e659fc1f28',
    databaseURL: 'https://koukokutori.firebaseio.com',
    storageBucket: 'koukokutori.appspot.com',
    locationId: 'asia-east2',
    apiKey: 'AIzaSyDHN7_-ERRq7cGsVtPn9BwEo1jgSle-UH8',
    authDomain: 'koukokutori.firebaseapp.com',
    messagingSenderId: '1070658608475',
  },
  production: false,
  useEmulator: false,
  emulator: {
    authUrl: 'http://localhost:9099/',
    firestore: {
      host: 'localhost',
      port: 8080,
    },
    functions: {
      host: 'localhost',
      port: 9000,
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
