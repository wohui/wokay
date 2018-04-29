import React from "react";
import {Layout} from 'element-react'
import {BrowserRouter,Link} from 'react-router-dom'

import './404.css'
class Error404 extends React.Component {

    render() {
        return (
            <div>
                <Layout.Row >
                    <Layout.Col span="24">
                        <div className="grid-content bg-purple-dark header-bg">
                            <p>This is　４０４　page</p>
                        </div>
                    </Layout.Col>
                </Layout.Row>
            </div>
        )
    }

}

export default Error404
