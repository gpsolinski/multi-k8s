import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
    state = {
        seenIndexes: [],
        calculatedValues: {},
        index: ''
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({ values: values.data});
    }
    
    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({
            seenIndexes: seenIndexes.data
        });
    }

    renderSeenIndexes() {
        return this.state.seenIndexes.map(({ number }) => number).join(', ');
    }

    renderValues() {
        let entries = [];

        for (let key in this.state.calculatedValues) {
            entries.push(
                <div key={key}>
                    For index {key} I calculated {this.state.calculatedValues[key]}
                </div>
            );
        }
        return entries;
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('/api/values', {
            index: this.state.index
        });
        this.setState({ index: ''});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter you index:</label>
                    <input 
                        value={this.state.index}
                        onChange={event => this.setState({index: event.target.value })}
                    />
                    <button>Submit</button>
                </form>

                <h3>Indices I have seen:</h3>
                {this.renderSeenIndexes()}

                <h3>Calculated values:</h3>
                {this.renderValues()}
            </div>
        );
    }
}

export default Fib;