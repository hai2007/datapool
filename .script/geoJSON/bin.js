/**
 * xxxxxxx_1  小写
 * xxxxxxx_2  大写
 * xxxxxxx_3  中文
 * xxxxxxx_4  日期
 */

const fs = require('fs');
const nodejs = require("@hai2007/nodejs");

const list = {
    '420100-武汉市': ['', 'Wuhan', '武汉'],
    '420200-黄石市': ['', 'Yellowstone', '黄石'],
    '420300-十堰市': ['', 'Shiyan', '十堰'],
    '420500-宜昌市': ['', 'Yichang', '宜昌'],
    '420600-襄阳市': ['', 'Xiangyang', '襄阳'],
    '420700-鄂州市': ['', 'Ezhou', '鄂州'],
    '420800-荆门市': ['', 'Jingmen', '荆门'],
    '420900-孝感市': ['', 'Xiaogan', '孝感'],
    '421000-荆州市': ['', 'Jingzhou', '荆州'],
    '421100-黄冈市': ['', 'Huanggang', '黄冈'],
    '421200-咸宁市': ['', 'Xianning', '咸宁'],
    '421300-随州市': ['', 'Suizhou', '随州'],
    '422800-恩施土家族苗族自治州': ['', 'Enshitjzmzzzz', '恩施土家族苗族自治州'],

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
