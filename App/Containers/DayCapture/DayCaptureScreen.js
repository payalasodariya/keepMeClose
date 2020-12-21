import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

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

class DayCaptureScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleCheckBox: false,
      weekDays: [
        { isChecked: false, name: 'monday', label: 'Monday' },
        { isChecked: false, name: 'tuesday', label: 'Tuesday' },
        { isChecked: false, name: 'wednesday', label: 'Wednesday' },
        { isChecked: false, name: 'thursday', label: 'Thursday' },
        { isChecked: false, name: 'friday', label: 'Friday' },
        { isChecked: false, name: 'saturday', label: 'Saturday' },
        { isChecked: false, name: 'sunday', label: 'Sunday' }
      ],
      growingTrees: [{
        main: require('../../Assets/Images/growingTree/step-1.gif'),
        reverse: require('../../Assets/Images/growingTree/step1reverse.gif')
      },
      {
        main: require('../../Assets/Images/growingTree/step-2.gif'),
        reverse: require('../../Assets/Images/growingTree/step2reverse.gif')
      },
      {
        main: require('../../Assets/Images/growingTree/step-3.gif'),
        reverse: require('../../Assets/Images/growingTree/step3reverse.gif')
      },
      {
        main: require('../../Assets/Images/growingTree/step-4.gif'),
        reverse: require('../../Assets/Images/growingTree/step4reverse.gif')
      }],
      frameIndex: 0,
      frameType: 'main',
      date: new Date(),
      mode: 'time',
      show: false
    };
    this.weekDays = [
      { isChecked: false, name: 'monday', label: 'Monday' },
      { isChecked: false, name: 'tuesday', label: 'Tuesday' },
      { isChecked: false, name: 'wednesday', label: 'Wednesday' },
      { isChecked: false, name: 'thursday', label: 'Thursday' },
      { isChecked: false, name: 'friday', label: 'Friday' },
      { isChecked: false, name: 'saturday', label: 'Saturday' },
      { isChecked: false, name: 'sunday', label: 'Sunday' }
    ];
    this.reverseFrameIndex = 0;
    this.currentItem = {};
    this.requestJSON = [];
    this.contactDetails = this.props.navigation.state.params.singleContactDetails;
    this.props = this.props
  }
  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.frameIndex > -1 && (<ImageBackground style={styles.backgroundImage} source={this.state.growingTrees[this.state.frameIndex][this.state.frameType]} blurRadius={1}>
          <Text style={styles.lableStyle}>On which days you want to connect with {this.contactDetails.givenName}?</Text>
          <View style={styles.checkboxContainer}>
            {this.state.weekDays.map((item, index) => (
              <View style={styles.checkboxRow}>
                <Text style={styles.itemText} key={item.name + 'label'}>{item.label}</Text>
                <Switch
                  trackColor={{ false: "grey", true: "blue" }}
                  thumbColor="#f4f3f4"
                  ios_backgroundColor="gray"
                  style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                  onValueChange={(value) => this.setToggleCheckBox(index, value, item)}
                  value={item.isChecked}
                  key={item.name + 'switch'}
                />
              </View>
            ))}
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
          <Button
              icon={{name: 'check-circle', type: 'font-awesome', color: 'white'}} 
              title="Save Call Details"
              containerStyle={styles.saveButtonContainer}
              onPress={this.saveCallDetails}
            />
        </ImageBackground>)}
      </View>
    );
  }

  saveCallDetails = () => {
    this.props.navigation.navigate('MainScreen');
  }

  setToggleCheckBox = (index, value, item) => {
    this.weekDays[index]['isChecked'] = value;
    const totalChecked = this.weekDays.filter((item) => { return item.isChecked === true });
    this.currentItem = item;
    this.setState({ 'weekDays': this.weekDays });
    if (value) {
      this.setState({ show: true });
      console.log('if', value)
      if (totalChecked.length <= 4 && this.state.frameIndex < 3) {
        this.state.frameIndex = this.reverseFrameIndex;
        this.setState({ frameIndex: ++this.state.frameIndex, frameType: 'main' });
        this.reverseFrameIndex = this.state.frameIndex;
      }
    } else {
      if (totalChecked.length <= 2 && this.state.frameIndex > -1) {
        this.setState({ frameIndex: this.reverseFrameIndex, frameType: 'reverse' });
        this.reverseFrameIndex = this.reverseFrameIndex - 1;
        this.removeItemRequestJson();
      }
    }
  }

  removeItemRequestJson = () => {
    this.requestJSON.forEach((singleJson, index) => {
      if (singleJson.day === this.currentItem.name) {
        this.requestJSON.splice(index, 1)
      }
    });
  }

  onChange = (event, selectedTime) => {
    if (selectedTime && (Object.keys(this.currentItem)).length > 0) {
      this.setState({ show: false });
      const singleJson = {}
      singleJson.day = this.currentItem.name.toLowerCase();
      singleJson.time = selectedTime;
      this.requestJSON.push(singleJson);
      selectedTime.getHours();
      selectedTime.getMinutes();
      console.log(JSON.stringify(this.requestJSON))
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  checkboxRow: {
    left: 50,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 40,
    marginTop: 30
  },
  lableStyle: {
    fontSize: 30,
    textAlign: "center",
    margin: 20,
    marginTop: 40,
    marginBottom: 0
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  },
  itemText: {
    fontSize: 20,
    marginRight: 40
  },
  checkboxContainer: {
    alignContent: "center"
  },
  saveButtonContainer: {
    width: '100%',
    position: "absolute",
    bottom: 0
  }
});

export default DayCaptureScreen
