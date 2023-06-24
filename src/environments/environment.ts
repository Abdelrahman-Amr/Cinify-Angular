// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  baseURL : 'http://localhost:9999/api',
  // baseURL : 'http://clinify-serverv2.eu-west-2.elasticbeanstalk.com/api',

  baseAuthURL : 'http://localhost:9090',
  // baseAuthURL : 'http://clinify-auth.eu-west-2.elasticbeanstalk.com',

  // redirectURI:'http://clinify-client.s3-website.eu-west-2.amazonaws.com/login'
  redirectURI:'http://localhost:4200/login'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
