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
import firebase from "react-native-firebase";
import { LoginManager, AccessToken } from "react-native-fbsdk";
var firebaseConfig = {
  apiKey: "AIzaSyCKsLSLpzEfJhUkqfUK1qiX3yCr_c9e0LU",
  authDomain: "restaurantrn-d53d2.firebaseapp.com",
  databaseURL: "https://restaurantrn-d53d2.firebaseio.com",
  projectId: "restaurantrn-d53d2",
  storageBucket: "restaurantrn-d53d2.appspot.com",
  messagingSenderId: "751048374344",
  appId: "1:751048374344:web:57480453227d78b3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
export default class App extends Component {
  state = {
    name: "",
    user: {}
  };
  loginFacebook = async () => {
    const { navigation } = this.props;
    try {
      let result = await LoginManager.logInWithReadPermissions([
        "public_profile",
        "email"
      ]);

      if (result.isCancelled) {
        alert("Se cancelo");
      } else {
        console.log(
          `Login success with permissions: ${result.grantedPermissions.toString()}`
        );
        // get the access token
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
          // handle this however suites the flow of your app
          throw new Error(
            "Something went wrong obtaining the users access token"
          );
        }
        // create a new firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(
          data.accessToken
        );
        // login with credential
        const firebaseUserCredential = await firebase
          .auth()
          .signInWithCredential(credential)
          .then(({ user }) => {
            const { displayName, email, photoURL } = user._user;
            this.setState({
              user: {
                displayName,
                email,
                photoURL
              }
            });
          });
      }
    } catch (e) {
      console.log("Login fallo " + e);
    }
    this.state.user.displayName
      ? navigation.navigate("Home", { user: this.state.user })
      : null;
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
            onPress={this.loginFacebook}
          >
            <Icon type="FontAwesome" name="facebook" />
            <Text>Login with Facebook</Text>
          </Button>
        </View>
      </Container>
    );
  }
}
