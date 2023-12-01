// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function (config) {
  
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('./karma.waitwebpack'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    frameworks: ['waitwebpack', 'jasmine', '@angular-devkit/build-angular'],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/MDM-monitool-Frontend'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['MyChromeHeadless'], // <- not 'ChromeHeadless'
    customLaunchers: {
    MyChromeHeadless: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox'
        ]
      }
    },
    singleRun: false,
    restartOnFileChange: true
  });
};
