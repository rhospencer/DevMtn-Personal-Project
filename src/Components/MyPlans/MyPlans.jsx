import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import {Link} from 'react-router-dom'

class MyPlans extends Component {
    constructor() {
        super()

        this.state = {
            plans: []
        }
    }

    componentDidMount() {
        if (!this.props.loggedIn) {
            this.props.history.push('/')
            Swal.fire({
                text: 'Must be logged in to visit this page!',
                type: 'warning'
            })
        } else {
            this.getPlans()
        }
    }

    getPlans() {
        axios.get(`/api/plans`).then(res => {
            this.setState({plans: res.data})
        })
    }


    render() {
        const plan = this.state.plans.map(el => {
            return <Link to={`/plan/${el.plan_id}`}><div className="my-plan" key={el.plan_id}>
                Start Date: {el.start_date}
                End Date: {el.end_date}
                Total Miles: {+el.m_distance + +el.tu_distance + +el.w_distance + +el.th_distance + +el.f_distance + +el.sa_distance + +el.su_distance}
                Weekly Description: {el.week_focus}

            </div></Link>
        })
        return(
            <div className="my-plans">
                MyPlans
                {plan}

            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    const {user, loggedIn} = reduxState
    return {user, loggedIn}
}
export default connect(mapStateToProps)(withRouter(MyPlans))