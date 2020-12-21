import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class RadioButton extends Component {
    constructor() {
        super();
        // this.parentCallback = this.parentCallback.bind(this);
    }
    state = {
        value: null,
    };

    render() {
        const { PROP } = this.props;
        const { value } = this.state;
        const that = this

        return (
            <View>
                {PROP.map(res => {
                    return (
                        <View key={res.key} style={styles.container}>
                            <Text style={styles.radioText}>{res.text}</Text>
                            <TouchableOpacity
                                style={styles.radioCircle}
                                onPress={() => { 
                                    this.setState({
                                        value: res.key,
                                    })
                                    that.parentCallback(res.key)
                                }}>

                                {value === res.key && <View style={styles.selectedRb} />}
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </View>
        );
    }


    parentCallback = (value) => {
        console.log("value...", value)
        this.props.parentReference(value);
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 35,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 0
    },
    radioText: {
        marginRight: 35,
        fontSize: 20,
        color: '#000',
        fontWeight: '700'
    },
    radioCircle: {
        height: 30,
        width: 30,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#3740ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: 15,
        height: 15,
        borderRadius: 50,
        backgroundColor: '#3740ff',
    }
});