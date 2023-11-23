import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function Conta({navigation}) {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    axios.get('http://10.0.2.2:8000/usuarios/1').then((res) => {
      setDados(res.data);
    });
  }, [dados]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Conta</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nome da Conta</Text>
        <Text style={styles.text}>{dados.nome}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Meu Email</Text>
        <Text style={styles.text}>{dados.email}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Meu Saldo</Text>
        <Text style={styles.text}>{dados.saldo}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('resgatarvaquinhas')}>
        <Text style={styles.buttonText}>Resgatar Vaquinhas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('resgatarfinancas')}>
        <Text style={styles.buttonText}>Resgatar Finanças</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('editarconta')}>
        <Text style={styles.buttonText}>Mudar Dados Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
