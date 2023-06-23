import React from "react";
import Calculator from "../containers/Calculator";
import { render, fireEvent } from "@testing-library/react";

describe("Calculator", () => {
  let container;
  beforeEach(() => {
    container = render(<Calculator />);
  });

  it("should change running total on number enter", () => {
    const button4 = container.getByTestId("number4");
    const runningTotal = container.getByTestId("running-total");
    fireEvent.click(button4);
    expect(runningTotal.textContent).toEqual("4");
  });


  it("should concatenate multiple number button clicks", () => {
    const button4 = container.getByTestId("number4");
    const runningTotal = container.getByTestId("running-total");
    fireEvent.click(button4);
    fireEvent.click(button4);
    expect(runningTotal.textContent).toEqual("44");
  });



  it("should be able to add 1 to 4 and get 5", () => {
    const button1 = container.getByTestId("number1");
    const button4 = container.getByTestId("number4");
    const add = container.getByTestId("operator-add");
    const total = container.getByTestId("operator-equals");
    const runningTotal = container.getByTestId("running-total");
    fireEvent.click(button4);
    fireEvent.click(add);
    fireEvent.click(button1);
    fireEvent.click(total);
    expect(runningTotal.textContent).toEqual("5");
  });

  it("should be able tosubtract 4 from 7 and get 3", () => {
    const button7 = container.getByTestId("number7");
    const button4 = container.getByTestId("number4");
    const subtract = container.getByTestId("operator-subtract");
    const total = container.getByTestId("operator-equals");
    const runningTotal = container.getByTestId("running-total");
    fireEvent.click(button7);
    fireEvent.click(subtract);
    fireEvent.click(button4);
    fireEvent.click(total);
    expect(runningTotal.textContent).toEqual("3");
  });

  it("should be able to multiply 7 by 4 and get 28", () => {
    const button7 = container.getByTestId("number7");
    const button4 = container.getByTestId("number4");
    const multiply = container.getByTestId("operator-multiply");
    const total = container.getByTestId("operator-equals");
    const runningTotal = container.getByTestId("running-total");
    fireEvent.click(button7);
    fireEvent.click(multiply);
    fireEvent.click(button4);
    fireEvent.click(total);
    expect(runningTotal.textContent).toEqual("28");
  });

  it("should be able to divide 21 by 7 and get 3", () => {
    const button2 = container.getByTestId("number2");
    const button1=container.getByTestId('number1')
    const button3 = container.getByTestId("number3");
    const divide = container.getByTestId("operator-divide");
    const total = container.getByTestId("operator-equals");
    const runningTotal = container.getByTestId("running-total");
    fireEvent.click(button2);
    fireEvent.click(button1);
    fireEvent.click(divide);
    fireEvent.click(button3);
    fireEvent.click(total);
    expect(runningTotal.textContent).toEqual("7");
  });

  
  it("should be able to chain multiple operations together", () => {
    const button2 = container.getByTestId("number2");
    const button3 = container.getByTestId("number3");
    const divide = container.getByTestId("operator-divide");
    const multiply = container.getByTestId("operator-multiply");
    const total = container.getByTestId("operator-equals");
    const runningTotal = container.getByTestId("running-total");
    fireEvent.click(button2);
    fireEvent.click(divide);
    fireEvent.click(multiply);
    fireEvent.click(button3);
    fireEvent.click(total);
    expect(runningTotal.textContent).toEqual("3");
    //iphone cal only takes the last calc command
  });


  
  it("should be able to clear the running total without affecting the calculation", () => {
    const button2 = container.getByTestId("number2");
    const button3 = container.getByTestId("number3");
    const add = container.getByTestId("operator-add");
    const multiply = container.getByTestId("operator-multiply");
    const total = container.getByTestId("operator-equals");
    const clear=container.getByTestId('clear')
    const runningTotal = container.getByTestId("running-total");
    fireEvent.click(button2);
    fireEvent.click(multiply);
    fireEvent.click(button3);
    fireEvent.click(total);
    fireEvent.click(clear);
    fireEvent.click(add)
    fireEvent.click(button2)
    fireEvent.click(total);
    expect(runningTotal.textContent).toEqual("8");

});

})