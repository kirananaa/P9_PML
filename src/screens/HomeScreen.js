<<<<<<< HEAD
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Alert, StyleSheet, Text, TouchableOpacity,
  TouchableWithoutFeedback, View
} from 'react-native';
=======
import React from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Alert } from 'react-native';
>>>>>>> 679f7443df46127fdfb4676497f3f349d9551ae9
import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen() {
  const { user, logout, resetIdleTimer } = useAuth();
<<<<<<< HEAD
  const navigation = useNavigation();
=======
>>>>>>> 679f7443df46127fdfb4676497f3f349d9551ae9

  const handleLogout = () => {
    Alert.alert('Konfirmasi', 'Yakin ingin logout?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

<<<<<<< HEAD
  const getInitial = () => {
    const name = user?.displayName || user?.email || '?';
    return name.charAt(0).toUpperCase();
  };

  const getProvider = () => {
    return user?.providerData?.[0]?.providerId === 'google.com'
      ? 'Google' : 'Email/Password';
  };

  return (
    <TouchableWithoutFeedback onPress={resetIdleTimer}>
      <View style={styles.container}>

        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitial()}</Text>
          </View>
          <Text style={styles.name}>
            {user?.displayName || 'Halo, Pengguna!'}
          </Text>
          <Text style={styles.email}>{user?.email}</Text>

          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>🔐 {getProvider()}</Text>
            </View>
            {user?.providerData?.[0]?.providerId !== 'google.com' && (
              <View style={[styles.badge, {
                backgroundColor: user?.emailVerified ? '#e6f4ea' : '#fff3e0'
              }]}>
                <Text style={[styles.badgeText, {
                  color: user?.emailVerified ? '#2e7d32' : '#e65100'
                }]}>
                  {user?.emailVerified ? '✅ Terverifikasi' : '⚠️ Belum Verifikasi'}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuLabel}>MENU</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Chat')}
          >
            <View style={[styles.menuIcon, { backgroundColor: '#e8f0fe' }]}>
              <Text style={styles.menuEmoji}>💬</Text>
            </View>
            <View style={styles.menuInfo}>
              <Text style={styles.menuTitle}>Group Chat</Text>
              <Text style={styles.menuSub}>Chat real-time dengan semua pengguna</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.idleInfo}>
          ⏱ Auto-logout setelah 5 detik tidak aktif
        </Text>

        <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
          <Text style={styles.btnLogoutText}>Logout</Text>
        </TouchableOpacity>

=======
  return (
    <TouchableWithoutFeedback onPress={resetIdleTimer}>
      <View style={styles.container}>
        <Text style={styles.title}>Selamat Datang!</Text>
        <Text style={styles.email}>
          {user?.displayName || user?.email || 'Pengguna'}
        </Text>
        <Text style={styles.provider}>
          Login via: {user?.providerData?.[0]?.providerId === 'google.com' ? 'Google' : 'Email/Password'}
        </Text>
        {user?.providerData?.[0]?.providerId !== 'google.com' && (
          <Text style={{ fontSize: 13, marginBottom: 16, color: user?.emailVerified ? 'green' : 'orange' }}>
            {user?.emailVerified ? 'Email terverifikasi' : 'Email belum terverifikasi'}
          </Text>
        )}
        <Text style={styles.info}>
          Anda akan otomatis logout jika tidak aktif selama 5 detik.
        </Text>
        <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
>>>>>>> 679f7443df46127fdfb4676497f3f349d9551ae9
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: {
    flex: 1, backgroundColor: '#f5f6fa',
    padding: 20, paddingTop: 40,
  },

  card: {
    backgroundColor: '#fff', borderRadius: 20,
    padding: 24, alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.07,
    shadowRadius: 12, elevation: 4,
    marginBottom: 24,
  },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#4285F4', justifyContent: 'center',
    alignItems: 'center', marginBottom: 12,
  },
  avatarText: { color: '#fff', fontSize: 30, fontWeight: 'bold' },
  name: { fontSize: 20, fontWeight: '700', color: '#1a1a2e', marginBottom: 4 },
  email: { fontSize: 14, color: '#888', marginBottom: 12 },
  badgeRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  badge: {
    backgroundColor: '#e8f0fe', paddingHorizontal: 12,
    paddingVertical: 5, borderRadius: 20,
  },
  badgeText: { fontSize: 12, color: '#4285F4', fontWeight: '600' },

  menuSection: { marginBottom: 16 },
  menuLabel: {
    fontSize: 11, fontWeight: '700', color: '#aaa',
    letterSpacing: 1.5, marginBottom: 10, marginLeft: 4,
  },
  menuItem: {
    backgroundColor: '#fff', borderRadius: 16,
    padding: 16, flexDirection: 'row', alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 8, elevation: 2,
  },
  menuIcon: {
    width: 44, height: 44, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center', marginRight: 14,
  },
  menuEmoji: { fontSize: 22 },
  menuInfo: { flex: 1 },
  menuTitle: { fontSize: 15, fontWeight: '700', color: '#1a1a2e' },
  menuSub: { fontSize: 12, color: '#aaa', marginTop: 2 },
  menuArrow: { fontSize: 22, color: '#ccc', fontWeight: '300' },

  idleInfo: {
    textAlign: 'center', color: '#bbb',
    fontSize: 12, marginBottom: 20,
  },
  btnLogout: {
    backgroundColor: '#fff', borderWidth: 1.5,
    borderColor: '#e53935', borderRadius: 12,
    paddingVertical: 14, alignItems: 'center',
  },
  btnLogoutText: { color: '#e53935', fontWeight: '700', fontSize: 15 },
=======
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#f9f9f9' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 8 },
  email: { fontSize: 16, color: '#555', marginBottom: 4 },
  provider: { fontSize: 13, color: '#888', marginBottom: 8 },
  info: { fontSize: 13, color: '#aaa', textAlign: 'center', marginBottom: 32 },
  btnLogout: { backgroundColor: '#e53935', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 8 },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
>>>>>>> 679f7443df46127fdfb4676497f3f349d9551ae9
});