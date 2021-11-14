import React, {Component} from "react";
import { TextInput, TouchableOpacity, Text, View, StyleSheet } from "react-native";


export default class Register extends Component {
    constructor (props){
        super(props);
        this.state = {
            userName: '',
            email: '',
            password: ''
            
        }
    }

    
    

    render(){
        return(
                <View style = {styles.container}>
                <Text> Register </Text>

                <TextInput
                style = {styles.field}
                keyboardType = 'default'
                placeholder = 'User name'
                onChangeText = {text => this.setState({userName: text})}
                />

                <TextInput
                style = {styles.field}
                keyboardType = 'email-address'
                placeholder = 'Email'
                onChangeText = {text => this.setState({email: text})}
                />

                <TextInput
                style = {styles.field}
                keyboardType = 'email-address'
                placeholder = 'Password'
                onChangeText = {text => this.setState({password: text})}
                secureTextEntry = {true}
                />
                
                <TouchableOpacity style = {styles.button} onPress = {()=> this.props.handleRegister(this.state.email, this.state.password, this.state.userName)}>

                 <Text style = {styles.text}> Register </Text> 

                </TouchableOpacity>


            </View>
        )
    }
}


const styles = StyleSheet.create({

    container:{
        flex: 1,
        alignItems: "center",
        
    },
    field:{
        width: '80%',
        backgroundColor: '#F78812',
        color: '#51050F',
        padding: 10,
        marginVertical: 10,
        
    },
    button:{
        width: '30%',
        backgroundColor: '#AB6D23',
        
        
    },
    text:{
        color: '#51050F',
        textAlign: "center",
        
    }


})