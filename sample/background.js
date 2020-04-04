import {Preference} from "./util/Preference.js";

chrome.runtime.onInstalled.addListener(function () {
    Preference.set('color', '#3aa757');

    //need declarativeContent permission
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            //activate icon. icon color also get colorful
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'developer.chrome.com'},
            })
            ],
            //define action when user click the icon.
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});