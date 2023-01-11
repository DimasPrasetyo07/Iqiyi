import { createStackNavigator } from '@react-navigation/stack';
import DetailPage from '../pages/DetailPage'
import LandingPage from '../pages/LandingPage';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Movie" component={LandingPage} options={{headerShown:false}} />  
      <Stack.Screen name="DetailMovie" component={DetailPage} />
    </Stack.Navigator>
  );
}