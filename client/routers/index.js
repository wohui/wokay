import React from 'react'
import Header from "../components/Header/Header";
import HomePage from "../components/HomePage/HomePage";
import TopPage from "../components/TopPage/TopPage";
import Error404Page from "../components/ErrorPage/404";

import {Route, Switch} from 'react-router-dom';

const MainRouter = () => (
            <Switch>
                <Route path={"/"} exact component={HomePage}></Route>
                <Route exact path={"/home/aa"} component={Error404Page}></Route>
                <Route exact path={"/home/"} component={HomePage}> </Route>
                <Route exact path="/top" component={TopPage}></Route>
                <Route path="*" component={Error404Page}/>
            </Switch>
)
export default MainRouter;