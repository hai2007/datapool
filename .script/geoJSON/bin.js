/**
 * xxxxxxx_1  小写
 * xxxxxxx_2  大写
 * xxxxxxx_3  中文
 * xxxxxxx_4  日期
 */

const fs = require('fs');
const nodejs = require("@hai2007/nodejs");

const list = {
    "140100-太原市": ['taiyuan', 'Taiyuan', '太原'],
    "140200-大同市": ['datong', 'Datong', '大同'],
    "140300-阳泉市": ['yangquan', 'Yangquan', '阳泉'],
    "140400-长治市": ['cih', 'Cih', '长治'],
    "140500-晋城市": ['jincheng', 'Jincheng', '晋城'],
    "140600-朔州市": ['shuozhou', 'Shuozhou', '朔州'],
    "140700-晋中市": ['jinzhong', 'Jinzhong', '晋中'],
    "140800-运城市": ['yuncheng', 'Yuncheng', '运城'],
    "140900-忻州市": ['xinzhou', 'Xinzhou', '忻州'],
    "141000-临汾市": ['linfen', 'Linfen', '临汾'],
    "141100-吕梁市": ['lvliang', 'Lvliang', '吕梁'],
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
