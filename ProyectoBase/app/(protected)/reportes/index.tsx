import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Equipo {
  tipo: string;
  marca: string;
  modelo: string;
  serviceTag: string;
  motivoBaja?: string;
}

export default function Reportes({ navigation }: { navigation: any }) {
  const [reportes, setReportes] = useState<Equipo[]>([]);
  const [equipos, setEquipos] = useState<Equipo[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const reportesData = await AsyncStorage.getItem('reportes');
      const equiposData = await AsyncStorage.getItem('equipos');
      
      if (reportesData) {
        setReportes(JSON.parse(reportesData));
      }
      
      if (equiposData) {
        setEquipos(JSON.parse(equiposData));
      }
    };

    loadData();
  }, []);

  const filtrarEquiposPorTipo = (tipo: string) => {
    return equipos.filter((eq: Equipo) => eq.tipo === tipo);
  };

  const equiposDadosDeBaja = () => {
    const equiposBaja = reportes.filter((eq: Equipo) => eq.motivoBaja);
    Alert.alert('Equipos Dados de Baja', JSON.stringify(equiposBaja, null, 2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reportes Generales</Text>
      
      <Button title="Equipos Dados de Baja" onPress={equiposDadosDeBaja} />
      <Button title="Equipos Laptops" onPress={() => {
        const laptops = filtrarEquiposPorTipo('Laptop');
        Alert.alert('Laptops', JSON.stringify(laptops, null, 2));
      }} />
      <Button title="Equipos Desktop" onPress={() => {
        const desktops = filtrarEquiposPorTipo('Desktop');
        Alert.alert('Desktop', JSON.stringify(desktops, null, 2));
      }} />
      <Button title="Equipos Impresoras" onPress={() => {
        const impresoras = filtrarEquiposPorTipo('Impresora');
        Alert.alert('Impresoras', JSON.stringify(impresoras, null, 2));
      }} />
      <Button title="Número Total de Equipos" onPress={() => Alert.alert('Total Equipos', `${equipos.length}`)} />
      <Button title="Número de Equipos Dados de Baja" onPress={() => Alert.alert('Total Equipos Dados de Baja', `${reportes.filter((eq: Equipo) => eq.motivoBaja).length}`)} />

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
});

