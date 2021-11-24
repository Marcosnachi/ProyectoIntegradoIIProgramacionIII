import React, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

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
    if (this.state.email == "" || this.state.password == "") {
      this.setState({
        errorMessagge: "Completar los campos vacios",
      });
    } else if (
      !this.state.email.includes(("@" && ".com") || ("@" && ".com.ar"))
    ) {
      alert("El formato del mail no es correcto. Por favor, revíselo");
    } else {
      this.props.handleLogin(this.state.email, this.state.password);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.loader ? (
          <ActivityIndicator size="large" color="#F0B90B" />
        ) : (
          <>
            <Text style={styles.login}> Iniciar sesión </Text>
            <Text style={styles.email}>Email</Text>
            <TextInput
              style={styles.field}
              keyboardType="email-address"
              placeholder="Por favor, ingresa tu email"
              onChangeText={(text) => this.setState({ email: text })}
            />
            <Text style={styles.password}>Contraseña</Text>
            <TextInput
              style={styles.field}
              keyboardType="email-address"
              placeholder="Por favor, introduzca su contraseña"
              onChangeText={(text) => this.setState({ password: text })}
              secureTextEntry={true}
            />

            <TouchableOpacity
              style={
                this.state.email == "" || this.state.password == ""
                  ? styles.noButton
                  : styles.button
              }
              onPress={() => this.onLogin()}
              disabled={
                this.state.email == "" || this.state.password == ""
                  ? true
                  : false
              }
            >
              <Ionicons
                name="md-arrow-forward"
                size="40px"
                style={
                  this.state.email == "" || this.state.password == ""
                    ? styles.buttonOut
                    : styles.buttonIn
                }
              />
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
    backgroundColor: "#1c1c1c",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    color: "#fff",
    fontSize: "30px",
    paddingBottom: 10,
  },
  email: {
    paddingTop: 15,
    position: "relative",
    right: "150px",
    justifyContent: "flex-start",
    color: "#737373",
    fontWeight: "bold",
    fontSize: "15px",
  },
  password: {
    paddingTop: 15,
    position: "relative",
    right: "130px",
    justifyContent: "flex-start",
    color: "#737373",
    fontWeight: "bold",
    fontSize: "15px",
  },
  field: {
    width: "80%",
    backgroundColor: "#454545",
    color: "#fff",
    padding: 10,
    marginVertical: 10,
    outlineStyle: "none",
  },
  noButton: {
    marginLeft: 280,
    marginTop: 20,
    backgroundColor: "#424242",
  },
  button: {
    marginLeft: 280,
    marginTop: 20,
    backgroundColor: "#F0B90B",
  },
  buttonOut: {
    color: "gray",
  },
  buttonIn: {
    color: "black",
  },
  validation: {
    color: "red",
    marginVertical: 8,
  },
  button: {
    marginLeft: 280,
    marginTop: 20,
    backgroundColor: "#F0B90B",
  },
});
