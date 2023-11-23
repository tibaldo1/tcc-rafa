import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ExtratoCard from './ExtratoCard'; 
import axios from 'axios';

export default function Extrato() {
  const [dados, setDados] = useState([]);
  
  useEffect(() => {
    axios.get('http://10.0.2.2:8000/extrato').then((res) => setDados(res.data));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Extrato</Text>
      {dados.map((item) => (
        <ExtratoCard key={item.id} id={item.id} valor={item.valor} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
