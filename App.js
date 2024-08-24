import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AvailableVehiclesScreen from './screens/AvailableVehiclesScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import AccountVerificationScreen from './screens/AccountVerificationScreen';
import PremiumPlansScreen from './screens/PremiumPlansScreen';
import ContactUsScreen from './screens/ContactUsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const headerStyle = {
  backgroundColor: '#007BFF', // Match button background color
};

const headerTitleStyle = {
  color: '#fff',
  textAlign: 'center',
  fontSize: 18,
};

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{
          headerTitle: 'Profile',
          headerStyle: headerStyle,
          headerTitleStyle: headerTitleStyle,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerTitle: 'Edit Profile',
          headerStyle: headerStyle,
          headerTitleStyle: headerTitleStyle,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="AccountVerification"
        component={AccountVerificationScreen}
        options={{
          headerTitle: 'Account Verification',
          headerStyle: headerStyle,
          headerTitleStyle: headerTitleStyle,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="PremiumPlans"
        component={PremiumPlansScreen}
        options={{
          headerTitle: 'Premium Plans',
          headerStyle: headerStyle,
          headerTitleStyle: headerTitleStyle,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUsScreen}
        options={{
          headerTitle: 'Contact Us',
          headerStyle: headerStyle,
          headerTitleStyle: headerTitleStyle,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Requirment"
        component={HomeScreen}
        options={{
          headerTitle: 'Vehicle Requirment',
          headerStyle: headerStyle,
          headerTitleStyle: headerTitleStyle,
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Available Vehicles"
        component={AvailableVehiclesScreen}
        options={{
          headerTitle: 'Available Vehicles',
          headerStyle: headerStyle,
          headerTitleStyle: headerTitleStyle,
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car-sport-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();

            navigation.navigate('Profile', {
              screen: 'ProfileMain',
              params: {
                reset: true,
              },
            });
          },
        })}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AppTabs"
          component={AppTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
