import React, {Component} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import {connect} from 'react-redux'
import './expand-route.scss'

class ExpandRoute extends Component {
    constructor(props) {
        super(props)

        this.state = {
            moreInfo: false
        }
    }

    handleMoreInfoChange() {
        this.setState({moreInfo: !this.state.moreInfo})
    }

    saveRoute(route_id) {
        console.log(this.props.loggedIn)
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
        return(
            <div className='expand-route-holder'>
                {!this.state.moreInfo ? 
                    <div className="expand-route">
                        <div className="route" key={this.props.data.route_id}>
                        <div className="add-button-holder">
                            {/* <button onClick={() => this.saveRoute(this.props.data.route_id)}>+</button> */}
                            <i onClick={() => this.saveRoute(this.props.data.route_id)} class="fas fa-plus fa-2x"></i>
                        </div>
                        <div className="display-route">
                            <div className="route-title">
                                <h1>{this.props.data.title}</h1>
                                <br/>
                                <h2>{this.props.data.distance} Miles</h2>
                            </div>
                            <div className="route-map">
                                <img src={this.props.data.route_img} alt="Route Map"/>
                            </div>
                        </div>
                        <div className="more-info-button">
                            <div className="more-box" onClick={() => this.handleMoreInfoChange()}>
                                <p>More Info</p>  
                                <i className="fas fa-chevron-down"></i>
                            </div>
                        </div>
                    </div>
                    </div>
                :
                <div className="route-holder" key={this.props.data.route_id}>
                    <div className="add-button-holder">
                        {/* <button onClick={() => this.saveRoute(this.props.data.route_id)}>+</button> */}
                        <i onClick={() => this.saveRoute(this.props.data.route_id)} class="fas fa-plus fa-2x"></i>
                    </div>
                    <div className="profile-holder">
                        <div className="profile-info-holder">
                            {this.props.data.profile_pic ? 
                            <img src={this.props.data.profile_pic} alt="User Profile Picture"/>
                            :
                            <img src='https://i0.wp.com/acaweb.org/wp-content/uploads/2018/12/profile-placeholder.png?fit=300%2C300&ssl=1' alt="User Profile Picture"/>}
                            <h3>Created By {this.props.data.username}</h3>
                        </div>
                        </div>
                        <div className="route-info-holder">
                            <div className="info-holder">
                                <div className="route-info">
                                    <h1>{this.props.data.title}</h1>
                                    <br/>
                                    <br/>
                                    <h2>{this.props.data.distance} Miles</h2>
                                    <br/>
                                    <br/>
                                    <h4>{this.props.data.city}, {this.props.data.state} &nbsp; {this.props.data.zip}</h4>
                                    <p>{this.props.data.starting_address}</p>
                                </div>
                            </div>
                            <div className="route-img-holder">
                                <img src={this.props.data.route_img} alt="Route Map Image"/>
                            </div>
                        </div>
                        <div className="description-holder">
                                <h4>Route Description</h4>
                                <br/>
                                <p>{this.props.data.description}</p>
                        </div>


                    <div className="more-info-button">
                        <div className="more-box" onClick={() => this.handleMoreInfoChange()}>
                            <p>Less Info</p>  
                            <i class="fas fa-chevron-up"></i>
                        </div>
                    </div>
                    
    
                </div>
                }

            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    const {user, loggedIn} = reduxState
    return {user, loggedIn}
}

export default connect(mapStateToProps)(ExpandRoute)