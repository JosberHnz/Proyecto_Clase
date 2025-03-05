import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
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
  fechaMantenimiento: string;
  observaciones: string;
  tipoMantenimiento: string;
  responsableMantenimiento: string;
}

function Inventario() {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [mantenimientos, setMantenimientos] = useState<Mantenimiento[]>([]);

  useEffect(() => {
    const loadEquipos = async () => {
      const equiposData = await AsyncStorage.getItem('equipos');
      if (equiposData) {
        setEquipos(JSON.parse(equiposData));
      }
    };

    const loadMantenimientos = async () => {
      const mantenimientosData = await AsyncStorage.getItem('mantenimientos');
      if (mantenimientosData) {
        setMantenimientos(JSON.parse(mantenimientosData));
      }
    };

    loadEquipos();
    loadMantenimientos();
  }, []);

  const renderItem = ({ item }: { item: Equipo }) => {
    const mantenimiento = mantenimientos.find(m => m.serviceTag === item.serviceTag);

    return (
      <View style={styles.equipoContainer}>
        <Text style={styles.equipoTitle}>{item.tipo}</Text>
        <View style={styles.separator} />

        <Text style={styles.equipoText}><Text style={styles.bold}>Marca:</Text> {item.marca}</Text>
        <Text style={styles.equipoText}><Text style={styles.bold}>Modelo:</Text> {item.modelo}</Text>
        <Text style={styles.equipoText}><Text style={styles.bold}>Service Tag:</Text> {item.serviceTag}</Text>
        <Text style={styles.equipoText}><Text style={styles.bold}>Sistema Operativo:</Text> {item.sistemaOperativo}</Text>
        <Text style={styles.equipoText}><Text style={styles.bold}>Memoria RAM:</Text> {item.memoriaRAM}</Text>
        <Text style={styles.equipoText}><Text style={styles.bold}>Disco Duro:</Text> {item.discoDuro}</Text>
        <Text style={styles.equipoText}><Text style={styles.bold}>Procesador:</Text> {item.procesador}</Text>
        <Text style={styles.equipoText}><Text style={styles.bold}>Departamento:</Text> {item.departamento}</Text>
        <Text style={styles.equipoText}><Text style={styles.bold}>Usuario:</Text> {item.usuario}</Text>
        <Text style={styles.equipoText}><Text style={styles.bold}>Estado:</Text> {item.estado}</Text>
        <Text style={styles.equipoText}><Text style={styles.bold}>Observaciones:</Text> {item.observaciones}</Text>

        {mantenimiento && (
          <>
            <View style={styles.separator} />
            <Text style={styles.equipoText}><Text style={styles.bold}>Último Mantenimiento:</Text> {mantenimiento.fechaMantenimiento}</Text>
            <Text style={styles.equipoText}><Text style={styles.bold}>Notas de Mantenimiento:</Text> {mantenimiento.observaciones}</Text>
            <Text style={styles.equipoText}><Text style={styles.bold}>Tipo de Mantenimiento:</Text> {mantenimiento.tipoMantenimiento}</Text>
            <Text style={styles.equipoText}><Text style={styles.bold}>Responsable del Mantenimiento:</Text> {mantenimiento.responsableMantenimiento}</Text>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📋 Inventario de Equipos</Text>
      <FlatList
        data={equipos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  listContainer: {
    alignItems: 'center',
    width: '100%',
  },
  equipoContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  equipoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
  equipoText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Inventario;


