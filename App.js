<<<<<<< HEAD
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, View } from "react-native";

import AuthProvider, { useAuth } from "./src/contexts/AuthContext";

=======
import { Text, View } from "react-native";

// Import semua komponen yang dicurigai
import { AuthProvider } from "./src/contexts/AuthContext";
>>>>>>> 7ec5625c764bbdae136a4bc30ab54107125ca3ef
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

<<<<<<< HEAD
const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function Root() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4285F4" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
=======
export default function App() {
  // Fungsi untuk mengecek isi komponen yang ditangkap oleh React
  const cekStatus = (komponen) => {
    if (komponen === undefined) return "UNDEFINED ❌ (Ini bikin error!)";
    if (typeof komponen === "object")
      return "OBJECT ⚠️ (Bisa error kalau bukan module default)";
    if (typeof komponen === "function") return "FUNCTION ✅ (Aman)";
    return typeof komponen;
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 30,
        backgroundColor: "#fff",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 30,
          alignSelf: "center",
        }}
      >
        🕵️ Hasil Detektif:
      </Text>

      <Text style={{ fontSize: 16, marginBottom: 15 }}>
        1. AuthProvider : {cekStatus(AuthProvider)}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 15 }}>
        2. LoginScreen : {cekStatus(LoginScreen)}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 15 }}>
        3. RegisterScreen : {cekStatus(RegisterScreen)}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 15 }}>
        4. HomeScreen : {cekStatus(HomeScreen)}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 15 }}>
        5. ForgotPwScreen: {cekStatus(ForgotPasswordScreen)}
      </Text>

      <Text
        style={{
          marginTop: 40,
          color: "red",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Perhatikan yang tulisannya ❌ atau ⚠️
      </Text>
    </View>
  );
}
>>>>>>> 7ec5625c764bbdae136a4bc30ab54107125ca3ef
