import React, { Component } from 'react';
import { Button, LinearProgress , FormLabel} from '@material-ui/core';
import './App.css';
import Api from './helpers/api-client';

class App extends Component {
  constructor() {
    super();
    this.state = {
      result: '0',
      progress: false,
      operation: '+'
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
      progress: false
    })
  }
  
  calculate = () => {
    let values = this.state.result;
    this.validateSyntax(values) ? this.doOperation(values) : alert("Please, verify the syntax to calculate.");
  }

  validateSyntax(values) {
    let operator = this.state.operation;
    if (values.startsWith(operator) ||
        values.endsWith(operator) || 
        !values.includes(operator)) {
      return false;
    }
    return true;
  }

  doOperation(values) {
    let numbers = values.split(this.state.operation);

    this.setState({
      progress: true
    })

    Api.addOperation(numbers[0], numbers[1],this.obtainOperation(this.state.operation)).then(resp => {
      this.setState({
        result: resp.result,
        progress: false
      })
    });  
  }

  obtainOperation(value) {
    let operactions = {
        "+": "add",
        "-": "subtract",
        "*": "multiply",
        "/": "divide"
    };
    return operactions[value];
  }
  
  replaceOperator(operator) {
    if(this.validateOperation()) {
      let operators = ["+", "-" , "*" , "/"];
      let myResult = this.state.result;
      operators.forEach(element => {
        if(myResult.endsWith(element)) {
          myResult = myResult.slice(0, myResult.length-1);
        }
      });
      this.setState({
        result: myResult.concat(operator),
        operation: operator,
      })
    }
  }

  validateOperation(){
    let operators = ["+", "-" , "*" , "/"];
    let myResult = this.state.result;
    operators.forEach(element => {
      myResult = myResult.replace(element, " ");
    });
    let array = myResult.split(" ");
    if(array.length > 1){
      return false;
    }
    return true;
  }

  render() {
    let progressBar;
    if(this.state.progress) {
      progressBar = <LinearProgress style={{height: '10px'}} color="secondary" />;
    } else {
      progressBar = <div />;
    }   
    return (
      <div className="App">
        {progressBar}
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
            <Button variant="contained" onClick={() => this.press("7")} style={{margin: '4px'}} color="primary">7</Button>
            <Button variant="contained" onClick={() => this.press("8")} style={{margin: '4px'}} color="primary">8</Button>
            <Button variant="contained" onClick={() => this.press("9")} style={{margin: '4px'}} color="primary">9</Button>
            <Button variant="contained" onClick={() => this.replaceOperator("/")} style={{margin: '4px'}} color="primary">/</Button>
          </div>

           <div>
            <Button variant="contained" onClick={() => this.press("4")} style={{margin: '4px'}} color="primary">4</Button>
            <Button variant="contained" onClick={() => this.press("5")} style={{margin: '4px'}} color="primary">5</Button>
            <Button variant="contained" onClick={() => this.press("6")} style={{margin: '4px'}} color="primary">6</Button>
            <Button variant="contained" onClick={() => this.replaceOperator("*")} style={{margin: '4px'}} color="primary">*</Button>
          </div>

          <div>
            <Button variant="contained" onClick={() => this.press("1")} style={{margin: '4px'}} color="primary">1</Button>
            <Button variant="contained" onClick={() => this.press("2")} style={{margin: '4px'}} color="primary">2</Button>
            <Button variant="contained" onClick={() => this.press("3")} style={{margin: '4px'}} color="primary">3</Button>
            <Button variant="contained" onClick={() => this.replaceOperator("-")} style={{margin: '4px'}} color="primary">-</Button>
          </div>

          <div>
            <Button variant="contained" onClick={() => this.clear()} style={{margin: '4px'}} color="primary">CE</Button>
            <Button variant="contained" onClick={() => this.press("0")} style={{margin: '4px'}} color="primary">0</Button>
            <Button variant="contained" onClick={this.calculate} style={{margin: '4px'}} color="primary">=</Button>
            <Button variant="contained" onClick={() => this.replaceOperator("+")} style={{margin: '4px'}} color="primary">+</Button>
          </div> 
          </div>
        </header>
      </div>
    );
  }
}

export default App;
