import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {updateUser} from '../../ducks/reducer'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Swal from 'sweetalert2'

class Nav extends Component {
    constructor() {
        super()

        this.state = {
            dropdown: 'dropdown-hide'
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

    dropdownHide() {
        if (this.state.dropdown === 'dropdown') {
            this.setState({dropdown: 'dropdown-hide'})
        } else {
            this.setState({dropdown: 'dropdown'})
        }
    }

    logout = async () => {
        const res = await axios.delete('/auth/logout')
        let user = {user: null, loggedIn: false}
        this.props.updateUser(user)
        // alert(res.data.message)
        Swal.fire({
            text: res.data.message.text,
            type: 'success',
            timer: 1500,
            showConfirmButton: false
        })
        this.props.history.push('/')
    }

    errorMessage = () => {
        Swal.fire({
            text: 'Must be logged in to visit this page!',
            type: 'warning'
        })
    }

    errorMessageMobile = () => {
        Swal.fire({
            text: 'Must be logged in to visit this page!',
            type: 'warning'
        })
        this.dropdownHide()
    }

    render() {
        return(
            <div className="nav">
                <div className="nav-desktop">
                    {this.props.loggedIn ? 
                        this.props.user && this.props.user.profile_pic ?
                        <div className="nav-element">
                            <img src={this.props.user.profile_pic} alt="Profile Picture"/>
                            My Profile
                        </div>
                        :
                        <img src="https://i0.wp.com/acaweb.org/wp-content/uploads/2018/12/profile-placeholder.png?fit=300%2C300&ssl=1" alt="Default Profile Picture"/>
                    :
                    <img src="https://i0.wp.com/acaweb.org/wp-content/uploads/2018/12/profile-placeholder.png?fit=300%2C300&ssl=1" alt="Default Profile Picture"/>
                }
                    <div className="link-icons">
                        <Link to={'/'}>
                            <div className="nav-element">
                                <i className="fas fa-home fa-3x"></i>
                                Home
                            </div>
                        </Link>
                        <Link to={'/find_routes'}>
                            <div className="nav-element">
                                <i className="fas fa-route fa-3x"></i>
                                Find Routes
                            </div>
                        </Link>
                        {this.props.loggedIn ?
                        <div className="conditional-nav">
                            <Link to={'/my_routes'}>
                                <div className="nav-element">
                                    <i className="fas fa-map-signs fa-3x"></i>
                                    My Routes
                                </div>
                            </Link>
                            <Link to={'/my_plans'}>
                                <div className="nav-element">
                                    <i className="fas fa-calendar-day fa-3x"></i>
                                    My Plans
                                </div>
                            </Link>
                            <div className="logout-element">
                                <div className="nav-element" onClick={this.logout}>
                                    <i className="fas fa-sign-out-alt fa-3x fa-flip-horizontal"></i>
                                    Logout
                                </div>
                            </div>
                        </div>
                        :
                        <div className="conditional-nav">
                            <Link to={'/my_routes'}>
                                <div className="nav-element-greyed">
                                    <i className="fas fa-map-signs fa-3x"></i>
                                    My Routes
                                </div>
                            </Link>
                            <Link to={'/my_plans'}>
                                <div className="nav-element-greyed">
                                    <i className="fas fa-calendar-day fa-3x"></i>
                                    My Plans
                                </div>
                            </Link>
                        </div>
                    }
                    </div>
                </div>
                <div className={this.state.dropdown}>
                    <div className="menu">
                        <i onClick={() => this.logout()} className="fas fa-sign-out-alt fa-2x fa-flip-horizontal"></i>
                        <i onClick={() => this.dropdownHide()} className="fas fa-bars fa-2x"></i>
                    </div>
                    {this.state.dropdown === 'dropdown' ? 
                        <div className="nav-mobile-elements">
                            <Link onClick={() => this.dropdownHide()} to={'/'}><h4>Home</h4></Link>
                            <hr/>
                            <Link onClick={() => this.dropdownHide()} to={'/find_routes'}><h4>Find Routes</h4></Link>
                            <hr/>
                            {this.props.loggedIn ?
                                <div className="nav-mobile-elements">
                                    <Link onClick={() => this.dropdownHide()} to={'/my_routes'}><h4>My Routes</h4></Link>
                                    <hr/>
                                    <Link onClick={() => this.dropdownHide()} to={'/my_plans'}><h4>My Plans</h4></Link>
                                </div>
                            :
                                <div className="nav-mobile-elements-greyed">
                                    <Link onClick={() => this.dropdownHide()} to={'/my_routes'}><h4>My Routes</h4></Link>
                                    <hr/>
                                    <Link onClick={() => this.dropdownHide()} to={'/my_plans'}><h4>My Plans</h4></Link>
                                </div>
                        }
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