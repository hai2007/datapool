/**
 * xxxxxxx_1  小写
 * xxxxxxx_2  大写
 * xxxxxxx_3  中文
 * xxxxxxx_4  日期
 */

 const fs = require('fs');
 const nodejs = require("@hai2007/nodejs");

 const list = {
    '370100-济南市': ['jinan', 'Jinan', '济南'],
    '370200-青岛市': ['qingdao', 'Qingdao', '青岛'],
    '370300-淄博市': ['zibo', 'Zibo', '淄博'],
    '370400-枣庄市': ['zaozhuang', 'Zaozhuang', '枣庄'],
    '370500-东营市': ['doy', 'Doy', '东营'],
    '370600-烟台市': ['yantai', 'Yantai', '烟台'],
    '370700-潍坊市': ['weifang', 'Weifang', '潍坊'],
    '370800-济宁市': ['jining', 'Jining', '济宁'],
    '370900-泰安市': ['taian', 'Taian', '泰安'],
    '371000-威海市': ['weihai', 'Weihai', '威海'],
    '371100-日照市': ['rizhao', 'Rizhao', '日照'],
    '371300-临沂市': ['linyi', 'Linyi', '临沂'],
    '371400-德州市': ['texas', 'Texas', '德州'],
    '371500-聊城市': ['liaocheng', 'Liaocheng', '聊城'],
    '371600-滨州市': ['binzhou', 'Binzhou', '滨州'],
    '371700-菏泽市': ['heze', 'Heze', '菏泽'],
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
