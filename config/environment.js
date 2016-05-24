/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'serenity',
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      AgolRestEndpoint: 'https://www.arcgis.com/sharing/rest/content/',
      portalBaseUrl: 'https://www.arcgis.com'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.torii = {
      sessionServiceName: 'session',
      providers: {
        'arcgis-oauth-bearer': {
          apiKey: 'oqKL6es0VrspTpEw',
          portalUrl: 'https://arcgis.com' //optional - defaults to https://arcgis.com
        }
      }
    }
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.torii = {
      sessionServiceName: 'session',
      providers: {
        'arcgis-oauth-bearer': {
          apiKey: 'TlUvU2mdC69zOrPr',
          portalUrl: 'https://arcgis.com' //optional - defaults to https://arcgis.com
        }
      }
    }
  }

  return ENV;
};
