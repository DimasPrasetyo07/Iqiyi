import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./router/BottomTabNavigator";
import { ApolloProvider } from "@apollo/client";
import  client  from "./config/apolloConnection";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    
      <ApolloProvider client={client}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
      </ApolloProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "black",

//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
// });
