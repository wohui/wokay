import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Button} from 'element-react'; //导入element-ui库
import {Layout} from 'element-react'
import {Carousel} from 'element-react'
import {Table} from 'element-react'
import 'element-theme-default' //导入element-ui默认主题

import './HomePage.css'

require('es6-promise').polyfill();
require('isomorphic-fetch');

import banner from '../../../static/imgs/banner.jpg'
export default class HomePage extends React.Component {

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

    } //constrautor end
    getData(dispatch)  {
        return fetch('/api/get/data.json')
            .then((response) => response.json())
            .then((json) => {
                let hasError = false;
                let text = '';

                /// /controllers/list正常返回格式{errcode:0,errmsg:'',data:[]}
                if (json.errcode !== 0) {
                    hasError = true;
                    text = json.errmsg;
                } else {
                    hasError = false;
                    text = '';
                }

                // 网络异常 如断网
                if (json.error) {
                    dispatch(list({
                        msg: strings.NET_ERROR,
                        data: []
                    }));
                }
                // 正常业务处理
                else {
                    dispatch(list({
                        msg: hasError ? text : '',
                        data: hasError ? [] : json.data
                    }));
                }
            })
            // 异常处理
            .catch((err) => {
                dispatch(list({
                    msg: (__DEBUG__ && err.message) ? err.message : strings.NET_ERROR,
                    data: []
                }));
            });
    }
    componentDidMount (){
        fetch('你的请求',{})
            .then(res => {
                this.setState({
                    data: datas,
                });
            })
            .catch(error => {

            });
    }
    componentWillUnmount () {
        this.setState = (state,callback)=>{
            return;
        };
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

                <Layout.Row>
                    <Button onClick={this.getData} type="primary" icon="edit"></Button>
                    <Layout.Col span="24">
                        <div className="grid-content bg-purple-light">
                            <Table
                                style={{width: '100%'}}
                                columns={this.state.columns}
                                maxHeight={200}
                                data={this.state.data}
                            />
                        </div>
                    </Layout.Col>
                </Layout.Row>
            </div>
        )
    }

}



