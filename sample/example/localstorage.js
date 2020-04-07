
//able to use this way, instead of chrome storage. but chrome storage will be preferable.
localStorage["options"] = JSON.stringify(options);
JSON.parse(localStorage.options);