/**
 * xxxxxxx_1  小写
 * xxxxxxx_2  大写
 * xxxxxxx_3  中文
 * xxxxxxx_4  日期
 */

const fs = require('fs');
const nodejs = require("@hai2007/nodejs");

const list = {
    "150100-呼和浩特市": ['hohhot', 'Hohhot', '呼和浩特'],
    "150200-包头市": ['baotou', 'Baotou', '包头'],
    "150300-乌海市": ['wuhai', 'Wuhai', '乌海'],
    "150400-赤峰市": ['chifeng', 'Chifeng', '赤峰'],
    "150500-通辽市": ['tongliao', 'Tongliao', '通辽'],
    "150600-鄂尔多斯市": ['erdos', 'Erdos', '鄂尔多斯'],
    "150700-呼伦贝尔市": ['hulunbuir', 'Hulunbuir', '呼伦贝尔'],
    "150800-巴彦淖尔市": ['bayannur', 'Bayannur', '巴彦淖尔'],
    "150900-乌兰察布市": ['ulanqab', 'Ulanqab', '乌兰察布'],
    "152200-兴安盟": ['xinganleague', 'Xinganleague', '兴安盟'],
    "152500-锡林郭勒盟": ['xilingolleague', 'Xilingolleague', '锡林郭勒盟'],
    "152900-阿拉善盟": ['alxaleague', 'Alxaleague', '阿拉善盟'],
};

let month = new Date().getMonth() + 1;
let day = new Date().getDate();
let _date_ = (new Date().getFullYear()) + "-" + (month > 9 ? "" : "0") + month + "-" + (day > 9 ? "" : "0") + day;
let mdlink = '';

for (let key in list) {
    let item = list[key];
    let src = 'C:\/Users\/yelloxing\/Desktop\/chinaGeoJson-master\/city\/' + key + ".json";

    //  判断文件是否已经存在
    if (fs.existsSync('./' + item[1] + '.geoJSON')) {
        console.log(item);
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
