import React from 'react'
import { Text, View } from 'react-native'
import styles from './SplashScreenStyle'
import { Helpers } from 'App/Theme'
import WalkingLadyAnimation from '../../Components/WalkingLadyAnimation'

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerBundle}>
          {/* You will probably want to insert your logo here */}
          <WalkingLadyAnimation PROP=""></WalkingLadyAnimation>
        </View>
      </View>
    )
  }
}
