import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      result: '0'
    }
  }
  
  press(value) {
    let prevState = this.state.result;
    let newValue = "";
    if (prevState.length === 1 && prevState.localeCompare('0') === 0) {
      newValue = value
    } else {
      newValue = prevState.concat(value)
    }
    this.setState({
      result: newValue,
    })
  }

  clear = () => {
    this.setState({
      result: '0',
    })
  }
  
  calculate = (e) => {
    let all = this.state.result;
    let numbers = all.split("+");
    let result = numbers.reduce((n1, n2) => parseInt(n1) + parseInt(n2), 0);


    this.setState({
      result: result.toString()
    })

    fetch("https://20190131t161653-dot-dotted-byway-229018.appspot.com/services/operations/V1", {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstNumber: '4',
        secondNumber: '5',
        operation: 'add', 
      }),
    })
    .then(res => res.json())
    .then(json => {
      console.log(json.data);
    })
  }

  render() {  
    return (
      <div className="App">
        <header className="App-header">

          Calculadora

          <div>
          <FormLabel style={{
            color: "white",
            fontSize: "60px",
            }}>{this.state.result}</FormLabel>
          </div>

          <div className="App-keyboard">

          <div>
            <Button data-value="7" variant="contained" onClick={() => this.press("7")} color="primary">7</Button>
            <Button data-value="8" variant="contained" onClick={() => this.press("8")} color="primary">8</Button>
            <Button data-value="9" variant="contained" onClick={() => this.press("9")} color="primary">9</Button>
            <Button data-value="/" variant="contained" color="primary">/</Button>
          </div>

           <div>
            <Button data-value="4" variant="contained" onClick={() => this.press("4")} color="primary">4</Button>
            <Button data-value="5" variant="contained" onClick={() => this.press("5")} color="primary">5</Button>
            <Button data-value="6" variant="contained" onClick={() => this.press("6")} color="primary">6</Button>
            <Button variant="contained" onClick={this.press} color="primary">*</Button>
          </div>

          <div>
            <Button data-value="1" variant="contained" onClick={() => this.press("1")} color="primary">1</Button>
            <Button data-value="2" variant="contained" onClick={() => this.press("2")} color="primary">2</Button>
            <Button data-value="3" variant="contained" onClick={() => this.press("3")} color="primary">3</Button>
            <Button variant="contained" color="primary">-</Button>
          </div>

          <div>
            <Button data-value="CE" variant="contained" onClick={() => this.clear()} color="primary">CE</Button>
            <Button data-value="0" variant="contained" onClick={() => this.press("0")} color="primary">0</Button>
            <Button variant="contained" onClick={this.calculate} color="primary">=</Button>
            <Button data-value="+" variant="contained" onClick={() => this.press("+")} color="primary">+</Button>
          </div> 
          </div>
        </header>
      </div>
    );
  }
}

export default App;
