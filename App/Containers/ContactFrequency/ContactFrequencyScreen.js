import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RadioButton from '../../Components/RadioButton';
/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and informations about a fake user.
 * Feel free to remove it.
 */

const frequencyOptions = [
  {
    key: 'daily',
    text: 'Daily',
  },
  {
    key: 'weekly',
    text: 'Weekly',
  },
  {
    key: 'monthly',
    text: 'Monthly',
  },
  {
    key: 'yearly',
    text: 'Yearly',
  },
];

class ContactFrequencyScreen extends React.Component {
  constructor(props) {
    super(props)
    this.valueSelected = this.valueSelected.bind(this);
    this.contactDetails = this.props.navigation.state.params.singleContactDetails;
  }

  valueSelected = (data) => {
    console.log("data", data)
    switch (data) {
      case 'daily':
        this.props.navigation.navigate('TimeCapture', {
          singleContactDetails: this.contactDetails
        });
        break;
      case 'weekly':
        this.props.navigation.navigate('DayCapture', {
          singleContactDetails: this.contactDetails
        });
        break;
      case 'monthly':
        this.props.navigation.navigate('DateCapture', {
          singleContactDetails: this.contactDetails,
          monthCapture: false
        });
        break;
      case 'yearly':
        this.props.navigation.navigate('DateCapture', {
          singleContactDetails: this.contactDetails,
          monthCapture: true
        });
        break;
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.lableStyle}>How frequent do you want to connect with {this.contactDetails.givenName} ?</Text>
        <View style={styles.container}>
          <RadioButton PROP={frequencyOptions} parentReference={this.valueSelected} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 0,
    justifyContent: "flex-start"
  },
  lableStyle: {
    fontSize: 30,
    textAlign: "center",
    margin: 20,
    marginTop: 40,
    marginBottom: 0
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 70
  }
});

export default ContactFrequencyScreen
