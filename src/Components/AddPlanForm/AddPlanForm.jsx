import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

class AddPlanForm extends Component {
    constructor() {
        super()

        this.state = {
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
            su_route: null
        }
    }


    handleChange(e, key) {
        this.setState({[key]: e.target.value})
    }

    addPlan() {
        axios.post('/api/new_plan', this.state).then(res => {
            Swal.fire({
                text: res.data.message.text,
                type: res.data.message.type,
                timer: 1500,
                showConfirmButton: false
            })
            this.props.history.push('/my_plans')
        })
    }

    cancelAddForm() {
        this.setState({
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
            su_route: null
        })
        this.props.history.push('/my_plans')
    }


    render() {
        return(
            <div className="add-plan-form-page">
                <div className="page-title">
                    <h1>Add Plan</h1>
                </div>
                    <div className="add-plan-form-holder">
                        <div className="plan-holder">
                            <div className="plan-info-holder">
                                <div className="plan-date-holder">
                                    <input onChange={e => this.handleChange(e, 'start_date')} placeholder="Start Date" value={this.state.start_date} type="text"/>
                                    &nbsp; / &nbsp;
                                    <input onChange={e => this.handleChange(e, 'end_date')} placeholder="End Date" value={this.state.end_date} type="text"/>
                                </div>
                                <div className="plan-total-miles-holder">
                                    <h2>Total Miles: {+this.state.m_distance + +this.state.tu_distance + +this.state.w_distance + +this.state.th_distance + +this.state.f_distance + +this.state.sa_distance + +this.state.su_distance}</h2>
                                </div>
                            </div>
                            <div className="plan-days-holder">
                                <div className="plan-day">
                                    <div className="plan-day-holder">
                                        <h2>Monday</h2>
                                    </div>
                                    <div className="plan-day-input-holder">
                                        <div className="plan-day-input-block">
                                            <h4>Daily Miles</h4>
                                            <input onChange={e => this.handleChange(e, 'm_distance')} placeholder="Monday Distance" value={this.state.m_distance} type="number"/>
                                        </div>
                                        <div className="plan-day-input-block">
                                            <h4>Run Type</h4>
                                            <input onChange={e => this.handleChange(e, 'm_type')} placeholder="Type" value={this.state.m_type} type="text"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="plan-day">
                                    <div className="plan-day-holder">
                                        <h2>Tuesday</h2>
                                    </div>
                                    <div className="plan-day-input-holder">
                                        <div className="plan-day-input-block">
                                            <h4>Daily Miles</h4>
                                            <input onChange={e => this.handleChange(e, 'tu_distance')} placeholder="Tuesday Distance" value={this.state.tu_distance} type="number"/>
                                        </div>
                                        <div className="plan-day-input-block">
                                            <h4>Run Type</h4>
                                            <input onChange={e => this.handleChange(e, 'tu_type')} placeholder="Type" value={this.state.tu_type} type="text"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="plan-day">
                                    <div className="plan-day-holder">
                                        <h2>Wednesday</h2>
                                    </div>
                                    <div className="plan-day-input-holder">
                                        <div className="plan-day-input-block">
                                            <h4>Daily Miles</h4>
                                            <input onChange={e => this.handleChange(e, 'w_distance')} placeholder="Wednesday Distance" value={this.state.w_distance} type="number"/>
                                        </div>
                                        <div className="plan-day-input-block">
                                            <h4>Run Type</h4>
                                            <input onChange={e => this.handleChange(e, 'w_type')} placeholder="Type" value={this.state.w_type}type="text"/>
                                        </div>
                                    </div>

                                </div>
                                <div className="plan-day">
                                    <div className="plan-day-holder">
                                        <h2>Thursday</h2>
                                    </div>
                                    <div className="plan-day-input-holder">
                                        <div className="plan-day-input-block">
                                            <h4>Daily Miles</h4>
                                            <input onChange={e => this.handleChange(e, 'th_distance')} placeholder="Thursday Distance" value={this.state.th_distance} type="number"/>
                                        </div>
                                        <div className="plan-day-input-block">
                                            <h4>Run Type</h4>
                                            <input onChange={e => this.handleChange(e, 'th_type')} placeholder="Type" value={this.state.th_type} type="text"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="plan-day">
                                    <div className="plan-day-holder">
                                        <h2>Friday</h2>
                                    </div>
                                    <div className="plan-day-input-holder">
                                        <div className="plan-day-input-block">
                                            <h4>Daily Miles</h4>
                                            <input onChange={e => this.handleChange(e, 'f_distance')} placeholder="Friday Distance" value={this.state.f_distance} type="number"/>
                                        </div>
                                        <div className="plan-day-input-block">
                                            <h4>Run Type</h4>
                                            <input onChange={e => this.handleChange(e, 'f_type')} placeholder="Type" value={this.state.f_type} type="text"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="plan-day">
                                    <div className="plan-day-holder">
                                        <h2>Saturday</h2>
                                    </div>
                                    <div className="plan-day-input-holder">
                                        <div className="plan-day-input-block">
                                            <h4>Daily Miles</h4>
                                            <input onChange={e => this.handleChange(e, 'sa_distance')} placeholder="Saturday Distance" value={this.state.sa_distance} type="number"/>
                                        </div>
                                        <div className="plan-day-input-block">
                                            <h4>Run Type</h4>
                                            <input onChange={e => this.handleChange(e, 'sa_type')} placeholder="Type" value={this.state.sa_type} type="text"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="plan-day">
                                    <div className="plan-day-holder">
                                        <h2>Sunday</h2>
                                    </div>
                                    <div className="plan-day-input-holder">
                                        <div className="plan-day-input-block">
                                            <h4>Daily Miles</h4>
                                            <input onChange={e => this.handleChange(e, 'su_distance')} placeholder="Sunday Distance" value={this.state.su_distance} type="number"/>
                                        </div>
                                        <div className="plan-day-input-block">
                                            <h4>Run Type</h4>
                                            <input onChange={e => this.handleChange(e, 'su_type')} placeholder="Type" value={this.state.su_type} type="text"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="plan-description-holder">
                                Description 
                                {/* <input onChange={e => this.handleChange(e, 'week_focus')} placeholder="Weekly Description" value={this.state.week_focus} type="text"/> */}

                                <textarea onChange={e => this.handleChange(e, 'week_focus')} id="" cols="80" rows="2"></textarea>
                            </div>
                            <div className="plan-buttons-holder">
                                <div className="my-button-change-route" onClick={() => this.cancelAddForm()}>Cancel</div>
                                <div className="my-button-change-route" onClick={() => this.addPlan()}>Add Plan</div>
                                
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
export default connect(mapStateToProps)(withRouter(AddPlanForm))

