# A Simple Higher Order Component to Add Polling Functionality

## Run

`npm install`

`npm start`

## Structure

The application structure is as follows:

_/src_

- App

  _/components_

  - Posts
  - Post
  - WithPolling

  _/services_

  - PostsService

## Technical Summary

- A **PostsService** singleton is imported to App from _/services_
- In the **App** component's constructor, **PostsWithPolling** is instantiated by calling the Higher Order Component **WithPolling** with the WrappedComponent, a callback function and a configuration object.

```
constructor(props) {
    super(props)
    this.PostsWithPolling = WithPolling(Posts, PostsService.getPosts, {
      interval: 3000
    });
  }
```

- WithPolling is a function that returns a new Component class, extending React.Component.
- Properties:
  - _timeout_: tracks the id of a given timeout, created when polling commences
  - _onPoll_: calls the callback function, passed as the 2nd argument to the **WithPolling** function. When the callback function's promise has resolved, **WithPolling** sets the property _data_ on it's state; setState is passed a callback function that calls _startPolling_, thus establishing the recursion typically utilized for polling.
  - _startPolling_: calls _stopPolling_, and creates a new timeout with arguments _onPoll_ and the interval (passed as params to WithHolding)
  - _stopPolling_: clears _timeout_ and is called in the React life cycle method _componentWillUnmount_
- The new component returns an instance of the WrappedComponent class, having called the callback _componentDidMount_

## Design Considerations

- Cleaning up _timeout_
  - While this simple example instantiates a single instance of Posts, suppose we had a bunch of components that were polling for data.
  - As components were instantiated and destroyed, new timeouts would be set on the window object and potentially never removed. This creates a memory leak, and is a best practice for any observable to garbage collect existing global objects when the component is destroyed
- _onPoll_ as a seperate function from _startPolling_
  - typically, a recursive function calls itself. In this example, the recursion is established when a the method _onPoll_ calls _startPolling_
  - For most cases, polling is established after the function has initially been called; breaking the data transformation and promise resolution logic into a seperate method allows the call to our Service to happen after mounting; after this initial call, recursion is established and polling continues on a set interval.
- _startPolling_ called after promise resolution
  - Depending on your infrastructure constraints, the "cost" of the callback method, and the desired behavior of your web application this may or may not be ideal
  - Suppose the server takes longer then your interval to resolve this request, given your application's traffic and devoted resources. If the callback hasn't resolved, and we've triggered another call to the server for this data, we would be queing up calls for the same information (albeit some more recent then others).
  - The downside to establishing this recursion at promise resolution is that the true interval at which our callback is called is actually _interval passed as params_ _+_ _the trip time of our callback_
- _params_ argument
  - Why pass a params argument to the higher order component instead of a property from props? Depending on the size of your application, props can be very bloated. Say our App has pagination, supported in our API as a query parameter (i.e. www.example.com/api/posts?page=1). if the application takes a query param from our router, reflecting the current page, and sets a local state variable named currentPage to reflect this value... Needless to say, it's easy to imagine a situation where you have conflicting variable declarations. Passing in a params argument when polling is instantiated clearly seperates the definition of request parameters from application/page/parent component variables.

## Possible Functionality Improvements

- Add a boolean parameter that, when present, establishs recursion in the timeout's callback, and cancels outstanding promises
- Add a higher order component **WithLoading** that displays an application spinner for unresolved data
- Conditionally render the WrappedComponent, based on whether data from our API has resolved.
- Add comments / document methods
- Allow for params (used in the callback) to be passed as props

\*Note: This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
