import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { motion } from 'framer-motion'; // Framer motion doesn't work in RN, need to use Reanimated or similar, but for now standard RN
import { ArrowRight, Star, Shield, Truck, Zap } from 'lucide-react-native';
import { products } from '../../src/data/products';
import { useCart } from '../../src/context/CartContext';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Home() {
  const featured = products.slice(0, 3);
  const { addToCart } = useCart();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.heroContent}>
          <Text style={styles.heroSub}>Nigerian Flavors</Text>
          <Text style={styles.heroTitle}>Delivered {'\n'}to Your Door.</Text>
          <Text style={styles.heroDesc}>
            Experience the finest African snacks, handcrafted with love and delivered fresh.
          </Text>
          <TouchableOpacity 
            style={styles.heroBtn}
            onPress={() => router.push('/shop')}
          >
            <Text style={styles.heroBtnText}>Shop Now</Text>
            <ArrowRight color="white" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Features scroller */}
      <View style={styles.section}>
         <Text style={styles.sectionTitle}>Why KSOME?</Text>
         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.features}>
            <FeatureCard icon={<Truck color="#065f46" size={24} />} title="Fast Delivery" />
            <FeatureCard icon={<Shield color="#065f46" size={24} />} title="Quality First" />
            <FeatureCard icon={<Zap color="#065f46" size={24} />} title="Easy Ordering" />
         </ScrollView>
      </View>

      {/* Featured Products */}
      <View style={styles.section}>
         <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Items</Text>
            <TouchableOpacity onPress={() => router.push('/shop')}>
               <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
         </View>
         <View style={styles.productGrid}>
            {featured.map(item => (
               <ProductCard key={item.id} product={item} onAdd={() => addToCart(item)} />
            ))}
         </View>
      </View>

      {/* Spacing for footer/tabs */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function FeatureCard({ icon, title }) {
  return (
    <View style={styles.featureCard}>
      <View style={styles.featureIcon}>{icon}</View>
      <Text style={styles.featureTitle}>{title}</Text>
    </View>
  );
}

function ProductCard({ product, onAdd }) {
  return (
    <View style={styles.productCard}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
          <Text style={styles.addBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  hero: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#065f46', // Emerald 800
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  heroSub: {
    color: '#34d399',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: 'white',
    fontSize: 42,
    fontWeight: '800',
    marginBottom: 16,
    lineHeight: 48,
  },
  heroDesc: {
    color: '#d1fae5',
    fontSize: 16,
    marginBottom: 32,
    lineHeight: 24,
  },
  heroBtn: {
    backgroundColor: '#b45309', // Amber 700
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
  },
  heroBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    padding: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1e293b',
  },
  seeAll: {
    color: '#065f46',
    fontWeight: 'bold',
  },
  features: {
    gap: 16,
    paddingVertical: 8,
  },
  featureCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 20,
    width: 140,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#ecfdf5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontWeight: 'bold',
    color: '#475569',
  },
  productGrid: {
    gap: 20,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  productImage: {
    width: 120,
    height: 120,
  },
  productInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#065f46',
    marginBottom: 12,
  },
  addBtn: {
    backgroundColor: '#065f46',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  addBtnText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
