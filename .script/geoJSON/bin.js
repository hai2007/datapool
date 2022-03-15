/**
 * xxxxxxx_1  小写
 * xxxxxxx_2  大写
 * xxxxxxx_3  中文
 * xxxxxxx_4  日期
 */

const fs = require('fs');
const nodejs = require("@hai2007/nodejs");

const list = {
    '430100-长沙市': ['', 'Changsha', '长沙'],
    '430200-株洲市': ['', 'Zhuzhou', '株洲'],
    '430300-湘潭市': ['', 'Xiangtan', '湘潭'],
    '430400-衡阳市': ['', 'Hengyang', '衡阳'],
    '430500-邵阳市': ['', 'Shaoyang', '邵阳'],
    '430600-岳阳市': ['', 'Yueyang', '岳阳'],
    '430700-常德市': ['', 'Changde', '常德'],
    '430800-张家界市': ['', 'Zhangjiajie', '张家界'],
    '430900-益阳市': ['', 'Yiyang', '益阳'],
    '431000-郴州市': ['', 'Chenzhou', '郴州'],
    '431100-永州市': ['', 'Yongzhou', '永州'],
    '431200-怀化市': ['', 'Huaihua', '怀化'],
    '431300-娄底市': ['', 'Loudi', '娄底'],
    '433100-湘西土家族苗族自治州': ['', 'Xiangxitjzmzzzz', '湘西土家族苗族自治州']
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
