import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Mantenimientos() {
  const [serviceTag, setServiceTag] = useState('');
  const [fechaMantenimiento, setFechaMantenimiento] = useState('');
  const [tipoMantenimiento, setTipoMantenimiento] = useState('');
  const [responsable, setResponsable] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const handleBuscarEquipo = () => {
    if (serviceTag.trim() === '') {
      Alert.alert('Error', 'Ingrese un Service Tag para buscar.');
      return;
    }

    // Simulación de búsqueda en inventario (aquí deberías conectar con tu base de datos)
    Alert.alert('Equipo Encontrado', `Datos del equipo con Service Tag: ${serviceTag}`);
  };

  const handleGuardarMantenimiento = () => {
    if (!serviceTag || !fechaMantenimiento || !tipoMantenimiento || !responsable) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    console.log({
      serviceTag,
      fechaMantenimiento,
      tipoMantenimiento,
      responsable,
      observaciones
    });

    Alert.alert('Éxito', 'Mantenimiento guardado correctamente.');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🔧 Mantenimientos de Equipos</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Buscar equipo por Service Tag</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.inputShort]}
            placeholder="Ingrese Service Tag"
            value={serviceTag}
            onChangeText={setServiceTag}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleBuscarEquipo}>
            <Text style={styles.buttonText}>🔎 Buscar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Fecha de Mantenimiento (dd/mm/yyyy)"
        value={fechaMantenimiento}
        onChangeText={setFechaMantenimiento}
        keyboardType="numeric"
      />

      <View style={styles.section}>
        <Text style={styles.label}>Tipo de Mantenimiento</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={tipoMantenimiento} onValueChange={setTipoMantenimiento} style={styles.picker}>
            <Picker.Item label="Seleccione un tipo" value="" />
            <Picker.Item label="Preventivo" value="Preventivo" />
            <Picker.Item label="Correctivo" value="Correctivo" />
          </Picker>
        </View>
      </View>

      <TextInput style={styles.input} placeholder="Responsable del Mantenimiento" value={responsable} onChangeText={setResponsable} />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Observaciones"
        value={observaciones}
        onChangeText={setObservaciones}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleGuardarMantenimiento}>
        <Text style={styles.buttonText}>💾 Guardar Mantenimiento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputShort: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginLeft: 10,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: 45,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
