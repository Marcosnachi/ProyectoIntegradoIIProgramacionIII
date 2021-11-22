import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { auth, db } from "../firebase/config";
import Post from "../components/Post";
import firebase from "firebase";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    db.collection("posts")
      .where("owner", "==", auth.currentUser.displayName)
      .orderBy("createdAt", "desc")
      .onSnapshot((docs) => {
        let postsAux = [];
        docs.forEach((doc) => {
          postsAux.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          posts: postsAux,
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Nombre: {auth.currentUser.displayName}</Text>
        <Text>Email: {auth.currentUser.email}</Text>
        <Text>Último ingreso: {auth.currentUser.metadata.lastSignInTime}</Text>
        <Text>Publicaciones: {this.state.posts.length}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.handleLogout()}
        >
          <Text style={styles.text}> Logout </Text>
        </TouchableOpacity>

        <FlatList
          data={this.state.posts}
          keyExtractor={(post) => post.id.toString()}
          renderItem={({ item }) => <Post dataItem={item}></Post>}
        />

        <View>{auth.currentUser.owner}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  field: {
    width: "100%",
    backgroundColor: "#01029C",
    color: "#FFA400",
    padding: 10,
    marginVertical: 10,
  },
  search: {
    width: "80%",
    backgroundColor: "#09009B",
    color: "#FFA400",
    padding: 10,
    marginVertical: 10,
  },
  button: {
    width: "30%",
    backgroundColor: "#0F00FF",
  },
  text: {
    color: "#FFA400",
    fontSize: 20,
  },
});
