import React, { Component } from 'react';
import Counter from './components/counter';
import './App.css';

const colors = [ 'white', 'red', 'green' ];
const updateInterval = 1000;

class App extends Component {
  state = { counter: 0, color: colors[0] };

  initialState = this.state;
  interval = null;

  componentWillMount() {
      this.setInterval();
  }

  componentWillUnmount() {
      this.clearInterval();
  }

  setInterval = () => {
      this.interval = setInterval(() => {
          this.setState((state) => {
              return {
                  counter: state.counter + 1,
                  color: colors[Math.floor((Math.random()*colors.length))]
              };
          });
      }, updateInterval);
  };

  clearInterval = () => {
      clearInterval(this.interval);
  };

  resetCounter = () => {
      this.setState(() => this.initialState);
  };

  render() {
    const { counter, color } = this.state;

    return (
      <div className="App">
        <header className="App-header">
            <Counter
                count={counter}
                color={color}
                reset={this.resetCounter}
            />
        </header>
      </div>
    );
  }
}

export default App;
