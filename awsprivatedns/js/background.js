chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: [
      {
        id: 1,
        priority: 1,
        action: {
          type: 'redirect',
          redirect: {
            regexSubstitution: 'http://\\2.\\3.\\4.\\5\\6'
          }
        },
        condition: {
          regexFilter: '^(http:\\/\\/)ip-(\\d+)-(\\d+)-(\\d+)-(\\d+)\\.compute\\.internal(:\\/.*)',
          resourceTypes: ['main_frame']
        }
      }
    ]
  });
});