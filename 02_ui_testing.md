# Testing React Components

**Lesson Duration**: 45 minutes

### Learning Objectives

- Understand what Cypress is and how to use it
- Be able to perform e2e testing on ui components

## Testing the UI.

Using the same code from the last lesson we are going to run End to End tests on our application. 

End to End Testing, or UI testing is one the many approaches for testing a web application.

An end to end test checks whether a web application works as expected or not, by testing the so called "user flow".

To do this we are going to use a tool called Cypress.

## Installing Cypress

Cypress is an E2E testing framework that allows us to quickly test anything that runs in a browser.

> In the terminal run the command `npm install -D cypress`.
>
>**This is already part of our start code, so we don't need to do this now.**

> Important Note: Run Cypress and following commands from the Mac Terminal. *NOT* from the VS Code integrated terminal. VS Code doesn't have the necessary permissions to install Cypress. 

Once that is installed we will add a new script command to our `package.json` to open the Cypress test suite.

```js
// package.json
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "test:e2e": "cypress open" // ADDED
  },
```

And run this command in the Mac terminal: `npm run test:e2e`.

> Note it may ask you to download the Cypress software.
>
> Trouble Shooting: Try uninstalling and reinstalling Cypress
>
> `npm uninstall cypress`
>
> `npm install -D cypress`


When we run this it starts up what is known as the `Cypress test Runner`. It may show some start up tips but we can close this. This is where we will spend the majority of our time testing.

This will also add a new `cypress` folder to the root of our application. In here we will create the folder and tests for cypress to run. 

Cypress looks for tests in a folder called `e2e` and the test files need to have the extension `.cy.js`.

```bash
# terminal

mkdir cypress/e2e
touch cypress/e2e/App.cy.js
touch cypress/e2e/Comment.cy.js
```


In order for these to work we will need to start our React app so that Cypress can go to the app in the browser. 

Open a new terminal window and run the following:

```bash
# terminal
npm start
```

If you go back to the Cypress test suite you will see our test files listed. 

What we want to do here is go to our apps url and start to automate some UI interaction. 

In order for Cypress to be able to interact with the browser it gives us access to an object straight out of the box called `cy`. 

`cy` comes with some great functions to allow us to do this. 

The first thing we want to do is visit our app in chrome. 

To do this we will use `cy.visit()`.

As we are running our app the route we will hit is simply `http://localhost:3000`.

```js
// app.spec.js

describe('App', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  }) // ADDED
  
})
```

Next lets a test. We will get the counter again just to demonstrate.

Let's make sure that we can access the counter element and test it has been rendered properly. 

To do this we again need to query the DOM to get our H1. Cypress makes this easier to access using an in-built `get` method available through `cy`. This works just like the `querySelector` from vanilla JS so we can get elements by type, id or class as usual.

```js
// app.spec.js

 describe('App', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  
  it("Loads the app", () => {
      const counter = cy.get('h1'); // ADDED
  }) 

})
```

If you go back to the cypress suite and click on the `App.cy.js` file it will open a chrome window. In here it will show a pane on the right listing our tests and the results and on the right a browser window. 

Now that we have the H1 we can check that it contains the correct text. Again this is a bit different to reacts testing tools. Cypress gives us a `should` method that we can pass in 2 arguments. The first is the condition and 2nd is the value.

Some conditions we can use are:

- eq
- match
- contain

We can also chain these together like:

- be.empty
- be.visible
- have.class

And a whole host of others documented [here](https://docs.cypress.io/api/commands/should.html#Value)

We will use `contain` and check that it contains the string `0`.

```js
// app.spec.js

describe('App', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  
  it("Loads the app", () => {
      const counter = cy.get('h1');
      counter.should('contain', '0');
  }) 

})
```

If we go back to the cypress chrome window we should now see that our test has ran and it should have passed! 

## Further testing in Cypress.

We will now do some more testing of the comments section of our app. 

But we don't want to have to interact with the UI to get the tests passing. We want Cypress to automate that!

First we will test that the list of comments has been populated. In order to do this we will need access to the `ul` element.

We want to check that we have a populated set of options so we will get those back.

Let's do this in `comment.spec.js` and we'll set up Cypress to visit our app.

```js
// comment.spec.js

 describe('Comment', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Should have pre-populated comments', () => {
    const commentListItems = cy.get('#comment-list > li') // ADDED
  })

})
```

If the app has loaded successfully we should have 2 comments. 

We can test this using a `should()` function on our array.

`should()` takes in a condition as a string and an expected value. Our condition is `have.length`.

```js
// comment.spec.js

  it('Should have pre-populated comments', () => {
      const commentListItems = cy.get('#comment-list > li')
      commentListItems.should('have.length', 2)
  })
```

Now if we go back to the Cypress test suite and click the comment.spec.js file it will run that test in a new browser window. 

Awesome! We have successfully tested that our comment list is populated. Let's now interact with the browser. 

If we complete and submit the form it should add a new comment to the list. 

First we will need to get access to the inputs.

Let's write a new test. 

```js
// comment.spec.js

  it('should be able to add a comment', () => {
  }); // ADDED
```

Now we can access each input. As these are text boxes we can call the `type()` method on these to simulate a user typing text into the inputs. 

```js
// comment.spec.js

  it('should be able to add a comment', () => {
    cy.get('#name-input').type("John Jackson");
    cy.get('#comment-input').type("This is a test");    
  }); 
```

If you go back to Cypress and look at the Chrome window you should now see that the form has been populated! 


Lastly we will get the form so we can trigger an event on it called `submit` to simulate the form submission.

And we will check that our list now has 3 comment items.

```js
// comment.spec.js

  it('should be able to add a comment', () => {
    cy.get('#name-input').type("John Jackson");
    cy.get('#comment-input').type("This is a test");  
    cy.get('#comment-form').submit();  // ADDED
    const commentListItems = cy.get('#comment-list > li'); // ADDED
    commentListItems.should('have.length', 3); // ADDED
  }); 
```

Look at the browser. Our form should have submitted and added the comment and our test will have passed. 

A list of interactions with elements can be found [here](https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html#Actionability)

## But tell me why?!

But we can see this in the browser and know it works why am I testing this???

Well you won't always see this browser for a start. When you automate deployment no one is going to sit and watch the browser and make sure. We rely on the tests to make sure it has happened. Also later on you may change something elsewhere and the tests make sure that nothing breaks as a result. You can also test multiple scenarios very quickly. 

## Recap

<br/>
Which method do we call to get an element back from the DOM?

<details>
<summary>Answer</summary>
`cy.get`
</details>

## Conclusion

Now that we can test our React UI components the world really is our oyster!

No more will UI testers have to click countless buttons and fill in numerous forms manually saving time for that extra cup of coffee! 

