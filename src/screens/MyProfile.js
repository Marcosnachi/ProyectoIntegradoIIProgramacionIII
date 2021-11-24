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
import Ionicons from "react-native-vector-icons/Ionicons";
import { RotationGestureHandler } from "react-native-gesture-handler";

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
        <View style={styles.profile}>
          <Text style={styles.name}>{auth.currentUser.displayName}</Text>
          <TouchableOpacity
            style={styles.logout}
            onPress={() => this.props.handleLogout()}
          >
            <Ionicons name="ios-log-out" size="30px" color="#F0B90B" />
          </TouchableOpacity>
          <View style={styles.line} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Email</Text>
            <Text style={styles.titleText}>{auth.currentUser.email}</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Último ingreso</Text>
            <Text style={styles.titleText}>
              {auth.currentUser.metadata.lastSignInTime}
            </Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Total de publicaciones</Text>
            <Text style={styles.titleText}>{this.state.posts.length}</Text>
          </View>
        </View>
        <FlatList
          data={this.state.posts}
          keyExtractor={(post) => post.id.toString()}
          renderItem={({ item }) => <Post dataItem={item}></Post>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
  profile: {
    backgroundColor: "#2b2b2b",
    paddingBottom: 10,
  },
  name: {
    fontFamily: "M PLUS 2",
    fontSize: "25px",
    paddingLeft: 18,
    paddingTop: 10,
    color: "#fff",
  },
  line: {
    paddingTop: 15,
    borderBottomColor: "#1c1c1c",
    borderBottomWidth: 1,
    width: "80%",
    alignSelf: "center",
  },
  titleContainer: {
    flexDirection: "row",
    paddingLeft: 18,
    paddingTop: 10,
  },
  title: {
    color: "#454545",
    fontWeight: "bold",
    fontSize: "15px",
  },
  titleText: {
    paddingLeft: 8,
    color: "#fff",
    fontSize: "15px",
  },
  search: {
    width: "80%",
    backgroundColor: "#09009B",
    color: "#FFA400",
    padding: 10,
    marginVertical: 10,
  },
  logout: {
    position: "absolute",
    right: "15px",
    top: "12px",
  },
});
