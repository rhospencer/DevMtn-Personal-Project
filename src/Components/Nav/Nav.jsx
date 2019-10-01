import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {updateUser} from '../../ducks/reducer'
import {connect} from 'react-redux'

class Nav extends Component {
    constructor() {
        super()

        this.state = {

        }
    }

    componentDidMount() {

    }

    logout = async () => {
        const res = await axios.delete('/auth/logout')
        let user = {user: null, loggedIn: false}
        this.props.updateUser(user)
        alert(res.data.message)
    }

    render() {
        return(
            <div className="nav">
                Nav
                <Link to={'/'}>Home</Link>
                <Link to={'/find_routes'}>Find Routes</Link>
                <Link to={'/my_routes'}>My Routes</Link>
                <Link to={'/my_plans'}>My Plans</Link>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    const {user} = reduxState
    return {user}
}
export default connect(mapStateToProps, {updateUser})(Nav)