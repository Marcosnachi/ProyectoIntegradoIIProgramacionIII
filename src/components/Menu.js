import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth } from "../firebase/config";
import Home from "../screens/Home";
import CreatePost from "../screens/CreatePost";
import MyProfile from "../screens/MyProfile";
import SearchUser from "../screens/SearchUser";
import Login from "../screens/login";
import Register from "../screens/Register";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      error: null,
      loader: true,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true,
        });
      }
      this.setState({
        loader: false,
      });
    });
  }

  handleLogin(email, password) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
        alert("logueado");

        this.setState({
          loggedIn: true,
        });
      })

      .catch((error) => {
        console.log(error);
        alert("Error en el login");
        this.setState({
          error: "Error en el login",
        });
      });
  }

  handleRegister(email, password, userName) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
        alert("registrado");

        response.user.updateProfile({
          displayName: userName,
        });

        this.setState({
          loggedIn: true,
        });
      })

      .catch((error) => {
        console.log(error);
        alert("Error en el registro");
        this.setState({
          error: "Error en el registro",
        });
      });
  }

  handleLogout() {
    let signOutConfirm = confirm(
      "Quieres salir de tu cuenta? Recordá que podrás volver a ingresar utilizando los mismos datos"
    );

    if (signOutConfirm) {
      auth
        .signOut()
        .then(() => {
          this.setState({
            loggedIn: false,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    const Tab = createBottomTabNavigator();

    return (
      <Tab.Navigator
        initialRouteName="Login"
        activeColor="#3e2465"
        inactiveColor="#8366ae"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Inicio") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Postear") {
              iconName = focused ? "camera" : "camera-outline";
            } else if (route.name === "Buscar") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Perfil") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Iniciar sesión") {
              iconName = focused ? "md-log-in" : "md-log-in-outline";
            } else if (route.name === "Registrar") {
              iconName = focused ? "person-add" : "person-add-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#F0B90B",
          tabBarInactiveTintColor: "#F0B90B",
        })}
        tabBarOptions={{
          activeBackgroundColor: "#1E2328",
          inactiveBackgroundColor: "#1E2328",
        }}
      >
        {this.state.loggedIn === true ? (
          <>
            <Tab.Screen name="Inicio">
              {(props) => <Home {...props} loader={this.state.loader} />}
            </Tab.Screen>
            <Tab.Screen name="Postear">
              {(props) => <CreatePost {...props} loader={this.state.loader} />}
            </Tab.Screen>
            <Tab.Screen name="Buscar">
              {(props) => (
                <SearchUser
                  {...props}
                  search={() => this.search()}
                  loader={this.state.loader}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Perfil">
              {(props) => (
                <MyProfile
                  {...props}
                  handleLogout={() => this.handleLogout()}
                />
              )}
            </Tab.Screen>
          </>
        ) : (
          <>
            <Tab.Screen name="Iniciar sesión">
              {(props) => (
                <Login
                  {...props}
                  handleLogin={(email, password) =>
                    this.handleLogin(email, password)
                  }
                  loader={this.state.loader}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Registrar">
              {(props) => (
                <Register
                  {...props}
                  handleRegister={(email, password, userName) =>
                    this.handleRegister(email, password, userName)
                  }
                />
              )}
            </Tab.Screen>
          </>
        )}
      </Tab.Navigator>
    );
  }
}
