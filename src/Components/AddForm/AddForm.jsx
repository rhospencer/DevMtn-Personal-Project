import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import './add-form.scss'

class AddForm extends Component {
    constructor() {
        super()

        this.state = {
            route_img: '',
            zip: null,
            city: '',
            state: '',
            starting_address: '',
            distance: null,
            title: '',
            description: ''
        }
    }

    componentDidMount() {
        if (!this.props.loggedIn) {
            this.props.history.push('/')
        }
    }

    handleChange(e, key) {
        this.setState({[key]: e.target.value})
    }

    addRoute() {
        axios.post('/api/new_route', this.state).then(res => {
            alert(res.data.message)
            this.props.history.push('/my_routes')
        })
    }

    clearInputs = () => {
        this.setState({route_img: '', zip: '', city: '', state: '', starting_address: '', distance: '', title: '', description: ''})
    }

    render() {
        return(
            <div className="add-form-page">
                <div className="page-title">
                    <h1>Add Route</h1>
                </div>
                <div className="add-form-page-main">
                    <div className="add-form-holder">
                        <div className="add-form">
                            <input onChange={e => this.handleChange(e, 'title')} placeholder="Title" value={this.state.title} type="text"/>
                            <input onChange={e => this.handleChange(e, 'distance')} placeholder="Distance" value={this.state.distance} type="number"/>
                            <input onChange={e => this.handleChange(e, 'city')} placeholder="City" value={this.state.city} type="text"/>
                            <input onChange={e => this.handleChange(e, 'state')} placeholder="State" value={this.state.state} type="text"/>
                            <input onChange={e => this.handleChange(e, 'zip')} placeholder="Zip Code" value={this.state.zip} type="number"/>
                            <input onChange={e => this.handleChange(e, 'starting_address')} placeholder="Starting Address" value={this.state.starting_address} type="text"/>
                            <input onChange={e => this.handleChange(e, 'route_img')} placeholder="Route Image" value={this.state.route_img} type="text"/>
                            <input onChange={e => this.handleChange(e, 'description')} placeholder="Description" value={this.state.description} type="text"/>
                            <div className="add-form-button-holder">
                                <button onClick={this.clearInputs}>Clear</button>
                                <button onClick={() => this.addRoute()}>Submit</button>
                            </div>
                        </div>
                    </div>
                    <div className="preview-route-holder">
                        <div className="preview-route">
                            <div className="preview-route-profile-info">
                                    {this.props.user && this.props.user.profile_pic ? 
                                    <img src={this.props.user.profile_pic} alt="User Profile Picture"/>
                                    :
                                    <img src='https://i0.wp.com/acaweb.org/wp-content/uploads/2018/12/profile-placeholder.png?fit=300%2C300&ssl=1' alt="User Profile Picture"/>}
                                    {this.props.user && this.props.user.username ? 
                                        <h3>Created By {this.props.user.username}</h3>
                                    :
                                        null
                                    }
                            </div>
                            <div className="preview-route-info-holder">
                                <div className="preview-info-holder">
                                    <h1>{this.state.title}</h1>
                                    <br/>
                                    {this.state.distance ? 
                                        <h2>{this.state.distance} Miles</h2>
                                    :
                                        null
                                }
                                    <br/>
                                    {this.state.city ? 
                                        <h4>{this.state.city}, {this.state.state} &nbsp; {this.state.zip}</h4>
                                    :
                                        null
                                }
                                    <p>{this.state.starting_address}</p>
                                </div>
                                <div className="preview-route-img-holder">
                                    {this.state.route_img ? 
                                        <img src={this.state.route_img} alt="Route Image Preview"/>
                                    :
                                        <img src="https://www.sylvansport.com/wp/wp-content/uploads/2018/11/image-placeholder-1200x800.jpg" alt="Preview Image Placeholder"/>
                                }
                                </div>
                            </div>
                            <div className="preview-description-holder">
                                <h4>Route Description</h4>
                                <br/>
                                <p>{this.state.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    const {user, loggedIn} = reduxState
    return {user, loggedIn}
}
export default connect(mapStateToProps)(withRouter(AddForm))