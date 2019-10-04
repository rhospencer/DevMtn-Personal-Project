import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'


class MyRoutes extends Component {
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
        if (!this.props.loggedIn) {
            this.props.history.push('/')
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


    render() {
        const route = this.state.routes.map(el => {
            return <Link to={`/route/${el.route_id}`} key={el.route_id}>
                <div className="route">
                    <h1>{el.title}</h1>
                    <h4>{el.distance}</h4>
                    <img src={el.route_img} alt="Route Map"/>
                </div>
            </Link>
        })
        return(
            <div className="my-routes">
                <input onChange={e => this.handleChange(e, 'city')} placeholder="City" type="text"/>
                <input value={this.state.distance} onChange={e => this.handleChange(e, 'distance')} placeholder="Distance" type="number"/>
                <input value={this.state.distance} onChange={e => this.handleChange(e, 'distance')} placeholder="Distance" type="range" min="0" max="50"/>
                <input onChange={() => this.handleCheckBoxChange()} checked={this.state.userRoutes} type="checkbox"/>
                <button onClick={() => this.getPosts()}>Get Routes!</button>
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
export default connect(mapStateToProps)(withRouter(MyRoutes))