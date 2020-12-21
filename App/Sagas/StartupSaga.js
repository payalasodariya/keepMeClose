import NavigationService from 'App/Services/NavigationService'

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* startup() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html

  // Add more operations you need to do at startup here
  // ...

  // When those operations are finished we redirect to the main screen
  setTimeout(() => {
    // go to Home page
    NavigationService.navigateAndReset('MainScreen')
  }, 8000)
}
