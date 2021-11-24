import React, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { auth, db } from "../firebase/config";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      password: "",
      repeatPassword: "",
      errorMessagge: "",
      users: [],
    };
  }

  componentDidMount() {
    db.collection("users").onSnapshot((docs) => {
      let usersAux = [];
      docs.forEach((doc) => {
        usersAux.push(doc.data());
      });
      this.setState({
        users: usersAux,
      });
    });
    console.log(this.state.users);
  }

  onRegister() {
    if (
      this.state.email == "" &&
      this.state.password == "" &&
      this.state.userName == ""
    ) {
      this.setState({
        errorMessagge: "Completar los campos vacios",
      });
    } else if (
      !this.state.email.includes(("@" && ".com") || ("@" && ".com.ar"))
    ) {
      alert("El formato del mail no es correcto. Por favor, revíselo");
    } else if (this.state.password !== this.state.repeatPassword) {
      alert("Las contraseñas no coinciden. Por favor, revíselas");
    } else if (this.state.password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
    } else {
      this.props.handleRegister(
        this.state.email,
        this.state.password,
        this.state.userName
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.register}> Registrar </Text>

        <Text style={styles.username}>Nombre de usuario</Text>
        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="Por favor, escriba tu nombre de usuario"
          onChangeText={(text) => this.setState({ userName: text })}
        />
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
        <Text style={styles.repeatPassword}>Repetir contraseña</Text>
        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="Por favor, repita su contraseña"
          onChangeText={(text) => this.setState({ repeatPassword: text })}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={
            this.state.userName == "" ||
            this.state.email == "" ||
            this.state.password == "" ||
            this.state.repeatPassword == ""
              ? styles.noButton
              : styles.button
          }
          onPress={() => this.onRegister()}
          disabled={
            this.state.userName == "" ||
            this.state.email == "" ||
            this.state.password == "" ||
            this.state.repeatPassword == ""
              ? true
              : false
          }
        >
          <Ionicons
            name="md-arrow-forward"
            size="40px"
            style={
              this.state.userName == "" ||
              this.state.email == "" ||
              this.state.password == "" ||
              this.state.repeatPassword == ""
                ? styles.buttonOut
                : styles.buttonIn
            }
          />
        </TouchableOpacity>

        <Text style={styles.validation}> {this.state.errorMessagge}</Text>
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
  register: {
    color: "#fff",
    fontSize: "30px",
    paddingBottom: 10,
  },
  username: {
    paddingTop: 15,
    position: "relative",
    right: "100px",
    justifyContent: "flex-start",
    color: "#737373",
    fontWeight: "bold",
    fontSize: "15px",
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
  repeatPassword: {
    paddingTop: 15,
    position: "relative",
    right: "105px",
    justifyContent: "flex-start",
    color: "#737373",
    fontWeight: "bold",
    fontSize: "15px",
  },
  validation: {
    color: "red",
    marginVertical: 8,
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
  text: {
    color: "#51050F",
    textAlign: "center",
  },
});
