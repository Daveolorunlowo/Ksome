import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react-native';
import { useFavorites } from '../../src/context/FavoritesContext';
import { useCart } from '../../src/context/CartContext';
import { router } from 'expo-router';

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  if (favorites.length === 0) {
    return (
      <View style={styles.empty}>
        <View style={styles.iconContainer}>
          <Heart color="#cbd5e1" size={80} />
        </View>
        <Text style={styles.emptyTitle}>Nothing saved yet</Text>
        <Text style={styles.emptyDesc}>
          Tap the heart on any product to save it for later.
        </Text>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/shop')}>
          <Text style={styles.btnText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={favorites}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.favoriteCard}>
            <Image source={{ uri: item.image }} style={styles.favImage} />
            <View style={styles.favInfo}>
              <Text style={styles.favName}>{item.name}</Text>
              <Text style={styles.favPrice}>${item.price.toFixed(2)}</Text>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
                  <ShoppingBag color="white" size={16} />
                  <Text style={styles.addText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.removeBtn} onPress={() => toggleFavorite(item)}>
                  <Heart color="#ef4444" fill="#ef4444" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  favoriteCard: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 24,
    marginBottom: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  favImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  favInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  favName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  favPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#065f46',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addBtn: {
    flexDirection: 'row',
    backgroundColor: '#065f46',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  addText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  removeBtn: {
    padding: 8,
  }
});
