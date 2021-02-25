import React, { useState } from 'react';
//import { useNavigation, DrawerActions } from '@react-navigation/native';
//import { View, Platform, Text, ScrollView, Image, StyleSheet, SafeAreaView } from 'react-native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { View, Platform, Text } from 'react-native';




import Appointment from './Appointment';
import Chat from './Chat';
import Setting from './Setting';
import Icon from 'react-native-vector-icons/Feather';

const Stack = createStackNavigator();

function MyStack() {
    const [logIn, setLogin] = useState(true);

    return (
        <Stack.Navigator
            initialRouteName={logIn ? "Setting" : "Appointment"}
            screenOptions={{ headerStyle: { backgroundColor: "#2E86C1" } }}
        >
            <Stack.Screen
                name="Setting"
                component={Setting}
                options={{
                    title: 'Setting',
                    headerTintColor: '#FDFEFE',
                    headerTitleAlign: "center"
                }}
            />
            <Stack.Screen name="Appointment" component={Appointment}

                options={({ navigation }) => ({
                    title: 'Verbal Diary',
                    headerTintColor: '#FDFEFE',
                    headerTitleAlign: "center",
                    headerLeft: null,
                    headerRight: () => (
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <Icon name="settings"  onPress={()=>{navigation.navigate("Setting")}} 
                            color="white" 
                            size={20}
                            style={{alignSelf:"center",marginRight:5}}></Icon>
                            <Text style={{ alignSelf: "center", marginRight: 5,fontSize:16,color:"white"}}>
                           
                            </Text>
                        </View>)
                })}
            />
            <Stack.Screen name="Chat" component={Chat}
                options={{
                    title: 'Verbal Diary',
                    headerTintColor: '#FDFEFE',
                    headerTitleAlign: "center",
                    headerBackTitleVisible: true,
                    headerBackTitle: "Back"
                }}

            />
        </Stack.Navigator>
    );
}

export default function Main() {
    return (
        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : 1 }}>
            <MyStack />
        </View>
    );
}

