import * as SecureStore from 'expo-secure-store';
import { onAuthStateChanged, signOut } from 'firebase/auth';
<<<<<<< HEAD
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

=======
import { createContext, useContext, useEffect, useRef, useState } from 'react';
>>>>>>> 679f7443df46127fdfb4676497f3f349d9551ae9
import { Alert, AppState } from 'react-native';
import { auth } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD

=======
>>>>>>> 679f7443df46127fdfb4676497f3f349d9551ae9
  const idleTimer = useRef(null);
  const currentUser = useRef(null);

  const resetIdleTimer = () => {
<<<<<<< HEAD
    if (idleTimer.current) {
      clearTimeout(idleTimer.current);
    }

    if (!currentUser.current) return;

    idleTimer.current = setTimeout(async () => {
      try {
        await signOut(auth);

        await SecureStore.deleteItemAsync('auth_token')
          .catch(() => {});

        setTimeout(() => {
          Alert.alert(
            'Session Berakhir',
            'Anda otomatis logout karena tidak aktif selama 5 menit.'
          );
        }, 300);

      } catch (error) {
        console.log('Auto logout error:', error);
      }
    }, 5 * 60 * 1000);
=======
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (!currentUser.current) return;

    idleTimer.current = setTimeout(async () => {
      await signOut(auth);
      await SecureStore.deleteItemAsync('auth_token').catch(() => {});
      Alert.alert('Session Berakhir', 'Anda otomatis logout karena tidak aktif selama 5 detik.');
    }, 5 * 1000);
>>>>>>> 679f7443df46127fdfb4676497f3f349d9551ae9
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      currentUser.current = u;
      setUser(u);

      if (u) {
        try {
          const token = await u.getIdToken();
<<<<<<< HEAD

          await SecureStore.setItemAsync(
            'auth_token',
            token
          );
        } catch (e) {
          console.log(e);
        }

        resetIdleTimer();

      } else {
        await SecureStore.deleteItemAsync('auth_token')
          .catch(() => {});

        if (idleTimer.current) {
          clearTimeout(idleTimer.current);
        }
      }

      setLoading(false);
    });

    return () => {
      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
      }

      unsub();
    };
  }, []);

  useEffect(() => {
    const sub = AppState.addEventListener(
      'change',
      (nextState) => {
        if (nextState === 'active') {
          resetIdleTimer();
        }
      }
    );

=======
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
>>>>>>> 679f7443df46127fdfb4676497f3f349d9551ae9
    return () => sub.remove();
  }, []);

  const logout = async () => {
<<<<<<< HEAD
    try {
      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
      }

      await signOut(auth);

      await SecureStore.deleteItemAsync('auth_token')
        .catch(() => {});

    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        resetIdleTimer,
      }}
    >
=======
    if (idleTimer.current) clearTimeout(idleTimer.current);
    await signOut(auth);
    await SecureStore.deleteItemAsync('auth_token').catch(() => {});
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, resetIdleTimer }}>
>>>>>>> 679f7443df46127fdfb4676497f3f349d9551ae9
      {children}
    </AuthContext.Provider>
  );
}