chrome.runtime.onInstalled.addListener(() => {
  const rules = [
    {
      "id": 1,
      "priority": 1,
      "action": {
        "type": "redirect",
        "redirect": {
          "regexSubstitution": "http://\\2.\\3.\\4.\\5\\6"
        }
      },
      "condition": {
        "regexFilter": "^(http:\\/\\/)ip-(\\d+)-(\\d+)-(\\d+)-(\\d+)\\.[\\w-]+\\.[\\w-]+\\.[\\w-]+([:\\/].*)",
        "resourceTypes": ["main_frame"]
      }
    }
  ];

  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rules.map(r => r.id),
    addRules: rules
  });
});