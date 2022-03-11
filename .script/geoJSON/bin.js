/**
 * xxxxxxx_1  小写
 * xxxxxxx_2  大写
 * xxxxxxx_3  中文
 * xxxxxxx_4  日期
 */

const fs = require('fs');
const nodejs = require("@hai2007/nodejs");

const list = {
    "340100-合肥市": ['hefei', 'Hefei', '合肥'],
    "340200-芜湖市": ['wuhu', 'Wuhu', '芜湖'],
    "340300-蚌埠市": ['bengbu', 'Bengbu', '蚌埠'],
    "340400-淮南市": ['huainan', 'Huainan', '淮南'],
    "340500-马鞍山市": ['maonshan', 'Maonshan', '马鞍山'],
    "340600-淮北市": ['huaibei', 'Huaibei', '淮北'],
    "340700-铜陵市": ['tongling', 'Tongling', '铜陵'],
    "340800-安庆市": ['anqing', 'Anqing', '安庆'],
    "341000-黄山市": ['huangshan', 'Huangshan', '黄山'],
    "341100-滁州市": ['chuzhou', 'Chuzhou', '滁州'],
    "341200-阜阳市": ['fuyang', 'Fuyang', '阜阳'],
    "341300-宿州市": ['suzhou-city', 'SuzhouCity', '宿州'],
    "341500-六安市": ['luan', 'Luan', '六安'],
    "341600-亳州市": ['bozhou', 'Bozhou', '亳州'],
    "341700-池州市": ['chizhou', 'Chizhou', '池州'],
    "341800-宣城市": ['xuancheng', 'Xuancheng', '宣城'],
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
