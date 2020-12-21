import React from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and informations about a fake user.
 * Feel free to remove it.
 */

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu.',
//   android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu.',
// })

class TimeCaptureScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeInText: new Animated.Value(0),
      fadeOutText: new Animated.Value(1),
      date: new Date(),
      mode: 'time',
      show: false
    };
    this.contactDetails = this.props.navigation.state.params.singleContactDetails;
  }
  componentDidMount() {
    this.fadeInText()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Animated.View style={{ opacity: this.state.fadeInText }}>
          <Text style={styles.lableStyle}>Let's pick the time to connect with {this.contactDetails.givenName}.</Text>
        </Animated.View>
        {this.state.show && (
          <DateTimePicker
            style={{ opacity: 0 }}
            testID="dateTimePicker"
            value={this.state.date}
            mode={this.state.mode}
            is24Hour={false}
            display="default"
            onChange={this.onChange}
          />
        )}
      </View>
    );
  }


  fadeInText() {
    this.state.fadeInText.setValue(0)
    Animated.timing(
      this.state.fadeInText,
      {
        toValue: 1,
        duration: 3000,
      }
    ).start(() => {this.setState({ show: true })});
  }

  fadeOutText() {
    Animated.timing(
      this.state.fadeInText,
      {
        toValue: 0,
        duration: 3000,
      }
    ).start();
  }

  onChange = (event, selectedTime) => {
    if (selectedTime) {
      selectedTime.getHours();
      selectedTime.getMinutes();
      console.log(selectedTime.getMinutes())
    }
    this.props.navigation.navigate('MainScreen');
  };
}

const styles = StyleSheet.create({
  lableStyle: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 30
  }
});

export default TimeCaptureScreen
