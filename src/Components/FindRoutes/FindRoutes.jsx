import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

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
            return <Link to={`/route/${el.route_id}`} key={el.route_id}><div className="route">
                <h1>{el.title}</h1>
                <button onClick={() => this.saveRoute(el.route_id)}>+</button>
                <h4>{el.distance}</h4>
                <img src={el.route_img} alt="Route Map"/>
            </div></Link>
        })
        return(
            <div className="find-routes">
                <input onChange={e => this.handleChange(e, 'city')} placeholder="City" type="text"/>
                <input value={this.state.distance} onChange={e => this.handleChange(e, 'distance')} placeholder="Distance" type="number"/>
                <input value={this.state.distance} onChange={e => this.handleChange(e, 'distance')} placeholder="Distance" type="range" min="0" max="50"/>
                <button onClick={() => this.getPosts()}>Get Routes!</button>
                <Link to={'/add_form'}><button>Add New Route</button></Link>
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