import React from "react";
import {Button, Table, Icon, Tag, Dialog, Form, Input} from 'element-react'

import './addCategory.css'
import axios from 'axios'
const moment = require('moment')
class AddCategory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {
                    type: 'index'
                },
                {
                    label: "添加日期",
                    prop: "date",
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
                    label: "类别名称",
                    prop: "name",
                    width: 100,
                    render: function (data) {
                        return <Tag>{data.name}</Tag>
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
            addDialogVisible: false,
            categoryForm: {
            }
        }
    }

    onSubmit(e) {
        this.setState({
            addDialogVisible: false
        });
        axios.post('/api/addCategoryInfo', {
            data: {
                category_name: this.state.categoryForm.name,
                create_user: this.state.categoryForm.create_user,
            }
        }).then((res) => {
            console.log("res:" + res)
        }).catch((err) => {
            console.log("res:" + err)
        })


        e.preventDefault();
    }

    onChange(key, value) {
        this.state.categoryForm[key] = value;
        this.forceUpdate();
    }

    add() {
        this.setState({
            addDialogVisible: true
        });
    }

    //查询数据,列表显示用
    query() {
        //向后端请求数据
        axios.get('/api/getCategoryInfo', {
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
                <Button type="primary" onClick={() => this.add()}>新建</Button>
                <Button type="primary" onClick={() => this.query()}>查询</Button>
                <Table
                    style={{width: '100%'}}
                    columns={this.state.columns}
                    data={this.state.data}
                    border={true}
                    height={600}
                    width={800}
                    highlightCurrentRow={true}
                    onCurrentChange={item => {
                        console.log(item)
                    }}
                />

                {/*新增类别对话框*/}
                <Dialog
                    title="新增类别"
                    visible={this.state.addDialogVisible}
                    onCancel={() => this.setState({addDialogVisible: false})}
                >
                    <Dialog.Body>
                        <Form model={this.state.categoryForm}>
                            <Form.Item label="类别名称" labelWidth="120" model={this.state.categoryForm}
                                       onSubmit={this.onSubmit.bind(this)}>
                                <Input value={this.state.categoryForm.name}
                                       onChange={this.onChange.bind(this, 'name')}/>
                            </Form.Item>
                            <Form.Item label="创建人" labelWidth="120">
                                <Input value={this.state.categoryForm.create_user}
                                       onChange={this.onChange.bind(this, 'create_user')}/>
                            </Form.Item>
                        </Form>
                    </Dialog.Body>

                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={() => this.setState({addDialogVisible: false})}>取 消</Button>
                        <Button type="primary" nativeType="submit" onClick={this.onSubmit.bind(this)}>确 定</Button>
                    </Dialog.Footer>
                </Dialog>

            </div>
        )
    }

}

export default AddCategory
