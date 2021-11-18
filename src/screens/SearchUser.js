import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
} from "react-native";
import { auth, db } from "../firebase/config";
import Post from "../components/Post";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
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
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.search}
          keyboardType="default"
          placeholder="Escribe tu búsqueda"
          multiline={false}
          numberOfLines={1}
          onChangeText={(text) => this.setState({ comment: text })}
          value={this.state.comment}
        />
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
