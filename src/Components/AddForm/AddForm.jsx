import React, {Component} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {v4 as randomString} from 'uuid'
import Dropzone from 'react-dropzone';
import {BarLoader} from 'react-spinners'
import './add-form.scss'

class AddForm extends Component {
    constructor() {
        super()

        this.state = {
            route_img: 'https://www.sylvansport.com/wp/wp-content/uploads/2018/11/image-placeholder-1200x800.jpg',
            zip: null,
            city: '',
            state: '',
            starting_address: '',
            distance: '',
            title: '',
            description: '',
            isUploading: false,
            fileName: ''
        }
    }

    getSignedRequest = ([file]) => {
        console.log(file.name)
        this.setState({isUploading: true, fileName: file.name})
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`

        axios.get('/api/signs3', {
            params: {
                'file-name': fileName,
                'file-type': file.type,
            },
        })
        .then(response => {
            const {signedRequest, url} = response.data
            this.uploadFile(file, signedRequest, url)
        })
        .catch(err => {
            console.log(err)
        })
    }

    uploadFile = (file, signedRequest, url) => {
        const options = {
            headers: {
                'Content-Type': file.type
            }
        }
        axios.put(signedRequest, file, options).then(response => {
            this.setState({isUploading: false, route_img: url})
        })
        .catch(err => {
            this.setState({
                isUploading: false
            })
        })
    }

    componentDidMount() {
        if (!this.props.loggedIn) {
            this.props.history.push('/')
            Swal.fire({
                type: 'warning',
                text: 'Must be logged in to create route!',
                timer: 1500,
                showConfirmButton: false
            })
        }
    }

    handleChange(e, key) {
        this.setState({[key]: e.target.value})
    }

    addRoute() {
        axios.post('/api/new_route', this.state).then(res => {
            Swal.fire({
                text: res.data.message.text,
                type: res.data.message.type,
                timer: 1500,
                showConfirmButton: false
            })
            // alert(res.data.message)
            this.props.history.push('/my_routes')
        })
    }

    clearInputs = () => {
        this.setState({route_img: 'https://www.sylvansport.com/wp/wp-content/uploads/2018/11/image-placeholder-1200x800.jpg', zip: '', city: '', state: '', starting_address: '', distance: '', title: '', description: '', fileName: ''})
        this.props.history.push('/find_routes')
    }

    render() {
        const {isUploading} = this.state
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
                            <select onChange={e => this.handleChange(e, 'state')} value={this.state.state}>
                                <option value='' disabled selected>State</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                            <input onChange={e => this.handleChange(e, 'zip')} placeholder="Zip Code" value={this.state.zip} type="number"/>
                            <input onChange={e => this.handleChange(e, 'starting_address')} placeholder="Starting Address" value={this.state.starting_address} type="text"/>
                            {/* <input onChange={e => this.handleChange(e, 'route_img')} placeholder="Route Image" value={this.state.route_img} type="text"/> */}
                            <Dropzone
                                onDropAccepted={this.getSignedRequest}
                                style={{
                                    position: 'relative',
                                    width: 200,
                                    height: 200,
                                    borderWidth: 7,
                                    marginTop: 100,
                                    borderColor: 'rgb(102, 102, 102)',
                                    borderStyle: 'dashed',
                                    borderRadius: 5,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: 28,
                                }}
                                accept="image/*"
                                multiple={false}
                                >
                                    {({getRootProps, getInputProps}) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()}/>
                                                <div className="file-drop">
                                                {isUploading ? 
                                                <BarLoader color='#66FCF1'/> 
                                                : this.state.fileName ? 
                                                    <p>{this.state.fileName}</p>
                                                :
                                                    <div className="drop-box">
                                                        <h6>Route Image</h6>
                                                        <p>Drop File or Click Here</p>
                                                    </div>
                                                }
                                                </div>
                                            </div>
                                        </section>
                                    )}
                                
                            </Dropzone>
                            <input onChange={e => this.handleChange(e, 'description')} placeholder="Description" value={this.state.description} type="text"/>
                            <div className="add-form-button-holder">
                                <div onClick={this.clearInputs} className="my-button-login">
                                    Cancel
                                </div>
                                <div onClick={() => this.addRoute()} className="my-button-login">
                                    Submit
                                </div>
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