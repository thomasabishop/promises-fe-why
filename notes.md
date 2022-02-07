## Promises: Frontend Why Session

#### Tues, 1 February 2021

### Concept

- A promise is constuct in Javascript that represents the intermediate stage of an execution that returns a value.

- It comprises an object that takes as parameters two functions corresponding to the states of resolve and reject.

- Promises are _asynchronous_: there is no guarantee of exactly when the operation will complete but there is a guarantee that when the result is available, or if the promise fails, the code you provide for either of these eventualities will run.

![](/img/diagram.png)

- In contrast to nested callbacks, promises simplify the syntax and readability of asynchronous scripts. They also make it easier to to sequence multiple async requests (one in response to another).

  ```
  placeOrder(toppings, function(order) {
    collectOrder(order, function(pizza) {
      eatPizza(pizza);
     }, failureCallback);
    }, failureCallback);
  }, failureCallback);
  ```

### Refresher on asynchronicity

- Javascript is a single-threaded, interpreted language. Our transpiled TypeScript and then (Webpack) compiled Javascript is read line by line from top to bottom by the browser's interpreter.

- This creates potential issues with network calls or any processes that may not immediately return a value. In a single-threaded language, you cannot run these processes concurrently, you must send and wait for the request.

![](/img/sync-thread.svg)

- The antidote is to handle these potential blockers asynchronously. This means the request is sent and the rest of the code continues to run. When the data returns it then rejoins the main flow of execution but the flow of execution is not halted in the meantime.

  ![](/img/async.svg)

### Waiters

#### Synchronous scenario

![](/img/sync-waiter.svg)

#### Concurrent scenario

![](/img/thread-waiter.svg)

#### Asynchronous scenario

![](/img/async-waiter.svg)

### Best practices

- Always have a catch statement, no matter how trivial the process
- Remember you can have multiple `reject` clauses
- Invoke `finally` when necessary.
- If using `async await`, scaffold with `try/catch` blocks
- If running multiple unrelated promises at once, use `Promise.all`

### Observables versus promises: key differences to consider

- Bear in mind this is a bit apples and oranges but Angular enshrines Reactive Programming principles so probably best to lean into that rather than introduce promises, going forwar/ when possible.
- Promises execute at definition. Observables are not executed until a consumer subscribes. This arguably gives you freedom to work more horizontally, you less tied to a sequential vertical block.
- Promises are discrete in that execute just once and you are tied to the initial resolution value in each subsequent `then`. To restart you have to rerun the promise or create a new one. In contrast subscriptions are a continuous stream of data you can tap into at different points through subscription/unsubscription.
- Being discrete, promises are not cancellable. You would have to remove the promise from the code to stop its propagation.
- Think of a tap (observables) versus a syringe (promises)

### Discussion points

- Are there scenarios where the older callback method would be preferable? Are there any useful examples of this in the code?

- Should we be using promises when writing new features? Promises and `toPromise` are used heavily in the codebase but perhaps it is better to use Observables and RXJS?

- How do people feel about `.then` contrasted with `async await`? Are we able to use `await` syntax when/if using promises in future work?

### Resources

[Using async/await syntax in Angular](https://www.techiediaries.com/javascript-async-await-tutorial/)

[Angular observables compared to promises](https://angular.io/guide/comparing-observables)

[Aren't promises just callbacks?](https://stackoverflow.com/questions/22539815/arent-promises-just-callbacks)

[Five things to know about reactive programming](https://developers.redhat.com/blog/2017/06/30/5-things-to-know-about-reactive-programming)
