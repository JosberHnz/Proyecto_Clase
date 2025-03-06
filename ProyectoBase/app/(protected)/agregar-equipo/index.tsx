import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

interface Equipo {
  tipo: string;
  marca: string;
  modelo: string;
  serviceTag: string;
  sistemaOperativo: string;
  memoriaRAM: string;
  discoDuro: string;
  procesador: string;
  departamento: string;
  usuario: string;
  estado: string;
  observaciones: string;
}

export default function AgregarEquipo({ navigation }: any) {
  const [equipo, setEquipo] = useState<Equipo>({
    tipo: '',
    marca: '',
    modelo: '',
    serviceTag: '',
    sistemaOperativo: '',
    memoriaRAM: '',
    discoDuro: '',
    procesador: '',
    departamento: '',
    usuario: '',
    estado: '',
    observaciones: '',
  });

  const handleChange = (name: keyof Equipo, value: string) => {
    setEquipo((prev) => ({ ...prev, [name]: value }));
  };

  const guardarEquipo = async () => {
    try {
      const equiposData = await AsyncStorage.getItem('equipos');
      const equipos: Equipo[] = equiposData ? JSON.parse(equiposData) : [];

      equipos.push(equipo);
      await AsyncStorage.setItem('equipos', JSON.stringify(equipos));

      Alert.alert('Éxito', 'Equipo agregado correctamente');

      setEquipo({
        tipo: '',
        marca: '',
        modelo: '',
        serviceTag: '',
        departamento: '',
        estado: '',
        observaciones: '',
        sistemaOperativo: '',
        memoriaRAM: '',
        discoDuro: '',
        procesador: '',
        usuario: '',
      });

      navigation.navigate('Inventario');
    } catch (error) {
      console.error('Error al guardar el equipo:', error);
      Alert.alert('Error', 'No se pudo guardar el equipo');
    }
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Agregar Equipo</Text>

        <Text style={styles.label}>Tipo de Equipo</Text>
        <Picker selectedValue={equipo.tipo} onValueChange={(itemValue) => handleChange('tipo', itemValue)} style={styles.picker}>
          <Picker.Item label="Laptop" value="Laptop" />
          <Picker.Item label="Desktop" value="Desktop" />
          <Picker.Item label="Impresora" value="Impresora" />
        </Picker>

        <TextInput style={styles.input} placeholder="Marca" value={equipo.marca} onChangeText={(text) => handleChange('marca', text)} />
        <TextInput style={styles.input} placeholder="Modelo" value={equipo.modelo} onChangeText={(text) => handleChange('modelo', text)} />
        <TextInput style={styles.input} placeholder="Service Tag" value={equipo.serviceTag} onChangeText={(text) => handleChange('serviceTag', text)} />
        <TextInput style={styles.input} placeholder="Sistema Operativo" value={equipo.sistemaOperativo} onChangeText={(text) => handleChange('sistemaOperativo', text)} />
        <TextInput style={styles.input} placeholder="Memoria RAM" value={equipo.memoriaRAM} onChangeText={(text) => handleChange('memoriaRAM', text)} />
        <TextInput style={styles.input} placeholder="Disco Duro" value={equipo.discoDuro} onChangeText={(text) => handleChange('discoDuro', text)} />
        <TextInput style={styles.input} placeholder="Procesador" value={equipo.procesador} onChangeText={(text) => handleChange('procesador', text)} />
        <TextInput style={styles.input} placeholder="Departamento" value={equipo.departamento} onChangeText={(text) => handleChange('departamento', text)} />
        <TextInput style={styles.input} placeholder="Usuario" value={equipo.usuario} onChangeText={(text) => handleChange('usuario', text)} />
        <TextInput style={styles.input} placeholder="Estado" value={equipo.estado} onChangeText={(text) => handleChange('estado', text)} />
        <TextInput style={styles.input} placeholder="Observaciones" value={equipo.observaciones} onChangeText={(text) => handleChange('observaciones', text)} />

        <Button 
          title="Guardar" 
          onPress={guardarEquipo} 
          color="#4CAF50" 
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  innerContainer: {
    width: '90%',
    maxWidth: 500,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  picker: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
    height: 40,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    fontSize: 16,
  },
});
