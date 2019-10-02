import React, {Component} from 'react'

export default class MyRoutes extends Component {
    constructor() {
        super()

        this.state = {
            city: '',
            distance: '',
            routes: [],
            user_routes: false
        }
    }



    render() {
        return(
            <div className="my-routes">
                My Routes
            </div>
        )
    }
}