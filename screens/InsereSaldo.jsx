import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button, ScrollView, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

export default function InsereSaldo({navigation}) {
  const [dados, setDados] = useState([]);
  const [saldo, setSaldo] = useState('');
  const [vaquinha, setVaquinha] = useState('');
  const [idVaca, setIdVaca] = useState('');
  const [dadosVacas, setDadosVacas] = useState([]);
  const [umaVaca, setUmaVaca] = useState([]);
  const [valorUsuario, setValorUsuario] = useState(0);

  useEffect(() => {
    axios.get('http://10.0.2.2:8000/usuarios/1').then((res) => setDados(res.data));
    axios.get(`http://10.0.2.2:8000/mostrarVaquinhas/`).then((res) => setDadosVacas(res.data));
    axios.get(`http://10.0.2.2:8000/mostrarVaquinhas/${idVaca}`).then((res) => setUmaVaca(res.data));
  }, [vaquinha]);

  function testaValor() {
    console.log(idVaca);
    console.log(umaVaca);
  }

  function inserirSaldo() {
    const valor = dados.saldo;
    const total = parseFloat(valor) + parseFloat(saldo);
    console.log(total);
    console.log(valor);
    try {
      axios.put('http://10.0.2.2:8000/usuarios/1', {
        saldo: total,
      }).then(Alert.alert('saldo adicionado com sucesso')).then(navigation.goBack());
    } catch (erros) {
      console.error('falhou!');
    }
  }

  function inserirSaldoVaca() {
    const saldoUsuario = parseFloat(dados.saldo);
    const valorInseridoUsuario = parseFloat(valorUsuario);
    const saldoVaca = parseFloat(umaVaca[0].valor);
    console.log(saldoVaca);
    const idVaquinha = idVaca;

    if (saldoUsuario < valorInseridoUsuario) {
      return Alert.alert('Saldo insuficiente!!!');
    } else {
      const totalUsuarioSaldo = saldoUsuario - valorInseridoUsuario;
      const totalVaquinha = valorInseridoUsuario + saldoVaca;
      axios.put('http://10.0.2.2:8000/usuarios/1', {
        saldo: totalUsuarioSaldo,
      }).then(console.log('usuario teve seu saldo reduzido')).then(
        axios.put(`http://10.0.2.2:8000/vaquinha/${idVaquinha}`, {
          valor: totalVaquinha,
        }).then((res) => { Alert.alert('Valor da vaca atualizada com sucesso'); }).then(navigation.goBack())
      );
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="valor na conta"
        keyboardType="numeric"
        onChangeText={(e) => setSaldo(e)}
      />
      <TouchableOpacity style={styles.button} onPress={() => inserirSaldo()}>
        <Text>Adicionar Saldo</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="valor na vaquinha"
        keyboardType="numeric"
        onChangeText={(e) => { setValorUsuario(e); }}
      />
      <RNPickerSelect
  onValueChange={(value) => {
    setVaquinha(value);
    const selectedVaquinha = dadosVacas.find((elemento) => elemento.id_vaquinha === value);
    if (selectedVaquinha) {
      setIdVaca(selectedVaquinha.id_vaquinha);
    }
  }}
  items={dadosVacas.map((elemento) => ({ label: elemento.nome, value: elemento.id_vaquinha }))}
/>


      <TouchableOpacity style={styles.button} onPress={() => { inserirSaldoVaca(); }}>
        <Text>Contribuir</Text>
      </TouchableOpacity>

      <Button title={'Teste'} onPress={() => testaValor()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
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
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
});
