import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useCart } from '../src/context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react-native';
import { router } from 'expo-router';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <View style={styles.empty}>
        <View style={styles.iconContainer}>
          <ShoppingBag color="#cbd5e1" size={80} />
        </View>
        <Text style={styles.emptyTitle}>Cart is empty</Text>
        <Text style={styles.emptyDesc}>
          Time to fill it up with some crunchy snacks!
        </Text>
        <TouchableOpacity style={styles.btn} onPress={() => router.back()}>
          <Text style={styles.btnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={cart}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              <View style={styles.controls}>
                <TouchableOpacity style={styles.ctrlBtn} onPress={() => updateQuantity(item.id, -1)}>
                  <Minus size={16} color="#475569" />
                </TouchableOpacity>
                <Text style={styles.qty}>{item.quantity}</Text>
                <TouchableOpacity style={styles.ctrlBtn} onPress={() => updateQuantity(item.id, 1)}>
                  <Plus size={16} color="#475569" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.remove} onPress={() => removeFromCart(item.id)}>
              <Trash2 size={20} color="#ef4444" />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.summary}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalPrice}>${cartTotal.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>Checkout Now</Text>
          <ArrowRight color="white" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#f8fafc',
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 12,
  },
  emptyDesc: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  btn: {
    backgroundColor: '#065f46',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  list: {
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  info: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: '#065f46',
    marginBottom: 12,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    gap: 12,
  },
  ctrlBtn: {
    padding: 6,
  },
  qty: {
    fontWeight: 'bold',
    fontSize: 14,
    width: 20,
    textAlign: 'center',
  },
  remove: {
    padding: 12,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  totalText: {
    fontSize: 18,
    color: '#64748b',
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 32,
    fontWeight: '900',
    color: '#065f46',
  },
  checkoutBtn: {
    backgroundColor: '#065f46',
    paddingVertical: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#065f46',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  checkoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
