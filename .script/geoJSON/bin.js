/**
 * xxxxxxx_1  小写
 * xxxxxxx_2  大写
 * xxxxxxx_3  中文
 * xxxxxxx_4  日期
 */

const fs = require('fs');
const nodejs = require("@hai2007/nodejs");

const list = {
    '440100-广州市': ['', 'Guangzhou', '广州'],
    '440200-韶关市': ['', 'Shaoguan', '韶关'],
    '440300-深圳市': ['', 'Shenzhen', '深圳'],
    '440400-珠海市': ['', 'Zhuhai', '珠海'],
    '440500-汕头市': ['', 'Shantou', '汕头'],
    '440600-佛山市': ['', 'Foshan', '佛山'],
    '440700-江门市': ['', 'Jiangmen', '江门'],
    '440800-湛江市': ['', 'Zhanjiang', '湛江'],
    '440900-茂名市': ['', 'Maoming', '茂名'],
    '441200-肇庆市': ['', 'Zhaoqing', '肇庆'],
    '441300-惠州市': ['', 'Huizhou', '惠州'],
    '441400-梅州市': ['', 'Meizhou', '梅州'],
    '441500-汕尾市': ['', 'Shanwei', '汕尾'],
    '441600-河源市': ['', 'Heyuan', '河源'],
    '441700-阳江市': ['', 'Yangjiang', '阳江'],
    '441800-清远市': ['', 'Qingyuan', '清远'],
    '441900-东莞市': ['', 'Dongguan', '东莞'],
    '442000-中山市': ['', 'Zhongshan', '中山'],
    '445100-潮州市': ['', 'Chaozhou', '潮州'],
    '445200-揭阳市': ['', 'Jieyang', '揭阳'],
    '445300-云浮市': ['', 'Yunfu', '云浮'],
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
