import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Swal from 'sweetalert2'

class SelectRoute extends Component {
    constructor() {
        super()

        this.state = {
            city: '',
            distance: '',
            routes: [],
            userRoutes: false,
        }
    }

    componentDidMount() {
        console.log(this.props.match.params)
        if (!this.props.loggedIn) {
            this.props.history.push('/')
            Swal.fire({
                text: 'Must be logged in to visit this page!',
                type: 'warning'
            })
        } else {
            this.getPosts()
        }
    }

    handleChange(e, key) {
        this.setState({[key]: e.target.value})
    }

    handleCheckBoxChange() {
        this.setState({userRoutes: !this.state.userRoutes})
    }

    getPosts() {
        axios.get(`/api/saved_routes?user_routes=${JSON.stringify(this.state.userRoutes)}&city=${this.state.city}&distance=${this.state.distance}`).then(res => {
            this.setState({routes: res.data})
        })
    }

    resetSearch() {
        axios.get('/api/saved_routes').then(res => {
            this.setState({routes: res.data, city: '', distance: '', userRoutes: false})
        })
    }

    updateRoute(route_id) {
        axios.put(`/api/edit_plan_route/${+this.props.match.params.plan_id}/${this.props.match.params.day_route}/${route_id}`).then(res => {
            this.props.history.push(`/plan/${+this.props.match.params.plan_id}`)
            Swal.fire({
                text: 'Route added to plan!',
                type: res.data.message.type
            })
        })
    }

    noRoute() {
        axios.put(`/api/edit_plan_route_to_null/${+this.props.match.params.plan_id}/${this.props.match.params.day_route}`).then(res => {
            this.props.history.push(`/plan/${+this.props.match.params.plan_id}`)
            Swal.fire({
                text: 'Day has been set to have no route!!',
                type: res.data.message.type
            })
        })
    }

    cancelButton() {
        this.props.history.push(`/plan/${this.props.match.params.plan_id}`)
    }

    render() {
        const route = this.state.routes.map(el => {
            return <div className="my-route-select" key={el.route_id} onClick={() => this.updateRoute(el.route_id)}>
                    <div className="my-route-title-select">
                        <h1>{el.title}</h1>
                        <h4>{el.distance}</h4>
                    </div>
                    <div className="my-route-image">
                        <img src={el.route_img} alt="Route Map"/>
                    </div>
                </div>
        })
        return(
            <div className="my-routes-page">
                <div className="page-title">
                    <h1>Select A Route</h1>
                </div>
                <div className="search-holder">
                    <div className="search">
                        <input onChange={e => this.handleChange(e, 'city')} placeholder="City" type="text"/>
                        <div className="distance-holder">
                            <input value={this.state.distance} onChange={e => this.handleChange(e, 'distance')} placeholder="Distance" type="number"/>
                            <input value={this.state.distance} onChange={e => this.handleChange(e, 'distance')} placeholder="Distance" type="range" min="0" max="50"/>
                        </div>
                        <div className="check-box-holder">
                            Created By User: 
                            <input onChange={() => this.handleCheckBoxChange()} checked={this.state.userRoutes} type="checkbox"/>
                        </div>
                {/* <button onClick={() => this.getPosts()}>Get Routes!</button> */}
                    <div onClick={() => this.getPosts()} className="my-button-get-routes">
                            <p>
                                Get Routes
                            </p>
                    </div>
                    <div onClick={() => this.resetSearch()} className="my-button-get-routes">
                            <p>
                                Reset Search
                            </p>
                    </div>
                </div>
                </div>
                <div className="cancel-select-route-button">
                    <div onClick={() => this.cancelButton()} className="my-button-get-routes"><p>
                        Cancel
                    </p></div>
                    <div onClick={() => this.noRoute()} className="my-button-get-routes"><p>No Route</p></div>
                </div>
                <div className="my-routes-holder">
                    {route}
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    const {user, loggedIn} = reduxState
    return {user, loggedIn}
}
export default connect(mapStateToProps)(withRouter(SelectRoute))