// change if required.
const BINPATH = './node_modules/nightwatch/bin/';

// we use a nightwatch.conf.js file so we can include comments and helper functions
const config = {

    // we use /test as the name of our test directory by default. so test/e2e for e2e
    "src_folders": [
        "test"
    ],

    // reports (test outcome) output by nightwatch
    "output_folder": "reports",

    // selenium web driver config
    "selenium": {
        "start_process": true,
        // downloaded by selenium-download module (see below)
        "server_path": BINPATH + "selenium.jar",
        "log_path": "",
        "host": "127.0.0.1",
        "port": 4444,
        // web driver: chromedriver
        "cli_args": {
            "webdriver.chrome.driver": BINPATH + "chromedriver"
        }
    },

    // perform tests in parallel where possible
    "test_workers": {"enabled": true, "workers": "auto"},

    // we're testing a Public or "staging" site on Saucelabs
    "test_settings": {

        //Default
        "default": {
            "launch_url": "http://localhost",
            "selenium_port": 80,
            "selenium_host": "ondemand.saucelabs.com",
            "silent": true,
            "username": "${SAUCE_USERNAME}",     // if you want to use Saucelabs remember to
            "access_key": "${SAUCE_ACCESS_KEY}", // export your environment variables (see readme)
            "globals": {
                "waitForConditionTimeout": 10000    // wait for content on the page bsauefore continuing
            }
        },

        // Local
        "local": {
            "launch_url": "http://localhost",
            "selenium_port": 4444,
            "selenium_host": "127.0.0.1",
            "silent": true,
            "globals": {
                "waitForConditionTimeout": 15000 // on localhost sometimes internet is slow so wait...
            },
            "desiredCapabilities": {
                "browserName": "chrome",
                "chromeOptions": {
                    "args": [
                        'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3', "--window-size=640,1136" // iphone 5
                    ]
                },
                "javascriptEnabled": true,
                "acceptSslCerts": true
            }
        },

        // your local chrom browser (chromedriver)
        "chrome": {
            "desiredCapabilities": {
                "browserName": "chrome",
                "javascriptEnabled": true,
                "acceptSslCerts": true
            }
        },

        // browsers used on saucelabs:
        "chromemac": {
            "desiredCapabilities": {
                "browserName": "chrome",
                "platform": "OS X 10.11",
                "version": "47"
            }
        },
        "ie11": {
            "desiredCapabilities": {
                "browserName": "internet explorer",
                "platform": "Windows 10",
                "version": "11.0"
            }
        },
        "firefox": {
            "desiredCapabilities": {
                "platform": "XP",
                "browserName": "firefox",
                "version": "33"
            }
        },
        "internet_explorer_10": {
            "desiredCapabilities": {
                "platform": "Windows 7",
                "browserName": "internet explorer",
                "version": "10"
            }
        },
        "android_s4_emulator": {
            "desiredCapabilities": {
                "browserName": "android",
                "deviceOrientation": "portrait",
                "deviceName": "Samsung Galaxy S4 Emulator",
                "version": "4.4"
            }
        },
        "iphone_6_simulator": {
            "desiredCapabilities": {
                "browserName": "iPhone",
                "deviceOrientation": "portrait",
                "deviceName": "iPhone 6",
                "platform": "OSX 10.10",
                "version": "8.4"
            }
        }
    }
};


module.exports = config;

/**
 * selenium-download does exactly what it's name suggests;
 * downloads (or updates) the version of Selenium (& chromedriver)
 * on your localhost where it will be used by Nightwatch.
 */
require('fs').stat(BINPATH + 'selenium.jar', function (err, stat) { // got it?
    if (err || !stat || stat.size < 1) {
        require('selenium-download').ensure(BINPATH, function (error) {
            if (error) throw new Error(error); // no point continuing so exit!
            console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH);
        });
    }
});

