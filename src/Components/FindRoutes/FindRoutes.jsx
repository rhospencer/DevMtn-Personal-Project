import React, {Component} from 'react'
import axios from 'axios'

export default class FindRoutes extends Component {
    constructor() {
        super()

        this.state = {
            city: '',
            distance: '',
            routes: []
        }
    }

    componentDidMount() {
        this.getPosts()
    }

    handleChange(e, key) {
        this.setState({[key]: e.target.value})
    }

    getPosts() {
        axios.get(`/api/routes?city=${this.state.city}&distance=${this.state.distance}`).then(res => {
            this.setState({routes: res.data})
        })
    }

    render() {
        const route = this.state.routes.map(el => {
            return <div className="route" key={el.route_id}>
                <h1>{el.title}</h1>
                <h4>{el.distance}</h4>
                <img src={el.route_img} alt="Route Map"/>
            </div>
        })
        return(
            <div className="find-routes">
                <input onChange={e => this.handleChange(e, 'city')} placeholder="City" type="text"/>
                <input value={this.state.distance} onChange={e => this.handleChange(e, 'distance')} placeholder="Distance" type="number"/>
                <input value={this.state.distance} onChange={e => this.handleChange(e, 'distance')} placeholder="Distance" type="range" min="0" max="50"/>
                <button onClick={() => this.getPosts()}>Get Routes!</button>
                {console.log(this.state.routes)}
                <div className="route-holder">
                    {route}
                </div>
            </div>
        )
    }
}