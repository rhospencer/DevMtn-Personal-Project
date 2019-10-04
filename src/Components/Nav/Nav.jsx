import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {updateUser} from '../../ducks/reducer'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class Nav extends Component {
    constructor() {
        super()

        this.state = {

        }
    }

    componentDidMount() {
            axios.get('/auth/me').then(res => {
                if (res.data.user) {
                    let user = {user: {user_id: res.data.user.user_id, username: res.data.user.username, profile_pic: res.data.user.profile_pic}, loggedIn: res.data.loggedIn}
                    this.props.updateUser(user)
                }
            })
    }

    logout = async () => {
        const res = await axios.delete('/auth/logout')
        let user = {user: null, loggedIn: false}
        this.props.updateUser(user)
        alert(res.data.message)
        this.props.history.push('/')
    }

    render() {
        return(
            <div className="nav">
                {this.props.loggedIn ? 
                    this.props.user && this.props.user.profile_pic ?
                    <img src={this.props.user.profile_pic} alt="Profile Picture"/>
                    :
                    <img src="https://i0.wp.com/acaweb.org/wp-content/uploads/2018/12/profile-placeholder.png?fit=300%2C300&ssl=1" alt="Default Profile Picture"/>
                :
                null
            }
                <div className="link-icons">
                    <Link to={'/'}>
                        <div className="nav-element">
                            <i class="fas fa-home fa-3x"></i>
                            Home
                        </div>
                    </Link>
                    <Link to={'/find_routes'}>
                        <div className="nav-element">
                            <i class="fas fa-route fa-3x"></i>
                            Find Routes
                        </div>

                    </Link>
                    {this.props.loggedIn ?
                    <div className="conditional-nav">
                        <Link to={'/my_routes'}>
                            <div className="nav-element">
                                <i class="fas fa-map-signs fa-3x"></i>
                                My Routes
                            </div>
                        </Link>
                        <Link to={'/my_plans'}>
                            <div className="nav-element">
                                <i class="fas fa-calendar-day fa-3x"></i>
                                My Plans
                            </div>
                        </Link>
                        <div className="logout-element">
                            <div className="nav-element" onClick={this.logout}>
                                <i class="fas fa-sign-out-alt fa-3x fa-flip-horizontal"></i>
                                Logout
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    const {user, loggedIn} = reduxState
    return {user, loggedIn}
}
export default connect(mapStateToProps, {updateUser})(withRouter(Nav))