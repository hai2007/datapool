/**
 * xxxxxxx_1  小写
 * xxxxxxx_2  大写
 * xxxxxxx_3  中文
 * xxxxxxx_4  日期
 */

const fs = require('fs');
const nodejs = require("@hai2007/nodejs");

const list = {
    "320105-建邺区": ['jianye', 'Jianye', '建邺区'],
    "320114-雨花台区": ['yuhuatai', 'Yuhuatai', '雨花台区'],
    "320104-秦淮区": ['qinhuai', 'Qinhuai', '秦淮区'],
    "320106-鼓楼区": ['drumtower', 'Drumtower', '鼓楼区'],
    "320102-玄武区": ['basaltic', 'Basaltic', '玄武区']
};

let month = new Date().getMonth() + 1;
let day = new Date().getDate();
let _date_ = (new Date().getFullYear()) + "-" + (month > 9 ? "" : "0") + month + "-" + (day > 9 ? "" : "0") + day;
let mdlink = '';

for (let key in list) {
    let item = list[key];
    let src = '/Users/kapok/Desktop/chinaGeoJson-master/county/' + key + ".json";

    nodejs.copySync("./.script/geoJSON/template", './' + item[1] + '.geoJSON');

    for (let file of['package.json', 'README.md']) {
        fs.writeFileSync('./' + item[1] + '.geoJSON/' + file,
            (fs.readFileSync('./' + item[1] + '.geoJSON/' + file) + "")
            .replace(/xxxxxxx\_1/g, item[0]).replace(/xxxxxxx\_2/g, item[1]).replace(/xxxxxxx\_3/g, item[2]).replace(/_$/, ''));
    }

    fs.writeFileSync('./' + item[1] + ".geoJSON/CHANGELOG", (fs.readFileSync('./' + item[1] + ".geoJSON/CHANGELOG") + "").replace(/xxxxxxx\_4/, _date_));

    fs.writeFileSync('./' + item[1] + '.geoJSON/' + item[0] + ".geoJSON.js", `var ${item[1]}GeoJSON = ${fs.readFileSync(src)};

     if (typeof module === "object" && typeof module.exports === "object") {
         module.exports = ${item[1]}GeoJSON;
     } else {
         window.${item[1]}GeoJSON = ${item[1]}GeoJSON;
     }`);

    mdlink += "- [" + item[2] + "](./" + item[1] + ".geoJSON/README.md)\n"

}

console.log(mdlink);