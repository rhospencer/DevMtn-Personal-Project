import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import './plan.scss'

class Plan extends Component {
    constructor() {
        super()

        this.state = {
            plan: [],
            start_date: '',
            end_date: '',
            week_focus: '',
            m_distance: 0,
            m_type: '',
            m_description: '',
            m_route: null,
            tu_distance: 0,
            tu_type: '',
            tu_description: '',
            tu_route: null,
            w_distance: 0,
            w_type: '',
            w_description: '',
            w_route: null,
            th_distance: 0,
            th_type: '',
            th_description: '',
            th_route: null,
            f_distance: 0,
            f_type: '',
            f_description: '',
            f_route: null,
            sa_distance: 0,
            sa_type: '',
            sa_description: '',
            sa_route: null,
            su_distance: 0,
            su_type: '',
            su_description: '',
            su_route: null,
            mRouteInfo: null,
            tuRouteInfo: null,
            wRouteInfo: null,
            thRouteInfo: null,
            fRouteInfo: null,
            saRouteInfo: null,
            suRouteInfo: null
            
        }
    }

    componentDidMount() {
        axios.get(`/api/plan/${+this.props.match.params.plan_id}`).then(res => {
            this.setState({
                plan: res.data,
                start_date: res.data[0].start_date,
                end_date: res.data[0].end_date,
                week_focus: res.data[0].week_focus,
                m_distance: res.data[0].m_distance,
                m_type: res.data[0].m_type,
                m_description: res.data[0].m_description,
                m_route: res.data[0].m_route,
                tu_distance: res.data[0].tu_distance,
                tu_type: res.data[0].tu_type,
                tu_description: res.data[0].tu_description,
                tu_route: res.data[0].tu_route,
                w_distance: res.data[0].w_distance,
                w_type: res.data[0].w_type,
                w_description: res.data[0].w_description,
                w_route: res.data[0].w_route,
                th_distance: res.data[0].th_distance,
                th_type: res.data[0].th_type,
                th_description: res.data[0].th_description,
                th_route: res.data[0].th_route,
                f_distance: res.data[0].f_distance,
                f_type: res.data[0].f_type,
                f_description: res.data[0].f_description,
                f_route: res.data[0].f_route,
                sa_distance: res.data[0].sa_distance,
                sa_type: res.data[0].sa_type,
                sa_description: res.data[0].sa_description,
                sa_route: res.data[0].sa_route,
                su_distance: res.data[0].su_distance,
                su_type: res.data[0].su_type,
                su_description: res.data[0].su_description,
                su_route: res.data[0].su_route,
            })
            if (res.data[0].m_route) {
                axios.get(`/api/route/${res.data[0].m_route}`).then(res => {
                this.setState({mRouteInfo: res.data})
            })}
            if (res.data[0].tu_route) {
                axios.get(`/api/route/${res.data[0].tu_route}`).then(res => {
                this.setState({tuRouteInfo: res.data})
            })}
            if (res.data[0].w_route) {
                axios.get(`/api/route/${res.data[0].w_route}`).then(res => {
                this.setState({wRouteInfo: res.data})
            })}
            if (res.data[0].th_route) {
                axios.get(`/api/route/${res.data[0].th_route}`).then(res => {
                this.setState({thRouteInfo: res.data})
            })}
            if (res.data[0].f_route) {
                axios.get(`/api/route/${res.data[0].f_route}`).then(res => {
                this.setState({fRouteInfo: res.data})
            })}
            if (res.data[0].sa_route) {
                axios.get(`/api/route/${res.data[0].sa_route}`).then(res => {
                this.setState({saRouteInfo: res.data})
            })}
            if (res.data[0].su_route) {
                axios.get(`/api/route/${res.data[0].su_route}`).then(res => {
                this.setState({suRouteInfo: res.data})
            })}
        })
    }

    editRoute(day_route) {
        this.props.history.push(`/select_route/${this.props.match.params.plan_id}/${day_route}`)
    }

    visitRoute(route_id) {
        this.props.history.push(`/view_route/${route_id}/${this.props.match.params.plan_id}`)
    }

    deletePlan() {
        axios.delete(`/api/delete_plan/${+this.props.match.params.plan_id}`).then(res => {
            this.props.history.push('/my_plans')
            Swal.fire({
                text: res.data.message.text,
                type: res.data.message.type,
                timer: 1500,
                showConfirmButton: false
            })
        })
    }

    render() {
        return (
            <div className="plan-page">
                <div className="plan-holder">
                    <div className="plan-info-holder">
                        <div className="plan-date-holder">
                            
                            <h2>{this.state.start_date} - {this.state.end_date}</h2>
                        </div>
                        <div className="plan-total-miles-holder">
                            Total Miles: {+this.state.m_distance + +this.state.tu_distance + +this.state.w_distance + +this.state.th_distance + +this.state.f_distance + +this.state.sa_distance + +this.state.su_distance}
                            <Link to={'/my_plans'}><button>X</button></Link>
                        </div>
                    </div>
                    <div className="plan-days-holder">
                        <div className="plan-day">
                            <div className="plan-day-holder">
                                <h2>Monday</h2>
                            </div>
                            <div className="plan-day-info-holder">
                                {this.state.m_distance !== 0 ? 
                                <p>{this.state.m_distance} Miles</p>
                                :
                                <p>Rest Day</p>
                            }
                                <p>{this.state.m_type}</p>
                            </div>
                            <div className="plan-route-holder">
                                {this.state.mRouteInfo ? 
                                    <div className="day-route-info-holder">
                                        <h1>{this.state.mRouteInfo.title}</h1>
                                        <h4>{this.state.mRouteInfo.distance} Miles</h4>
                                        <img src={this.state.mRouteInfo.route_img} alt="Route Image" onClick={() => this.visitRoute(+this.state.m_route)}/>
                                    </div>
                                :
                                    <div className="no-day-route-info-holder">
                                    <div className="add-day-route-box" onClick={() => this.editRoute('m_route')}>
                                        <i class="fas fa-plus fa-2x"></i>
                                    </div>
                                </div>
                            }
                            <div className="day-route-edit-button-holder">
                                {this.state.mRouteInfo ?
                                    <button onClick={() => this.editRoute('m_route')}>Change Route</button>
                                :
                                    null
                            }
                            </div>
                            </div>
                        </div>
                        <div className="plan-day">
                            <div className="plan-day-holder">
                                <h2>Tuesday</h2>
                            </div>
                            <div className="plan-day-info-holder">
                                {this.state.tu_distance !== 0 ? 
                                <p>{this.state.tu_distance} Miles</p>
                                :
                                <p>Rest Day</p>
                            }
                                <p>{this.state.tu_type}</p>
                            </div>
                            <div className="plan-route-holder">
                                {this.state.tuRouteInfo ? 
                                    <div className="day-route-info-holder">
                                        <h1>{this.state.tuRouteInfo.title}</h1>
                                        <h4>{this.state.tuRouteInfo.distance} Miles</h4>
                                        <img src={this.state.tuRouteInfo.route_img} alt="Route Image" onClick={() => this.visitRoute(+this.state.tu_route)}/>
                                    </div>
                                :
                                    <div className="no-day-route-info-holder">
                                        <div className="add-day-route-box" onClick={() => this.editRoute('tu_route')}>
                                            <i class="fas fa-plus fa-2x"></i>
                                        </div>
                                    </div>
                                }
                                <div className="day-route-edit-button-holder">
                                    {this.state.tuRouteInfo ? 
                                        <button onClick={() => this.editRoute('tu_route')}>Change Route</button>
                                    :
                                        null
                                }
                                </div>
                            </div>
                        </div>
                        <div className="plan-day">
                            <div className="plan-day-holder">
                                <h2>Wednesday</h2>
                            </div>
                            <div className="plan-day-info-holder">
                                {this.state.w_distance !== 0 ? 
                                <p>{this.state.w_distance} Miles</p>
                                :
                                <p>Rest Day</p>
                            }
                                <p>{this.state.w_type}</p>
                            </div>
                            <div className="plan-route-holder">
                                {this.state.wRouteInfo ? 
                                    <div className="day-route-info-holder">
                                        <h1>{this.state.wRouteInfo.title}</h1>
                                        <h4>{this.state.wRouteInfo.distance} Miles</h4>
                                        <img src={this.state.wRouteInfo.route_img} alt="Route Image" onClick={() => this.visitRoute(+this.state.w_route)}/>
                                    </div>
                                :
                                    <div className="no-day-route-info-holder">
                                        <div className="add-day-route-box" onClick={() => this.editRoute('w_route')}>
                                            <i class="fas fa-plus fa-2x"></i>
                                        </div>
                                    </div>
                                }
                                <div className="day-route-edit-button-holder">
                                    {this.state.wRouteInfo ?
                                        <button onClick={() => this.editRoute('w_route')}>Change Route</button>
                                    :
                                        null
                                }
                                </div>
                            </div>
                        </div>
                        <div className="plan-day">
                            <div className="plan-day-holder">
                                <h2>Thursday</h2>
                            </div>
                            <div className="plan-day-info-holder">
                                {this.state.th_distance !== 0 ? 
                                <p>{this.state.th_distance} Miles</p>
                                :
                                <p>Rest Day</p>
                            }
                                <p>{this.state.th_type}</p>
                            </div>
                            <div className="plan-route-holder">
                                {this.state.thRouteInfo ? 
                                    <div className="day-route-info-holder">
                                        <h1>{this.state.thRouteInfo.title}</h1>
                                        <h4>{this.state.thRouteInfo.distance} Miles</h4>
                                        <img src={this.state.thRouteInfo.route_img} alt="Route Image" onClick={() => this.visitRoute(+this.state.th_route)}/>
                                    </div>
                                :
                                    <div className="no-day-route-info-holder">
                                    <div className="add-day-route-box" onClick={() => this.editRoute('th_route')}>
                                        <i class="fas fa-plus fa-2x"></i>
                                    </div>
                                </div>
                            }
                            <div className="day-route-edit-button-holder">
                                {this.state.thRouteInfo ?
                                    <button onClick={() => this.editRoute('th_route')}>Change Route</button>
                                :
                                    null
                            }
                            </div>
                            </div>
                        </div>
                        <div className="plan-day">
                            <div className="plan-day-holder">
                                <h2>Friday</h2>
                            </div>
                            <div className="plan-day-info-holder">
                                {this.state.f_distance !== 0 ? 
                                <p>{this.state.f_distance} Miles</p>
                                :
                                <p>Rest Day</p>
                            }
                                <p>{this.state.f_type}</p>
                            </div>
                            <div className="plan-route-holder">
                                {this.state.fRouteInfo ? 
                                    <div className="day-route-info-holder">
                                        <h1>{this.state.fRouteInfo.title}</h1>
                                        <h4>{this.state.fRouteInfo.distance} Miles</h4>
                                        <img src={this.state.fRouteInfo.route_img} alt="Route Image" onClick={() => this.visitRoute(+this.state.f_route)}/>
                                    </div>
                                :
                                    <div className="no-day-route-info-holder">
                                    <div className="add-day-route-box" onClick={() => this.editRoute('f_route')}>
                                        <i class="fas fa-plus fa-2x"></i>
                                    </div>
                                </div>
                            }
                            <div className="day-route-edit-button-holder">
                                {this.state.fRouteInfo ?
                                    <button onClick={() => this.editRoute('f_route')}>Change Route</button>
                                :
                                    null
                            }
                            </div>
                            </div>
                        </div>
                        <div className="plan-day">
                            <div className="plan-day-holder">
                                <h2>Saturday</h2>
                            </div>
                            <div className="plan-day-info-holder">
                                {this.state.sa_distance !== 0 ? 
                                <p>{this.state.sa_distance} Miles</p>
                                :
                                <p>Rest Day</p>
                            }
                                <p>{this.state.sa_type}</p>
                            </div>
                            <div className="plan-route-holder">
                                {this.state.saRouteInfo ? 
                                    <div className="day-route-info-holder">
                                        <h1>{this.state.saRouteInfo.title}</h1>
                                        <h4>{this.state.saRouteInfo.distance} Miles</h4>
                                        <img src={this.state.saRouteInfo.route_img} alt="Route Image" onClick={() => this.visitRoute(+this.state.sa_route)}/>
                                    </div>
                                :
                                    <div className="no-day-route-info-holder">
                                    <div className="add-day-route-box" onClick={() => this.editRoute('sa_route')}>
                                        <i class="fas fa-plus fa-2x"></i>
                                    </div>
                                </div>
                            }
                            <div className="day-route-edit-button-holder">
                                {this.state.saRouteInfo ?
                                    <button onClick={() => this.editRoute('sa_route')}>Change Route</button>
                                :
                                    null
                            }
                            </div>
                            </div>
                        </div>
                        <div className="plan-day">
                            <div className="plan-day-holder">
                                <h2>Sunday</h2>
                            </div>
                            <div className="plan-day-info-holder">
                                {this.state.su_distance !== 0 ? 
                                <p>{this.state.su_distance} Miles</p>
                                :
                                <p>Rest Day</p>
                            }
                                <p>{this.state.su_type}</p>
                            </div>
                            <div className="plan-route-holder">
                                {this.state.suRouteInfo ? 
                                    <div className="day-route-info-holder">
                                        <h1>{this.state.suRouteInfo.title}</h1>
                                        <h4>{this.state.suRouteInfo.distance} Miles</h4>
                                        <img src={this.state.suRouteInfo.route_img} alt="Route Image" onClick={() => this.visitRoute(+this.state.su_route)}/>
                                    </div>
                                :
                                    <div className="no-day-route-info-holder">
                                    <div className="add-day-route-box" onClick={() => this.editRoute('su_route')}>
                                        <i class="fas fa-plus fa-2x"></i>
                                    </div>
                                </div>
                            }
                            <div className="day-route-edit-button-holder">
                                {this.state.suRouteInfo ?
                                    <button onClick={() => this.editRoute('su_route')}>Change Route</button>
                                :
                                    null
                            }
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="plan-description-holder">
                        Description: {this.state.week_focus}
                    </div>
                    <div className="plan-buttons-holder">
                        <button>Edit</button>
                        <button onClick={() => this.deletePlan()}>Delete</button>
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
export default connect(mapStateToProps)(withRouter(Plan))

