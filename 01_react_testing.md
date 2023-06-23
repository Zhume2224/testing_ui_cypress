# Testing React Components

**Lesson Duration**: 60 minutes

### Learning Objectives

### Learning Objectives

- Understand what React Testing Library is and how to use it
- Be able to unit test properties and methods.

## Intro

Over the next 2 lessons we are going to learn how to test React components.

We will test in 2 ways:

- Unit testing - Test our components and functions work properly.
- e2e testing - Test the full app to make sure it renders correctly in the browser.

Testing in this way will increase confidence in the code that you write and for a lot of development teams it is a requirement. It also ensures that any changes made to the code won't break anything as the tests are normally ran before any build is released.

### Unit testing with React Testing Tools.

We will be using a library called `React testing Library` for our unit tests. It can be used in conjunction with `Jest` to test API calls, mockups and UI components. (Note: that can also be used without Jest)

From Jest, we'll be using the methods:

`describe`: to groups related tests.

`beforeEach`: which will run before each test. 

`test`: to describe the test itself. It takes in the name of the test and a function that perfroms the actual test.

`expect...toEqual`: the condition that the test needs to pass. Jest has further methods used to compare our expected result.

React Testing Library is a DOM testing library, which means that instead of dealing with instances of rendered React components, it handles DOM elements and how they behave in front of real users.

This will provide other methods which we'll see in the following section.


## Creating our first test

> Download and open the start point and do an `npm install`. 
>
>**Do this in a Mac Terminal. Running this in a VSCode Terminal may lead to problems.**

Start the app and have a look at it in the browser. 

The app we will be testing in this lesson is our comments code from earlier. But we have added a counter component to the top of the app to demonstrate interacting with DOM elements from the tests. 

> Stop the server.

Next we would need to install Reacts Testing tools. Alongside this we would need to install an adaptor so that if there are any changes to React version this adapter can cope with those.

```bash
npm install -D  @testing-library/react@12.1.5

```

By default when the tests run it only looks for tests that have been changed since last commit. In `package.json` we will add a flag `--watchAll` to the test script to run all tests. 

```json
// package.json

"scripts": {
    // AS BEFORE
    "test": "react-scripts test --watchAll", // MODIFIED
  },

```

Let's write our first test. Go to the `tests` folder and open `Counter.test.js`. This naming convention is important. When we run the script `npm test`, React will look in our tests folder for files with a `.test.js` or `.spec.js` extension. This is how it knows which test files to run.

In `Counter.test.js` we will import a few things.

```js
// Counter.test.js

import React from 'react';
import Counter from '../components/Counter';
import {render, fireEvent, waitFor} from '@testing-library/react';


```

Here we are importing React as usual along with the component we want to test. But we are also importing a couple of methods from the React Testing Library as well. `render` is what we will use to essentially mount the component so that we can access DOM nodes like we would normally in a browser. 

`fireEvent` will allow us to trigger an event on a DOM element later and waitFor will allow us to wait for changes to the DOM.

To start with we will mount our Counter component in a `beforeEach` block so that we are sure the component is fresh for each test. 

`render` returns us a `React Container` with a number of useful methods to use in our tests which we will look at throughout this lesson. To render our component we pass in `JSX` like we normally do in our React components.

We will mount the Counter component inside the `beforeEach`. To access this in the tests we will create a variable just above as well. 


```js
// Counter.test.js
describe('Counter', () => {

  let container; // ADDED
  beforeEach(() => {
    container = render(< Counter />);
  }); // ADDED
    
}) 
```

 Now `container` gives us access to the DOM elements in the component. We can also call methods that the container gives us as well.

## Testing DOM elements.

Take a while to have a look at the code in the project. It is an application with a few moving parts that we will be testing. There is a counter with 2 buttons, a list of comments and a form to add a new comment. We will be testing the different components in slightly different ways to give you a broad overview of the testing strategies.

Take a particular look at the `Counter.js` file in the `components` folder.

## Knowing what to unit test

The most common question about unit testing components is "what exactly should I test?"

For unit testing we will test the methods that we have written and their effect on the data.

For end to end testing we will test the events and the effect on what is rendered in the UI.

We should always start here by identifying the business logic in our app.

For `Counter.js` we will check:

Unit Tests:

- It should start the counter state at 0.
- It should be able to increment and decrement the counter

Accessing the elements we want to test. 

In order to interact and test the elements of the component we need to assign test ids to any element we may want to interasct with. 

Four Counter we will be interacting with the 2 buttons and also the `H1`. So we will assign these ids to those. We do this with a property called `data-testid`.

```html
<!-- Counter.js -->

    <h1 data-testid="counter">{counter}</h1> // MODIFIED 
    <button data-testid="button-up" onClick={incrementCounter}> Up</button>  // MODIFIED 
    <button data-testid="button-down" onClick={decrementCounter}>Down</button>  // MODIFIED 
```

## Setting up a unit test

So let's complete the first test. 

We will check that the text for the counter starts at `0`.

Unfortunately with React hooks such as useState, we are unable to directly access the state from our tests. We can only access the DOM elements. But that is OK. As long as our app works we should have an `h1` with text content of "0".

Lets get access to that DOM element. (Similarly to how we did it with querySelector!)

To do this the container gives us a method called `getByTestId()`. Into this we can pass the test id we set up earlier.

Our h1 has a test id of `counter` so we can pass that in.

```js
// Counter.test.js

describe('Counter', () => {
 //AS BEFORE 

  let container;
  beforeEach(() => {
    container = render(< Counter />);
  });

  it('should start the counter at zero', () => {
    const counter = container.getByTestId("counter"); // ADDED
  }); 
    
})

```
 We will then make sure that the text content is `0`. 

 Reacts Testing tools also gives us access to assert results. We can use a method called `expect` and pass it the actual value. (So in this case the textContent of the H1). Then we can use a number of assertion methods. Such as `toEqual`, `toHaveTextContent`, `toBe`.
 
 From there we can chain the expectation. i.e. we `expect` the `textContent` to equal `0`.


```js
// Counter.test.js

it('should start the counter at zero', () => {
   const counterh1 = container.getByTestId("counter");
    expect(counterh1.textContent).toEqual('0'); // ADDED
  }); 
```

And now let's run `npm test` in terminal again.

Awesome our tests are passing!


## Testing events

Next we will test that the state is updated when we increment or decrement the count using the buttons. (Essentially we are testing the result of calling the 2 methods inside our component)

In order to simlate a click event on the button to trigger the method call we get a handy method, funnily enough called `fireEvent`. This gives us methods we can call for various events that could be triggered; `click`, `change`, etc.

Into these events we pass the element to trigger the event on. In our case the buttons. 

Let's start by unskipping and completing the next test:

First we will find the up button and simulate a click.

```js
// Counter.test.js
it("should increment counter on click", () => {     // MODIFIED
    const upButton = container.getByTestId("button-up"); // ADDED
    fireEvent.click(upButton); // ADDED
    
  });
```


And now we can check that the counter H1 element has the text `1`.

```js
// Counter.test.js

it("should increment counter on click", () => {
    const upButton = container.getByTestId("button-up");
    fireEvent.click(upButton);
    const counterh1 = container.getByTestId("counter"); // ADDED
    expect(counterh1.textContent).toEqual('1'); // ADDED
  });
```

When we save these changes our test runner should trigger again and we should now have 3 passing tests! (1 test from App and 2 from Counter)

### Task

Unskip and complete the test to decrement the counter. You should expect the H1 to have the text `-1`.


<details>
<summary>Solution</summary>

```js
// Counter.test.js
  it("should decrement counter on click", () => {
    const downButton = container.getByTestId("button-down");
    fireEvent.click(downButton);
    const counterh1 = container.getByTestId("counter");
    expect(counterh1).toHaveTextContent('-1');
  });
```
</details>

And that is us! We can test any event and the effect that it has on the state of our component.

Ideally we should be testing that our state is set correctly initially and any methods we write that will modify the data or DOM components.

Next we will look at e2e testing to make sure that our UI is displayed correctly.

## Recap

What are some of the advantages of testing?

<details>
<summary>Answer</summary>
Tests help a developer think about how to design a component, or refactor an existing component, and are often run every time code is changed. It also instils confidence in your code.
</details>

<br />

## Conclusion

Now that we can test our React components there is no stopping us!

A good mindset to have when testing components is to assume a test is necessary until proven otherwise.

Here are the questions you can ask yourself:

- Is this part of the business logic?
- Does this directly test the inputs and outputs of the component?
- Is this testing my code, or third-party code?
