import { useState } from "react";
import { ScrollView, Text, StyleSheet, TextInput,Button } from "react-native";

export default function RegistrationScreen() {
    const [formulario, setFormulario] = useState({
        nombre: 'prueba',
        apellido: 'test',
        correo: '',
        telefono: '1234',
        password: '',
        confirmarPassword: '',
    });

    const [errores, setErrores] = useState({
        nombre: 'prueba',
        apellido: 'test',
        correo: '',
        telefono: '1234',
        password: '',
        confirmarPassword: '',
    });

    const manejarCambio = (campo: string, valor: string) => {
        setFormulario((prevFormulario) => ({
            ...prevFormulario,
            [campo]: valor,
        }));
    };
    const validarFormulario = () =>{
        
    };

    const manejarRegistro = () =>{

    };

    return(
    <ScrollView contentContainerStyle={styles.container}>
        <Text>Registro</Text>
        <Text style={styles.label}>
            Nombre:
        </Text>

        <TextInput
            style={styles.input}
            placeholder="Ingrese su nombre"
            value={formulario.nombre}
            onChangeText={(texto) => { manejarCambio('nombre', texto) }}
        />
        <Text style={styles.label}>
            Apellido:
        </Text>
        <TextInput
            style={styles.input}
            placeholder="Ingrese su apellido"
            value={formulario.apellido}
            onChangeText={(texto) => { manejarCambio('apellido', texto) }}
        />
        <Text style={styles.label}>Correo Electronico: </Text>
        <TextInput
            style={styles.input}
            placeholder="Ingrese su correo"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formulario.correo}
            onChangeText={(texto) => { manejarCambio('correo', texto) }}
        />

        <Text>Numero telefonico: </Text>
        <TextInput
            style={styles.input}
            placeholder="Ingrese su numero telefonico"
            keyboardType="phone-pad"
            maxLength={8}
            value={formulario.telefono}
            onChangeText={(texto) => { manejarCambio('telefono', texto) }}
        />

        <Text>Contraseña: </Text>
        <TextInput 
         style={styles.input}
         placeholder="Ingrese su contraseña"
         secureTextEntry
         value={formulario.password}
        onChangeText={(texto) => { manejarCambio('password', texto) }}
        />

        <Text>Confirmar contraseña: </Text>
        <TextInput 
         style={styles.input}
         placeholder="Confirme su contraseña"
         secureTextEntry
         value={formulario.confirmarPassword}
        onChangeText={(texto) => { manejarCambio('confirmarPassword', texto) }}
        />

        <Button title="Registrarse" onPress={manejarRegistro} />

    </ScrollView>
    );

};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    }
});