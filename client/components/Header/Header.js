import React from "react";
import {Layout} from 'element-react'
import {Link} from 'react-router'

import './header.css'
class Header extends React.Component {

    render() {
        return (
            <div>
                <Layout.Row >
                    <Layout.Col span="24">
                        <div className="grid-content bg-purple-dark header-bg">
                            <p>首页</p>
                            <p>歌手</p>
                        </div>
                    </Layout.Col>
                </Layout.Row>
            </div>
        )
    }

}

export default Header
