import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PrivateRoutes from './PrivateRoutes';
import { useAuthStore } from 'store/auth';

import LoginRoutes from './LoginRoutes';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const signed = useAuthStore(state => state.signed);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {signed ? (
          <Stack.Screen name="PrivateStack" component={PrivateRoutes} />
        ) : (
          <Stack.Screen
            name="LoginStack"
            component={LoginRoutes}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
