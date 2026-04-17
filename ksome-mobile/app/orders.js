import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Package, ChevronRight, Clock, CheckCircle2, Box } from 'lucide-react-native';
import { router } from 'expo-router';

export default function Orders() {
  const orders = [
    {
      id: 'ORD-7721',
      date: 'Oct 12, 2024',
      status: 'Delivered',
      total: 45.50,
      items: ['Chin Chin Large', 'Plantain Chips (Spicy)'],
      itemCount: 2,
    },
    {
      id: 'ORD-6610',
      date: 'Oct 05, 2024',
      status: 'Processing',
      total: 12.00,
      items: ['Puff Puff Delight'],
      itemCount: 1,
    }
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={() => (
           <View style={styles.header}>
              <Text style={styles.title}>Order History</Text>
              <Text style={styles.subtitle}>Track and manage your snacks</Text>
           </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View style={styles.idGroup}>
                <Package size={18} color="#065f46" />
                <Text style={styles.orderId}>{item.id}</Text>
              </View>
              <View style={[styles.statusBadge, item.status === 'Delivered' ? styles.statusDelivered : styles.statusProcessing]}>
                <Text style={[styles.statusText, item.status === 'Delivered' ? styles.statusTextDelivered : styles.statusTextProcessing]}>
                  {item.status}
                </Text>
              </View>
            </View>

            <View style={styles.orderDetails}>
              <View style={styles.detailRow}>
                <Clock size={14} color="#64748b" />
                <Text style={styles.detailText}>{item.date}</Text>
              </View>
              <View style={styles.detailRow}>
                <Box size={14} color="#64748b" />
                <Text style={styles.detailText}>{item.itemCount} items</Text>
              </View>
            </View>

            <View style={styles.orderFooter}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalPrice}>${item.total.toFixed(2)}</Text>
            </View>
            
            <ChevronRight size={20} color="#cbd5e1" style={styles.chevron} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
             <Package size={60} color="#cbd5e1" />
             <Text style={styles.emptyText}>No orders yet</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 24,
    backgroundColor: 'white',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  list: {
    paddingBottom: 40,
  },
  orderCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    position: 'relative',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  idGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  statusDelivered: {
    backgroundColor: '#ecfdf5',
  },
  statusProcessing: {
    backgroundColor: '#fffbeb',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusTextDelivered: {
    color: '#065f46',
  },
  statusTextProcessing: {
    color: '#b45309',
  },
  orderDetails: {
    gap: 8,
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: '#64748b',
    fontSize: 14,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: '#065f46',
  },
  chevron: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: 4,
  },
  empty: {
    alignItems: 'center',
    padding: 60,
  },
  emptyText: {
    marginTop: 16,
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '600',
  }
});
