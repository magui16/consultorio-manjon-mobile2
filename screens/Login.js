import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/config/firebaseConfig";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingrese ambos campos.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      let errorMessage = "Hubo un problema al iniciar sesión.";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "El formato del correo electrónico no es válido.";
          break;
        case "auth/wrong-password":
        case "auth/user-not-found":
          errorMessage =
            "Credenciales inválidas. Verifica tu correo y contraseña.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Error de conexión, intenta más tarde.";
          break;
        default:
          errorMessage = error.message;
      }
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <View style={styles.root}>
      {/* Imagen odontológica arriba con degradado superpuesto */}
        <View style={styles.headerImageContainer}>
          <Image
            source={require("../assets/foto-slider-4-1.png")}
            style={styles.headerImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["rgba(250, 245, 245, 0)", "#fff"]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0.5, y: 0.0 }}
            end={{ x: 0.5, y: 1.0 }}
          />
      </View>

      {/* Degradado debajo de la imagen */}
      <LinearGradient
        colors={["#ffffffff", "#9fe2cfff"]}
        style={styles.gradient}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Iniciar sesión</Text>
          <Image
            source={require("../assets/copia.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.label}>Correo</Text>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Ingrese su contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              <FontAwesome
                name={showPassword ? "eye-slash" : "eye"}
                size={18}
                color="#555"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>INGRESAR</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signUpText}>
              ¿No tienes cuenta aún? Regístrate
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgotText}>¿Olvidó su contraseña?</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImageContainer: {
    position: 'relative',
    width: '100%',
    height: 220,
    overflow: 'hidden',
  },
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#ffffffff",
    borderRadius: 8,
    borderRadiusColor: "#5a2020ff",
    padding: 20,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 16,
    textAlign: "center",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 14,
    color: "#333",
  },
  eyeButton: {
    padding: 5,
  },
  button: {
    backgroundColor: "#05f7c2",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpText: {
    marginTop: 20,
    color: "#fff",
    textAlign: "center",
  },
  forgotText: {
    marginTop: 10,
    color: "#fff",
    textAlign: "center",
  },
});