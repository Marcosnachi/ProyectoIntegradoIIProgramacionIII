import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import { db } from "../firebase/config";
import Post from "../components/Post";
import Ionicons from "react-native-vector-icons/Ionicons";

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
        <View style={styles.searchContainer}>
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size="20px"
            color="gray"
          />
          <TextInput
            style={styles.search}
            keyboardType="default"
            placeholder="Escribe tu búsqueda"
            placeholderStyle={styles.placeholder}
            multiline={false}
            numberOfLines={1}
            onChangeText={(text) => this.search(text)}
            value={this.state.texto}
          />
        </View>
        {this.state.posts.length > 0 ? (
          <FlatList
            data={this.state.posts}
            keyExtractor={(post) => post.id.toString()}
            renderItem={({ item }) => <Post dataItem={item}></Post>}
          />
        ) : (
          <Text></Text>
        )}
        {this.state.texto == 0 || this.state.posts.length > 0 ? (
          <>
            <FlatList />
          </>
        ) : (
          <View style={styles.error}>
            <>
              <Ionicons name="bug" size="70px" color="#F0B90B" />
              <Text style={styles.textError}>
                Ups! El usuario no existe o aún no tiene publicaciones
              </Text>
            </>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
  searchContainer: {
    marginTop: 20,
    flexDirection: "row",
    width: "80%",
    paddingRight: 10,
    borderRadius: 20,
    backgroundColor: "#454545",
    alignSelf: "center",
  },
  searchIcon: {
    padding: 10,
  },
  search: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: "#fff",
    fontWeight: "bold",
    outlineStyle: "none",
  },
  placeholder: {
    color: "#424242",
    fontWeight: "bold",
  },
  button: {
    width: "30%",
    backgroundColor: "#0F00FF",
  },
  text: {
    color: "#FFA400",
    fontSize: 20,
  },
  error: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textError: {
    color: "#fff",
    fontSize: 15,
  },
});
