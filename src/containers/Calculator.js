import React, {useState} from 'react';
import KeyPad from '../components/KeyPad';
import '../App.css';

function App() {

  const [previousTotal, setPreviousTotal] = useState(0); 
  const [runningTotal , setRunningTotal] = useState(0); 
  const [previousOperator, setPreviousOperator] = useState(null); 
  const [newTotal, setNewTotal] = useState(true);
  const [calculatedTotal, setCalculatedTotal] = useState(0);


  const numberClick =  (number) => {

    let tempTotal = runningTotal;
    if (runningTotal === 0 || newTotal){
      if(calculatedTotal){
        setPreviousTotal(calculatedTotal);
      } else {
        setPreviousTotal(runningTotal)
      }
      tempTotal = 0
      setNewTotal(false);
    }

    setRunningTotal(parseFloat("" + tempTotal + number));
  }

  const handleDecimal = () => {
    if(!runningTotal.toString().includes("."))
    setRunningTotal(runningTotal + ".")
  }

  const clearClick = () => {
    if (runningTotal === 0) {
      setPreviousOperator(null);
      setPreviousTotal(null);
      setCalculatedTotal(0);
    }
    setRunningTotal(0);
  }

  const operatorClick = (operator) => {
    // if there was a previous operator recorded as having been clicked, perform
      // the operation for the previous operator
      if (previousTotal && previousOperator) {
        switch (previousOperator) {
          case "+":
            add(runningTotal);
            break;
          case "-":
            subtract(runningTotal);
            break;
          case "*":
            multiply(runningTotal);
            break;
          case "/":
            divide(runningTotal);
            break;
        }
      }

      // if the 'equals' button was clicked, clear the previous operator, otherwise
      // record what the previous operator was
      if (operator === "=") {
        setPreviousOperator(null);
      } else {
        setPreviousOperator(operator);

      }
      // replace the previous total with the current running total and flag that a
      // new total has been calculated
      setPreviousTotal(runningTotal);
      setNewTotal(true);
  }

  const add = (number) => {
    let calculatedNumber = parseFloat(previousTotal) + parseFloat(number);
    setRunningTotal(calculatedNumber);
    setCalculatedTotal(calculatedNumber);
  }

  const subtract = (number) => {
    let calculatedNumber = parseFloat(previousTotal) - parseFloat(number);
    setRunningTotal(calculatedNumber);
    setCalculatedTotal(calculatedNumber);
  }

  const multiply = (number) => {
    let calculatedNumber = parseFloat(previousTotal) * parseFloat(number);
    setRunningTotal(calculatedNumber);
    setCalculatedTotal(calculatedNumber);
  }

  // I have changed the code here to avoid Infinity
  const divide = (number) => {
    let calculatedNumber = parseFloat(previousTotal) / parseFloat(number);
    if (parseFloat(number)!==0){
    setRunningTotal(calculatedNumber);
    setCalculatedTotal(calculatedNumber);}
    else {
      setRunningTotal(0);
      setCalculatedTotal(0);

    }
  }


  return (
    <div className="container">
    <div className="calculator">
      <div data-testid="running-total" id="running-total" className="display">{ runningTotal }</div>
      <KeyPad 
      handleNumber={numberClick} 
      handleOperator={operatorClick} 
      handleClear={clearClick}
      handleDecimal={handleDecimal}
      />
    </div>
  </div>
  );
}

export default App;
