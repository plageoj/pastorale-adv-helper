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
  production: true,
  useEmulator: false,
  emulator: {
    authUrl: '',
    firestore: {
      host: '',
      port: 0,
    },
    functions: {
      host: '',
      port: 0,
    },
  },
};
