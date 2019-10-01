import React from 'react'
import Home from './Components/Home/Home'
import FindRoutes from './Components/FindRoutes/FindRoutes'
import MyRoutes from './Components/MyRoutes/MyRoutes'
import MyPlans from './Components/MyPlans/MyPlans'
import {Switch, Route} from 'react-router-dom'

export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/find_routes' component={FindRoutes}/>
        <Route path='/my_routes' component={MyRoutes}/>
        <Route path='/my_plans' component={MyPlans}/>
    </Switch>
)