/**
 * xxxxxxx_1  小写
 * xxxxxxx_2  大写
 * xxxxxxx_3  中文
 * xxxxxxx_4  日期
 */

const fs = require('fs');
const nodejs = require("@hai2007/nodejs");

const list = {
    '410100-郑州市': ['', 'Zhengzhou', '郑州'],
    '410200-开封市': ['', 'Kaifeng', '开封'],
    '410300-洛阳市': ['', 'Luoyang', '洛阳'],
    '410400-平顶山市': ['', 'Pingdingshan', '平顶山'],
    '410500-安阳市': ['', 'Anyang', '安阳'],
    '410600-鹤壁市': ['', 'Hebi', '鹤壁'],
    '410700-新乡市': ['', 'Xinxiang', '新乡'],
    '410800-焦作市': ['', 'Jiaozuo', '焦作'],
    '410900-濮阳市': ['', 'Puyang', '濮阳'],
    '411000-许昌市': ['', 'Xuchang', '许昌'],
    '411100-漯河市': ['', 'Luohe', '漯河'],
    '411200-三门峡市': ['', 'Sanmenxia', '三门峡'],
    '411300-南阳市': ['', 'Nanyang', '南阳'],
    '411400-商丘市': ['', 'Shangqiu', '商丘'],
    '411500-信阳市': ['', 'Xinyang', '信阳'],
    '411600-周口市': ['', 'Zhoukou', '周口'],
    '411700-驻马店市': ['', 'Zhumadian', '驻马店'],
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
