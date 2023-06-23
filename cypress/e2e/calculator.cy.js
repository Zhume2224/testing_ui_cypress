describe("Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it('should have working number buttons', () => {
    cy.get('#number2').click();
    cy.get('.display').should('contain', '2')
  });

  // Do the number buttons update the display of the running total?
  it('number buttons should update the display of the running data',()=>{
    cy.get('#number2').click();
    cy.get('#number3').click();
    cy.get('.display').should('have.text','23')
  });

  // Do the arithmetical operations update the display with the result of the operation? 

  it('arithmetical operations should update the display with the result of the operation',()=>{
    cy.get('#number2').click();
    cy.get('#operator_add').click();
    cy.get('#number3').click();
    cy.get('#operator_add').click();
    cy.get('.display').should('have.text','5')
  });


  // Can multiple operations be chained together?
  // E.g. does 3 + 1 - 2 == 2
  it('should allow multiple operations be chained together',()=>{
    cy.get('#number2').click();
    cy.get('#operator_add').click();
    cy.get('#number3').click();
    cy.get('#operator_add').click();
    cy.get('#number4').click();
    cy.get('#operator-equals').click();
    cy.get('.display').should('have.text','9')
  });


  // Is the output as expected for positive numbers
  it('should display positive numbers as outcome',()=>{
    cy.get('#number2').click();
    cy.get('#operator_add').click();
    cy.get('#number3').click();
    cy.get('#operator-equals').click();
    cy.get('.display').should('have.text','5')
  });

  // Is the output as expected for negative numbers
  it('should display negative numbers as outcome',()=>{
    cy.get('#number2').click();
    cy.get('#operator-subtract').click();
    cy.get('#number3').click();
    cy.get('#operator-equals').click();
    cy.get('.display').should('have.text','-1')
  });
  // Is the output as expected for decimal numbers
  it('should display decimal numbers as outcome',()=>{
    cy.get('#number2').click();
    cy.get('#operator-divide').click();
    cy.get('#number5').click();
    cy.get('#operator-equals').click();
    cy.get('.display').should('have.text','0.4')
  });

  // Is the output as expected for very large numbers.
  it('should display large numbers as outcome',()=>{
    cy.get('#number2').click();
    cy.get('#number2').click();
    cy.get('#number2').click();
    cy.get('#number2').click();
    cy.get('#number2').click();
    cy.get('#operator-multiply').click();
    cy.get('#number5').click();
    cy.get('#number5').click();
    cy.get('#number5').click();
    cy.get('#number5').click();
    cy.get('#number5').click();
    cy.get('#operator-equals').click();
    cy.get('.display').should('have.text','1234543210')
  });
  // What does the code do in exceptional circumstances? Specifically, if you divide by zero, what is the effect?
  //it shows infinity.
  // Write a test to describe what you'd prefer to happen?
  // it should show 0
 

  it('should display 0 when any number is divided by 0',()=>{
    cy.get('#number2').click();
    cy.get('#operator-divide').click();
    cy.get('#number0').click();
    cy.get('#operator-equals').click();
    cy.get('.display').should('have.text','0')
  });

})