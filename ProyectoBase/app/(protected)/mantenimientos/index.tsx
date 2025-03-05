import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

interface Mantenimiento {
  serviceTag: string;
  fecha: string;
  tipo: string;
  responsable: string;
  observaciones: string;
}

export default function Mantenimientos({ navigation }: { navigation: any }) {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [mantenimientos, setMantenimientos] = useState<Mantenimiento[]>([]);
  const [selectedEquipo, setSelectedEquipo] = useState<Equipo | null>(null);
  const [fecha, setFecha] = useState('');
  const [tipo, setTipo] = useState('');
  const [responsable, setResponsable] = useState('');
  const [observaciones, setObservaciones] = useState('');

  useEffect(() => {
    const loadEquipos = async () => {
      const equiposData = await AsyncStorage.getItem('equipos');
      const mantenimientosData = await AsyncStorage.getItem('mantenimientos');
      if (equiposData) setEquipos(JSON.parse(equiposData));
      if (mantenimientosData) setMantenimientos(JSON.parse(mantenimientosData));
    };
    loadEquipos();
  }, []);

  const agregarMantenimiento = async () => {
    if (selectedEquipo && fecha && tipo && responsable) {
      try {
        const mantenimientoExistente = mantenimientos.find(
          (m) => m.serviceTag === selectedEquipo.serviceTag
        );

        let nuevaListaMantenimientos: Mantenimiento[];
        
        if (mantenimientoExistente) {
          const mantenimientoActualizado = {
            ...mantenimientoExistente,
            fecha,
            tipo,
            responsable,
            observaciones,
          };
          nuevaListaMantenimientos = mantenimientos.map((m) =>
            m.serviceTag === selectedEquipo.serviceTag ? mantenimientoActualizado : m
          );
        } else {
          const nuevoMantenimiento: Mantenimiento = {
            serviceTag: selectedEquipo.serviceTag,
            fecha,
            tipo,
            responsable,
            observaciones,
          };
          nuevaListaMantenimientos = [...mantenimientos, nuevoMantenimiento];
        }

        setMantenimientos(nuevaListaMantenimientos);
        await AsyncStorage.setItem('mantenimientos', JSON.stringify(nuevaListaMantenimientos));

        Alert.alert('Mantenimiento agregado exitosamente');
        
        setFecha('');
        setTipo('');
        setResponsable('');
        setObservaciones('');
        setSelectedEquipo(null);
      } catch (error) {
        Alert.alert('Error al guardar el mantenimiento');
      }
    } else {
      Alert.alert('Por favor, complete todos los campos obligatorios.');
    }
  };

  const renderItem = ({ item }: { item: Equipo }) => (
    <View style={styles.equipoItem}>
      <Text>{item.tipo} - {item.marca} - {item.modelo} - {item.serviceTag}</Text>
      <Button title="Seleccionar" onPress={() => setSelectedEquipo(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mantenimiento de Equipos</Text>

      <FlatList
        data={equipos}
        renderItem={renderItem}
        keyExtractor={(item) => item.serviceTag}
      />

      {selectedEquipo && (
        <View>
          <Text style={styles.header}>Registrar Mantenimiento</Text>
          <TextInput
            style={styles.input}
            placeholder="Fecha (DD/MM/AAAA)"
            value={fecha}
            onChangeText={setFecha}
          />
          <TextInput
            style={styles.input}
            placeholder="Tipo de Mantenimiento"
            value={tipo}
            onChangeText={setTipo}
          />
          <TextInput
            style={styles.input}
            placeholder="Responsable"
            value={responsable}
            onChangeText={setResponsable}
          />
          <TextInput
            style={styles.input}
            placeholder="Observaciones"
            value={observaciones}
            onChangeText={setObservaciones}
          />
          <Button title="Guardar Mantenimiento" onPress={agregarMantenimiento} />
        </View>
      )}

      <Button title="Volver al Menú Principal" onPress={() => navigation.navigate('MenuPrincipal')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 8,
    backgroundColor: '#fff',
  },
  equipoItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});
