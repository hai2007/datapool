/**
 * xxxxxxx_1  小写
 * xxxxxxx_2  大写
 * xxxxxxx_3  中文
 * xxxxxxx_4  日期
 */

const fs = require('fs');
const nodejs = require("@hai2007/nodejs");

const list = {
    '330100-杭州市': ['hangzhou', 'Hangzhou', '杭州'],
    '330200-宁波市': ['ningbo', 'Ningbo', '宁波'],
    '330300-温州市': ['wenzhou', 'Wenzhou', '温州'],
    '330400-嘉兴市': ['jiaxing', 'Jiaxing', '嘉兴'],
    '330500-湖州市': ['huzhou', 'Huzhou', '湖州'],
    '330600-绍兴市': ['shaoxing', 'Shaoxing', '绍兴'],
    '330700-金华市': ['jinhua', 'Jinhua', '金华'],
    '330800-衢州市': ['quzhou', 'Quzhou', '衢州'],
    '330900-舟山市': ['zhoushan', 'Zhoushan', '舟山'],
    '331000-台州市': ['taizhou-city', 'TaizhouCity', '台州'],
    '331100-丽水市': ['lishui', 'Lishui', '丽水'],
};

let month = new Date().getMonth() + 1;
let day = new Date().getDate();
let _date_ = (new Date().getFullYear()) + "-" + (month > 9 ? "" : "0") + month + "-" + (day > 9 ? "" : "0") + day;
let mdlink = '';

for (let key in list) {
    let item = list[key];

    let src = 'C:\/Users\/yelloxing\/Desktop\/chinaGeoJson-master\/city\/' + key + ".json";
    // let src = '../chinaGeoJson-master/city/' + key + ".json";

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
