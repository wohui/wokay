import React from 'react'
import ReactDOM from 'react-dom'

import {BrowserRouter, Route} from 'react-router-dom'

import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import TopPage from "./components/TopPage/TopPage";
ReactDOM.render((
        <BrowserRouter>
            <div>
                <Header/>
                <Route exact path={"/"} component={HomePage}></Route>
                <Route path={"/home"} component={HomePage}></Route>
                <Route path="/top" component={TopPage}></Route>
            </div>
        </BrowserRouter>
    ),
    document.getElementById('app')
);



