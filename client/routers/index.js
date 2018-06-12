import React from 'react'
import Header from "../components/Header/Header";
import HomePage from "../components/HomePage/HomePage";
import OrderList from "../components/WorkOrderPage/OrderList";
import Error404Page from "../components/ErrorPage/404";
import AddCategory from '../components/Category/AddCategory'
import {Route, Switch} from 'react-router-dom';

const MainRouter = () => (
            <Switch>
                <Route exact path={"/"}  component={HomePage}></Route>

                <Route  exact path="/orderManage" component={OrderList}></Route>
                <Route  exact path="/addCategory" component={AddCategory}></Route>
                <Route  exact path="*" component={Error404Page}></Route>
            </Switch>
)
export default MainRouter;