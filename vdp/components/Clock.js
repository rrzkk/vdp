import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 0.4,
        backgroundColor: '#fff',
        flexDirection: "row",
        alignSelf: 'stretch'
    },
});

export default class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleString(),
            second: new Date().getSeconds(),
            minute: new Date().getMinutes(),
            hour: new Date().getHours(),
            day: new Date().getDate(),
            month: new Date().getMonth()+1,
            year: new Date().getFullYear()
        };
    }
    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    tick() {
        this.setState({
            time: new Date().toLocaleString(),
            second: new Date().getSeconds(),
            minute: new Date().getMinutes(),
            hour: new Date().getHours(),
            day: new Date().getDate(),
            month: new Date().getMonth()+1,
            year: new Date().getFullYear()
        });
    }
    render() {

        let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return (
            <View style={styles.container}>

                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 65 }}>{this.state.day}</Text>
                    <View>
                         <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 20 }}>{months[this.state.month-1]}</Text>
                        <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 20 }}>{this.state.year}</Text>
                    </View>

                </View>
                <View style={{ marginLeft: "auto", flexDirection: "row", marginTop: 30 }}>
                    <Text style={{ fontSize: 20 }}>{this.state.hour}:</Text>
                    <Text style={{ fontSize: 20 }}>{this.state.minute}</Text>

                </View>


            </View>
        );
    }
}