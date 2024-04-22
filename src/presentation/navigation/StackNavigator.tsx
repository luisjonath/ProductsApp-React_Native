import { StackCardStyleInterpolator, createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ProductScreen } from '../screens/product/ProductScreen';
import { LoadingScreen } from '../screens/loading/LoadingScreen';

export type RootStackParams = {
HomeScreen: undefined
LoginScreen: undefined
RegisterScreen: undefined
LoadingScreen: undefined
ProductScreen: {productId: string}
}

const Stack = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({current}) => {
  return {
    cardStyle: {
      opacity: current.progress
    }
  }
}

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='LoadingScreen'>
      <Stack.Screen options={{cardStyleInterpolator: fadeAnimation}} name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen options={{cardStyleInterpolator: fadeAnimation}} name="HomeScreen" component={HomeScreen} />
      <Stack.Screen options={{cardStyleInterpolator: fadeAnimation}} name="LoginScreen" component={LoginScreen} />
      <Stack.Screen options={{cardStyleInterpolator: fadeAnimation}} name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
}