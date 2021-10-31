import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from '../screens/login';
import Register from '../screens/Register';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

export default function App() {

  const Drawer = createDrawerNavigator();

  return (
    


        
        <Drawer.Navigator initialRouteName="Login">
          <Drawer.Screen name = "Login" component={Login}></Drawer.Screen>
          <Drawer.Screen name = "Register" component={Register}></Drawer.Screen>
        </Drawer.Navigator>
      
      
      
    
  );
}