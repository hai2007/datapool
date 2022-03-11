/**
 * xxxxxxx_1  小写
 * xxxxxxx_2  大写
 * xxxxxxx_3  中文
 * xxxxxxx_4  日期
 */

const fs = require('fs');
const nodejs = require("@hai2007/nodejs");

const list = {
    "130100-石家庄市": ['shijiazhuang', 'Shijiazhuang', '石家庄'],
    "130200-唐山市": ['tangshan', 'Tangshan', '唐山'],
    "130300-秦皇岛市": ['qinghuangdao', 'Qinghuangdao', '秦皇岛'],
    "130400-邯郸市": ['handan', 'Handan', '邯郸'],
    "130500-邢台市": ['xingtai', 'Xingtai', '邢台'],
    "130600-保定市": ['baoding', 'Baoding', '保定'],
    "130700-张家口市": ['zhangjiakou', 'Zhangjiakou', '张家口'],
    "130800-承德市": ['chengde', 'Chengde', '承德'],
    "130900-沧州市": ['cangzhou', 'Cangzhou', '沧州'],
    "131000-廊坊市": ['langfang', 'Langfang', '廊坊'],
    "131100-衡水市": ['hengshui', 'Hengshui', '衡水'],
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
