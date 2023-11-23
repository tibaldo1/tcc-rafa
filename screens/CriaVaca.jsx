import { View, Text, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import axios from 'axios';

export default function CriaVaca({navigation}) {
const [nome,setNome]=useState('');
const [descricao,setDescricao]=useState('');
const [valor,setValor]=useState('');
const [objetivo,setObjetivo]=useState('');
const [data_fim,setData]=useState('');
const [id,setId]=useState("");
const [cpf, setCpf]=useState(1)

    function enviardados(){
        const dados={
            nome,
            descricao,
            valor,
            objetivo,
            data_fim
        }
        const response=axios.post('http://10.0.2.2:8000/vaquinha',dados).then((res)=>{setId(res.data.id)});
        

        const dadosNovos={
            id_vaquinha:id,
            cpf
        }
        axios.post('http://10.0.2.2:8000/usercow', dadosNovos)
        .then((res)=>{Alert.alert('Vaquinha criada com sucesso')})
        .then((res)=>navigation.goBack());

    }
  return (
    <View style={{width:'100%', height:'100%', backgroundColor:'#C1D4EF', justifyContent:'center', alignItems:'center', gap:15}}>

    <View style={{gap:15, backgroundColor:'#D7E3F5', width:'85%', height:'50%', justifyContent:'center', alignItems:'center', borderRadius:30, elevation:20, shadowColor:'black'}}>
      <TextInput
      placeholder=" Nome"
      placeholderTextColor={"black"}
      style={{borderRadius: 6, backgroundColor:'#F3F3F3', height:'20%', width:'20%', width:300, height:30, textAlign:'center'}}
      onChangeText={(e)=>setNome(e)}
      />
  

    <TextInput
      placeholder="Descrição"
      placeholderTextColor={"black"}
      style={{borderRadius: 6, backgroundColor:'#F3F3F3', height:'20%', width:'20%', width:300, height:30, textAlign:'center'}}
      onChangeText={(e)=>setDescricao(e)}
      />


    <TextInput
      placeholder="Valor"
      placeholderTextColor={"black"}
      style={{borderRadius: 6, backgroundColor:'#F3F3F3', height:'20%', width:'20%', width:300, height:30, textAlign:'center'}}
      onChangeText={(e)=>setValor(e)}
      />


    <TextInput
      placeholder=" Objetivo"
      placeholderTextColor={"black"}
      style={{borderRadius: 6, backgroundColor:'#F3F3F3', height:'20%', width:'20%', width:300, height:30, textAlign:'center'}}
      onChangeText={(e)=>setObjetivo(e)}
      />


    <TextInput
      placeholder=" Data de Termino"
      placeholderTextColor={"black"}
      style={{borderRadius: 6, backgroundColor:'#F3F3F3', height:'20%', width:'20%', width:300, height:30, textAlign:'center'}}
      onChangeText={(e)=>setData(e)}
      />
    </View>

    <TouchableOpacity onPress={()=>{enviardados()}} style={{height:'10%', width:'40%', backgroundColor:'blue'}}>
        <Text> enviar</Text>
    </TouchableOpacity>

  </View>
  )
}