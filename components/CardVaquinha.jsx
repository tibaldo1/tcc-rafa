import { View, Text, Dimensions } from 'react-native'
import React from 'react'

export default function CardVaquinha({nome,meta,valor}) {

    const altura = Dimensions.get('screen').height;
    const largura = Dimensions.get('screen').width;
  return (
    <View style={{ backgroundColor: '#F3F3F3', width: largura * 0.9, height: altura * 0.093, borderRadius: 20, marginBottom: altura * 0.015, display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent:'center' }}>

    <View style={{ backgroundColor: 'transparent', marginLeft: largura * 0.02, width: largura * 0.47, height: altura * 0.07, justifyContent: 'center' }}>
        <Text style={{ color: 'black', fontSize: altura * 0.027, fontWeight: '600' }}>{nome}</Text>
        <Text style={{ color: 'black', fontSize: altura * 0.02, fontWeight: '600' }}>Meta: <Text>R$:{meta}</Text></Text>
    </View>

    <View style={{ backgroundColor: 'transparent', height: altura * 0.08, width: largura * 0.21, justifyContent: 'center', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: '#428DFFBD', fontSize: altura * 0.023 }}>R$:</Text>
        <Text style={{ color: '#428DFFBD', fontSize: altura * 0.025, fontWeight: '600' }}>{valor}</Text> 
    </View>
</View>
  )
}