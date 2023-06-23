import React from 'react';
import '../App.css'

function KeyPad(props) {

  const numberClick = (number) => {
    props.handleNumber(number);
  }

  const clearClick = () => {
   props.handleClear();
  }

  const operatorClick = (operator) => {
   props.handleOperator(operator)
  }

  const decimalClick = () => {
    props.handleDecimal();
  }

  return (
    <div className="buttons">
        <div className="one">
          <button data-testid="clear" id="clear" className="clear" onClick={clearClick}>C</button>
        </div>
        <div className="two">
          <button data-testid="number7" id="number7" onClick={() => numberClick('7')}>7</button>
          <button data-testid="number8" id="number8" onClick={() => numberClick('8')}>8</button>
          <button data-testid="number9" id="number9" onClick={() => numberClick('9')}>9</button>
          <button data-testid="operator-divide" id="operator-divide" onClick={() => operatorClick('/')}>/</button>
          <button data-testid="number4" id="number4" onClick={() => numberClick('4')}>4</button>
          <button data-testid="number5" id="number5" onClick={() => numberClick('5')}>5</button>
          <button data-testid="number6" id="number6" onClick={() => numberClick('6')}>6</button>
          <button data-testid="operator-multiply" id="operator-multiply" onClick={() => operatorClick('*')}>x</button>
          <button data-testid="number1" id="number1" onClick={() => numberClick('1')}>1</button>
          <button data-testid="number2" id="number2" onClick={() => numberClick('2')}>2</button>
          <button data-testid="number3" id="number3" onClick={() => numberClick('3')}>3</button>
          <button data-testid="operator-subtract" id="operator-subtract" onClick={() => operatorClick('-')}>-</button>
          <button data-testid="decimal" id="decimal" onClick={() => decimalClick()}>.</button>
          <button data-testid="number0" id="number0" onClick={() => numberClick('0')}>0</button>
          <button data-testid="operator-equals" id="operator-equals" onClick={() => operatorClick('=')}>=</button>
          <button data-testid="operator-add" id="operator_add" onClick={() => operatorClick('+')}>+</button>
        </div>
        </div>
  );
}

export default KeyPad;
