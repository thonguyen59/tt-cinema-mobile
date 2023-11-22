import {NavigationContainer} from "@react-navigation/native";
import DrawerLayout from "./navigation/DrawerLayout";

export default function App() {
  return (
      <NavigationContainer>
        <DrawerLayout/>
      </NavigationContainer>
  );
}