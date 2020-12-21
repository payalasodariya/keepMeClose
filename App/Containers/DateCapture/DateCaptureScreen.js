import React from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import Picker from '@gregfrench/react-native-wheel-picker';
import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
var PickerItem = Picker.Item;
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

class DateCaptureScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeInText: new Animated.Value(0),
      fadeOutText: new Animated.Value(1),
      selectedMonth: 4,
      selectedDay: 5,
      monthList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      DaysList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
      show: false,
      date: new Date(),
      mode: 'time'
    };
    this.contactDetails = this.props.navigation.state.params.singleContactDetails;
    this.monthCapture = this.props.navigation.state.params.monthCapture;
    this.labelText = '';
  }
  componentDidMount() {
    this.setLable();
    this.fadeInText();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Animated.View style={{ opacity: this.state.fadeInText }}>
          <Text style={styles.lableStyle}>{this.labelText}</Text>
        </Animated.View>
        <View style={styles.pickerContainer}>
          {this.monthCapture && (<Picker style={{ width: 150, height: 180 }}
            lineColor="#000000" //to set top and bottom line color (Without gradients)
            lineGradientColorFrom="#008000" //to set top and bottom starting gradient line color
            lineGradientColorTo="#FF5733" //to set top and bottom ending gradient
            selectedValue={this.state.selectedMonth}
            itemStyle={{ color: "black", fontSize: 26 }}
            onValueChange={(index) => this.onPickerMonthSelect(index)}>
            {this.state.monthList.map((value, i) => (
              <PickerItem label={value} value={i} key={i} />
            ))}
          </Picker>
          )}
          <Picker style={{ width: 150, height: 180 }}
            lineColor="#000000" //to set top and bottom line color (Without gradients)
            lineGradientColorFrom="#008000" //to set top and bottom starting gradient line color
            lineGradientColorTo="#FF5733" //to set top and bottom ending gradient
            selectedValue={this.state.selectedDay}
            itemStyle={{ color: "black", fontSize: 35 }}
            onValueChange={(index) => this.onPickerDaySelect(index)}>
            {this.state.DaysList.map((value, i) => (
              <PickerItem label={value} value={i} key={i} />
            ))}
          </Picker>
        </View>
        <Button
          icon={{ name: 'check-circle', type: 'font-awesome', color: 'white' }}
          title="Add Details"
          containerStyle={styles.saveButtonContainer}
          onPress={this.addDetails}
        />
        {this.state.show && (
              <DateTimePicker
                style={{ opacity: 0 }}
                testID="dateTimePicker"
                value={this.state.date}
                mode={this.state.mode}
                is24Hour={false}
                display="default"
                onChange={this.onChange}
                key='DateTimePicker'
              />
            )}
      </View>
    );
  }

  onChange = (event, selectedTime) => {
    console.log("on change called", selectedTime)
    if (selectedTime) {
      this.setState({ show: false });
      selectedTime.getHours();
      selectedTime.getMinutes();
      console.log('time', selectedTime)
    }
  }

  addDetails = () => {
    console.log("...", JSON.stringify(this.state))// 'bar', what we expect it to be.
    this.setState({show: true});
    // this.props.navigation.navigate('MainScreen');
  }

  onPickerMonthSelect(index) {
    const year = new Date().getFullYear();
    const totalDays = this.getDaysInMonth(index + 1, year + 1);
    const daysArray = Array(totalDays).fill().map((x, i) => (i + 1).toString());
    this.setState({
      selectedMonth: index,
      DaysList: daysArray
    });
  }

  onPickerDaySelect(index) {
    console.log(index)
    this.setState({
      selectedDay: index
    });
    
  }

  getDaysInMonth = (month, year) => {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
    return new Date(year, month, 0).getDate();
  };

  setLable() {
    this.labelText = `Let's pick date to connect with ${this.contactDetails.givenName} every month.`
    if (this.monthCapture) {
      this.labelText = `Let's pick date and month to connect with ${this.contactDetails.givenName}.`
    }
  }

  fadeInText() {
    this.state.fadeInText.setValue(0)
    Animated.timing(
      this.state.fadeInText,
      {
        toValue: 1,
        duration: 3000,
      }
    ).start();
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
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: 50
  },
  saveButtonContainer: {
    alignSelf: 'center',
    width: '50%',
    marginTop: 80
    // bottom: 0
  }
});

export default DateCaptureScreen
