import React, { Component } from 'react';
import { View, Image, Animated, StyleSheet, Easing } from 'react-native';

export default class WalkingLadyAnimation extends Component {
    constructor() {
        super();
        this.state = {
            leftPosition: new Animated.Value(0),
            walkingLadySrc: require('../Assets/Images/walkingLady.gif')
        }
        
    }

    componentDidMount() {
        this.state.leftPosition._value === 0 ? this.mooveLR() : this.mooveRL() // repeats always when the red box return to its initial position : leftPosition === 0
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={{ left: this.state.leftPosition }}>
                    <Image style={styles.walkingLady} source={this.state.walkingLadySrc}/>
                </Animated.View>
                <View>
                    <Image style={styles.oldCouple} source={require('../Assets/Images/oldCouple.png')} ></Image>
                </View>
            </View>
        );
    }

    stopAnimation = () => {
        this.setState({
            leftPosition: this.state.leftPosition // this forces the left position to remain the same considering the `componentDidMount` method already happened
        })
    }

    mooveLR() {
        Animated.timing(
            this.state.leftPosition,
            {
                toValue: 150,
                duration: 3000, // the duration of the animation
                easing: Easing.linear, // the style of animation 
            }
        ).start(() => {
            this.setState({walkingLadySrc: require('../Assets/Images/stopedLady.png')})
        }) // starts this annimation once this method is called
    }

    mooveRL() {
        Animated.timing(
            this.state.leftPosition,
            {
                toValue: 0,
                duration: 3000, // the duration of the animation
                easing: Easing.linear, // the style of animation 
            }
        ).start(() => this.mooveLR()) // starts this annimation once this method is called
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 35,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 0,
        backgroundColor: 'white'
    },
    oldCouple: {
        right: 80,
        width: 100,
        height: 170
    },
    walkingLady: {
        top: 0,
        width: 90,
        height: 150,
        resizeMode: 'cover'
    }
});
