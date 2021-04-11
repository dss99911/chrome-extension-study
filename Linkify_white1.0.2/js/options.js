var bg = chrome.extension.getBackgroundPage();
var options = {}
var allLoaded = false;
window.addEventListener('load', init, false);

function init() {

    options = bg.options;
    document.getElementById("jira_path").value = options.jira_path;

    document.getElementById("regex").value = options.regex;
    document.getElementById("whitelist").value = options.whitelist;

    document.getElementById("options_form").onchange = save;

    document.getElementById("jira_path").onkeyup = save;
    document.getElementById("jira_path").onclick = save;

    document.getElementById("regex").onkeyup = save;
    document.getElementById("regex").onclick = save;

    document.getElementById("whitelist").onkeyup = save;
    document.getElementById("whitelist").onclick = save;
    document.getElementById("regex_default").innerText = bg.defaultOptions.regex

    allLoaded = true;

    var hash = window.location.hash.substring(1);
    if (hash == "install") {
        document.getElementById('install').style.display = "block";
    }

    window.onbeforeunload = function(e) {
        e = e || window.event;

        if (document.getElementById("jira_path").value.indexOf("example.com") != -1) {
            return "Woah there!\n-----------------------\nYou have not changed the default JIRA path from the example path.\n\nYou must first properly set this path in order for this extension to function properly.";
        } else if (document.getElementById("jira_path").value.indexOf("/browse") == -1) {
            return "Woah there!\n-----------------------\nMost JIRA URLs follow the convention:\nexample.com/browse/ISSUE-123\n\nIt does not appear you have the 'browse' part of the JIRA path in the 'JIRA Browse Path' URL, meaning your links probably won't operate as expected.\n\nYou are highly encouraged to double-check this before leaving the settings page.";
        }
        return null;
    };
}

function save() {
    if (!allLoaded) return;

    let jira_path = document.getElementById("jira_path").value;
    let regex = document.getElementById("regex").value;
    let whitelist = bg.parseWhitelist(document.getElementById("whitelist").value);

    // Reset to defaults if settings are wiped
    if (!jira_path || jira_path.length == 0) {
        options.jira_path = bg.defaultOptions.jira_path
    }

    if (!regex || regex.length == 0) {
        options.regex = bg.defaultOptions.regex
    }

    if (!whitelist || whitelist.length == 0) {
        options.whitelist = bg.defaultOptions.whitelist
    }

    localStorage["options"] = JSON.stringify(options);
    bg.options = options;
}