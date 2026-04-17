import { Stack } from 'expo-router';
import { CartProvider } from '../src/context/CartContext';
import { FavoritesProvider } from '../src/context/FavoritesContext';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="cart" options={{ 
            presentation: 'modal',
            headerShown: true,
            title: 'My Cart',
          }} />
          <Stack.Screen name="orders" options={{ 
            presentation: 'modal',
            headerShown: true,
            title: 'My Orders',
          }} />
        </Stack>
      </FavoritesProvider>
    </CartProvider>
  );
}
