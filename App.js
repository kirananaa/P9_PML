import { Text, View } from "react-native";

// Import semua komponen yang dicurigai
import { AuthProvider } from "./src/contexts/AuthContext";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

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
