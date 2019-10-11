import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

class ViewRoute extends Component {
    constructor(props) {
        super(props)

        this.state = {
            route: [],
            route_img: 'http://via.placeholder.com/450x450',
            zip: '',
            city: '',
            state: '',
            starting_address: '',
            distance: '',
            title: '',
            description: '',
        }
    }

    componentDidMount() {
        if (!this.props.loggedIn) {
            this.props.history.push('/')
        } else {
            axios.get(`/api/route/${+this.props.match.params.route_id}`).then(res => {
                this.setState({
                    route: res.data,
                    route_img: res.data.route_img,
                    zip: res.data.zip,
                    city: res.data.city,
                    state: res.data.state,
                    starting_address: res.data.starting_address,
                    distance: res.data.distance,
                    title: res.data.title,
                    description: res.data.description
                })
            })
        }

    }

    goBack() {
        this.props.history.push(`/plan/${this.props.match.params.plan_id}`)
    }


    render() {
        return(
            <div className="route-page">
                <div className="route-holder">
                        <div className="profile-holder">
                            <div className="profile-info-holder">
                                {this.state.route.profile_pic ? 
                                <img src={this.state.route.profile_pic} alt="User Profile Picture"/>
                                :
                                <img src='https://i0.wp.com/acaweb.org/wp-content/uploads/2018/12/profile-placeholder.png?fit=300%2C300&ssl=1' alt="User Profile Picture"/>}
                                <h3>Created By {this.state.route.username}</h3>
                            </div>
                            <div className="cancel-button-holder">
                                <i class="fas fa-window-close fa-3x" onClick={() => this.goBack()}></i>
                            </div>
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
                            <div className="pi">
                                <h4>Route Description</h4>
                                <br/>
                                <p>{this.state.route.description}</p>

                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    const {user, loggedIn} = reduxState
    return {user, loggedIn}
}

export default connect(mapStateToProps)(withRouter(ViewRoute))