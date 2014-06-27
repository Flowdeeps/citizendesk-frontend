// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/raven-js/dist/raven.js',
      'app/bower_components/angular-gettext/dist/angular-gettext.min.js',
      'app/bower_components/lodash/dist/lodash.min.js',
      'app/bower_components/eve-api/dist/eve-api.js',
      'app/bower_components/angular-strap/dist/modules/debounce.js',
      'app/bower_components/angular-strap/dist/modules/dimensions.js',
      'app/bower_components/angular-strap/dist/modules/scrollspy.js',
      'app/bower_components/angular-strap/dist/modules/modal.js',
      'app/scripts/*.js',
      'app/scripts/**/*.js',
      'test/globals.js',
      'test/mock.js',
      'test/auth-service-mock.js',
      'test/spec/**/*.js',
      // for karma markup preprocessor
      'app/views/**/*.html'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    preprocessors: {
      '**/*.html': ['ng-html2js'], // for templates in tests
      'app/scripts/**/*.js': 'coverage' // for coverage
    },
    /* Comment the following in order to have better debug
    informations when karma tests are failing, uncomment in order to
    have coverage reports *
    reporters: ['coverage'],
    /**/
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },
    ngHtml2JsPreprocessor: {
      // in order to match the location in the directives `templateUrl`
      stripPrefix: 'app/'
    }
  });
};
