import React from 'react'
import { View, Text, StyleSheet} from 'react-native'

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

class ContactFrequencyScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      datcontactsa: [],
      error: null
    };
    this.contactList = [];
  }
  componentDidMount() {
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>New Screen</Text>
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
  }
});

export default ContactFrequencyScreen
