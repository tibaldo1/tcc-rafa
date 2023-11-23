import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExtratoCard = ({ id, valor }) => {
  const cardStyle = valor >= 0 ? styles.cardGreen : styles.cardRed;

  return (
    <View style={[styles.card, cardStyle]}>
      <Text style={styles.title}>Extrato #{id}</Text>
      <Text style={styles.valor}>{valor}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  cardGreen: {
    backgroundColor: '#4CAF50', // verde
  },
  cardRed: {
    backgroundColor: '#FF5252', // vermelho
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  valor: {
    fontSize: 16,
    color: 'white',
  },
});

export default ExtratoCard;
