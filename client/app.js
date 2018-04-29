import React from 'react'
import ReactDOM from 'react-dom'

import {BrowserRouter} from 'react-router-dom';
import MainRouter from './routers'
import Header from "./components/Header/Header";
ReactDOM.render((
        <BrowserRouter>
            <div>
                <Header/>
                <MainRouter/>
            </div>
        </BrowserRouter>
    ),
    document.getElementById('app')
);



