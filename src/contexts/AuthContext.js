import * as SecureStore from 'expo-secure-store';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Alert, AppState } from 'react-native';
import { auth } from '../config/firebase';

const AuthContext = createContext();

// Named export untuk hook-nya
export const useAuth = () => useContext(AuthContext);

// DEFAULT EXPORT (Senjata pamungkas anti-undefined)
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const idleTimer = useRef(null);
  const currentUser = useRef(null);

  const resetIdleTimer = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (!currentUser.current) return;

    idleTimer.current = setTimeout(async () => {
      await signOut(auth);
      await SecureStore.deleteItemAsync('auth_token').catch(() => {});
      Alert.alert('Session Berakhir', 'Anda otomatis logout karena tidak aktif selama 30 detik.');
    }, 30 * 1000);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      currentUser.current = u;
      setUser(u);

      if (u) {
        try {
          const token = await u.getIdToken();
          await SecureStore.setItemAsync('auth_token', token);
        } catch (_) {}
        resetIdleTimer();
      } else {
        await SecureStore.deleteItemAsync('auth_token').catch(() => {});
        if (idleTimer.current) clearTimeout(idleTimer.current);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active' || nextState === 'background') resetIdleTimer();
    });
    return () => sub.remove();
  }, []);

  const logout = async () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    await signOut(auth);
    await SecureStore.deleteItemAsync('auth_token').catch(() => {});
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, resetIdleTimer }}>
      {children}
    </AuthContext.Provider>
  );
}