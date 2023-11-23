import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function EditarConta({ navigation }) {
  const [dados, setDados] = useState({});
  const [novoNome, setNovoNome] = useState('');
  const [novoEmail, setNovoEmail] = useState('');

  useEffect(() => {
    axios.get('http://10.0.2.2:8000/usuarios/1').then((res) => {
      setDados(res.data);
    });
  }, []);

  const salvarAlteracoes = () => {
    axios.put(`http://10.0.2.2:8000/usuarios/1`, {
      nome: novoNome || dados.nome,
      email: novoEmail || dados.email,
    }).then(() => {
      navigation.goBack();
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Conta</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nome Atual:</Text>
        <Text style={styles.text}>{dados.nome}</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Novo Nome"
        onChangeText={(text) => setNovoNome(text)}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.label}>E-mail Atual:</Text>
        <Text style={styles.text}>{dados.email}</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Novo E-mail"
        onChangeText={(text) => setNovoEmail(text)}
      />

      <TouchableOpacity style={styles.button} onPress={salvarAlteracoes}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
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
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
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
