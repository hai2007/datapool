import { Component } from 'nefbl'

import style from './index.scss'
import template from './index.html'

import Clunch from 'clunch'
import map from '@clunch/map/index'

Clunch.series('ui-map', map)

import image from './index.clunch'

// 中国省地图数据
// import mapGeoJSON from '../../china.geoJSON/china.geoJSON.js'

// 香港区地图数据
import mapGeoJSON from '../../HK.geoJSON/hk.geoJSON.js'

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
