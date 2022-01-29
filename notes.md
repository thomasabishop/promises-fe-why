## Promises

#### Frontend Why Session

##### Tues 2nd February 2021

### Concept

- A promise is constuct in Javascript that represents the intermediate stage of an execution that returns a value.

- Promises are _asynchronous_: there is no guarantee of exactly when the operation will complete but there is a guarantee that when the result is available, or if the promise failes, any code you provide will be run.

- Don't confuse the promise with the result that it returns. The promise is scaffolding that facilitates the implementation of the asynchronous proces.

- In contrast to nested callbacks, promises simplify the syntax and readability of asynchronous scripts. They also make it easier to to sequence multiple async requests (one in response to another). Consider this unwieldy pseudo-code:
  ```
  placeOrder(toppings, function(order) {
    collectOrder(order, function(pizza) {
      eatPizza(pizza);
     }, failureCallback);
    }, failureCallback);
  }, failureCallback);
  ```

### Refresher on asynchronicity

- Despite advancements (Webpack, frameworks, Node) at the end of the day Javascript is a single-threaded, interpreted language.

  ![](/async-thread.drawio.svg)

- Thus it is (comparatively) slow and prone to bottlenecks and single-points of failure. Our transpiled TypeScript and then compiled Javascript is read line by line from top to bottom by the browser's interpreter.

- This creates potential issues with network calls or any processes that may not immediately return a value. In a single-threaded language, you cannot run these processes in parallel, you must send and wait for the request.

- The antidote is to handle these potential blockers asynchronously. This means the request is sent and the rest of the code continues to run. When the data returns it then rejoins the main flow of execution but the flow of execution is not halted in the meantime.

  ![](/async.drawio.svg)

- This creates the functional illusion of multi-threadedness despite JS limitations.

### Waiters

![](/sync-waiter.drawio.svg)

![](/multi-dine.drawio.svg)

### Syntax: Basic setup

### Syntax: Chaining

### Syntax: Catching

### `Promise.all`

### Alternative syntax : `async await`

### Discussion points

- Should we be using promises when writing new features? Promises and `toPromise` are used heavily in the codebase but perhaps it is better to use Observables and RXJS?

- How do people feel about `.then` contrasted with `async await`? Are we able to use `await` syntax when/if using promises in future work?
