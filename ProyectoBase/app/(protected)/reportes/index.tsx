import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Equipo {
  tipo: string;
  marca: string;
  modelo: string;
  serviceTag: string;
  motivoBaja?: string;
}

export default function Reportes() {
  const [totalEquipos, setTotalEquipos] = useState(0);
  const [equiposLaptops, setEquiposLaptops] = useState(0);
  const [equiposDesktop, setEquiposDesktop] = useState(0);
  const [equiposImpresoras, setEquiposImpresoras] = useState(0);
  const [equiposBaja, setEquiposBaja] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const equiposData = await AsyncStorage.getItem('equipos');
        const reportesData = await AsyncStorage.getItem('reportes');

        const equipos: Equipo[] = equiposData ? JSON.parse(equiposData) : [];
        const reportes: Equipo[] = reportesData ? JSON.parse(reportesData) : [];

        setTotalEquipos(equipos.length);
        setEquiposLaptops(equipos.filter(eq => eq.tipo === 'Laptop').length);
        setEquiposDesktop(equipos.filter(eq => eq.tipo === 'Desktop').length);
        setEquiposImpresoras(equipos.filter(eq => eq.tipo === 'Impresora').length);
        setEquiposBaja(reportes.filter(eq => eq.motivoBaja).length);
      } catch (error) {
        console.error('Error cargando datos:', error);
      }
    };

    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reportes Generales</Text>
      
      <View style={styles.card}>
        <Text style={styles.info}>📦 Equipos en Inventario: {totalEquipos}</Text>
        <Text style={styles.info}>💻 Laptops: {equiposLaptops}</Text>
        <Text style={styles.info}>🖥️ Desktops: {equiposDesktop}</Text>
        <Text style={styles.info}>🖨️ Impresoras: {equiposImpresoras}</Text>
        <Text style={styles.info}>🗑️ Equipos Dados de Baja: {equiposBaja}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
});
