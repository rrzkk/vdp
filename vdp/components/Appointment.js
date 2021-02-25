import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import dataJson from '../fakeDataBase.json';



function categories(data) {
    let categories = {};
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let e = item.date;
        if (!(e in categories)) {
            categories[e] = [];
        }
        categories[e].push(item);
    }
    return categories;
}

function pressButton(el,navigation,clickedNum,addNum,gender,recordingMethod){
    navigation.navigate('Chat', { id: el.id ,gender:gender,recordingMethod:recordingMethod});
    
    addNum([...clickedNum, el.id])
    
}

function renderSubList(subContent,clickedNum,addNum,gender,recordingMethod) {
  
    return subContent.map(el => {
        const navigation = useNavigation();
        let list=[...clickedNum];
        return (
            <TouchableWithoutFeedback onPress={() => pressButton(el,navigation,clickedNum,addNum,gender,recordingMethod)} key={el.id}>
                <View style={styles.cardStyle} >
                    {list.includes(el.id)?<Image source={require('./AppointmentIcons/checked.png')} style={{ width:40, height: 40,marginRight:20,marginLeft:30}} />:
                    <Image source={require('./AppointmentIcons/unchecked.png')} style={{ width:40, height: 40,marginRight:20,marginLeft:30}} />}
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 17 }}>Question {el.id}</Text>

                        <Text style={{ fontSize: 17 }}>{el.time}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        )
    })
}

function renderList(categorizedData,clickedNum,addNum,gender,recordingMethod) {

    return Object.keys(categorizedData).map(
        (key, number) => {
            let subContent = categorizedData[key];
            return (
                <View key={number}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", alignSelf: "center",marginVertical:10 }}>{key}</Text>
                    {renderSubList(subContent,clickedNum,addNum,gender,recordingMethod)}
                </View>);
        }
    )

}

export default function Appointment({route}) {

    const categorizedData = categories(dataJson);
    const [clickedNum,addNum]=useState([]);
    const {gender,recordingMethod}=route.params;
    
    

    return (
        <ScrollView contentContainerStyle={{ alignItems: "stretch", padding: 20 }} >
            
            <View >

                {renderList(categorizedData,clickedNum,addNum,gender,recordingMethod)}
            </View>


        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center"
    },
    cardStyle: {
        display: "flex",
        flexDirection: "row",
        margin: 10,
        borderColor: "#17202A",
        borderStyle: "solid",
        borderWidth: 2,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth:0
    }
});
