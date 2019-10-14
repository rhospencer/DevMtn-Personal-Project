import React, {Component} from 'react'
import Login from '../Login/Login'
import axios from 'axios'
import Swal from 'sweetalert2'
import {v4 as randomString} from 'uuid'
import Dropzone from 'react-dropzone';
import {BarLoader} from 'react-spinners'
import {updateUser} from '../../ducks/reducer'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './home.scss'

class Home extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password1: '',
            password2: '',
            city: '',
            state: '',
            zip: null,
            profile_pic: '',
            isUploading: false,
            fileName: ''
        }
    }

    getSignedRequest = ([file]) => {
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
            this.setState({isUploading: false, profile_pic: url})
        })
        .catch(err => {
            this.setState({
                isUploading: false
            })
        })
    }

    handleChange(e, key) {
        this.setState({[key]: e.target.value})
    }

    register = async () => {
        const {username, password1, password2, city, state, zip, profile_pic} = this.state
        if (password1 === password2) {
            const res = await axios.post('/auth/register', {username, password: password2, city, state, zip, profile_pic})
            if (!res.data.user) {
                this.cancelInputs()
                return Swal.fire({
                    text: res.data.message.text,
                    type: res.data.message.type,
                    timer: 1500,
                showConfirmButton: false
                })
            }
            const user = {user: {user_id: res.data.user.user_id, username: res.data.user.username, profile_pic: res.data.user.profile_pic}, loggedIn: res.data.loggedIn}
            this.props.updateUser(user)
            this.cancelInputs()
        } else {
            this.cancelPasswords()
            // alert(`Passwords Don't Match`)
            Swal.fire({
                text: `Passwords don't match!`,
                type: 'error',
                timer: 1500,
                showConfirmButton: false
            })
        }

    }

    cancelInputs = () => {
        this.setState({username: '', password1: '', password2: '', city: '', state: '', zip: '', profile_pic: '', fileName: ''})
    }

    cancelPasswords = () => {
        this.setState({password1: '', password2: ''})
    }


    render() {
        const {isUploading} = this.state
        return(
            <div className="home">
                {!this.props.loggedIn ? <Login/> : null}
                
                <div className="hero">
                    <div className="route-runner-title">
                        <h1>The Route Runner</h1>
                        <h2>Enhance Your Training</h2>
                    </div>
                    {!this.props.loggedIn ? 
                        <div className="register">
                            <input onChange={e => this.handleChange(e, 'username')} value={this.state.username} placeholder='Username' type="text"/>
                            <input onChange={e => this.handleChange(e, 'password1')} value={this.state.password1} placeholder='Password' type="password"/>
                            <input onChange={e => this.handleChange(e, 'password2')} value={this.state.password2}placeholder='Re-Enter Password' type="password"/>
                            <input onChange={e => this.handleChange(e, 'city')} value={this.state.city} placeholder='City' type="text"/>
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
                            <input onChange={e => this.handleChange(e, 'zip')} placeholder='Zip Code' value={this.state.zip} type="number"/>
                            {/* <input onChange={e => this.handleChange(e, 'profile_pic')} placeholder='Profile Picture' value={this.state.profile_pic} type="text"/> */}
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
                                                    <h6>Profile Picture</h6>
                                                    <p>Drop File or Click Here</p>
                                                </div>
                                                }
                                                </div>
                                            </div>
                                        </section>
                                    )}
                            </Dropzone>
                            <div className="register-buttons">
                                <div className="my-button-login">
                                    Clear
                                </div>
                                <div className="my-button-login">
                                    Register
                                </div>
                                {/* <button onClick={this.register}>Register</button>
                                <button onClick={this.cancelInputs}>Clear</button> */}
                            </div>
                        </div> : 
                    null}
                </div>
                <div className="info">
                    <div className="info-box">
                        <div className="img-box-find-routes">
                            <Link to={'/find_routes'}>
                                <div className="myButton">
                                    <h4>Visit Page</h4>
                                </div>
                            </Link>
                        </div>
                        <div className="page-info-text-box">
                            <Link to={'/find_routes'}><h2>Find Routes</h2></Link>
                            <p>
                                Discover running routes based on location and distance. Add your favorite routes to allow users to add your route into their route collection. 
                            </p>
                        </div>
                    </div>
                    <div className="info-box">
                        <div className="img-box-my-routes">
                        <Link to={'/my_routes'}>
                                <div className="myButton">
                                    <h4>Visit Page</h4>
                                </div>
                            </Link>
                        </div>
                        <div className="page-info-text-box">
                        <Link to={'/my_routes'}><h2>My Routes</h2></Link>
                            <p>
                                View your personal collection of routes. Routes either saved or created by you will appear her. Find the route thats perfect for your training.
                            </p>
                        </div>
                    </div>
                    <div className="info-box">
                        <div className="img-box-my-plans">
                        <Link to={'/my_plans'}>
                                <div className="myButton">
                                    <h4>Visit Page</h4>
                                </div>
                            </Link>
                        </div>
                        <div className="page-info-text-box">
                            <Link to={'/my_plans'}><h2>My Plans</h2></Link>
                            <p>
                                Create your personal weekly training plans. Incorporate your routes to enhance your training program.
                            </p>
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

export default connect(mapStateToProps, {updateUser})(Home)