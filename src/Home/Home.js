import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Text,
  Item,
  View,
  Button
} from "native-base";
import { FlatList, Image } from "react-native";
import CardComponent from "./CardComponent";
import firebase from "react-native-firebase";

const db = firebase.database();
export default class Home extends Component {
  state = { likes: 50, data: null };
  addLikes = id => {
    console.log(id);
    const random = Math.random();
    db.ref("/data/" + id + "/")
      .update({
        usersLikes: random
      })
      .then(() => console.log("Exito"))
      .catch(e => console.log("Error " + e));
  };
  componentWillMount() {
    db.ref("/data/").on("value", snap => {
      console.log(snap.val());
      this.setState({ data: snap.val() });
    });
  }
  uploadStorage = () => {
    const uriImage =
      "https://mediateca.educa.madrid.org/imagen.php?id=calr4gnw5wi1tvq2&type=2&m=550";
    // this.uploadImage("imagenPrueba", uriImage);
  };
  uploadImage(name, uriImage) {
    firebase
      .storage()
      .ref("exp/" + name)
      .putFile(uriImage)
      .then(uploadedFile => {
        console.log(uploadedFile);
        var newPostKey = db.ref("data/").push().key;
        db.ref("data/" + newPostKey + "/")
          .update({
            id: newPostKey,
            likes: 0,
            title: "Zapato ejemplo",
            urlImage: uploadedFile.downloadURL,
            urlUser:
              "https://img.freepik.com/foto-gratis/hermosa-mujer-joven-mostrando-senalando-sobre-fondo-blanco_1301-7232.jpg?size=626&ext=jpg",
            userName: "Casual"
          })
          .then(() => alert("Exito"))
          .catch(e => alert("ERROR"));
      })
      .catch(err => {
        console.log("Error: " + error);
      });
  }
  render() {
    const { data } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam("user", "Usuario");
    return (
      <Container>
        <Header>
          <Text
            style={{ fontSize: 12, color: "white", paddingTop: 8 }}
          >{`Bienvenido ${user.displayName}`}</Text>
        </Header>
        <Content padder>
          <View
            style={{
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center"
            }}
          >
            <Text>{`Nombre FB: ${user.displayName}`}</Text>
            <Text>{`Mail FB: ${user.email}`}</Text>
            <Image
              style={{ height: 50, width: 50 }}
              source={{ uri: user.photoURL }}
            />
          </View>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              const { id } = item;
              return (
                <CardComponent
                  {...item}
                  functionAddLikes={() => this.addLikes(id)}
                  likes={item.likes}
                />
              );
            }}
          />
          <Button block onPress={this.uploadStorage}>
            <Text>Subir Zapato</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
