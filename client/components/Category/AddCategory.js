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
                    width: 220,
                    render: (row, column, index) => {
                        return (
                            <span>
                                 <Button plain={true} type="info" size="small" onClick={this.viewRow.bind(this, index,row)}>查看</Button>
                                 <Button plain={true} type="info" size="small" onClick={this.editRow.bind(this, index,row)}>编辑</Button>
                                 <Button type="danger" size="small" onClick={this.deleteRow.bind(this, index,row)}>删除</Button>
                            </span>
                        )
                    }
                }
            ],
            data: [],
            addDialogVisible: false,
            categoryForm: {
            },
            /**
             * form表单校验规则
             */
            rules: {
                name: [
                    {required: true, message: '请输入类别名称', trigger: 'blur'}
                ],
                create_user: [
                    {required: true, message: '请输入创建人', trigger: 'blur'}
                ],
            },
        }
    }


    onSubmit(e) {

        /**
         * 验证表单规则
         * */
        this.refs.categoryForm.validate((valid) => {
            if (valid) {
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
            } else {
                console.log('表单校验不通过');
                return false;
            }
        });

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

            });
        }).catch((error) => {
            console.log("error:" + error)
        });
    }

    /**
     * 查看
     */
    viewRow(index,row){
        console.log("edit_index"+row.id)
        console.log("edit_index"+row.name)
    }
    /**
     * 编辑方法
     **/
    editRow(index,row){
        console.log("edit_index"+row.id)
        console.log("edit_index"+row.name)
    }
    /**
     * 删除行
     * */
    deleteRow(index,row){
        //请求删除接口
        axios.get('/api/deleteCategoryById', {
            params: {
                id:row.id,
            }
        }).then((res) => {
            const { data } = this.state;
            data.splice(index, 1); //从数组中删除一个元素
            this.setState({
                data: [...data]
            });
        }).catch((error) => {
            console.log("error:" + error)
        });

    }

    render() {
        return (
            <div>
                <Button className="action-btn" type="primary" onClick={() => this.add()}>新建</Button>
                <Button className="action-btn" type="primary" onClick={() => this.query()}>查询</Button>
                <Table
                    style={{width: '100%'}}
                    columns={this.state.columns}
                    data={this.state.data}
                    border={true}
                    height={600}
                    width={800}
                    highlightCurrentRow={true}
                />

                {/*新增类别对话框*/}
                <Dialog
                    title="新增类别"
                    visible={this.state.addDialogVisible}
                    onCancel={() => this.setState({addDialogVisible: false})}
                >
                    <Dialog.Body>
                        <Form ref="categoryForm" model={this.state.categoryForm} rules={this.state.rules}>
                            <Form.Item label="类别名称" labelWidth="120" model={this.state.categoryForm} prop="name"
                                       onSubmit={this.onSubmit.bind(this)}>
                                <Input value={this.state.categoryForm.name}
                                       onChange={this.onChange.bind(this, 'name')}/>
                            </Form.Item>
                            <Form.Item label="创建人" labelWidth="120"  prop="create_user">
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
