import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class AddPlanForm extends Component {
    constructor() {
        super()

        this.state = {

        }
    }

    render() {
        return(
            <div className="add-plan-form">
                Add Plan Form
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    const {user, loggedIn} = reduxState
    return {user, loggedIn}
}
export default connect(mapStateToProps)(withRouter(AddPlanForm))

