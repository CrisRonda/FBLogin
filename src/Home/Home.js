import React, { Component } from "react";
import { Container, Header, Content, Text, Item } from "native-base";
import { FlatList } from "react-native";
import CardComponent from "./CardComponent";

const data = [
  {
    urlUser:
      "https://www.adslzone.net/app/uploads/2019/04/borrar-fondo-imagen.jpg",
    title: "Titulo 1",
    userName: "Cristian",
    urlImage:
      "https://www.adslzone.net/app/uploads/2019/04/borrar-fondo-imagen.jpg"
  },
  {
    urlUser:
      "https://www.adslzone.net/app/uploads/2019/04/borrar-fondo-imagen.jpg",
    title: "Titulo 2",
    userName: "Vicky",
    urlImage:
      "https://www.adslzone.net/app/uploads/2019/04/borrar-fondo-imagen.jpg"
  },
  {
    urlUser:
      "https://www.adslzone.net/app/uploads/2019/04/borrar-fondo-imagen.jpg",
    title: "Titulo 3",
    userName: "Henry",
    urlImage:
      "https://www.adslzone.net/app/uploads/2019/04/borrar-fondo-imagen.jpg"
  },
  {
    urlUser:
      "https://www.adslzone.net/app/uploads/2019/04/borrar-fondo-imagen.jpg",
    title: "Titulo 45",
    userName: "Hola",
    urlImage:
      "https://www.adslzone.net/app/uploads/2019/04/borrar-fondo-imagen.jpg"
  }
];
export default class Home extends Component {
  state = { likes: 50, comments: 1 };
  addLikes = () => this.setState({ likes: (this.state.likes += 1) });
  render() {
    const { likes, comments } = this.state;
    const { navigation } = this.props;
    const name = navigation.getParam("name", "Usuario");
    const apellido = navigation.getParam("apellido", "");
    return (
      <Container>
        <Header>
          <Text
            style={{ fontSize: 12, color: "white", paddingTop: 8 }}
          >{`Bienvenido ${name} ${apellido}`}</Text>
        </Header>
        <Content padder>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <CardComponent
                {...item}
                functionAddLikes={this.addLikes}
                likes={likes}
              />
            )}
          />
        </Content>
      </Container>
    );
  }
}
