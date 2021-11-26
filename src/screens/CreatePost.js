import React, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from "react-native";
import MyCamera from "../components/MyCamera";
import { auth, db } from "../firebase/config";
import Ionicons from "react-native-vector-icons/Ionicons";

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
        createdAt: new Date().toLocaleString(),
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
        this.props.navigation.navigate("Inicio");
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
                placeholder="¿Qué estás pensando?"
                placeholderStyle={styles.placeholder}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => this.setState({ description: text })}
                value={this.state.description}
              />
              <TouchableOpacity onPress={() => this.handlePost()}>
                <Ionicons
                  style={styles.button}
                  name="md-checkmark-circle"
                  size="50px"
                  color="#F0B90B"
                />
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
    backgroundColor: "#1c1c1c",
    paddingTop: 10,
  },
  field: {
    width: "80%",
    backgroundColor: "#454545",
    color: "#fff",
    outlineStyle: "none",
    padding: 10,
    marginVertical: 10,
  },
  placeholder: {
    color: "#424242",
    fontWeight: "bold",
  },
  button: {
    alignSelf: "center",
  },
  imagen: {
    height: 300,
    width: "90%",
  },
});
