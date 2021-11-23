import React, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessagge: "",
    };
  }

  onLogin() {
    if (this.state.email !== "" && this.state.password !== "") {
      this.props.handleLogin(this.state.email, this.state.password);
    } else {
      this.setState({
        errorMessagge: "Completar los campos vacios",
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.loader ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <>
            <Text> Login </Text>
            <TextInput
              style={styles.field}
              keyboardType="email-address"
              placeholder="Email"
              onChangeText={(text) => this.setState({ email: text })}
            />

            <TextInput
              style={styles.field}
              keyboardType="email-address"
              placeholder="Password"
              onChangeText={(text) => this.setState({ password: text })}
              secureTextEntry={true}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.onLogin()}
            >
              <Text style={styles.text}> Login </Text>
            </TouchableOpacity>

            <Text style={styles.validation}> {this.state.errorMessagge}</Text>
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  field: {
    width: "80%",
    backgroundColor: "#F78812",
    color: "#51050F",
    padding: 10,
    marginVertical: 10,
  },
  validation: {
    color: "red",
    marginVertical: 8,
  },
  button: {
    width: "30%",
    backgroundColor: "#AB6D23",
  },
  text: {
    color: "#51050F",
    textAlign: "center",
  },
});
