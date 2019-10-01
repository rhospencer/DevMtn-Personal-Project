import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Nav extends Component {
    constructor() {
        super()

        this.state = {

        }
    }
    render() {
        return(
            <div className="nav">
                Nav
                <Link to={'/'}>Home</Link>
                <Link to={'/find_routes'}>Find Routes</Link>
                <Link to={'/my_routes'}>My Routes</Link>
                <Link to={'/my_plans'}>My Plans</Link>
            </div>
        )
    }
}