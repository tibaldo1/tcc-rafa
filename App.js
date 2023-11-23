import { View, Text } from 'react-native'
import React from 'react'
import Home from './screens/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CriaVaca from './screens/CriaVaca';
import { NavigationContainer } from '@react-navigation/native';
import InsereSaldo from './screens/InsereSaldo';
import VacaCompleta from './screens/VacaCompleta';
import Extrato from './screens/Extrato';
import Conta from './screens/Conta';
import EditarConta from './screens/EditarConta';
import ResgatarFinancas from './screens/ResgatarFinancas';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="criavaca" component={CriaVaca} />
            <Stack.Screen name="inseresaldo" component={InsereSaldo} />
            <Stack.Screen name="vacacompleta" component={VacaCompleta} />
            <Stack.Screen name="extrato" component={Extrato} />
            <Stack.Screen name="conta" component={Conta} />
            <Stack.Screen name="editarconta" component={EditarConta} />
            <Stack.Screen name="resgatarfinancas" component={ResgatarFinancas} />


          </Stack.Navigator>
        </NavigationContainer>
    
    )
}