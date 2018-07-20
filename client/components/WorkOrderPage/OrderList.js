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
                    filters: [{text: '未分配', value: 0}, {text: '已分配', value: 1}],
                    filterMethod(value, row) {
                        return row.is_assigned === value;
                    },
                    render: function (data) {
                        if (0 === data.is_assigned) {
                            return <Tag>未分配</Tag>
                        } else {
                            return <Tag>已分配</Tag>
                        }

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
                    label: "解决人",
                    prop: "solve_name",
                    width: 100,
                    render: function (data) {
                        return <Tag>{data.solve_name}</Tag>
                    }
                },
                {
                    label: "解决结果",
                    prop: "solved_result",
                    width: 100,
                    filters: [{text: '未解决', value: 0}, , {text: '正在解决', value: 1}, {text: '已解决', value: 2}],
                    filterMethod(value, row) {
                        return row.solved_result === value;
                    },
                    render: function (data) {
                        if (0 === data.solved_result) {
                            return <Tag>未解决</Tag>
                        } else if (1 == data.solved_result) {
                            return <Tag>正在解决</Tag>
                        } else {
                            return <Tag>已解决</Tag>
                        }
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
                    label: "是否Bug",
                    prop: "is_fcar_bug",
                    width: 100,
                    render: function (data) {
                        if (0 === data.is_fcar_bug) {
                            return <Tag>是</Tag>
                        } else if (1 == data.is_fcar_bug) {
                            return <Tag>否</Tag>
                        } else {
                            return <Tag>未确定</Tag>
                        }
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
                    prop: "update_time",
                    width: 200,
                    render: function (data) {
                        return (
                            <span>
            <Icon name="time"/>
            <span style={{marginLeft: '10px'}}>{moment(data.update_time).format('YYYY-MM-DD HH:mm:ss')}</span>

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
                start_by: [
                    {required: true, message: '请填写发起人', trigger: 'blur'}
                ],
                is_assigned: [
                    {required: true, type: 'integer', message: '请选择是否分配', trigger: 'change'} //type 是默认string ，需要修改适应对应类型
                ],
                solved_result: [
                    {required: true, type: 'integer', message: '请选择解决结果', trigger: 'change'}
                ],

                tester: [
                    {required: true, message: '请填写测试人员', trigger: 'blur'}
                ],
            },
            data: [], //工单列表
            workOrderDialogVisible: false,
            workOrderFormTitle: "",
            workOrderFormType: 0, //提交类型,0-add 1-修改 2 -查看
            formItemDisabled: false,//控制表单是否可编辑
            workOrderForm: {},//待提交表单数据
            queryWorkOrderForm: {},//查询表单数据
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
                    value: 0,
                    label: '未解决',
                },
                {
                    value: 1,
                    label: '正在解决',
                },
                {
                    value: 2,
                    label: '已解决',
                },
            ],

            //是否Bug
            isFcarBugOptions: [
                {
                    value: 0,
                    label: '是',
                },
                {
                    value: 1,
                    label: '否',
                },
                {
                    value: 2,
                    label: '未确定',
                },
            ],
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
                        if (res.data.data.status){
                            console.log("数据返回成功了");
                        }else {
                            console.log("数据更新失败"+res.data.data.msg);
                        }

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
    //根据查询条件查询数据
    onQuerySubmit() {
        //向后端请求数据
        let req_data = {}
        if (this.state.queryWorkOrderForm.title !==''){
            req_data.title = this.state.queryWorkOrderForm.title
        }
        if (this.state.queryWorkOrderForm.start_by !==''){
            req_data.start_by = this.state.queryWorkOrderForm.start_by
        }
        if (this.state.queryWorkOrderForm.solve_name !==''){
            req_data.solve_name = this.state.queryWorkOrderForm.solve_name
        }
        if (this.state.queryWorkOrderForm.tester !==''){
            req_data.tester = this.state.queryWorkOrderForm.tester
        }
        axios.post('/api/queryWorkOrder', {
            data: req_data
        }).then((res) => {
            this.setState({
                data: res.data.data
            });
            console.log("res:" + res)
        }).catch((err) => {
            console.log("onQuerySubmit请求错误:" + err)
        })
    }

    onQueryChange(key, value) {
        this.state.queryWorkOrderForm[key] = value;
        this.forceUpdate();
    }

    onCancel(e) {
        //console.log("onCancelData" + this.state.data.toString());
        this.queryWorkOrder();
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

    //查询全部数据
    queryWorkOrder() {
        //向后端请求数据
        axios.get('/api/queryAllWorkOrder', {
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
                <Form ref="queryWorkOrderForm" model={this.state.queryWorkOrderForm} className="query-form">
                    <Layout.Row>
                        <Layout.Col span="5">
                            <div className="grid-content bg-purple">
                                <Form.Item label="标题" labelWidth="120" prop="title"
                                           model={this.state.queryWorkOrderForm}
                                           onSubmit={this.onQuerySubmit.bind(this)}>
                                    <Input value={this.state.queryWorkOrderForm.title}
                                           onChange={this.onQueryChange.bind(this, 'title')}/>
                                </Form.Item>
                            </div>
                        </Layout.Col>
                        <Layout.Col span="4">
                            <div className="grid-content bg-purple">
                                <Form.Item label="发起人" labelWidth="120"
                                           prop="start_by"
                                           onSubmit={this.onQuerySubmit.bind(this)}
                                >
                                    <Input value={this.state.queryWorkOrderForm.start_by}
                                           onChange={this.onQueryChange.bind(this, 'start_by')}/>
                                </Form.Item>
                            </div>
                        </Layout.Col>
                        <Layout.Col span="4">
                            <div className="grid-content bg-purple">
                                <Form.Item label="解决人" labelWidth="120"
                                           prop="solve_name"
                                           onSubmit={this.onQuerySubmit.bind(this)}
                                >
                                    <Input value={this.state.queryWorkOrderForm.solve_name} placeholder="请输入解决人"
                                           onChange={this.onQueryChange.bind(this, 'solve_name')}/>
                                </Form.Item>
                            </div>
                        </Layout.Col>
                        <Layout.Col span="4">

                            <div className="grid-content bg-purple">
                                <Form.Item label="测试人员" labelWidth="120" prop="tester"
                                           model={this.state.queryWorkOrderForm}
                                           onSubmit={this.onQuerySubmit.bind(this)}>
                                    <Input value={this.state.queryWorkOrderForm.tester}
                                           onChange={this.onQueryChange.bind(this, 'tester')}/>
                                </Form.Item>
                            </div>
                        </Layout.Col>
                    </Layout.Row>
                    <Layout.Row type="flex" justify="center">
                        <Layout.Col span="1">
                            <div className="grid-content bg-purple-light">
                                <Button type="primary"
                                        onClick={this.onQuerySubmit.bind(this)}>查询</Button>
                            </div>
                        </Layout.Col>

                    </Layout.Row>
                </Form>

                <Layout.Row>
                    <Layout.Col span="4">
                        <div className="grid-content bg-purple-light">
                            <Button className="icon-btn" onClick={() => this.addWorkOrder()} type="primary"
                                    icon="edit"/>
                        </div>
                    </Layout.Col>


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
                    size="large">
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
                                        <Form.Item label="发起人" labelWidth="120"
                                                   prop="start_by"

                                                   onSubmit={this.onSubmit.bind(this)}
                                        >
                                            <Input value={this.state.workOrderForm.start_by}
                                                   disabled={this.state.formItemDisabled}
                                                   onChange={this.onChange.bind(this, 'start_by')}/>
                                        </Form.Item>
                                    </div>
                                </Layout.Col>

                                <Layout.Col span="12">
                                    <div className="grid-content bg-purple">
                                        <Form.Item label="测试人员" labelWidth="120" prop="tester"
                                                   model={this.state.workOrderForm}
                                                   onSubmit={this.onSubmit.bind(this)}>
                                            <Input value={this.state.workOrderForm.tester}
                                                   disabled={this.state.formItemDisabled}
                                                   onChange={this.onChange.bind(this, 'tester')}/>
                                        </Form.Item>
                                    </div>
                                </Layout.Col>
                            </Layout.Row>
                            <Layout.Row>
                                <Layout.Col span="7">
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

                                <Layout.Col span="8">
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
                                <Layout.Col span="8">
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
                                <Layout.Col span="7">
                                    <div className="grid-content bg-purple">
                                        <Form.Item label="解决结果" labelWidth="120" prop="solved_result"
                                                   model={this.state.workOrderForm}
                                                   onSubmit={this.onSubmit.bind(this)}>
                                            <Select value={this.state.workOrderForm.solved_result}
                                                    disabled={this.state.formItemDisabled}

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
                                <Layout.Col span="6">
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
                                <Layout.Col span="6">
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
                                <Layout.Col span="5">
                                    <div className="grid-content bg-purple">
                                        <Form.Item label="是否Bug" labelWidth="120" prop="is_fcar_bug"
                                                   model={this.state.workOrderForm}
                                                   onSubmit={this.onSubmit.bind(this)}>
                                            <Select value={this.state.workOrderForm.is_fcar_bug}
                                                    disabled={this.state.formItemDisabled}
                                                    clearable={true}
                                                    onChange={this.onChange.bind(this, 'is_fcar_bug')}>
                                                {
                                                    this.state.isFcarBugOptions.map((el) => {
                                                        return <Select.Option key={el.value} label={el.label}
                                                                              value={el.value}/>
                                                    })
                                                }
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </Layout.Col>

                            </Layout.Row>

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



