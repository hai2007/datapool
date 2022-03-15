/**
 * xxxxxxx_1  小写
 * xxxxxxx_2  大写
 * xxxxxxx_3  中文
 * xxxxxxx_4  日期
 */

const fs = require('fs');
const nodejs = require("@hai2007/nodejs");

const list = {
    '510100-成都市': ['', 'Chengdu', '成都'],
    '510300-自贡市': ['', 'Zigong', '自贡'],
    '510400-攀枝花市': ['', 'Panzhihua', '攀枝花'],
    '510500-泸州市': ['', 'Luzhou', '泸州'],
    '510600-德阳市': ['', 'Deyang', '德阳'],
    '510700-绵阳市': ['', 'Mianyang', '绵阳'],
    '510800-广元市': ['', 'Guangyuan', '广元'],
    '510900-遂宁市': ['', 'Suining', '遂宁'],
    '511000-内江市': ['', 'Neijiang', '内江'],
    '511100-乐山市': ['', 'Leshan', '乐山'],
    '511300-南充市': ['', 'Nao', '南充'],
    '511400-眉山市': ['', 'Meishan', '眉山'],
    '511500-宜宾市': ['', 'Yibin', '宜宾'],
    '511600-广安市': ['', 'Guangan', '广安'],
    '511700-达州市': ['', 'Dazhou', '达州'],
    '511800-雅安市': ['', 'Yaan', '雅安'],
    '511900-巴中市': ['', 'Bazhong', '巴中'],
    '512000-资阳市': ['', 'Ziyang', '资阳'],
    '513200-阿坝藏族羌族自治州': ['', 'Abazzqzzzz', '阿坝藏族羌族自治州'],
    '513300-甘孜藏族自治州': ['', 'Ganzizzzzz', '甘孜藏族自治州'],
    '513400-凉山彝族自治州': ['', 'Liangshanyzzzz', '凉山彝族自治州'],
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
