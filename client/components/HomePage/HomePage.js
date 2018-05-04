import React from 'react'
import {Layout,Button, Table, Icon, Tag, Dialog, Form, Select,Input} from 'element-react'

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
            /**
             * form表单校验规则
             */
            rules: {
                title: [
                    {required: true, message: '请输入标题', trigger: 'blur'}
                ],
                category: [
                    {required: true, message: '请选择类别', trigger: 'change'}
                ],
                content: [
                    {required: true, message: '请输入内容', trigger: 'change'}
                ],
            },
            data: [], //issue数据
            addIssuesDialogVisible: false,
            issuesForm: {
            },
            categoryValue: [],
            categoryOptions:[],//类别下拉框选项数据
        }

    }

    componentDidMount() {
        console.log('Component DID MOUNT!')
        //向后端请求类型名称数据
        axios.get('/api/getAllCategoryName', {
            params: {
                //ID: 12345
            }
        }).then((res) => {
            this.setState({
                categoryOptions: res.data.data
            }, () => {
                console.log(res.data.data);
            });
        }).catch((error) => {
            console.log("error:" + error)
        });
    }

    /**
     * 表单提交
     * */

    onSubmit(e) {
        /**
         * 验证表单规则
         * */
        this.refs.issueForm.validate((valid) => {
            if (valid) {
                this.setState({
                    addIssuesDialogVisible: false
                });
                axios.post('/api/addIssue', {
                    data: this.state.issuesForm

                }).then((res) => {
                    console.log("res:" + res)
                }).catch((err) => {
                    console.log("res:" + err)
                })
            } else {
                console.log('表单校验不通过');
                return false;
            }
        });
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
                        <Form ref="issueForm" model={this.state.issuesForm} rules={this.state.rules}>
                            <Form.Item label="标题" labelWidth="120" prop="title" model={this.state.issuesForm}
                                       onSubmit={this.onSubmit.bind(this)}>
                                <Input value={this.state.issuesForm.title} onChange={this.onChange.bind(this, 'title')}/>
                            </Form.Item>
                            <Layout.Row>
                                <Layout.Col span="12"><div className="grid-content bg-purple">
                                    <Form.Item label="类别" labelWidth="120" prop="category" model={this.state.issuesForm}
                                               onSubmit={this.onSubmit.bind(this)}>
                                        <Select value={this.state.issuesForm.category} filterable={true} onChange={this.onChange.bind(this, 'category')}>
                                            {
                                                this.state.categoryOptions.map(el => {
                                                    return <Select.Option key={el.name} label={el.name} value={el.name} />
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                </div></Layout.Col>
                                <Layout.Col span="12"><div className="grid-content bg-purple-light">
                                    <Form.Item label="创建人" labelWidth="120">
                                        <Input value={this.state.issuesForm.create_user}
                                               onChange={this.onChange.bind(this, 'create_user')}/>
                                    </Form.Item>
                                </div></Layout.Col>
                            </Layout.Row>


                            <Form.Item label="内容" labelWidth="120" prop="content" model={this.state.issuesForm}
                                       onSubmit={this.onSubmit.bind(this)}>
                                <Input
                                    type="textarea"
                                    autosize={{ minRows: 6, maxRows: 10}}
                                    placeholder="请输入内容"
                                    value={this.state.issuesForm.content}
                                    onChange={this.onChange.bind(this, 'content')}
                                />
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



