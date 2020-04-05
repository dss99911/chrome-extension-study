- when import files. you have to add extection 'js' on file path
- when import files. the html of js should add `type="module"`
-- <script src="popup.js" type="module"></script>
- if you want to import files on background. use background.page

```
PROJECT_NAME=sample
mkdir "./$PROJECT_NAME/util"
ln ./util/Preference.js "./$PROJECT_NAME/util/Preference.js"
ln ./util/Tabs.js "./$PROJECT_NAME/util/Tabs.js"
ln ./util/ScreenUtil.js "./$PROJECT_NAME/util/ScreenUtil.js"
```