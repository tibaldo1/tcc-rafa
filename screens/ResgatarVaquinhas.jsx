import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Modal, Pressable } from 'react-native';
import axios from 'axios';

export default function ResgatarVaquinhas({ navigation }) {
  const [dados, setDados] = useState([]);
  const [vaquinhas, setVaquinhas] = useState([]);
  const [vaquinhaSelecionada, setVaquinhaSelecionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios.get(`http://10.0.2.2:8000/usuarios/1`).then((res) => setDados(res.data));
    axios.get(`http://10.0.2.2:8000/mostrarVaquinhas`).then((res) => setVaquinhas(res.data));
  }, [vaquinhas]);

  const selecionarVaquinha = (vaquinha) => {
    setVaquinhaSelecionada(vaquinha);
    setModalVisible(true);
  };

  const resgatarVaquinhaSelecionada = async () => {
    try {
      await axios.delete(`http://10.0.2.2:8000/usercow/${vaquinhaSelecionada.id_vaquinha}`);
      await axios.post('http://10.0.2.2:8000/extrato', {
        cpf: 1,
        valor: vaquinhaSelecionada.valor,
      });
      const totalUsuarioSaldo = parseFloat(dados.saldo) + vaquinhaSelecionada.valor;
      await axios.put('http://10.0.2.2:8000/usuarios/1', {
        saldo: totalUsuarioSaldo,
      });
      Alert.alert('Vaquinha resgatada com sucesso!');
      setModalVisible(false);
      navigation.navigate('conta');
    } catch (error) {
      console.error('Erro ao realizar resgate:', error);
      Alert.alert('Erro ao realizar resgate. Por favor, tente novamente.');
    }

    setVaquinhaSelecionada(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Resgatar Vaquinhas</Text>
      {vaquinhas.map((vaquinha) => (
        <TouchableOpacity
          key={vaquinha.id_vaquinha}
          style={[styles.card, vaquinhaSelecionada === vaquinha && styles.selectedCard]}
          onPress={() => selecionarVaquinha(vaquinha)}
        >
          <Text>{vaquinha.nome}</Text>
          <Text>{vaquinha.descricao}</Text>
          <Text>{vaquinha.valor}</Text>
        </TouchableOpacity>
      ))}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Confirma o resgate da vaquinha {vaquinhaSelecionada?.nome} no valor de {vaquinhaSelecionada?.valor}?
            </Text>
            <Pressable
              style={[styles.button, styles.confirmButton]}
              onPress={() => resgatarVaquinhaSelecionada()}
            >
              <Text style={styles.textStyle}>Confirmar Resgate</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 10,
    width: 200,
  },
  selectedCard: {
    backgroundColor: 'lightgray',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
  },
  confirmButton: {
    backgroundColor: '#2196F3',
  },
  cancelButton: {
    backgroundColor: '#FF6347',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
