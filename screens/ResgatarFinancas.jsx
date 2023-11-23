import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

export default function ResgatarFinancas({ navigation }) {
  const [dados, setDados] = useState({});
  const [contaBancaria, setContaBancaria] = useState('');
  const [agenciaBancaria, setAgenciaBancaria] = useState('');
  const [valorResgate, setValorResgate] = useState('');

  useEffect(() => {
    axios.get('http://10.0.2.2:8000/usuarios/1').then((res) => {
      setDados(res.data);
    });
  }, []);

  const realizarResgate = async () => {
    const novoSaldo = dados.saldo - parseFloat(valorResgate);

    if (novoSaldo < 0) {
      Alert.alert('Saldo insuficiente para o resgate.');
    } else {
        //ta otimo essa merda aqui aceitem
      console.log('Dados do resgate:', {
        conta: contaBancaria,
        agencia: agenciaBancaria,
        valor: parseFloat(valorResgate),
      });


      await axios.put(`http://10.0.2.2:8000/usuarios/1`, {
        saldo: novoSaldo,
      });

      await axios.post('http://10.0.2.2:8000/extrato', {
        cpf: 1, 
        valor: parseFloat(valorResgate),
      });

      navigation.navigate('conta');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resgatar Finanças</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Saldo Atual:</Text>
        <Text style={styles.text}>R$ {dados.saldo}</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Conta Bancária"
        onChangeText={(text) => setContaBancaria(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Agência Bancária"
        onChangeText={(text) => setAgenciaBancaria(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor a Resgatar"
        keyboardType="numeric"
        onChangeText={(text) => setValorResgate(text)}
      />

      <TouchableOpacity style={styles.button} onPress={realizarResgate}>
        <Text style={styles.buttonText}>Realizar Resgate</Text>
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
