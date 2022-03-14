const fs = require('fs');

let src = 'C:\/Users\/yelloxing\/Desktop\/chinaGeoJson-master\/city\/';
// let src = '../chinaGeoJson-master/city/';

const subFiles = fs.readdirSync(src);
for (let file of subFiles) {

    console.log("'" + (file.replace('.json', '')) + "': ['', '', ''],");

}
