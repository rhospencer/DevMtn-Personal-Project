import React, {Component} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './find-routes.scss'
import ExpandRoute from '../ExpandRoute/ExpandRoute'

class FindRoutes extends Component {
    constructor() {
        super()

        this.state = {
            city: '',
            distance: '',
            routes: [],
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

    resetSearch() {
        axios.get('/api/routes').then(res => {
            this.setState({routes: res.data, city: '', distance: '',})
        })
        
    }

    saveRoute(route_id) {
        if (!this.props.loggedIn) {
            return Swal.fire({
                text: 'Must be logged in to save route!',
                type: 'warning',
                timer: 1500,
                showConfirmButton: false
            })
        }
        axios.post(`/api/save/${route_id}`).then(res => {
            Swal.fire({
                text: res.data.message.text,
                type: res.data.message.type,
                timer: 1500,
                showConfirmButton: false
            })
            // alert(res.data.message)
        })
    }

    render() {
        const route = this.state.routes.map(el => {
            return <ExpandRoute key={el.route_id} data={el}/>
        })
        return(
            <div className="find-routes-page">
                <div className="page-title">
                    <h1>Find Routes</h1>
                </div>
                <div className="add-new-route">
                    <Link to={'/add_form'}>
                        {/* <button>Add New Route</button> */}
                        <div className="my-button-get-routes">
                            <p>
                                Add New Route
                            </p>
                        </div>
                        </Link>
                </div>
                <div className="search-holder">
                    <div className="search">
                        <input onChange={e => this.handleChange(e, 'city')} value={this.state.city} placeholder="City" type="text"/>
                        <div className="distance-holder">
                            <input value={this.state.distance} onChange={e => this.handleChange(e, 'distance')} placeholder="Distance" type="number"/>
                            <input value={this.state.distance} onChange={e => this.handleChange(e, 'distance')} placeholder="Distance" type="range" min="0" max="50"/>
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