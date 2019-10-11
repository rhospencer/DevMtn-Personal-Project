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
                            Monday
                            Distance: {this.state.m_distance}
                            Run Type: {this.state.m_type}
                            Description: {this.state.m_description}
                            <Link to={`/select_route/${this.props.match.params.plan_id}/m_route`}><h4>Route Info: {this.state.m_route}</h4></Link>

                        </div>
                        <div className="plan-day">
                            Tuesday
                            Distance: {this.state.tu_distance}
                            Run Type: {this.state.tu_type}
                            Description: {this.state.tu_description}
                            <Link to={`/select_route/${this.props.match.params.plan_id}/tu_route`}><h4>Route Info: {this.state.tu_route}</h4></Link>

                        </div>
                        <div className="plan-day">
                            <div className="plan-day-holder">
                                <h2>Wednesday</h2>
                            </div>
                            <div className="plan-day-info-holder">
                                {this.state.miles !== 0 ? 
                                <p>{this.state.w_distance} Miles</p>
                                :
                                null
                            }
                                Run Type: {this.state.w_type}
                            </div>
                            <div className="plan-route-holder">
                                {this.state.w_route !== null ? 
                                    <h4 onClick={() => this.visitRoute(+this.state.w_route)}>Route Info: {this.state.w_route}</h4>
                                :
                                    <div className="no-route-info-holder">
                                        Add Route
                                    </div>
                                }
                                
                                <button onClick={() => this.editRoute('w_route')}>Change Route</button>
                            </div>
                        </div>
                        <div className="plan-day">
                            Thursday
                            Distance: {this.state.th_distance}
                            Run Type: {this.state.th_type}
                            Description: {this.state.th_description}
                            <Link to={`/select_route/${this.props.match.params.plan_id}/th_route`}><h4>Route Info: {this.state.th_route}</h4></Link>

                        </div>
                        <div className="plan-day">
                            Friday
                            Distance: {this.state.f_distance}
                            Run Type: {this.state.f_type}
                            Description: {this.state.f_description}
                            <Link to={`/select_route/${this.props.match.params.plan_id}/f_route`}><h4>Route Info: {this.state.f_route}</h4></Link>

                        </div>
                        <div className="plan-day">
                            Saturday
                            Distance: {this.state.sa_distance}
                            Run Type: {this.state.sa_type}
                            Description: {this.state.sa_description}
                            <Link to={`/select_route/${this.props.match.params.plan_id}/sa_route`}><h4>Route Info: {this.state.sa_route}</h4></Link>

                        </div>
                        <div className="plan-day">
                            Sunday
                            Distance: {this.state.su_distance}
                            Run Type: {this.state.su_type}
                            Description: {this.state.su_description}
                            <Link to={`/select_route/${this.props.match.params.plan_id}/su_route`}><h4>Route Info: {this.state.su_route}</h4></Link>

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

