import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Search, SlidersHorizontal, Plus } from 'lucide-react-native';
import { products, categories } from '../../src/data/products';
import { useCart } from '../../src/context/CartContext';

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart } = useCart();

  const filtered = useMemo(() => {
    return products
      .filter(p => activeCategory === 'All' || p.category === activeCategory)
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, activeCategory]);

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Search color="#94a3b8" size={20} style={styles.searchIcon} />
          <TextInput 
            style={styles.input} 
            placeholder="Search snacks..." 
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
      </View>

      {/* Categories Scroller */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
          {categories.map(cat => (
            <TouchableOpacity 
              key={cat} 
              onPress={() => setActiveCategory(cat)}
              style={[styles.categoryBtn, activeCategory === cat && styles.categoryBtnActive]}
            >
              <Text style={[styles.categoryText, activeCategory === cat && styles.categoryTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Product List */}
      <FlatList 
        data={filtered}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardCategory}>{item.category}</Text>
              <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardPrice}>${item.price.toFixed(2)}</Text>
                <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
                  <Plus color="white" size={20} />
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
  header: {
    padding: 16,
    paddingTop: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
  },
  categoryContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  categoryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
  },
  categoryBtnActive: {
    backgroundColor: '#065f46',
  },
  categoryText: {
    fontWeight: 'bold',
    color: '#64748b',
  },
  categoryTextActive: {
    color: 'white',
  },
  list: {
    padding: 8,
  },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 12,
  },
  cardCategory: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#059669',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  cardName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1e293b',
  },
  addBtn: {
    backgroundColor: '#065f46',
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
