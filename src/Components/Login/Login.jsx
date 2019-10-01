import React, {Component} from 'react'
import axios from 'axios'
import {updateUser} from '../../ducks/reducer'
import {connect} from 'react-redux'


class Login extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange(e, key) {
        this.setState({[key]: e.target.value})
    }

    login = async () => {
        const {username, password} = this.state
        const res = await axios.post('/auth/login', {username, password})
        if (res.data.user) {
            let user = {user: {user_id: res.data.user.user_id, username: res.data.user.username}, loggedIn: res.data.loggedIn }
            this.props.updateUser(user)
        }
        alert(res.data.message)
    }

    render() {
        return(
            <div className="login">
                Login
                <input onChange={e => this.handleChange(e, 'username')} placeholder="Username" type="text"/>
                <input onChange={e => this.handleChange(e, 'password')} placeholder="Password" type="password"/>
                <button onClick={this.login}>Login</button>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    const {user} = reduxState
    return {user}
}

export default connect(mapStateToProps, {updateUser})(Login)