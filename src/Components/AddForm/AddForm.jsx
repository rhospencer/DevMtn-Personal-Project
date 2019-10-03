import React, {Component} from 'react'
import axios from 'axios'

export default class AddForm extends Component {
    constructor() {
        super()

        this.state = {
            route_img: '',
            zip: null,
            city: '',
            state: '',
            starting_address: '',
            distance: null,
            title: '',
            description: ''
        }
    }

    handleChange(e, key) {
        this.setState({[key]: e.target.value})
    }

    addRoute() {
        axios.post('/api/new_route', this.state).then(res => {
            alert(res.data.message)
            this.props.history.push('/my_routes')
        })
    }

    render() {
        return(
            <div className="add-form">
                Add Form
                <input onChange={e => this.handleChange(e, 'route_img')} placeholder="Route Image" value={this.state.route_img} type="text"/>
                <input onChange={e => this.handleChange(e, 'zip')} placeholder="Zip Code" value={this.state.zip} type="number"/>
                <input onChange={e => this.handleChange(e, 'city')} placeholder="City" value={this.state.city} type="text"/>
                <input onChange={e => this.handleChange(e, 'state')} placeholder="State" value={this.state.state} type="text"/>
                <input onChange={e => this.handleChange(e, 'starting_address')} placeholder="Starting Address" value={this.state.starting_address} type="text"/>
                <input onChange={e => this.handleChange(e, 'distance')} placeholder="Distance" value={this.state.distance} type="number"/>
                <input onChange={e => this.handleChange(e, 'title')} placeholder="title" value={this.state.title} type="text"/>
                <input onChange={e => this.handleChange(e, 'description')} placeholder={this.state.description} value={this.state.description} type="text"/>
                <button onClick={() => this.addRoute()}>Submit</button>
            </div>
        )
    }
}