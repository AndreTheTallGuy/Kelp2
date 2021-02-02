// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBpuoZHIfDWmoNwkj98SefETORTOkgqtr8",
    authDomain: "kelp2-56f64.firebaseapp.com",
    databaseURL: "https://kelp2-56f64-default-rtdb.firebaseio.com",
    projectId: "kelp2-56f64",
    storageBucket: "kelp2-56f64.appspot.com",
    messagingSenderId: "1011235135879",
    appId: "1:1011235135879:web:af62dc4de2e5a9dcec7322",
    measurementId: "G-1JM8L4XML4"
  },
  serverApiUrls: {
    getTags: 'http://localhost:8080/myapp/videos/available-tags',
    getAllVideos: 'http://localhost:8080/myapp/videos/all',
    getVideosByTag: 'http://localhost:8080/myapp/videos/tags/',
    getVideoById: 'http://localhost:8080/myapp/videos/id/',
    getAllNotes: 'http://localhost:8080/myapp/notes/all',
    getNotesByTag: 'http://localhost:8080/myapp/notes/tags/',
    getNoteById: 'http://localhost:8080/myapp/notes/id/'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
