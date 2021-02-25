import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, ButtonGroup, CheckBox } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';




export default function Setting() {
    const navigation = useNavigation();
    const [gender, setGender] = useState('Male');//Female
    const [ageGroup, setAgeGroup] = useState('Teenagers');//Adults Children
    const genderButton = ['Male', 'Female'];
    const ageButton = ['Children (Under 12)', 'Teenagers (12 to 18)', 'Adults (Over 18)']
    const [uniqueId, setUniqueId] = useState('');
    const recordingMethods =['sound','vedio'];
    const [recordingMethod, setMethod]= useState('sound');


    useEffect(() => {
        setUniqueId(DeviceInfo.getUniqueId());
    });






    return (
        <View style={{ display: "flex", flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Text style={{ margin: 20, fontWeight: 'bold' }}>Select Your Gender</Text>
                <ButtonGroup
                    onPress={(selectedIndex) => { setGender(selectedIndex === 0 ? 'Male' : 'Female') }}
                    buttons={genderButton}
                    selectedIndex={gender === 'Male' ? 0 : 1}
                />

                <Text style={{ margin: 20, fontWeight: 'bold' }}>Select Your Reocording Methods</Text>
                <ButtonGroup
                    onPress={(selectedIndex) => { setMethod(selectedIndex === 0 ? 'Sound' : 'Vedio') }}
                    buttons={recordingMethods}
                    selectedIndex={recordingMethod === 'Sound' ? 0 : 1}
                />


                <Text style={{ margin: 20, fontWeight: 'bold' }}>Select Your Age Group</Text>

                <ButtonGroup
                    vertical={true}
                    buttons={ageButton}
                    containerStyle={{ height: 200 }}
                    selectedIndex={ageGroup === 'Children' ? 0 : ageGroup === 'Teenagers' ? 1 : 2}
                    onPress={selectedIndex => { setAgeGroup(selectedIndex === 0 ? 'Children' : selectedIndex === 1 ? 'Teenagers' : 'Adults') }}
                />

                <Button title="Set"
                    onPress={() => {
                        navigation.navigate('Appointment', { gender: gender,recordingMethod:recordingMethod })
                    }}
                    containerStyle={{ marginHorizontal: 100, marginVertical: 50 }}
                />
            </View>

            <View style={{}}>
                <Text style={{ textAlign: "center", marginBottom: 40 }}>Your device Id is {uniqueId}</Text>
            </View>
        </View>
    );
}

