import React, { Component } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from "react-native";
import MyCamera from "../components/MyCamera";
import { auth, db } from "../firebase/config";

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      photo: "",
      showCamera: true,
    };
  }

  handlePost() {
    db.collection("posts")
      .add({
        owner: auth.currentUser.displayName,
        description: this.state.description,
        email: auth.currentUser.email,
        createdAt: new Date().toString(),
        likes: [],
        comments: [],
        photo: this.state.photo,
      })
      .then((response) => {
        console.log(response);
        alert("Posteo realizado con exito");
        this.setState({
          description: "",
          photo: "",
          showCamera: true,
        });
        console.log(this.props);
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
        alert("error");
      });
  }

  guardarFoto(url) {
    this.setState({
      photo: url,
      showCamera: false,
    });
  }

  render() {
    return (
      <>
        {this.state.showCamera ? (
          <MyCamera savePhoto={(url) => this.guardarFoto(url)} />
        ) : (
          <>
            <View style={styles.container}>
              <Image source={{ uri: this.state.photo }} style={styles.imagen} />
              <TextInput
                style={styles.field}
                keyboardType="default"
                placeholder="What are you thinking?"
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => this.setState({ description: text })}
                value={this.state.description}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handlePost()}
              >
                <Text style={styles.text}> Post </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  field: {
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
  imagen: {
    height: 300,
    width: "90%",
  },
});
