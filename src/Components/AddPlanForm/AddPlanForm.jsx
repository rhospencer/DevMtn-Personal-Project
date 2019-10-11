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


    render() {
        return(
            <div className="add-plan-form">
                Add Plan Form
                <div className="add-plan-form-holder">
                    <input onChange={e => this.handleChange(e, 'start_date')} placeholder="Start Date" value={this.state.start_date} type="text"/>
                    <input onChange={e => this.handleChange(e, 'end_date')} placeholder="End Date" value={this.state.end_date} type="text"/>
                    <input onChange={e => this.handleChange(e, 'week_focus')} placeholder="Weekly Description" value={this.state.week_focus} type="text"/>
                    <input onChange={e => this.handleChange(e, 'm_distance')} placeholder="Monday Distance" value={this.state.m_distance} type="number"/>
                    <input onChange={e => this.handleChange(e, 'm_type')} placeholder="Monday Run Type" value={this.state.m_type} type="text"/>
                    <input onChange={e => this.handleChange(e, 'm_route')} placeholder="Monday Route" value={this.state.m_route} type="number"/>
                    <input onChange={e => this.handleChange(e, 'tu_distance')} placeholder="Tuesday Distance" value={this.state.tu_distance} type="number"/>
                    <input onChange={e => this.handleChange(e, 'tu_type')} placeholder="Tuesday Run Type" value={this.state.tu_type} type="text"/>
                    <input onChange={e => this.handleChange(e, 'tu_route')} placeholder="Tuesday Route" value={this.state.tu_route}type="number"/>
                    <input onChange={e => this.handleChange(e, 'w_distance')} placeholder="Wednesday Distance" value={this.state.w_distance} type="number"/>
                    <input onChange={e => this.handleChange(e, 'w_type')} placeholder="Wednesday Run Type" value={this.state.w_type}type="text"/>
                    <input onChange={e => this.handleChange(e, 'w_route')} placeholder="Wednesday Route" value={this.state.route}type="number"/>
                    <input onChange={e => this.handleChange(e, 'th_distance')} placeholder="Thursday Distance" value={this.state.th_distance} type="number"/>
                    <input onChange={e => this.handleChange(e, 'th_type')} placeholder="Thursday Run Type" value={this.state.th_type} type="text"/>
                    <input onChange={e => this.handleChange(e, 'th_route')} placeholder="Thursday Route" value={this.state.th_route} type="number"/>
                    <input onChange={e => this.handleChange(e, 'f_distance')} placeholder="Friday Distance" value={this.state.f_distance} type="number"/>
                    <input onChange={e => this.handleChange(e, 'f_type')} placeholder="Friday Run Type" value={this.state.f_type} type="text"/>
                    <input onChange={e => this.handleChange(e, 'f_route')} placeholder="Friday Route" value={this.state.f_route} type="number"/>
                    <input onChange={e => this.handleChange(e, 'sa_distance')} placeholder="Saturday Distance" value={this.state.sa_distance} type="number"/>
                    <input onChange={e => this.handleChange(e, 'sa_type')} placeholder="Saturday Run Type" value={this.state.sa_type} type="text"/>
                    <input onChange={e => this.handleChange(e, 'sa_route')} placeholder="Saturday Route" value={this.state.sa_route} type="number"/>
                    <input onChange={e => this.handleChange(e, 'su_distance')} placeholder="Sunday Distance" value={this.state.su_distance} type="number"/>
                    <input onChange={e => this.handleChange(e, 'su_type')} placeholder="Sunday Run Type" value={this.state.su_type} type="text"/>
                    <input onChange={e => this.handleChange(e, 'su_route')} placeholder="Sunday Route" value={this.state.su_route} type="number"/>
                    <button onClick={() => this.addPlan()}>Add Plan</button>
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

