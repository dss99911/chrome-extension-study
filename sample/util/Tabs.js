class ActiveTab {
    static execute(script) {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                {code: script});
        });
    }
}

export {ActiveTab};