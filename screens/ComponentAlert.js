import React, { useState } from "react";
import { View, Text, TouchableOpacity,StyleSheet } from "react-native";
import Modal from "react-native-modal";

export default function ComponentAlert({visible,titulo,mensaje,onClose}) {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <Modal 
        transparent={true}
        animationType="slide"
        visible={visible}
        onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{titulo}</Text>
          <Text style={styles.message}>{mensaje}</Text>     
            <TouchableOpacity style={styles.button} onPress={onClose}>
                <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,    
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semi-transparente
    padding: 20,
    },
    modalContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",    
    borderRadius: 8,
    padding: 20,
    alignItems: "center",   
    elevation: 5,
    },
    title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,       
    color: "#333",
    textAlign: "center",
    },
    message: {
    fontSize: 16,
    marginBottom: 20,    
    color: "#555",      
    textAlign: "center",
    },
    button: {   
    backgroundColor: "#4ae4c2d6",   
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,   
    alignItems: "center",
    },
    buttonText: {   
    color: "#000000ff",          
    fontSize: 16,
    fontWeight: "bold",
    },
});