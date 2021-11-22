import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "../screens/login";
import Register from "../screens/Register";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import { auth } from "../firebase/config";
import CreatePost from "../screens/CreatePost";
import MyProfile from "../screens/MyProfile";
import SearchUser from "../screens/SearchUser";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      error: null,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true,
        });
      }
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

  render() {
    const Drawer = createBottomTabNavigator();

    return (
      <Drawer.Navigator
        initialRouteName="Login"
        screenOptions={{
          tabBarActiveTintColor: "#e91e63",
        }}
      >
        {this.state.loggedIn === true ? (
          <>
            <Drawer.Screen name="Home">
              {(props) => (
                <Home
                  {...props}
                  component={Home}
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons
                        name="home"
                        color={color}
                        size={size}
                      />
                    ),
                  }}
                />
              )}
            </Drawer.Screen>
            <Drawer.Screen name="Create Post">
              {(props) => (
                <CreatePost
                  {...props}
                  component={CreatePost}
                  options={{
                    tabBarLabel: "Publicar",
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons
                        name="bell"
                        color={color}
                        size={size}
                      />
                    ),
                    tabBarBadge: 3,
                  }}
                />
              )}
            </Drawer.Screen>
            <Drawer.Screen name="My Profile">
              {(props) => (
                <MyProfile
                  {...props}
                  handleLogout={() => this.handleLogout()}
                  component={MyProfile}
                  options={{
                    tabBarLabel: "My Profile",
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons
                        name="account"
                        color={color}
                        size={size}
                      />
                    ),
                  }}
                />
              )}
            </Drawer.Screen>
            <Drawer.Screen name="Search User">
              {(props) => (
                <SearchUser
                  {...props}
                  search={() => this.search()}
                  component={SearchUser}
                  options={{
                    tabBarLabel: "Search User",
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons
                        name="account"
                        color={color}
                        size={size}
                      />
                    ),
                  }}
                />
              )}
            </Drawer.Screen>
          </>
        ) : (
          <>
            <Drawer.Screen name="Iniciar sesión">
              {(props) => (
                <Login
                  {...props}
                  handleLogin={(email, password) =>
                    this.handleLogin(email, password)
                  }
                  loader={this.state.loader}
                />
              )}
            </Drawer.Screen>
            <Drawer.Screen name="Registrarme">
              {(props) => (
                <Register
                  {...props}
                  handleRegister={(email, password, username) =>
                    this.handleRegister(email, password, username)
                  }
                />
              )}
            </Drawer.Screen>
          </>
        )}
      </Drawer.Navigator>
    );
  }
}

//         <Drawer.Navigator initialRouteName="Login">
//           {this.state.loggedIn === true ? (
//             <>
//               <Drawer.Screen name="Home">
//                 {(props) => <Home {...props} />}
//               </Drawer.Screen>

//               <Drawer.Screen name="Create Post">
//                 {(props) => <CreatePost {...props} />}
//               </Drawer.Screen>

//               <Drawer.Screen name="My Profile">
//                 {(props) => (
//                   <MyProfile
//                     {...props}
//                     handleLogout={() => this.handleLogout()}
//                   />
//                 )}
//               </Drawer.Screen>

//               <Drawer.Screen name="Search User">
//                 {(props) => (
//                   <SearchUser {...props} search={() => this.search()} />
//                 )}
//               </Drawer.Screen>
//             </>
//           ) : (
//             <>
//               <Drawer.Screen name="Login">
//                 {(props) => (
//                   <Login
//                     {...props}
//                     handleLogin={(email, password) =>
//                       this.handleLogin(email, password)
//                     }
//                   />
//                 )}
//               </Drawer.Screen>
//               <Drawer.Screen name="Register">
//                 {(props) => (
//                   <Register
//                     {...props}
//                     handleRegister={(email, password, userName) =>
//                       this.handleRegister(email, password, userName)
//                     }
//                   />
//                 )}
//               </Drawer.Screen>
//             </>
//           )}
//         </Drawer.Navigator>
//       </NavigationContainer>
//     );
//   }
// }
