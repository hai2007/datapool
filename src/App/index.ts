import { Component } from 'nefbl'

import style from './index.scss'
import template from './index.html'

import Clunch from 'clunch'
import map from '@clunch/map/index'

Clunch.series('ui-map', map)

import image from './index.clunch'

// 中国地图数据
// import mapGeoJSON from '../../china.geoJSON/china.geoJSON.js'

// 香港地图数据
// import mapGeoJSON from '../../HK.geoJSON/hk.geoJSON.js'

// 澳门地图数据
// import mapGeoJSON from '../../Macao.geoJSON/macao.geoJSON.js'

// 台湾地图数据
// import mapGeoJSON from '../../Taiwan.geoJSON/taiwan.geoJSON.js'

// 北京地图数据
// import mapGeoJSON from '../../Beijing.geoJSON/beijing.geoJSON.js'

// 江苏地图数据
// import mapGeoJSON from '../../Jiangsu.geoJSON/jiangsu.geoJSON.js'

// 安徽地图数据
// import mapGeoJSON from '../../Anhui.geoJSON/anhui.geoJSON.js'

// 南京地图数据
// import mapGeoJSON from '../../Nanjing.geoJSON/nanjing.geoJSON.js'

// 天津地图数据
// import mapGeoJSON from '../../Tianjin.geoJSON/tianjin.geoJSON.js'

// 西藏地图数据
// import mapGeoJSON from '../../Tibet.geoJSON/tibet.geoJSON.js'

// 雨花台区地图数据
// import mapGeoJSON from '../../Yuhuatai.geoJSON/yuhuatai.geoJSON.js'

// 建邺区地图数据
import mapGeoJSON from '../../Jianye.geoJSON/jianye.geoJSON.js'

@Component({
    selector: "app-root",
    template,
    styles: [style]
})
export default class {

    $mounted() {

        new Clunch({
            el: document.getElementById('canvas'),
            render: image,
            data() {
                return {
                    mapGeoJSON
                }
            }
        })

    }

}
