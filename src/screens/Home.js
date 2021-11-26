import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { auth, db } from "../firebase/config";
import Post from "../components/Post";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loadingPost: true,
    };
  }

  componentDidMount() {
    db.collection("posts")
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
          loadingPost: false,
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loadingPost || this.props.loader ? (
          <ActivityIndicator size="large" color="#F0B90B" />
        ) : (
          <>
            <View style={styles.welcome}>
              <Text style={styles.welcomeText}>¡Bienvenido/a</Text>
              <Text style={styles.welcomeName}>
                {auth.currentUser.displayName}!
              </Text>
            </View>
            <FlatList
              data={this.state.posts}
              keyExtractor={(post) => post.id.toString()}
              renderItem={({ item }) => <Post dataItem={item}></Post>}
            />
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#1c1c1c",
  },
  welcome: {
    backgroundColor: "#2b2b2b",
    width: "70%",
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 15,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginTop: 15,
    flexDirection: "row",
  },
  welcomeText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "M PLUS 2",
    paddingRight: 8,
  },
  welcomeName: {
    color: "#F0B90B",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "M PLUS 2",
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
