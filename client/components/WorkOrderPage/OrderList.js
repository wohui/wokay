import React from 'react'
import {Button, Dialog, Form, Icon, Input, Layout, Select, Table, Tag} from 'element-react'

import 'element-theme-default' //导入element-ui默认主题
import './OrderList.css'
import axios from "axios/index";

require('es6-promise').polyfill();
require('isomorphic-fetch');
const moment = require('moment');

export default class OrderList extends React.Component {

    constructor(props) {
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
                    label: "发起人",
                    prop: "start_by",
                    width: 100,
                    render: function (data) {
                        return <Tag>{data.start_by}</Tag>
                    }
                },
                {
                    label: "归属系统",
                    prop: "fcar_module",
                    width: 100,
                    render: function (data) {
                        return <Tag>{data.fcar_module}</Tag>
                    }
                },
                {
                    label: "是否分配",
                    prop: "is_assigned",
                    width: 100,
                    render: function (data) {
                        return <Tag>{data.is_assigned}</Tag>
                    }
                },

                {
                    label: "分配时间",
                    prop: "assigned_time",
                    width: 100,
                    render: function (data) {
                        return <Tag>{data.assigned_time}</Tag>
                    }
                },

                {
                    label: "是否Bug",
                    prop: "is_fcar_bug",
                    width: 100,
                    render: function (data) {
                        return <Tag>{data.is_fcar_bug}</Tag>
                    }
                },
                {
                    label: "解决人",
                    prop: "solve_name",
                    width: 100,
                    render: function (data) {
                        return <Tag>{data.solve_name}</Tag>
                    }
                },
                {
                    label: "解决时间",
                    prop: "solve_time",
                    width: 200,
                    render: function (data) {
                        return (
                            <span>
            <Icon name="time"/>
            <span style={{marginLeft: '10px'}}>{moment(data.solve_time).format('YYYY-MM-DD HH:mm:ss')}</span>

          </span>)
                    }
                },

                {
                    label: "测试人员",
                    prop: "tester",
                    width: 100,
                    render: function (data) {
                        return <Tag>{data.tester}</Tag>
                    }
                },
                {
                    label: "解决结果",
                    prop: "solved_result",
                    width: 100,
                    render: function (data) {
                        return <Tag>{data.solved_result}</Tag>
                    }
                },
                {
                    label: "备注分析",
                    prop: "note",
                    width: 100,
                    render: function (data) {
                        return <Tag>{data.note}</Tag>
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
                    label: "修改时间",
                    prop: "modify_time",
                    width: 200,
                    render: function (data) {
                        return (
                            <span>
            <Icon name="time"/>
            <span style={{marginLeft: '10px'}}>{moment(data.modify_time).format('YYYY-MM-DD HH:mm:ss')}</span>

          </span>)
                    }
                },
                {
                    label: "操作",
                    prop: "address",
                    width: 210,
                    render: (row, column, index) => {
                        return (
                            <span>
                                <Button plain={true} type="info" size="small"
                                        onClick={this.viewRow.bind(this, index, row)}>查看</Button>
                                <Button plain={true} type="info" size="small"
                                        onClick={this.editRow.bind(this, index, row)}>编辑</Button>
                                <Button type="danger" size="small"
                                        onClick={this.deleteRow.bind(this, index, row)}>删除</Button>
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
                solved_result: [
                    {required: true, message: '请选择解决结果', trigger: 'change'}
                ],
                tester: [
                    {required: true, message: '请填写测试人员', trigger: 'change'}
                ],
            },
            data: [], //
            workOrderDialogVisible: false,
            workOrderFormTitle: "",
            workOrderFormType: 0, //提交类型,0-add 1-修改 2 -查看
            formItemDisabled: false,//控制表单是否可编辑
            workOrderForm: {},//待提交表单数据
            categoryValue: [],
            //是否分配选项
            isAssignedOptions: [{
                value: 0,
                label: '未分配'
            }, {
                value: 1,
                label: '已分配'
            }
            ],

            //解决状态
            solvedResultOptions: [
                {
                    value: '0',
                    label: '未解决',
                },
                {
                    value: '1',
                    label: '正在解决',
                },
                {
                    value: '2',
                    label: '已解决',
                },
            ]


        }

    }

    componentWillMount() {

    }

    componentDidMount() {
        //向后端请求类型名称数据

        // axios.get('/api/getAllCategoryName', {
        //     params: {
        //         //ID: 12345
        //     }
        // }).then((res) => {
        //     this.setState({
        //         categoryOptions: res.data.data
        //     }, () => {
        //         console.log(res.data.data);
        //     });
        // }).catch((error) => {
        //     console.log("error:" + error)
        // });
    }

    /**
     * 表单提交
     * */

    onSubmit(e) {
        /**
         * 验证表单规则
         * */
        console.log("type" + this.state.workOrderFormType)
        if (0 == this.state.workOrderFormType) { //新增
            this.refs.workOrderForm.validate((valid) => {
                if (valid) {
                    axios.post('/api/addWorkOrder', {
                        data: this.state.workOrderForm

                    }).then((res) => {
                        this.setState({
                            workOrderDialogVisible: false
                        });
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
        } else { //更新
            this.refs.workOrderForm.validate((valid) => {
                if (valid) {
                    axios.post('/api/updateWorkOrder', {
                        data: this.state.workOrderForm
                    }).then((res) => {
                        this.setState({
                            workOrderDialogVisible: false
                        });
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

    }

    onCancel(e) {
        //console.log("onCancelData" + this.state.data.toString());
        this.queryWorkOrderInfo();
        this.setState({
            workOrderDialogVisible: false,

        });
    }

    onChange(key, value) {
        this.state.workOrderForm[key] = value;
        this.forceUpdate();
    }

    addWorkOrder() {
        this.refs.workOrderForm.resetFields();
        this.setState({
            workOrderFormTitle: "新增工单",
            workOrderFormType: 0,
            workOrderForm: {},
            formItemDisabled: false,
            workOrderDialogVisible: true,
        });
    }

    //查询数据,列表显示用
    queryWorkOrderInfo() {
        //向后端请求数据
        axios.get('/api/getWorkOrderInfo', {
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

    /**
     * 查看
     */
    viewRow(index, row) {
        this.refs.workOrderForm.resetFields();
        this.setState({
            workOrderFormTitle: "查看详情",
            workOrderForm: row,
            workOrderFormType: 2,
            formItemDisabled: true,
            workOrderDialogVisible: true,
        });

    }

    /**
     * 编辑方法
     **/

    editRow(index, row) {
        this.refs.workOrderForm.resetFields();
        this.setState({
            workOrderFormTitle: "编辑",
            workOrderFormType: 1,
            workOrderForm: row,
            formItemDisabled: false,
            workOrderDialogVisible: true,
        });


    }

    /**
     * 删除行
     * */
    deleteRow(index, row) {
        //向后端请求删除
        axios.get('/api/deleteWorkOrder', {
            params: {
                id: row.id
            }
        }).then((res) => {
            //删除成功后,页面上不显示
            const {data} = this.state;
            data.splice(index, 1); //从数组中删除一个元素
            this.setState({
                data: [...data]
            })
        }).catch((error) => {
            console.log("error:" + error)
        });

    }

    render() {
        return (

            <div className="main">
                <Layout.Row>
                    <Button className="icon-btn" onClick={() => this.addWorkOrder()} type="primary"
                            icon="edit"></Button>
                    <Button className="icon-btn" onClick={() => this.queryWorkOrderInfo()} type="primary"
                            icon="search"></Button>
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
                            />
                        </div>
                    </Layout.Col>
                </Layout.Row>

                {/*新增workOrder对话框*/}
                <Dialog
                    title={this.state.workOrderFormTitle}
                    visible={this.state.workOrderDialogVisible}
                    onCancel={() => this.setState({workOrderDialogVisible: false})}
                >
                    <Dialog.Body>
                        <Form ref="workOrderForm" model={this.state.workOrderForm} rules={this.state.rules}>
                            <Form.Item label="标题" labelWidth="120" prop="title" model={this.state.workOrderForm}
                                       onSubmit={this.onSubmit.bind(this)}>
                                <Input value={this.state.workOrderForm.title} disabled={this.state.formItemDisabled}
                                       onChange={this.onChange.bind(this, 'title')}/>
                            </Form.Item>
                            <Layout.Row>
                                <Layout.Col span="12">
                                    <div className="grid-content bg-purple">
                                        <Form.Item label="发起人" labelWidth="120">
                                            <Input value={this.state.workOrderForm.start_by}
                                                   disabled={this.state.formItemDisabled}
                                                   onChange={this.onChange.bind(this, 'start_by')}/>
                                        </Form.Item>
                                    </div>
                                </Layout.Col>
                                <Layout.Col span="12">
                                    <div className="grid-content bg-purple">
                                        <Form.Item label="归属系统" labelWidth="120" prop="fcar_module"
                                                   model={this.state.workOrderForm}
                                                   onSubmit={this.onSubmit.bind(this)}>
                                            <Input value={this.state.workOrderForm.fcar_module}
                                                   disabled={this.state.formItemDisabled}
                                                   onChange={this.onChange.bind(this, 'fcar_module')}/>
                                        </Form.Item>
                                    </div>
                                </Layout.Col>
                            </Layout.Row>

                            <Layout.Row>
                                <Layout.Col span="12">
                                    <div className="grid-content bg-purple">
                                        <Form.Item label="是否分配" labelWidth="120" prop="is_assigned"
                                                   model={this.state.workOrderForm}
                                                   onSubmit={this.onSubmit.bind(this)}>
                                            <Select value={this.state.workOrderForm.is_assigned}
                                                    disabled={this.state.formItemDisabled}
                                                    onChange={this.onChange.bind(this, 'is_assigned')}>
                                                {
                                                    this.state.isAssignedOptions.map(el => {
                                                        return <Select.Option key={el.value} label={el.label}
                                                                              value={el.value}/>
                                                    })
                                                }
                                            </Select>


                                        </Form.Item>
                                    </div>
                                </Layout.Col>
                                <Layout.Col span="12">
                                    <div className="grid-content bg-purple">
                                        <Form.Item label="分配时间" labelWidth="120" prop="assigned_time"
                                                   model={this.state.workOrderForm}
                                                   onSubmit={this.onSubmit.bind(this)}>
                                            <Input value={this.state.workOrderForm.assigned_time}
                                                   disabled={this.state.formItemDisabled}
                                                   onChange={this.onChange.bind(this, 'assigned_time')}/>
                                        </Form.Item>
                                    </div>
                                </Layout.Col>
                            </Layout.Row>
                            <Layout.Row>
                                <Layout.Col span="8">
                                    <div className="grid-content bg-purple">
                                        <Form.Item label="解决结果" labelWidth="120" prop="solved_result"
                                                   model={this.state.workOrderForm}
                                                   onSubmit={this.onSubmit.bind(this)}>
                                            <Select value={this.state.workOrderForm.solved_result}
                                                    disabled={this.state.formItemDisabled}
                                                    clearable={true}
                                                    onChange={this.onChange.bind(this, 'solved_result')}>
                                                {
                                                    this.state.solvedResultOptions.map((el) => {
                                                        return <Select.Option key={el.value} label={el.label}
                                                                              value={el.value}/>
                                                    })
                                                }
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </Layout.Col>
                                <Layout.Col span="8">
                                    <div className="grid-content bg-purple-light">
                                        <Form.Item label="解决人" labelWidth="120" prop="solve_name"
                                                   model={this.state.workOrderForm}
                                                   onSubmit={this.onSubmit.bind(this)}>
                                            <Input value={this.state.workOrderForm.solve_name}
                                                   disabled={this.state.formItemDisabled}
                                                   onChange={this.onChange.bind(this, 'solve_name')}/>
                                        </Form.Item>
                                    </div>
                                </Layout.Col>
                                <Layout.Col span="8">
                                    <div className="grid-content bg-purple-light">
                                        <Form.Item label="解决时间" labelWidth="120" prop="solve_time"
                                                   model={this.state.workOrderForm}
                                                   onSubmit={this.onSubmit.bind(this)}>
                                            <Input value={this.state.workOrderForm.solve_time}
                                                   disabled={this.state.formItemDisabled}
                                                   onChange={this.onChange.bind(this, 'solve_time')}/>
                                        </Form.Item>
                                    </div>
                                </Layout.Col>
                            </Layout.Row>


                            <Form.Item label="测试人员" labelWidth="120" prop="tester" model={this.state.workOrderForm}
                                       onSubmit={this.onSubmit.bind(this)}>
                                <Input value={this.state.workOrderForm.tester} disabled={this.state.formItemDisabled}
                                       onChange={this.onChange.bind(this, 'tester')}/>
                            </Form.Item>

                            <Form.Item label="备注分析" labelWidth="120" prop="note" model={this.state.workOrderForm}
                                       onSubmit={this.onSubmit.bind(this)}>
                                <Input
                                    type="textarea"
                                    autosize={{minRows: 6, maxRows: 10}}
                                    placeholder="请输入备注"
                                    disabled={this.state.formItemDisabled}
                                    value={this.state.workOrderForm.note}
                                    onChange={this.onChange.bind(this, 'note')}
                                />
                            </Form.Item>

                        </Form>
                    </Dialog.Body>

                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={this.onCancel.bind(this)}>取 消</Button>
                        <Button type="primary" nativeType="submit"
                                style={{display: this.state.formItemDisabled ? "none" : ""}}
                                onClick={this.onSubmit.bind(this)}>确 定</Button>
                    </Dialog.Footer>
                </Dialog>

            </div>
        )
    }

}



