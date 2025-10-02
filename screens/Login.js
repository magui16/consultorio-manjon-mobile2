import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/config/firebaseConfig";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ComponentAlert from "./ComponentAlert";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //Estados para la alerta personalizada
  const [alertVisible, setAlertVisible ] = useState(false);
  const [alertTitulo, setAlertTitulo ] = useState("");
  const [alertMensaje, setAlertMensaje ] = useState("");
  const [alertType, setAlertType ] = useState("info"); // "info", "error", "success"

  const handleLogin = async () => {
    if (!email || !password) {
      //Se muestra la alerta personalizada,remplazando al Alert.alert antes usado
      //Alert.alert("Error", "Todos los campos son obligatorios.");
      setAlertTitulo("Error");
      setAlertMensaje("Todos los campos son obligatorios.");
      setAlertType("error");
      setAlertVisible(true);
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
      //Se muestra la alerta personalizada,remplazando al Alert.alert antes usado
      //Alert.alert("Error", errorMessage);
      setAlertTitulo("Error");
      setAlertMensaje(errorMessage);
      setAlertType("error");
      setAlertVisible(true);
     
    }
  };

  return (
    <>
      <ComponentAlert
        visible={alertVisible} // Controla la visibilidad del modal, si es true se muestra y si es false se oculta
        titulo={alertTitulo} // Título de la alerta, ejemplo: "Error", "Éxito"
        mensaje={alertMensaje} // Mensaje de la alerta, es el texto que quieres mostrar, ejemplo: "El usuario o contraseña es incorrecto."
        type={alertType} // Tipo de alerta, puede ser "info", "error", "success" para diferentes estilos
        onClose={() => setAlertVisible(false)} // Función que se llama cuando se cierra la alerta
      />
    <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
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
          <TouchableOpacity>
            <Text style={styles.forgotText}>¿Olvidó su contraseña?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>INGRESAR</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signUpText}>
              ¿No tienes cuenta aún?{" "}
              <Text style={styles.signUpLink} onPress={() => navigation.navigate("SignUp")}>
                Regístrate
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
    </KeyboardAwareScrollView>
    </>
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
    backgroundColor: "#ffffffff",
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
    padding: 20,
    elevation: 4,
  },
  title: {
    fontSize: 35,
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
    borderColor: "#4ae4c2d6",
    borderWidth: 4,
    borderRadius: 50,
    padding: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#474242ff",
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
    backgroundColor: "#57ebcbff",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    width: '60%',
    alignSelf: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpText: {
    marginTop: 20,
    color: "#2cc69dff",
    textAlign: "center",
  },
  signUpLink: {
  color: "#2cc69dff",
  fontWeight: "bold",
},
  forgotText: {
    marginTop: 0,
    marginBottom: 28, 
    color: "#252e29ff",
    textAlign: "right",
    fontSize: 12,
    
  },
});