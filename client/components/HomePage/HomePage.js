import React from 'react'
import {Layout,Button, Table, Icon, Tag, Dialog, Form, Input} from 'element-react'

import 'element-theme-default' //导入element-ui默认主题

import './HomePage.css'

require('es6-promise').polyfill();
require('isomorphic-fetch');
const moment = require('moment');
import banner from '../../../static/imgs/banner.jpg'
import axios from "axios/index";
export default class HomePage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            columns: [
                {
                    type: 'index'
                },
                {
                    label: "标题",
                    prop: "title",
                    width: 320,
                    render: function (data) {
                        return (
                            <span>
            <span style={{marginLeft: '10px'}}>{data.title}</span>
          </span>)
                    }
                },
                {
                    label: "类别",
                    prop: "category",
                    width: 100,
                    render: function (data) {
                        return <Tag>{data.category}</Tag>
                    }
                },
                {
                    label: "创建人",
                    prop: "create_user",
                    width: 120,
                    render: function (data) {
                        return (
                            <span>
            <span style={{marginLeft: '10px'}}>{data.create_user}</span>
          </span>)
                    }
                },
                {
                    label: "创建时间",
                    prop: "create_time",
                    width: 200,
                    render: function (data) {
                        return (
                            <span>
            <Icon name="time"/>
            <span style={{marginLeft: '10px'}}>{moment(data.create_time).format('YYYY-MM-DD HH:mm:ss')}</span>
          </span>)
                    }
                },
                {
                    label: "操作",
                    prop: "address",
                    width: 140,
                    render: function () {
                        return (
                            <span>
             <Button plain={true} type="info" size="small">编辑</Button>
             <Button type="danger" size="small">删除</Button>
            </span>
                        )
                    }
                }
            ],
            data: [],
            addIssuesDialogVisible: false,
            issuesForm: {
            }
        }

    }
    onSubmit(e) {
        this.setState({
            addIssuesDialogVisible: false
        });

        console.log("vvv："+this.state.issuesForm);

        axios.post('/api/addIssue', {
            data: this.state.issuesForm

        }).then((res) => {
            console.log("res:" + res)
        }).catch((err) => {
            console.log("res:" + err)
        })
        e.preventDefault();
    }

    onChange(key, value) {
        this.state.issuesForm[key] = value;
        this.forceUpdate();
    }

    addIssue(){
        this.setState({
            addIssuesDialogVisible: true
        });
    }
    //查询数据,列表显示用
    queryIssueInfo() {
        //向后端请求数据
        axios.get('/api/getIssueInfo', {
            params: {
                //ID: 12345
            }
        }).then((res) => {
            this.setState({
                data: res.data.data
            }, () => {
                console.log(this.state.data);
            });
        }).catch((error) => {
            console.log("error:" + error)
        });
    }
    render() {

        return (
            <div>
                <Layout.Row>
                    <Button onClick={() => this.addIssue()} type="primary" icon="edit"></Button>
                    <Button onClick={() => this.queryIssueInfo()} type="primary" icon="search"></Button>
                    <Layout.Col span="24">
                        <div className="grid-content bg-purple-light">
                            <Table
                                style={{width: '100%'}}
                                columns={this.state.columns}
                                data={this.state.data}
                                border={true}
                                height={800}
                                width={1000}
                                highlightCurrentRow={true}
                                onCurrentChange={item => {
                                    console.log(item)
                                }}


                            />
                        </div>
                    </Layout.Col>
                </Layout.Row>

                {/*新增issues对话框*/}
                <Dialog
                    title="新增"
                    visible={this.state.addIssuesDialogVisible}
                    onCancel={() => this.setState({addIssuesDialogVisible: false})}
                >
                    <Dialog.Body>
                        <Form model={this.state.issuesForm}>
                            <Form.Item label="标题" labelWidth="120" model={this.state.issuesForm}
                                       onSubmit={this.onSubmit.bind(this)}>
                                <Input value={this.state.issuesForm.title} onChange={this.onChange.bind(this, 'title')}/>
                            </Form.Item>
                            <Form.Item label="类别" labelWidth="120" model={this.state.issuesForm}
                                       onSubmit={this.onSubmit.bind(this)}>
                                <Input value={this.state.issuesForm.category}
                                       onChange={this.onChange.bind(this, 'category')}/>
                            </Form.Item>
                            <Form.Item label="内容" labelWidth="120" model={this.state.issuesForm}
                                       onSubmit={this.onSubmit.bind(this)}>
                                <Input value={this.state.issuesForm.content}
                                       onChange={this.onChange.bind(this, 'content')}/>
                            </Form.Item>
                            <Form.Item label="创建人" labelWidth="120">
                                <Input value={this.state.issuesForm.create_user}
                                       onChange={this.onChange.bind(this, 'create_user')}/>
                            </Form.Item>
                        </Form>
                    </Dialog.Body>

                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={() => this.setState({addIssuesDialogVisible: false})}>取 消</Button>
                        <Button type="primary" nativeType="submit" onClick={this.onSubmit.bind(this)}>确 定</Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        )
    }

}



