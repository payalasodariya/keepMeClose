import React from 'react'
import { View, ActivityIndicator, PermissionsAndroid, FlatList, StyleSheet} from 'react-native'
import { ListItem, SearchBar, Avatar } from "react-native-elements";
import Contacts from 'react-native-contacts';
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

class ContactListScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      contacts: [],
      error: null
    };
    this.contactList = [];
  }
  async componentDidMount() {
    await this._fetchUser()
  }


  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "90%",
          backgroundColor: "#CED0CE",
          marginLeft: "5%",
          marginRight: "5%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Search Here..." lightTheme round onChangeText={text => this.searchFilterFunction(text)}
      autoCorrect={false}
      value={this.state.value} />;
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
        <FlatList
          data={this.state.contacts}
          renderItem={({ item }) => (
            <ListItem onPress={() => this.navigateToContactFrequency(item)}>
              <ListItem.Content style={styles.row}>
                {item.hasThumbnail
                  ? <Avatar rounded size="medium" source={{ uri: item.thumbnailPath }}/>
                  : <Avatar rounded size="medium" title={ ((item.givenName).charAt(0)).toUpperCase()} overlayContainerStyle={{backgroundColor: item.avtarColor}} titleStyle={styles.title}/>
                }
                <View style={styles.addPad}>
                  <ListItem.Title>{item.displayName}</ListItem.Title>
                  <ListItem.Subtitle>{item.phoneNumbers[0].number}</ListItem.Subtitle>
                </View>  
                <View style={styles.alignRight}>
                  <Icon name="angle-right" color="#778899" size={30}/>  
                </View> 
              </ListItem.Content>
            </ListItem>
          )}
          keyExtractor={(item, index) => {return index.toString();}}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }

  navigateToContactFrequency = (item) => {
    console.log("item", JSON.stringify(item))
    this.props.navigation.navigate('ContactFrequency', {
      singleContactDetails: item,
    });
  }

  _fetchUser() {
    try {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
      }).then(() => {
        this.setState({ loading: true });
        Contacts.getAll(async (err, list) => {
          if (err === 'denied') {
            this.setState({ error, loading: false });
          } else {
            this.setState({
              loading: false,
              contacts: list
            });
            this.contactList = list;
            await this.setAvtarColor();
            return this.contactList;
            // console.log(JSON.stringify(this.contactList))
          }
        });
      });
    } catch (err) {
      console.log(err)
    }
  };

  setAvtarColor() {
    this.contactList.forEach((contact,index) => {
      contact.avtarColor = this.getRandomColor();
      if ( contact.phoneNumbers.length === 0 ) {
        this.contactList.splice(index, 1);
      }
    });
  }
  
  getRandomColor() {
    const colorPalette = ["#F08080", "#FFA500", "#BDB76B", "#8FBC8F"];
    return colorPalette[Math.floor(Math.random()*colorPalette.length)];
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 0,
    justifyContent: "flex-start"
  },
  addPad: {
    paddingLeft: "5%"
  },
  title: {
    margin: 5,
    fontSize: 18,
    fontWeight: "600",
    color: "white"
  },
  alignRight: {
    marginLeft: 'auto'
  }
});

export default ContactListScreen
