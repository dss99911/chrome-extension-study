var defaultOptions = {
    whitelist: 'github.balancehero.cc',
    jira_path: 'https://jira.balancehero.cc/browse/',
    regex: '([a-zA-Z]{2,10}-[\\d]{1,6}|^[a-zA-Z]{2,10} [\\d]{1,6})'

};

if (localStorage.options && localStorage.options.length > 0) {
    var options = JSON.parse(localStorage.options);
} else {
    var options = defaultOptions;
}

options.whitelist = parseWhitelist(options.whitelist);

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if ('get_options' == message) {
        sendResponse(options)
        return true;
    }
})

install_notice();

function parseWhitelist(whitelist) {
    if (whitelist instanceof Array)
        return whitelist;

    whitelist = whitelist.replace(/\n/g, ',');
    whitelist = whitelist.replace(/,+/g, ',');
    whitelist = whitelist.replace(/^,|,$/g, '');
    whitelist = whitelist.split(',');

    for (var i = whitelist.length; i--;)
        whitelist[i] = whitelist[i].trim();

    if (whitelist.length == 1 && !whitelist[0])
        whitelist = [];

    return whitelist;
}

function install_notice() {
    if (localStorage.getItem('install_time'))
        return;

    var now = new Date().getTime();
    localStorage.setItem('install_time', now);
    chrome.tabs.create({ url: "options.html#install" });
}