import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class Plan extends Component {
    constructor() {
        super()

        this.state = {
            route: [],
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
            
        }
    }

    componentDidMount() {
        axios.get(`/api/plan/${+this.props.match.params.plan_id}`).then(res => {
            this.setState({
                route: res.data,
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
        })
    }

    render() {
        return (
            <div className="plan">
                <div className="plan-holder">
                    <div className="plan-info-holder">
                        {console.log(this.state)}
                        Start Date:{this.state.start_date}
                        End Date: {this.state.end_date}
                        Total Miles: {+this.state.m_distance + +this.state.tu_distance + +this.state.w_distance + +this.state.th_distance + +this.state.f_distance + +this.state.sa_distance + +this.state.su_distance}
                    </div>
                    <div className="plan-days-holder">
                        <div className="monday">
                            Monday
                            Distance: {this.state.m_distance}
                            Run Type: {this.state.m_type}
                            Description: {this.state.m_description}
                            Route Info: {this.state.m_route}

                        </div>
                        <div className="tuesday">
                            Tuesday
                            Distance: {this.state.tu_distance}
                            Run Type: {this.state.tu_type}
                            Description: {this.state.tu_description}
                            Route Info: {this.state.tu_route}

                        </div>
                        <div className="wednesday">
                            Wednesday
                            Distance: {this.state.w_distance}
                            Run Type: {this.state.w_type}
                            Description: {this.state.w_description}
                            Route Info: {this.state.w_route}

                        </div>
                        <div className="thursday">
                            Thursday
                            Distance: {this.state.th_distance}
                            Run Type: {this.state.th_type}
                            Description: {this.state.th_description}
                            Route Info: {this.state.th_route}

                        </div>
                        <div className="friday">
                            Friday
                            Distance: {this.state.f_distance}
                            Run Type: {this.state.f_type}
                            Description: {this.state.f_description}
                            Route Info: {this.state.f_route}

                        </div>
                        <div className="saturday">
                            Saturday
                            Distance: {this.state.sa_distance}
                            Run Type: {this.state.sa_type}
                            Description: {this.state.sa_description}
                            Route Info: {this.state.sa_route}

                        </div>
                        <div className="sunday">
                            Sunday
                            Distance: {this.state.su_distance}
                            Run Type: {this.state.su_type}
                            Description: {this.state.su_description}
                            Route Info: {this.state.su_route}

                        </div>
                    </div>
                    <div className="plan-description-holder">
                        Description: {this.state.week_focus}
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

