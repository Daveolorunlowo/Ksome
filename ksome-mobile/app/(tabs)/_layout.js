import React from 'react';
import { Tabs } from 'expo-router';
import { Home, ShoppingBag, Heart, User } from 'lucide-react-native';

export default function Layout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#065f46', // Emerald 800
      tabBarInactiveTintColor: '#94a3b8',
      tabBarStyle: {
        height: 60,
        paddingBottom: 10,
        paddingTop: 10,
      },
      headerTitleStyle: {
        fontFamily: 'System', // Outfit would be better, but system for now
        fontWeight: 'bold',
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color }) => <ShoppingBag color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color }) => <Heart color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
