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
  fechaMantenimiento: string;
  observaciones: string;
}

export default function BajaEquipos({ navigation }: { navigation: any }) {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [motivoBaja, setMotivoBaja] = useState<string>('');
  const [selectedEquipo, setSelectedEquipo] = useState<Equipo | null>(null);

  useEffect(() => {
    const loadEquipos = async () => {
      const equiposData = await AsyncStorage.getItem('equipos');
      if (equiposData) {
        setEquipos(JSON.parse(equiposData));
      }
    };

    loadEquipos();
  }, []);

  const darDeBaja = async () => {
    if (selectedEquipo && motivoBaja) {
      try {
        const equiposData = await AsyncStorage.getItem('equipos');
        const reportesData = await AsyncStorage.getItem('reportes');
        
        if (equiposData) {
          const equipos = JSON.parse(equiposData);
          const index = equipos.findIndex((eq: Equipo) => eq.serviceTag === selectedEquipo?.serviceTag);
          
          if (index !== -1) {
            equipos.splice(index, 1);
            await AsyncStorage.setItem('equipos', JSON.stringify(equipos));

            const reportes = reportesData ? JSON.parse(reportesData) : [];
            reportes.push({ ...selectedEquipo, motivoBaja });
            await AsyncStorage.setItem('reportes', JSON.stringify(reportes));

            Alert.alert('Equipo dado de baja exitosamente');
            
            setMotivoBaja('');
            setSelectedEquipo(null);
            setEquipos(equipos.filter((eq: Equipo) => eq.serviceTag !== selectedEquipo?.serviceTag));
          }
        }
      } catch (error) {
        Alert.alert('Error al dar de baja el equipo');
      }
    } else {
      Alert.alert('Por favor, ingrese el motivo de la baja.');
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
      <Text style={styles.header}>Baja de Equipos</Text>

      <FlatList
        data={equipos}
        renderItem={renderItem}
        keyExtractor={(item) => item.serviceTag}
      />

      {selectedEquipo && (
        <View>
          <Text style={styles.header}>Motivo de Baja</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese el motivo de la baja"
            value={motivoBaja}
            onChangeText={setMotivoBaja}
          />
          <Button title="Dar de Baja" onPress={darDeBaja} />
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

