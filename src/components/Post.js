import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "firebase";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      likes: 0,
      showModal: false,
      comment: "",
    };
  }

  componentDidMount() {
    if (this.props.dataItem) {
      if (this.props.dataItem.data.likes.length !== 0) {
        this.setState({
          likes: this.props.dataItem.data.likes.length,
        });
        if (this.props.dataItem.data.likes.includes(auth.currentUser.email)) {
          this.setState({
            liked: true,
          });
        }
      }
    }
  }

  onLike() {
    const posteoActualizar = db.collection("posts").doc(this.props.dataItem.id);

    posteoActualizar
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() => {
        this.setState({
          liked: true,
          likes: this.state.likes + 1,
        });
      });
  }

  onDislike() {
    const posteoActualizar = db.collection("posts").doc(this.props.dataItem.id);

    posteoActualizar
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() => {
        this.setState({
          liked: false,
          likes: this.state.likes - 1,
        });
      });
  }

  showModal() {
    console.log("Mostrando modal");
    this.setState({
      showModal: true,
    });
  }

  closeModal() {
    console.log("Cerrando modal");
    this.setState({
      showModal: false,
    });
  }

  deletePost() {
    db.collection("posts")
      .doc(this.props.dataItem.id)
      .delete()
      .then(() => {
        console.log("Borradísimo");
      })
      .catch((error) => {
        console.error("Error removiendo documento: ", error);
      });
  }

  commentPost() {
    const posteoActualizar = db.collection("posts").doc(this.props.dataItem.id);

    posteoActualizar
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          owner: auth.currentUser.displayName,
          createdAt: Date.now(),
          comment: this.state.comment,
        }),
      })
      .then(() => {
        this.setState({
          comment: "",
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.dataItem.data.description}</Text>
        <Text>{this.props.dataItem.data.createdAt}</Text>
        <Text>{this.props.dataItem.data.owner}</Text>
        <Image
          style={styles.image}
          source={{ uri: this.props.dataItem.data.photo }}
        />
        <Text>Likes: {this.state.likes}</Text>
        {!this.state.liked ? (
          <TouchableOpacity onPress={() => this.onLike()}>
            <Text>Like</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.onDislike()}>
            <Text>Dislike</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            this.showModal();
          }}
        >
          <Text>Ver comentarios</Text>
        </TouchableOpacity>
        {this.state.showModal ? (
          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.showModal}
            style={styles.modal}
          >
            <View style={styles.modalView}>
              {/* Botón de cierre del modal */}
              <TouchableOpacity
                style={styles.closeModal}
                onPress={() => {
                  this.closeModal();
                }}
              >
                <Text style={styles.modalText}>X</Text>
              </TouchableOpacity>
              {this.props.dataItem.data.comments.length !== 0 ? (
                <FlatList
                  data={this.props.dataItem.data.comments}
                  keyExtractor={(comment, idx) => idx.toString()}
                  renderItem={({ item }) => (
                    <Text>
                      {item.owner} {item.comment} {item.createdAt}
                    </Text>
                  )}
                />
              ) : (
                <Text>
                  <i>Aún no hay comentarios. Sé el primero en opinar.</i>
                </Text>
              )}
              <TextInput
                style={styles.field}
                keyboardType="default"
                placeholder="Escribí acá"
                multiline={true}
                numberOfLines={1}
                onChangeText={(text) => this.setState({ comment: text })}
                value={this.state.comment}
              />

              {this.state.comment !== '' ?
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.commentPost()}
              >

                <Text style={styles.text}> Comentar </Text>
              </TouchableOpacity> :

          <TouchableOpacity
          style={styles.button}
          >

<Text style={styles.text}> Comentar </Text>
</TouchableOpacity>

              }</View>
          </Modal>
        ) : null}
        <TouchableOpacity onPress={() => this.deletePost()}>
          <Text>Borrar posteo</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 200,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 5,
  },
  field: {
    width: "80%",
    backgroundColor: "#09009B",
    color: "#FFA400",
    padding: 10,
    marginVertical: 10,
  },
  comment: {
    width: "50%",
    backgroundColor: "#08389B",
    color: "#FFA400",
    padding: 8,
    marginVertical: 10,
  },
  closeModal: {
    alignSelf: "flex-end",
    padding: 10,
    backgroundColor: "#dc3545",
    marginTop: 2,
    marginBotom: 10,
    borderRadius: 4,
  },
  button: {
    width: "30%",
    backgroundColor: "#0F00FF",
  },
  modalText: {
    fontWeight: "bold",
    color: "#fff",
  },
  modalView: {
    backgroundColor: "green",
    borderRadius: 10,
  },
  modal: {
    border: "none",
  },
});
