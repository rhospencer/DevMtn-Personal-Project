import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class MyPlans extends Component {
    constructor() {
        super()

        this.state = {

        }
    }

    componentDidMount() {
        if (!this.props.loggedIn) {
            this.props.history.push('/')
        }
    }


    render() {
        return(
            <div className="my-plans">
                MyPlans
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    const {user, loggedIn} = reduxState
    return {user, loggedIn}
}
export default connect(mapStateToProps)(withRouter(MyPlans))