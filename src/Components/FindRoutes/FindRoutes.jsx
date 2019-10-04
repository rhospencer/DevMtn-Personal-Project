import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './find-routes.scss'

class FindRoutes extends Component {
    constructor() {
        super()

        this.state = {
            city: '',
            distance: '',
            routes: []
        }
    }

    componentDidMount() {
        this.getPosts()
    }

    handleChange(e, key) {
        this.setState({[key]: e.target.value})
    }

    getPosts() {
        axios.get(`/api/routes?city=${this.state.city}&distance=${this.state.distance}`).then(res => {
            this.setState({routes: res.data})
        })
    }

    saveRoute(route_id) {
        axios.post(`/api/save/${route_id}`).then(res => {
            alert(res.data.message)
        })
    }

    render() {
        const route = this.state.routes.map(el => {
            return <div className="route" key={el.route_id}>
                <div className="add-button-holder">
                    <button onClick={() => this.saveRoute(el.route_id)}>+</button>
                </div>
                <div className="display-route">
                    <div className="route-title">
                        <h1>{el.title}</h1>
                        <br/>
                        <h2>{el.distance} Miles</h2>
                    </div>
                    <div className="route-map">
                        <img src={el.route_img} alt="Route Map"/>
                    </div>
                </div>
            </div>
        })
        return(
            <div className="find-routes-page">
                <div className="page-title">
                    <h1>Find Routes</h1>
                </div>
                <div className="add-new-route">
                    <Link to={'/add_form'}><button>Add New Route</button></Link>
                </div>
                <div className="search-holder">
                    <div className="search">
                        <input onChange={e => this.handleChange(e, 'city')} placeholder="City" type="text"/>
                        <div className="distance-holder">
                            <input value={this.state.distance} onChange={e => this.handleChange(e, 'distance')} placeholder="Distance" type="number"/>
                            <input value={this.state.distance} onChange={e => this.handleChange(e, 'distance')} placeholder="Distance" type="range" min="0" max="50"/>
                        </div>
                        <button onClick={() => this.getPosts()}>Get Routes!</button>
                    </div>
                </div>
                <div className="find-routes-holder">
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

export default connect(mapStateToProps)(FindRoutes)