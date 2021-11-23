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

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      texto: "",
    };
  }

  search(text) {
    this.setState({
      texto: text,
      posts: [],
    });

    db.collection("posts")
      .where("owner", "==", text)
      .get()
      .then((docs) => {
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
      })
      .catch((e) => console.log(e));
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
          onChangeText={(text) => this.search(text)}
          value={this.state.texto}
        />
        {this.state.posts.length > 0 ? (
          <FlatList
            data={this.state.posts}
            keyExtractor={(post) => post.id.toString()}
            renderItem={({ item }) => <Post dataItem={item}></Post>}
          />
        ) : (
          <Text></Text>
        )}
        {this.state.texto == 0 || this.state.posts.length > 0? (
          <FlatList />
        ) : (
          <Text>El usuario no existe o aún no tiene publicaciones</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
