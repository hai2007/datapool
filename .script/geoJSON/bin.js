/**
 * xxxxxxx_1  小写
 * xxxxxxx_2  大写
 * xxxxxxx_3  中文
 * xxxxxxx_4  日期
 */

 const fs = require('fs');
 const nodejs = require("@hai2007/nodejs");

 const list = {
     '360100-南昌市': ['nanchang', 'Nanchang', '南昌'],
     '360200-景德镇市': ['jingdezhen', 'Jingdezhen', '景德镇'],
     '360300-萍乡市': ['pingxiang', 'Pingxiang', '萍乡'],
     '360400-九江市': ['jiujiang', 'Jiujiang', '九江'],
     '360500-新余市': ['xinyu', 'Xinyu', '新余'],
     '360600-鹰潭市': ['yingtan', 'Yingtan', '鹰潭'],
     '360700-赣州市': ['ganzhou', 'Ganzhou', '赣州'],
     '360800-吉安市': ['jian', 'Jian', '吉安'],
     '360900-宜春市': ['yichun-city', 'YichunCity', '宜春'],
     '361000-抚州市': ['fuzhou-city', 'FuzhouCity', '抚州'],
     '361100-上饶市': ['shangrao', 'Shangrao', '上饶'],
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
