//when import the file. you have to add extection 'js' on file path
class Preference {
    static set(key, value) {
        chrome.storage.sync.set({[key]: value});
    }

    static get(key, action) {
        chrome.storage.sync.get(key, function (data) {
            action(data[key]);
        });
    }
}

export {Preference};