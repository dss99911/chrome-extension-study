chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        //ex: http://ip-10-50-4-186.ap-south-1.compute.internal:8890/
        let pattern = /(http:\/\/)ip-(\d+)-(\d+)-(\d+)-(\d+)\.[\w-]+\.[\w-]+\.[\w-]+([:/].*)/i;

        let result = details.url.match(pattern);
        if (result) {
            return {redirectUrl: result[1] + result.slice(2, 6).join(".") + result[6]};

        }
        return {}
    },
    {
        urls: [
            "http://*.compute.internal/*"
        ],
        types: ["main_frame"]
    },
    ["blocking"]
);