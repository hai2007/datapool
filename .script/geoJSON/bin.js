/**
 * xxxxxxx_1  小写
 * xxxxxxx_2  大写
 * xxxxxxx_3  中文
 * xxxxxxx_4  日期
 */

const fs = require('fs');
const nodejs = require("@hai2007/nodejs");

const list = {
    '530100-昆明市': ['', 'Kunming', '昆明'],
    '530300-曲靖市': ['', 'Qujing', '曲靖'],
    '530400-玉溪市': ['', 'Yuxi', '玉溪'],
    '530500-保山市': ['', 'Baoshan', '保山'],
    '530600-昭通市': ['', 'Zhaotong', '昭通'],
    '530700-丽江市': ['', 'Lijiang', '丽江'],
    '530800-普洱市': ['', 'Puerh', '普洱'],
    '530900-临沧市': ['', 'Lincang', '临沧'],
    '532300-楚雄彝族自治州': ['', 'Chuxiongyzzzz', '楚雄彝族自治州'],
    '532500-红河哈尼族彝族自治州': ['', 'Honghehnyzzzz', '红河哈尼族彝族自治州'],
    '532600-文山壮族苗族自治州': ['', 'Wenshanzzmzzzz', '文山壮族苗族自治州'],
    '532800-西双版纳傣族自治州': ['', 'Xishuangbannadzzzz', '西双版纳傣族自治州'],
    '532900-大理白族自治州': ['', 'Dalibzzzz', '大理白族自治州'],
    '533100-德宏傣族景颇族自治州': ['', 'Dehongdzjpzzzz', '德宏傣族景颇族自治州'],
    '533300-怒江傈僳族自治州': ['', 'Nujianglszzzz', '怒江傈僳族自治州'],
    '533400-迪庆藏族自治州': ['', 'Diqingzzzzz', '迪庆藏族自治州'],
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
