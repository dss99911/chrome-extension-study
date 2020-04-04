import {Preference} from "./util/Preference.js";

let page = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1', '#ffffff'];
function constructOptions(kButtonColors) {
    for (let item of kButtonColors) {
        let button = document.createElement('button');
        button.style.backgroundColor = item;
        button.addEventListener('click', function() {
            Preference.set('color', item)
        });
        page.appendChild(button);
    }
}
constructOptions(kButtonColors);