import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Button} from 'element-react'; //导入element-ui库
import {Layout} from 'element-react'
import {Carousel} from 'element-react'
import {Table} from 'element-react'
import 'element-theme-default' //导入element-ui默认主题

import './TopPage.css'

require('es6-promise').polyfill();
require('isomorphic-fetch');

import banner from '../../../static/imgs/banner.jpg'
class TopPage extends React.Component {

    constructor(props){
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
                <Layout.Row>
                    <Layout.Col span="24">
                        <div className="grid-content bg-purple">
                            <div className="demo-1 small">
                                <div className="block">
                                    <Carousel height="150px">
                                        {
                                            [1,2,3,4].map((item, index) => {
                                                return (
                                                    <Carousel.Item key={index}>
                                                        <img src={banner} alt={"稍等片刻"}></img>
                                                    </Carousel.Item>
                                                )
                                            })
                                        }
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    </Layout.Col>
                </Layout.Row>
            </div>
        )
    }

}

export default TopPage

