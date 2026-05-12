import React from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen() {
  const { user, logout, resetIdleTimer } = useAuth();

  const handleLogout = () => {
    Alert.alert('Konfirmasi', 'Yakin ingin logout?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

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
          Anda akan otomatis logout jika tidak aktif selama 30 detik.
        </Text>
        <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#f9f9f9' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 8 },
  email: { fontSize: 16, color: '#555', marginBottom: 4 },
  provider: { fontSize: 13, color: '#888', marginBottom: 8 },
  info: { fontSize: 13, color: '#aaa', textAlign: 'center', marginBottom: 32 },
  btnLogout: { backgroundColor: '#e53935', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 8 },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});