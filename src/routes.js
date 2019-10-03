import React from 'react'
import Home from './Components/Home/Home'
import FindRoutes from './Components/FindRoutes/FindRoutes'
import MyRoutes from './Components/MyRoutes/MyRoutes'
import MyPlans from './Components/MyPlans/MyPlans'
import Route from './Components/Route/Route'
import {Switch, Route as Routing} from 'react-router-dom'

export default (
    <Switch>
        <Routing exact path='/' component={Home}/>
        <Routing path='/find_routes' component={FindRoutes}/>
        <Routing path='/my_routes' component={MyRoutes}/>
        <Routing path='/my_plans' component={MyPlans}/>
        <Routing path='/route/:route_id' component={Route}/>
    </Switch>
)