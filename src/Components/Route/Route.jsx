import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class Route extends Component {
    constructor(props) {
        super(props)

        this.state = {
            route: [],
            edit: false,
            route_img: '',
            zip: '',
            city: '',
            state: '',
            starting_address: '',
            distance: '',
            title: '',
            description: ''
        }
    }

    componentDidMount() {
        if (!this.props.loggedIn) {
            this.props.history.push('/')
        } else {
            axios.get(`/api/route/${+this.props.match.params.route_id}`).then(res => {
                this.setState({route: res.data})
            })
        }

    }

    deleteRoute() {
        axios.delete(`/api/delete/${+this.props.match.params.route_id}`).then(res => {
            this.props.history.push('/my_routes')
            alert(res.data.message)
        })
    }

    editRoute() {
        axios.put(`/api/edit_route/${+this.props.match.params.route_id}`, this.state).then(res => {
            this.props.history.push('/my_routes')
            alert(res.data.message)
        })
    }

    handleEditChange() {
        this.setState({edit: !this.state.edit})
    }

    handleInputChange(e, key) {
        this.setState({[key]: e.target.value})
    }

    render() {
        return (
            <div className="route-page">
                {!this.state.edit ? 
                    <div className="route-holder">
                        <div className="profile-holder">
                            {this.state.route.profile_pic ? 
                            <img src={this.state.route.profile_pic} alt="User Profile Picture"/>
                            :
                            <img src='https://i0.wp.com/acaweb.org/wp-content/uploads/2018/12/profile-placeholder.png?fit=300%2C300&ssl=1' alt="User Profile Picture"/>}
                            <h3>Created By {this.state.route.username}</h3>
                        </div>
                        <div className="route-info-holder">
                            <div className="info-holder">
                                <div className="route-info">
                                    <h1>{this.state.route.title}</h1>
                                    <br/>
                                    <br/>
                                    <h2>{this.state.route.distance} Miles</h2>
                                    <br/>
                                    <br/>
                                    <h4>{this.state.route.city}, {this.state.route.state} &nbsp; {this.state.route.zip}</h4>
                                    <p>{this.state.route.starting_address}</p>
                                </div>
                            </div>
                            <div className="route-img-holder">
                                <img src={this.state.route.route_img} alt="Route Map Image"/>
                            </div>
                        </div>
                        <div className="description-holder">
                                <h4>Route Description</h4>
                                <br/>
                                <p>{this.state.route.description}</p>
                        </div>
                        {this.props.user && this.props.user.user_id === this.state.route.creator_id ? 
                            <div className="edit-route-holder">
                                <button onClick={() => this.handleEditChange()}>Edit</button>
                                <button onClick={() => this.deleteRoute()}>Delete</button>
                            </div>
                            : 
                            <button onClick={() => this.deleteRoute()}>Delete</button>
                    }
                    </div>

                    :

                    <div className="route-holder">

                        <input onChange={e => this.handleInputChange(e, "route_img")} placeholder="Route Image" value={this.state.route_img} type="text"/>
                        <input onChange={e => this.handleInputChange(e, "city")} placeholder="City" value={this.state.city} type="text"/>
                        <input onChange={e => this.handleInputChange(e, "state")} placeholder="State" value={this.state.state} type="text"/>
                        <input onChange={e => this.handleInputChange(e, "zip")} placeholder="Zip Code" value={this.state.zip} type="number"/>
                        <input onChange={e => this.handleInputChange(e, "starting_address")} placeholder="Starting Address" value={this.state.starting_address} type="text"/>
                        <input onChange={e => this.handleInputChange(e, "distance")} placeholder="Distance" value={this.state.distance} type="number"/>
                        <input onChange={e => this.handleInputChange(e, "title")} placeholder="Title" value={this.state.title} type="text"/>
                        <input onChange={e => this.handleInputChange(e, "description")} placeholder="Description" value={this.state.description} type="text"/>
                        <button onClick={() => this.handleEditChange()}>Return</button>
                        <button onClick={() => this.editRoute()}>Submit Change</button>
                    </div>
                
            
            
            
            
            
            
            }
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    const {user, loggedIn} = reduxState
    return {user, loggedIn}
}

export default connect(mapStateToProps)(withRouter(Route))