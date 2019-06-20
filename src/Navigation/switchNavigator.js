import { createSwitchNavigator, createDrawerNavigator } from "react-navigation";
import Login from "../Login/Login";
import Home from "../Home/Home";

const SwitchNavigator = createSwitchNavigator(
  {
    Login: {
      screen: Login
    },
    Home
  },
  {
    initialRouteName: "Login"
  }
);
export default SwitchNavigator;
