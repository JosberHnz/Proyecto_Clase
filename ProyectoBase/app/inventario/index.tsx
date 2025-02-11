import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';  // Importa Picker desde el nuevo paquete

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
    // Aquí puedes agregar la lógica para guardar los datos (en una base de datos o almacenamiento local)
    console.log({
      tipo,
      marca,
      modelo,
      serviceTag,
      departamento,
      hostname,
      usuario,
      procesador,
      ram,
      sistemaOperativo,
      discoDuro,
      estado,
      fechaMantenimiento,
      observaciones
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Agregar Equipo al Inventario</Text>

      <Text>Tipo de Equipo</Text>
      <Picker
        selectedValue={tipo}
        onValueChange={(itemValue) => setTipo(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Laptop" value="Laptop" />
        <Picker.Item label="Impresora" value="Impresora" />
        <Picker.Item label="Monitor" value="Monitor" />
        <Picker.Item label="Escáner" value="Escáner" />
        <Picker.Item label="Desktop" value="Desktop" />
        {/* Agrega más opciones según sea necesario */}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={marca}
        onChangeText={setMarca}
      />
      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
      />
      <TextInput
        style={styles.input}
        placeholder="Service Tag o Número de Serie"
        value={serviceTag}
        onChangeText={setServiceTag}
      />
      <TextInput
        style={styles.input}
        placeholder="Departamento"
        value={departamento}
        onChangeText={setDepartamento}
      />
      <TextInput
        style={styles.input}
        placeholder="Hostname"
        value={hostname}
        onChangeText={setHostname}
      />
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Procesador"
        value={procesador}
        onChangeText={setProcesador}
      />
      <TextInput
        style={styles.input}
        placeholder="Memoria RAM"
        value={ram}
        onChangeText={setRam}
      />
      <TextInput
        style={styles.input}
        placeholder="Sistema Operativo"
        value={sistemaOperativo}
        onChangeText={setSistemaOperativo}
      />
      <TextInput
        style={styles.input}
        placeholder="Disco Duro"
        value={discoDuro}
        onChangeText={setDiscoDuro}
      />

      <Text>Estado</Text>
      <Picker
        selectedValue={estado}
        onValueChange={(itemValue) => setEstado(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Asignado" value="Asignado" />
        <Picker.Item label="Respaldo" value="Respaldo" />
        <Picker.Item label="En mantenimiento" value="En mantenimiento" />
        <Picker.Item label="Dañado" value="Dañado" />
        {/* Agrega más opciones según sea necesario */}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Fecha de Último Mantenimiento (dd/mm/yyyy)"
        value={fechaMantenimiento}
        onChangeText={setFechaMantenimiento}
        keyboardType="numeric"  // Para mostrar el teclado numérico
      />
      <TextInput
        style={styles.input}
        placeholder="Observaciones"
        value={observaciones}
        onChangeText={setObservaciones}
      />

      <Button title="Guardar Equipo" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});




