import React, {Component} from 'react'
import Login from '../Login/Login'

export default class Home extends Component {
    constructor() {
        super()

        this.state = {

        }
    }
    render() {
        return(
            <div className="home">
                <Login/>
                Home
            </div>
        )
    }
}