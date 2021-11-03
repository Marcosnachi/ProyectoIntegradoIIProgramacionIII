import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from '../screens/login';
import Register from '../screens/Register';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import { auth } from '../firebase/config';

export default class Menu extends Component {

    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            error: null

        }
    }




  handleLogin(email, password){

    auth.signInWithEmailAndPassword(email, password)
    .then( response => {
        console.log(response);
        alert('logueado');
        
        this.setState({
            loggedIn: true
        })
    })

    .catch( response => {
        console.log(response);
        alert('error');
        this.setState({
            error: 'error'
        })
    })
}


handleRegister(email, password) {
        
    auth.createUserWithEmailAndPassword(email, password)
    .then( response => {
        console.log(response);
        alert("registrado");
        
        this.setState({
            loggedIn: true
        })
    })

    .catch( error => {
        console.log(error);
        alert("Error en el registro");
        this.setState({
            error: "error en el registro"
        })
    })
}
    

render(){
    const Drawer = createDrawerNavigator();
  return (
    


        <NavigationContainer>
        <Drawer.Navigator initialRouteName="Login">
        {this.state.loggedIn === true ?

          <Drawer.Screen name = "Home" component={Home}></Drawer.Screen>
          
          :
<>
          <Drawer.Screen name = "Login">
              {props => <Login {...props} handleLogin= {(email, password) => this.handleLogin(email, password)}/>}
          </Drawer.Screen>
          <Drawer.Screen name = "Register">
              {props => <Register {...props} handleRegister= {(email, password) => this.handleRegister(email, password)}/>}
          </Drawer.Screen>
</>

}
          
          
        </Drawer.Navigator>
        </NavigationContainer>
      
      
      
    
  );
}
}