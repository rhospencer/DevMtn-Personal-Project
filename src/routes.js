import React from 'react'
import Home from './Components/Home/Home'
import FindRoutes from './Components/FindRoutes/FindRoutes'
import MyRoutes from './Components/MyRoutes/MyRoutes'
import MyPlans from './Components/MyPlans/MyPlans'
import Route from './Components/Route/Route'
import AddForm from './Components/AddForm/AddForm'
import {Switch, Route as Routing} from 'react-router-dom'
import Plan from './Components/Plan/Plan'

export default (
    <Switch>
        <Routing exact path='/' component={Home}/>
        <Routing path='/find_routes' component={FindRoutes}/>
        <Routing path='/my_routes' component={MyRoutes}/>
        <Routing path='/my_plans' component={MyPlans}/>
        <Routing path='/route/:route_id' component={Route}/>
        <Routing path='/add_form' component={AddForm}/>
        <Routing path='/plan/:plan_id' component={Plan}/>
    </Switch>
)