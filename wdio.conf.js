require('dotenv').config();
const os = require('os');
const chai = require('chai');
const chaiWebdriver = require('chai-webdriverio').default;

const config = {
  isDevelopment: process.env.NODE_ENV !== 'production',
  // URL тестируемого стенда
  baseUrl:
    process.env.URL ||
    (() => {
      throw new Error('Не задан целевой хост для тестирования, см. README.md');
    })(),
};

config.maxInstances = process.env.CONCURRENCY || (config.isDevelopment ? 1 : os.cpus().length);

config.services = config.isDevelopment ? ['selenium-standalone'] : [];

const logLevels = ['silent', 'verbose', 'command', 'data', 'result', 'error'];
if (process.env.LOG_LEVEL && logLevels.includes(process.env.LOG_LEVEL)) {
  config.logLevel = process.env.LOG_LEVEL;
} else {
  config.logLevel = logLevels[config.isDevelopment ? 1 : 0];
}

config.capabilities = [
  {
    browserName: 'chrome',
  },
];

if (process.env.SELENIUM_HUB_HOST) {
  config.host = process.env.SELENIUM_HUB_HOST;
}

if (process.env.SELENIUM_HUB_PORT) {
  config.port = process.env.SELENIUM_HUB_PORT;
}

module.exports.config = {
  ...config,

  specs: ['./specs/**/*.js'],
  suites: {},

  exclude: [],

  seleniumArgs: {
    javaArgs: [],
  },

  // использовать ли wdio-sync для запуска тестов или нет
  sync: true,
  // Включить раскрашивания stdout
  coloredLogs: true,
  // Сейчас очень много функций кричат о deprecation статусе, так что замьютим
  deprecationWarnings: false,
  // Если мы хотим, что бы тесты завершались после первого проваленного кейса, то надо эту опцию увеличить (0 - выключить)
  bail: 0,
  // Папка для скриншотов проваленных кейсов
  screenshotPath: './reports/fail-screenshots',
  // Таймаут по умолчанию для всех waitFor* команд.
  waitforTimeout: 12000, // ms
  // Таймаут запроса к Selenium server
  connectionRetryTimeout: 90000,
  // Количество попыток переотправки запроса к Selenium server
  connectionRetryCount: 3,

  framework: 'mocha',
  reporters: ['spec', 'json', 'mochawesome'],
  reporterOptions: {
    outputDir: './reports',
    mochawesome_filename: 'mochawesome.json',
  },
  // Опции запуска mocha
  mochaOpts: {
    ui: 'bdd',
    compilers: ['js:babel-register'],
    timeout: 1000 * 60 * 10, // 10m timeout for test in mocha
  },

  before() {
    chai.config.includeStack = true;
    global.expect = chai.expect;
    chai.use(chaiWebdriver(browser, { defaultWait: 5000 }));
  },
  afterTest({ err }) {
    if (err && process.env.DEBUG_ON_FAIL && browser) {
      browser.debug();
    }
  },
};
