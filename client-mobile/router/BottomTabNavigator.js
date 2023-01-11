import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import GenrePage from "../pages/GenrePage";
import LandingPage from "../pages/LandingPage";
import StackNavigator from "./StackNavigator";
import { Ionicons } from '@expo/vector-icons';
 

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    
    <Tab.Navigator screenOptions={({route}) => {
      return {
        tabBarIcon: ({focused, color, size}) => {
          let iconName
          if (route.name === 'Home') {
            iconName = focused ? "home" : "home-outline"
          } 
          return <Ionicons name={iconName} size={size} color={color}/>
        }
      }
    }} >
      <Tab.Screen name="Home" component={StackNavigator} options={{headerShown:false}}  />
      {/* <Tab.Screen name="Genre" component={GenrePage} /> */}
    </Tab.Navigator>
    
  );
}