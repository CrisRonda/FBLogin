import React, { Component } from "react";
import { Image, StatusBar } from "react-native";
import {
  View,
  Text,
  Container,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon
} from "native-base";
export default class App extends Component {
  state = {
    name: ""
  };
  navigateHome = () => {
    console.log(this.props);
    const { navigation } = this.props;
    navigation.navigate("Home", {
      name: "Cristian",
      apellido: "Ronda"
    });
  };
  render() {
    return (
      <Container style={{ backgroundColor: "#ff9900", flex: 1 }}>
        <StatusBar backgroundColor="#ff9900" />
        <View
          style={{ flex: 3, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            style={{ width: 150, height: 150 }}
            source={require("../images/logo.png")}
          />
        </View>
        <View
          style={{
            flex: 4,
            paddingLeft: 64,
            paddingHorizontal: 64,
            paddingTop: 64
          }}
        >
          <Form>
            <Item floatingLabel>
              <Label style={{ color: "#000" }}>Username</Label>
              <Input onChangeText={value => this.setState({ name: value })} />
            </Item>
            <Item floatingLabel last>
              <Label style={{ color: "#000" }}>Password</Label>
              <Input secureTextEntry={true} />
            </Item>
          </Form>
          <Button
            rounded
            onPress={this.navigateHome}
            style={{
              flex: 1,
              padding: 16,
              backgroundColor: "black"
            }}
          >
            <Text>Next</Text>
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            rounded
            style={{
              flex: 1,
              padding: 16,
              backgroundColor: "red"
            }}
          >
            <Icon type="FontAwesome" name="google" />
            <Text>Login with Google</Text>
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            rounded
            style={{
              flex: 1,
              backgroundColor: "blue"
            }}
            onPress={() => console.log(this.state.name)}
          >
            <Icon type="FontAwesome" name="facebook" />
            <Text>Login with Facebook</Text>
          </Button>
        </View>
      </Container>
    );
  }
}
