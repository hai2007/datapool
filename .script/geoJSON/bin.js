/**
 * xxxxxxx_1  小写
 * xxxxxxx_2  大写
 * xxxxxxx_3  中文
 * xxxxxxx_4  日期
 */

const fs = require('fs');
const nodejs = require("@hai2007/nodejs");

const list = {
    '650100-乌鲁木齐市': ['', 'Urumqi', '乌鲁木齐'],
    '650200-克拉玛依市': ['', 'Karamay', '克拉玛依'],
    '650400-吐鲁番市': ['', 'Turpan', '吐鲁番'],
    '650500-哈密市': ['', 'Hami', '哈密'],
    '652300-昌吉回族自治州': ['', 'Changjihzzzz', '昌吉回族自治州'],
    '652700-博尔塔拉蒙古自治州': ['', 'Bortalamgzzz', '博尔塔拉蒙古自治州'],
    '652800-巴音郭楞蒙古自治州': ['', 'Bayingolinmgzzz', '巴音郭楞蒙古自治州'],
    '652900-阿克苏地区': ['', 'Aksuregion', '阿克苏地区'],
    '653000-克孜勒苏柯尔克孜自治州': ['', 'Kizilsukirgizzzz', '克孜勒苏柯尔克孜自治州'],
    '653100-喀什地区': ['', 'Kashgarregion', '喀什地区'],
    '653200-和田地区': ['', 'Hotanarea', '和田地区'],
    '654000-伊犁哈萨克自治州': ['', 'Ilikazakhzzz', '伊犁哈萨克自治州'],
    '654200-塔城地区': ['', 'Tachengarea', '塔城地区'],
    '654300-阿勒泰地区': ['', 'Altayregion', '阿勒泰地区'],
};

let month = new Date().getMonth() + 1;
let day = new Date().getDate();
let _date_ = (new Date().getFullYear()) + "-" + (month > 9 ? "" : "0") + month + "-" + (day > 9 ? "" : "0") + day;
let mdlink = '';

for (let key in list) {
    let item = list[key];

    if (item[0] == "") item[0] = (item[1] + "").toLowerCase();

    let src = 'C:\/Users\/yelloxing\/Desktop\/chinaGeoJson-master\/city\/' + key + ".json";
    // let src = '../chinaGeoJson-master/city/' + key + ".json";

    //  判断文件是否已经存在
    if (fs.existsSync('./' + item[1] + '.geoJSON')) {
        console.log(item);
        continue;
    }

    nodejs.copySync("./.script/geoJSON/template", './' + item[1] + '.geoJSON');

    for (let file of ['package.json', 'README.md']) {
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
