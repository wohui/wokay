import React from "react";
import {Layout} from 'element-react'
import {BrowserRouter,Link} from 'react-router-dom'

import './header.css'
class Header extends React.Component {

    render() {
        return (
            <div>
                <Layout.Row >
                    <Layout.Col span="24">
                        <div className="grid-content bg-purple-dark header-bg">
                            <li><Link to="/home">首页</Link></li>
                            <li><Link to="/top">排行榜</Link></li>
                        </div>
                    </Layout.Col>
                </Layout.Row>
            </div>
        )
    }

}

export default Header
