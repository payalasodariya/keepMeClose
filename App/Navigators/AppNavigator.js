import { createAppContainer, createStackNavigator } from 'react-navigation'

import ContactListScreen from 'App/Containers/ContactList/ContactListScreen'
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'
import ContactFrequencyScreen from '../Containers/ContactFrequency/ContactFrequencyScreen'
import { transitionConfig } from '../Theme/transitionConfig'
/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const StackNavigator = createStackNavigator(
  {
    // Create the application routes here (the key is the route name, the value is the target screen)
    // See https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
    SplashScreen: SplashScreen,
    // The main application screen is our "ExampleScreen". Feel free to replace it with your
    // own screen and remove the example.
    MainScreen: ContactListScreen,
    ContactFrequency: ContactFrequencyScreen
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'SplashScreen',
    transitionConfig,
    // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
    headerMode: 'none',
  }
)

export default createAppContainer(StackNavigator)
