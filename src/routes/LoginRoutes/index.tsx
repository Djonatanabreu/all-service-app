import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Props } from 'interfaces/routes.interface';
import Public from 'screens/_layouts/Public';
import Auth from 'screens/Auth';

const Stack = createNativeStackNavigator();

const useLayout = (Component: React.FC<Props>) => (props: any) =>
  (
    <Public>
      <Component {...props} />
    </Public>
  );

const LoginRoutes = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{ headerShown: false, animation: 'fade' }}>
    <Stack.Screen name="Login" component={useLayout(Auth.Login)} />
    <Stack.Screen name="Register" component={useLayout(Auth.Register)} />
    <Stack.Screen name="ForgotPassword" component={useLayout(Auth.ForgotPassword)} />
  </Stack.Navigator>
);

export default LoginRoutes;
