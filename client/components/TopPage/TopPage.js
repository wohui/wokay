import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Button} from 'element-react'; //导入element-ui库
import {Rate} from 'element-react'
import 'element-theme-default' //导入element-ui默认主题

import './TopPage.css'

require('es6-promise').polyfill();
require('isomorphic-fetch');

import banner from '../../../static/imgs/banner.jpg'

class TopPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    label: "日期",
                    prop: "date",
                    width: 180
                },
                {
                    label: "姓名",
                    prop: "name",
                    width: 180
                },
                {
                    label: "地址",
                    prop: "address"
                }
            ],
            data: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
        }

    }


    render() {

        return (
            <div>
                <div className="intro-block">
                    <div className="block">
                        <span className="demonstration">默认不区分颜色</span>
                        <span className="wrapper">
                            <Rate onChange={(val) => alert(val)}/>
                        </span>
                    </div>
                    <div className="block">
                        <span className="demonstration">区分颜色</span>
                        <span className="wrapper">
                        <Rate colors={['#99A9BF', '#F7BA2A', '#FF9900']}/>
                        </span>
                    </div>
                </div>
            </div>
        )
    }

}

export default TopPage

