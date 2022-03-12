/**
 * xxxxxxx_1  小写
 * xxxxxxx_2  大写
 * xxxxxxx_3  中文
 * xxxxxxx_4  日期
 */

const fs = require('fs');
const nodejs = require("@hai2007/nodejs");

const list = {
    '230100-哈尔滨市': ['harbin', 'Harbin', '哈尔滨'],
    '230200-齐齐哈尔市': ['qiqihar', 'Qiqihar', '齐齐哈尔'],
    '230300-鸡西市': ['jixi', 'Jixi', '鸡西'],
    '230400-鹤岗市': ['hegang', 'Hegang', '鹤岗'],
    '230500-双鸭山市': ['shuangyashan', 'Shuangyashan', '双鸭山'],
    '230600-大庆市': ['daqing', 'Daqing', '大庆'],
    '230700-伊春市': ['yichun', 'Yichun', '伊春'],
    '230800-佳木斯市': ['jiamusi', 'Jiamusi', '佳木斯'],
    '230900-七台河市': ['qitaihe', 'Qitaihe', '七台河'],
    '231000-牡丹江市': ['mudanjiang', 'Mudanjiang', '牡丹江'],
    '231100-黑河市': ['heihe', 'Heihe', '黑河'],
    '231200-绥化市': ['suihua', 'Suihua', '绥化'],
    '232700-大兴安岭地区': ['daxinganlingarea', 'Daxinganlingarea', '大兴安岭地区'],
};

let month = new Date().getMonth() + 1;
let day = new Date().getDate();
let _date_ = (new Date().getFullYear()) + "-" + (month > 9 ? "" : "0") + month + "-" + (day > 9 ? "" : "0") + day;
let mdlink = '';

for (let key in list) {
    let item = list[key];

    // let src = 'C:\/Users\/yelloxing\/Desktop\/chinaGeoJson-master\/city\/' + key + ".json";
    let src = '../chinaGeoJson-master/city/' + key + ".json";

    //  判断文件是否已经存在
    if (fs.existsSync('./' + item[1] + '.geoJSON')) {
        console.log(item);
    }

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