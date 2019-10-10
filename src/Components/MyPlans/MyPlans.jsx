import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './my-plans.scss'

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
            return<div className="my-plan" key={el.plan_id}>
                <div className="my-plan-date-holder">
                {/* {console.log(el.start_date.getMonth())} */}
                    <h2>{el.start_date} - {el.end_date}</h2>
                </div>
                <div className="my-plan-distance-holder">
                    Total Miles: {+el.m_distance + +el.tu_distance + +el.w_distance + +el.th_distance + +el.f_distance + +el.sa_distance + +el.su_distance}
                </div>
                <div className="my-plan-description-holder">
                    Weekly Description: {el.week_focus}
                </div>
                <div className="my-plan-button-holder">
                    <Link to={`/plan/${el.plan_id}`}><button>View Full Plan</button></Link>
                </div>

            </div>
        })
        return(
            <div className="my-plans-page">
                <div className="page-title">
                    <h1>My Plans</h1>
                </div>
                <div className="add-new-route">
                    <Link to={'/add_plan'}>
                        {/* <button>Add New Route</button> */}
                        <div className="my-button-get-routes">
                            Add Plan
                        </div>
                        </Link>
                </div>
                <div className="my-plans-holder">
                    {plan}
                </div>
                

            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    const {user, loggedIn} = reduxState
    return {user, loggedIn}
}
export default connect(mapStateToProps)(withRouter(MyPlans))