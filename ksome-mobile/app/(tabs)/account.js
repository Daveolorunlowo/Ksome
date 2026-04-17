import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { User, Package, Heart, Settings, LogOut, ChevronRight, Star, Clock } from 'lucide-react-native';
import { router } from 'expo-router';

export default function Account() {
  const user = {
    name: 'Dave Olorunlowo',
    email: 'dave@example.com',
    joinDate: 'Jan 2024',
    loyaltyLevel: 'Gold Member',
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <View style={styles.badge}>
          <Star color="#b45309" size={14} fill="#b45309" />
          <Text style={styles.badgeText}>{user.loyaltyLevel}</Text>
        </View>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <StatBox label="Orders" value="12" />
        <View style={styles.divider} />
        <StatBox label="Points" value="450" />
        <View style={styles.divider} />
        <StatBox label="Saved" value="5" />
      </View>

      {/* Menu Sections */}
      <View style={styles.menu}>
        <MenuItem 
          icon={<Package color="#065f46" size={24} />} 
          title="My Orders" 
          desc="History and tracking" 
          onPress={() => router.push('/orders')}
        />
        <MenuItem 
          icon={<Heart color="#065f46" size={24} />} 
          title="Favorites" 
          desc="Manage your wishlist" 
          onPress={() => router.push('/favorites')}
        />
        <MenuItem 
          icon={<Settings color="#065f46" size={24} />} 
          title="Settings" 
          desc="Profile and privacy" 
        />
        <TouchableOpacity style={styles.logoutBtn}>
          <LogOut color="#ef4444" size={24} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function StatBox({ label, value }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function MenuItem({ icon, title, desc, onPress }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIcon}>{icon}</View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuDesc}>{desc}</Text>
      </View>
      <ChevronRight color="#cbd5e1" size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: 'white',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ecfdf5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#f1f5f9',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'BOLD',
    color: '#065f46',
  },
  userName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 16,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffbeb',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fef3c7',
    gap: 8,
  },
  badgeText: {
    color: '#b45309',
    fontWeight: 'bold',
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 24,
    padding: 24,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  divider: {
    width: 1,
    height: '60%',
    backgroundColor: '#f1f5f9',
    alignSelf: 'center',
  },
  menu: {
    paddingHorizontal: 24,
    gap: 16,
  },
  menuItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  menuDesc: {
    fontSize: 14,
    color: '#64748b',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 20,
    gap: 12,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ef4444',
  },
});
