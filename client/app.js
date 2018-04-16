import React from 'react'
import ReactDOM from 'react-dom'

import {BrowserRouter, Route} from 'react-router-dom'

import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";

ReactDOM.render((
        <BrowserRouter>
            <div>
                <Header/>
                <Route path="/test" component={Header}></Route>
                <Route path={"/home"} component={HomePage}></Route>
            </div>
        </BrowserRouter>
    ),
    document.getElementById('app')
);

