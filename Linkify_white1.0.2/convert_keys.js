var jira_path, regex;

function searchForKeyNames() {
    function createLinkFromNode(node, regex) {
        if (node == null) {
            return;
        }

        var l, m;
        var txt = node.textContent.trim();
        var span = null;
        var p = 0;

        if (txt.length == 0)
            return;

        console.log("["+ txt + "]");

        jiraTagExpression = new RegExp("(" + regex + ")", "g");

        while ((m = jiraTagExpression.exec(txt)) !== null) {
            if (null === span) {
                // Create a new span for the replaced text and newly created href
                span = document.createElement('span');
            }

            // Get the link without trailing dots
            jiraNumberText = m[0]
            jiraNumber = jiraNumberText
                .replace(/\.*$/, '')
                .replace(" ", "-");

            console.log("jiraNumber: " + jiraNumber);

            // Put in text up to the link
            span.appendChild(document.createTextNode(txt.substring(p, m.index)));

            // Create a link and put it in the span
            a = document.createElement('a');
            a.className = 'linkclass';
            a.appendChild(document.createTextNode(jiraNumberText));

            a.setAttribute('href', jira_path + jiraNumber);
            a.style.textDecoration = "underline";

            span.appendChild(a);
            //track insertion point
            p = m.index + m[0].length;
        }
        if (span) {
            // Take the text after the last link
            span.appendChild(document.createTextNode(txt.substring(p, txt.length)));

            // Replace the original text with the new span
            try {
                node.parentNode.replaceChild(span, node);
            } catch (e) {
                console.error(e);
                console.log(node);
            }
        }
    }

    if ('text/xml' != document.contentType && 'application/xml' != document.contentType) {
        var node, allLinks = findTextNodes();
        for (var i = 0; i < allLinks.length; i++) {
            node = allLinks[i];
            createLinkFromNode(node, regex);
        }
        let titleRegex = "(^|(?<=\\/))[a-zA-Z]{2,10} [\\d]{1,6}";
        createLinkFromNode(findTitleTextNode(), titleRegex);
    }

}

var observer = new MutationObserver(onMutation);
var observerConfig = {
    attributes: false,
    characterData: false,
    childList: true,
    subtree: true
};
observer.start = function() {
    observer.observe(document.body, observerConfig);
};
observer.stop = function() {
    observer.disconnect();
};

function onMutation() {
    observer.stop();
    searchForKeyNames();
    observer.start();
}

function findTitleTextNode() {
    let titleNode = document.getElementsByClassName("js-issue-title")[0];
    if (titleNode == undefined) {
        return null
    }
    return titleNode.firstChild;
}

function findTextNodes(root) {
    root = root || document.body;

    var textNodes = [];

    var ignoreTags = /^(?:a|noscript|option|script|style|textarea)$/i;
    (function findTextNodes(node) {
        node = node.firstChild;
        while (node) {
            if (node.nodeType == 3)
                textNodes.push(node)
            else if (!ignoreTags.test(node.nodeName))
                findTextNodes(node)
            node = node.nextSibling;
        }
    })(root);
    return textNodes;
}


var options = {};

chrome.runtime.sendMessage('get_options', function(options_) {
    options = options_;

    // Show now if domain is on the whitelist
    var found = false;
    for (var i = options.whitelist.length; i--;) {
        if (document.domain.indexOf(options.whitelist[i]) == 0) {
            found = true;
            break;
        }
    }
    if (!found) {
        return;
    }

    // Set global regex value
    regex = options.regex;

    // Format JIRA path with a trailing slash if not present
    jira_path = options.jira_path;
    if (jira_path.substr(-1) != '/') jira_path += '/';

    // Ready to begin search for key names
    searchForKeyNames();
    observer.start();
})