/**
 * xxxxxxx_1  小写
 * xxxxxxx_2  大写
 * xxxxxxx_3  中文
 * xxxxxxx_4  日期
 */

const fs = require('fs');
const nodejs = require("@hai2007/nodejs");

const list = {
    '210100-沈阳市': ['shenyang', 'Shenyang', '沈阳'],
    '210200-大连市': ['dalian', 'Dalian', '大连'],
    '210300-鞍山市': ['anshan', 'Anshan', '鞍山'],
    '210400-抚顺市': ['fushun', 'Fushun', '抚顺'],
    '210500-本溪市': ['benxi', 'Benxi', '本溪'],
    '210600-丹东市': ['dandong', 'Dandong', '丹东'],
    '210700-锦州市': ['jinzhou', 'Jinzhou', '锦州'],
    '210800-营口市': ['yingkou', 'Yingkou', '营口'],
    '210900-阜新市': ['fuxin', 'Fuxin', '阜新'],
    '211000-辽阳市': ['liaoyang', 'Liaoyang', '辽阳'],
    '211100-盘锦市': ['panjin', 'Panjin', '盘锦'],
    '211200-铁岭市': ['tieling', 'Tieling', '铁岭'],
    '211300-朝阳市': ['sunrise', 'Sunrise', '朝阳'],
    '211400-葫芦岛市': ['huludao', 'Huludao', '葫芦岛'],
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