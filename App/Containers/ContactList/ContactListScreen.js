import React from 'react'
import { Text, View, ActivityIndicator, Image, PermissionsAndroid, FlatList, } from 'react-native'
import { ListItem, SearchBar } from "react-native-elements";
import Contacts from 'react-native-contacts';

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

class ContactListScreen extends React.Component {
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
    this._fetchUser()
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Search Here..." lightTheme round onChangeText={text => this.searchFilterFunction(text)}
    autoCorrect={false}
    value={this.state.value}/>;
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.contactList.filter(item => {
      const itemNameData = `${item.displayName.toUpperCase()}`;
      const textData = text.toUpperCase();
      const itemContactData = (item.phoneNumbers).filter(numberObject => {
        return numberObject.number.indexOf(textData) > -1;
      });
      return itemNameData.indexOf(textData) > -1 || itemContactData.length > 0;
    });
    this.setState({
      contacts: newData,
    });
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}> */}
          <FlatList
            data={this.state.contacts}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                title={item.displayName}
                subtitle={item.phoneNumbers[0].number}
                avatar={{ uri: item.thumbnailPath }}
                containerStyle={{ borderBottomWidth: 0 }}
              />
            )}
            keyExtractor={item => item.displayName}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
          />
        {/* </List> */}
      </View>
    );
  }

  _fetchUser() {
    try {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
      }).then(() => {
        this.setState({ loading: true });
        Contacts.getAll((err, list) => {
          if (err === 'denied') {
            this.setState({ error, loading: false });
          } else {
            this.setState({
              loading: false,
              contacts: list
            });
            this.contactList = list;
            console.log(JSON.stringify(this.contactList))
          }
        });
      });
    } catch (err) {
      console.log(err)
    }
  };
}

export default ContactListScreen
