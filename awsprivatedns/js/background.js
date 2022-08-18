chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        let pattern = /(http:\/\/)ip-(\d+)-(\d+)-(\d+)-(\d+)\..+\..+\.\w+([:/].*)/i;
        let result = details.url.match(pattern);
        if (result) {
            return {redirectUrl: result[1] + result.slice(2, 6).join(".") + result[6]};

        }
        return {}
    },
    {
        urls: [
            "http://*/*"
        ],
        types: ["main_frame"]
    },
    ["blocking"]
);