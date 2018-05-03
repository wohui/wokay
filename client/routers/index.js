import React from 'react'
import Header from "../components/Header/Header";
import HomePage from "../components/HomePage/HomePage";
import TopPage from "../components/TopPage/TopPage";
import Error404Page from "../components/ErrorPage/404";
import AddCategory from '../components/Category/AddCategory'
import {Route, Switch} from 'react-router-dom';

const MainRouter = () => (
            <Switch>
                <Route exact path={"/"}  component={HomePage}></Route>
                <Route exact path={"/home/"} component={HomePage}> </Route>
                <Route exact path="/top" component={TopPage}></Route>

                <Route exact path="/addCategory" component={AddCategory}></Route>
                <Route path="*" component={Error404Page}/>
            </Switch>
)
export default MainRouter;