import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, ProgressBarAndroid } from 'react-native';
import ProgressBar from 'react-native-progress/Bar'; 

export default function VacaCompleta({ route, navigation }) {
  const { id } = route.params;
  const [dados, setDados] = useState([]);

  useEffect(() => {
    axios.get(`http://10.0.2.2:8000/mostrarVaquinhas/${id}`).then((res) => setDados(res.data));
  }, []);

  const calcularDiasRestantes = (dataFim) => {
    const dataFimVaquinha = new Date(dataFim);
    const hoje = new Date();
    const diffEmMilliseconds = dataFimVaquinha - hoje;
    const diffEmDias = Math.ceil(diffEmMilliseconds / (1000 * 60 * 60 * 24));

    return diffEmDias;
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ID da Vaca: {id}</Text>

      {dados.map((e) => (
        <View key={e.id}>
          <Text>Nome da Vaca: {e.nome}</Text>
          <Text>Descrição da Vaca: {e.descricao}</Text>
          <Text>Valor da Vaca: {e.valor}</Text>
          <Text>Objetivo da Vaca: {e.objetivo}</Text>
          <Text>Quando acaba a Vaca: {e.data_fim}</Text>

          {/* Comparar valor atual com a meta */}
          {e.valor >= e.objetivo ? (
            <Text style={{ color: 'green', fontWeight: 'bold' }}>Meta alcançada!</Text>
          ) : (
            <React.Fragment>
              {calcularDiasRestantes(e.data_fim) > 0 ? (
                <React.Fragment>
                  <ProgressBar progress={e.valor / e.objetivo} width={200} />
                  <Text>
                    {`Faltam ${calcularDiasRestantes(e.data_fim)} dias para o término da vaquinha.`}
                  </Text>
                </React.Fragment>
              ) : (
                <Text style={{ color: 'red', fontWeight: 'bold' }}>Vaca encerrada!</Text>
              )}
            </React.Fragment>
          )}
        </View>
      ))}
    </View>
  );
}
