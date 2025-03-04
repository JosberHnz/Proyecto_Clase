import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Inventario() {
  const [tipo, setTipo] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [serviceTag, setServiceTag] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [hostname, setHostname] = useState('');
  const [usuario, setUsuario] = useState('');
  const [procesador, setProcesador] = useState('');
  const [ram, setRam] = useState('');
  const [sistemaOperativo, setSistemaOperativo] = useState('');
  const [discoDuro, setDiscoDuro] = useState('');
  const [estado, setEstado] = useState('');
  const [fechaMantenimiento, setFechaMantenimiento] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const handleSubmit = () => {
    console.log({
      tipo, marca, modelo, serviceTag, departamento, hostname,
      usuario, procesador, ram, sistemaOperativo, discoDuro,
      estado, fechaMantenimiento, observaciones
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📋 Agregar Equipo</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Tipo de Equipo</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={tipo} onValueChange={setTipo} style={styles.picker}>
            <Picker.Item label="Seleccione un tipo" value="" />
            <Picker.Item label="Laptop" value="Laptop" />
            <Picker.Item label="Impresora" value="Impresora" />
            <Picker.Item label="Monitor" value="Monitor" />
            <Picker.Item label="Escáner" value="Escáner" />
            <Picker.Item label="Desktop" value="Desktop" />
          </Picker>
        </View>
      </View>

      <TextInput style={styles.input} placeholder="Marca" value={marca} onChangeText={setMarca} />
      <TextInput style={styles.input} placeholder="Modelo" value={modelo} onChangeText={setModelo} />
      <TextInput style={styles.input} placeholder="Service Tag / Número de Serie" value={serviceTag} onChangeText={setServiceTag} />
      <TextInput style={styles.input} placeholder="Departamento" value={departamento} onChangeText={setDepartamento} />
      <TextInput style={styles.input} placeholder="Hostname" value={hostname} onChangeText={setHostname} />
      <TextInput style={styles.input} placeholder="Usuario" value={usuario} onChangeText={setUsuario} />
      <TextInput style={styles.input} placeholder="Procesador" value={procesador} onChangeText={setProcesador} />
      <TextInput style={styles.input} placeholder="Memoria RAM" value={ram} onChangeText={setRam} />
      <TextInput style={styles.input} placeholder="Sistema Operativo" value={sistemaOperativo} onChangeText={setSistemaOperativo} />
      <TextInput style={styles.input} placeholder="Disco Duro" value={discoDuro} onChangeText={setDiscoDuro} />

      <View style={styles.section}>
        <Text style={styles.label}>Estado</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={estado} onValueChange={setEstado} style={styles.picker}>
            <Picker.Item label="Seleccione un estado" value="" />
            <Picker.Item label="Asignado" value="Asignado" />
            <Picker.Item label="Respaldo" value="Respaldo" />
            <Picker.Item label="En mantenimiento" value="En mantenimiento" />
            <Picker.Item label="Dañado" value="Dañado" />
          </Picker>
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Fecha de Último Mantenimiento (dd/mm/yyyy)"
        value={fechaMantenimiento}
        onChangeText={setFechaMantenimiento}
        keyboardType="numeric"
      />
      
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Observaciones"
        value={observaciones}
        onChangeText={setObservaciones}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>📁 Guardar Equipo</Text>
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
  textArea: {
    height: 80,
    textAlignVertical: 'top',
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





