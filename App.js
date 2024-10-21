import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import * as Font from 'expo-font';

// Importando pantallas
import HomeScreen from './screens/Home'
import GeneroScreen from './screens/Genero'
import EdadScreen from './screens/Edad'
import AcercaDeScreen from './screens/AcercaDe'


// Importando Iconos
import { MaterialIcons } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();

// Agregando funmcion para navegar por tabs
function NavegacionPorTabs () {
  return (
    <Tab.Navigator
    screenOptions={() => ({
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#FF6500',
      tabBarInactiveTintColor: '#FCFAEE',
      tabBarStyle: {backgroundColor:'#0B192C'}
    })}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerTitle: '',
          headerLeft:() => 
            <Text style={{fontSize:23, fontFamily:'AmsterdamRegular',marginLeft:5, color:'#FFFFFF'}}> HOME </Text>,
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons name="home" size={size} color={color} />
            )
          },
          headerStyle: {
            backgroundColor: '#0B192C',
          }
        }}
      />

<Tab.Screen
        name='Genero'
        component={GeneroScreen}
        options={{
          headerTitle: '',
          headerLeft:() => 
            <Text style={{fontSize:23, fontFamily:'AmsterdamRegular',marginLeft:5, color:'#FFFFFF'}}> GENERO </Text>,
          tabBarIcon: ({ color, size }) => {
            return (
              <Icon name="gender-male-female" size={size} color={color} />
            )
          },
          headerStyle: {
            backgroundColor: '#0B192C',
          }
        }}
      />
      <Tab.Screen
        name='Edad'
        component={EdadScreen}
        options={{
          headerTitle: '',
          headerLeft:() => 
            <Text style={{fontSize:23, fontFamily:'AmsterdamRegular',marginLeft:5, color:'#FFFFFF'}}> EDAD </Text>,
          tabBarIcon: ({ color, size }) => {
            return (
              <Icon name="account-clock-outline" size={size} color={color} />
            )
          },
          headerStyle: {
            backgroundColor: '#0B192C',
          }
        }}
      />
      <Tab.Screen
        name='Acerca de'
        component={AcercaDeScreen}
        options={{
          headerTitle: '',
          headerLeft:() => 
            <Text style={{fontSize:23, fontFamily:'AmsterdamRegular',marginLeft:5, color:'#FFFFFF'}}> Acerca de  </Text>,
          tabBarIcon: ({ color, size }) => {
            return (
              <Icon name='information-outline' size={size} color={color} />
            )
          },
          headerStyle: {
            backgroundColor: '#0B192C',
          }
        }}
      />
    </Tab.Navigator>
  )
}



export default function App() {
  //CARGANDO FUENTES
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "OpenSansLight": require('./assets/fonts/OpenSans-Light.ttf'),
        "OpenSansRegular": require('./assets/fonts/OpenSans-Regular.ttf'),
        "OpenSansSemiBold": require('./assets/fonts/OpenSans-SemiBold.ttf'),
        "OpenSansBold": require('./assets/fonts/OpenSans-Bold.ttf'),
        "OpenSansMedium": require('./assets/fonts/OpenSans-Medium.ttf'),
        "AmsterdamRegular": require('./assets/fonts/NewAmsterdam-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#DC5F00" />
        <Text>Cargando fuentes...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView>
      <NavigationContainer style={styles.container}>
        <NavegacionPorTabs />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF9F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#FEF9F2',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

