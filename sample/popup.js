import {Preference} from "./util/Preference.js";
import {ActiveTab} from "./util/Tabs.js";

let changeColor = document.getElementById('changeColor');

Preference.get('color', function(color) {
    changeColor.style.backgroundColor = color;
    changeColor.setAttribute('value', color);
});

//change background color of current active tab. need activeTab permission
changeColor.onclick = function (element) {
    let color = element.target.value;

    ActiveTab.execute('document.body.style.backgroundColor = "' + color + '";');
};