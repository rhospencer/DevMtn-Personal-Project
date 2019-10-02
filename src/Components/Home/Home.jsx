import React, {Component} from 'react'
import Login from '../Login/Login'
import axios from 'axios'
import {updateUser} from '../../ducks/reducer'
import {connect} from 'react-redux'
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
            profile_pic: ''
        }
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
                return alert(res.data.message)
            }
            const user = {user: {user_id: res.data.user.user_id, username: res.data.user.username}, loggedIn: res.data.loggedIn}
            this.props.updateUser(user)
            this.cancelInputs()
        } else {
            this.cancelPasswords()
            alert(`Passwords Don't Match`)
        }

    }

    cancelInputs = () => {
        this.setState({username: '', password1: '', password2: '', city: '', state: '', zip: null, profile_pic: ''})
    }

    cancelPasswords = () => {
        this.setState({password1: '', password2: ''})
    }


    render() {
        return(
            <div className="home">
                {!this.props.loggedIn ? <Login/> : null}
                
                <div className="hero">
                    {!this.props.loggedIn ? 
                        <div className="register">
                            <input onChange={e => this.handleChange(e, 'username')} value={this.state.username} placeholder='Username' type="text"/>
                            <input onChange={e => this.handleChange(e, 'password1')} value={this.state.password1} placeholder='Password' type="password"/>
                            <input onChange={e => this.handleChange(e, 'password2')} value={this.state.password2}placeholder='Re-Enter Password' type="password"/>
                            <input onChange={e => this.handleChange(e, 'city')} value={this.state.city} placeholder='City' type="text"/>
                            <select onChange={e => this.handleChange(e, 'state')} value={this.state.state}>
                                <option defaultValue='' disabled selected>State</option>
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
                            <input onChange={e => this.handleChange(e, 'zip')} placeholder='Zip Code' type="number"/>
                            <input onChange={e => this.handleChange(e, 'profile_pic')} placeholder='Profile Picture' type="text"/>
                            <button onClick={this.register}>Register</button>
                        </div> : 
                    null}
                </div>
                <div className="info">
                    <div className="info-box">
                        <div className="img-box-find-routes">
                        </div>
                    </div>
                    <div className="info-box">
                        <div className="img-box-my-routes">
                        </div>
                    </div>
                    <div className="info-box">
                        <div className="img-box-my-plans">
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

export default connect (mapStateToProps, {updateUser})(Home)