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
import { BorderlessButton } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

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
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
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
    let deleteConfirmation = confirm(
      "Seguro que quieres eliminar esta publicación? No podrás volver atrás!"
    );

    if (deleteConfirmation) {
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
  }

  commentPost() {
    const posteoActualizar = db.collection("posts").doc(this.props.dataItem.id);

    if (this.state.comment == "") {
      alert("Escribe un comentario!");
    } else {
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
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.owner}>{this.props.dataItem.data.owner}</Text>
        <View style={styles.post}>
          <Image
            style={styles.image}
            source={{ uri: this.props.dataItem.data.photo }}
          />
          <View style={styles.likes}>
            {!this.state.liked ? (
              <TouchableOpacity onPress={() => this.onLike()}>
                <Ionicons
                  style={styles.thumbUp}
                  name="ios-thumbs-up-outline"
                  size="27px"
                  color="#F0B90B"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this.onDislike()}>
                <Ionicons
                  style={styles.thumbUp}
                  name="md-thumbs-up"
                  size="27px"
                  color="#F0B90B"
                />
              </TouchableOpacity>
            )}
            <Text style={styles.textLike}>{this.state.likes}</Text>
            {this.state.showModal ? (
              <TouchableOpacity
                onPress={() => {
                  this.closeModal();
                }}
              >
                <Ionicons
                  style={styles.chatbox}
                  name="ios-chatbubbles"
                  size="28px"
                  color="#2b2b2b"
                />
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => {
                    this.showModal();
                  }}
                >
                  <Ionicons
                    style={styles.chatbox}
                    name="ios-chatbubbles-outline"
                    size="28px"
                  />
                </TouchableOpacity>{" "}
              </>
            )}

            <Text style={styles.textLike}>
              {this.props.dataItem.data.comments.length}
            </Text>
          </View>
          <View style={styles.bigDescription}>
            <Text style={styles.smallOwner}>
              {this.props.dataItem.data.owner}
            </Text>
            <Text style={styles.description}>
              {this.props.dataItem.data.description}
            </Text>
          </View>
          <Text style={styles.created}>
            {this.props.dataItem.data.createdAt}
          </Text>
          <View
            style={{
              borderBottomColor: "#1c1c1c",
              borderBottomWidth: 1,
            }}
          />
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
                  onPress={() => {
                    this.closeModal();
                  }}
                >
                  <Ionicons
                    style={styles.modalX}
                    name="md-close-circle"
                    size="20px"
                    color="#2b2b2b"
                  />
                </TouchableOpacity>
                {this.props.dataItem.data.comments.length !== 0 ? (
                  <FlatList
                    style={styles.commentaries}
                    data={this.props.dataItem.data.comments}
                    keyExtractor={(comment, idx) => idx.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.commentMaster}>
                        <Text style={styles.commentTextOne}>
                          <b>{item.owner}</b>
                        </Text>
                        <Text style={styles.commentTextTwo}>
                          {item.comment}
                        </Text>
                      </View>
                    )}
                  />
                ) : (
                  <Text style={styles.noComments}>
                    <i>Aún no hay comentarios. Sé el primero en opinar.</i>
                  </Text>
                )}
                <View style={styles.commentaryFinal}>
                  <View style={styles.commentContainer}>
                    <TextInput
                      style={styles.commentModal}
                      keyboardType="default"
                      placeholder="Hacé un comentario"
                      placeholderStyle={styles.placeholder}
                      multiline={true}
                      numberOfLines={1}
                      onChangeText={(text) => this.setState({ comment: text })}
                      value={this.state.comment}
                    />
                  </View>
                  <TouchableOpacity onPress={() => this.commentPost()}>
                    <Ionicons
                      style={styles.sendComment}
                      name="md-send"
                      size="20px"
                      color="#F0B90B"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          ) : (
            <TouchableOpacity
              onPress={() => {
                this.showModal();
              }}
            >
              <Text style={styles.comments}>Ver comentarios</Text>
            </TouchableOpacity>
          )}
          {this.props.dataItem.data.owner == auth.currentUser.displayName ? (
            <TouchableOpacity onPress={() => this.deletePost()}>
              <Ionicons
                style={styles.trash}
                name="trash"
                size="20px"
                color="red"
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 185,
  },
  container: {
    flex: 1,
    width: "90%",
    justifyContent: "center",
    padding: 7,
    backgroundColor: "#2b2b2b",
    margin: 15,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    alignSelf: "center",
  },
  post: {
    backgroundColor: "#454545",
    paddingBottom: 10,
    borderRadius: 2,
  },
  thumbUp: {
    paddingLeft: 5,
  },
  bigDescription: {
    flexDirection: "row",
    paddingTop: 6,
    paddingBottom: 10,
  },
  smallOwner: {
    fontWeight: "bold",
    paddingLeft: 7,
    color: "#fff",
  },
  owner: {
    fontSize: "20px",
    fontFamily: "M PLUS 2",
    color: "#fff",
    paddingBottom: 15,
    paddingLeft: 5,
  },
  description: {
    color: "#fff",
    paddingLeft: 11,
  },
  created: {
    color: "#fff",
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 7,
  },
  likes: {
    paddingTop: 5,
    flexDirection: "row",
  },
  textLike: {
    marginTop: 4,
    marginLeft: 2,
    fontFamily: "M PLUS 2",
    fontSize: "15px",
    color: "#fff",
  },
  chatbox: {
    paddingLeft: 18,
  },
  commentaryFinal: {
    flexDirection: "row",
    marginTop: 20,
  },
  commentContainer: {
    width: "85%",
    paddingRight: 10,
    borderRadius: 20,
    backgroundColor: "#2b2b2b",
  },
  commentModal: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    color: "#fff",
    fontWeight: "bold",
    outlineStyle: "none",
  },
  placeholder: {
    color: "#424242",
    fontWeight: "bold",
  },
  comments: {
    color: "#fff",
    fontWeight: "bold",
    paddingTop: 10,
    paddingLeft: 7,
  },
  button: {
    width: "30%",
    backgroundColor: "#0F00FF",
  },
  sendComment: {
    paddingTop: 8,
    paddingLeft: 15,
  },
  modalX: {
    position: "absolute",
    right: "0px",
    top: "0px",
  },
  commentaries: {
    paddingTop: 15,
    paddingLeft: 7,
  },
  commentMaster: {
    flexDirection: "row",
    paddingTop: 5,
  },
  commentTextOne: {
    color: "#fff",
  },
  commentTextTwo: {
    color: "#fff",
    paddingLeft: 11,
  },
  noComments: {
    color: "#fff",
    paddingTop: 15,
    paddingLeft: 7,
  },

  modalView: {
    backgroundColor: "#454545",
  },
  modal: {
    borderRadius: 15,
    borderColor: "#F0B90B",
    borderWidth: 2,
    flex: 1,
    width: "100%",
    marginTop: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginBottom: 30,
  },
  trash: {
    position: "absolute",
    right: "8px",
    bottom: "0.4px",
  },
});
