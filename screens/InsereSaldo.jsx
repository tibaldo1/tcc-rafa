import { View, Text, TextInput, TouchableOpacity, Alert, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';


export default function InsereSaldo() {
    const [dados, setDados] = useState([]);
    const [saldo, setSaldo] = useState('');
    const [vaquinha,setVaquinha]=useState('');
    const [idVaca,setIdVaca]=useState('');
    const [dadosVacas,setDadosVacas] =useState([]);
    const [umaVaca,setUmaVaca]=useState([])
    const [valorUsuario,setValorUsuario]=useState(0);

    useEffect(() => {
        axios.get('http://10.0.2.2:8000/usuarios/1').then((res) => setDados(res.data));
        axios.get(`http://10.0.2.2:8000/mostrarVaquinhas/`).then((res)=> setDadosVacas(res.data));
        axios.get(`http://10.0.2.2:8000/mostrarVaquinhas/${idVaca}`).then((res)=> setUmaVaca(res.data));
    }, [vaquinha])


    function testaValor(){
        console.log(idVaca)
        console.log(umaVaca)

    }
    function inserirSaldo() {
        const valor = dados.saldo;
        const total=parseFloat(valor)+parseFloat(saldo);
        console.log(total)
        console.log(valor)
        try {
            axios.put('http://10.0.2.2:8000/usuarios/1', {
                saldo: total
            }).then(Alert.alert('saldo adicionado com sucesso'))
        } catch (erros) {
            console.error('falhou!')
        }

    }

    function inserirSaldoVaca(){
        const saldoUsuario=parseFloat(dados.saldo);
        
        const valorInseridoUsuario=parseFloat(valorUsuario)
        const saldoVaca=parseFloat(umaVaca[0].valor);
        console.log(saldoVaca)
        const idVaquinha=idVaca;

        if(saldoUsuario<valorInseridoUsuario){
            return Alert.alert('Saldo insuficiente!!!');
        }else{
           const totalUsuarioSaldo=saldoUsuario-valorInseridoUsuario;
           const totalVaquinha=valorInseridoUsuario+saldoVaca
           axios.put('http://10.0.2.2:8000/usuarios/1', {
           saldo: totalUsuarioSaldo
        }).then(console.log('usuario teve seu saldo reduzido')).then(
           axios.put(`http://10.0.2.2:8000/vaquinha/${idVaquinha}`,{
            valor:totalVaquinha
        }).then((res)=>{Alert.alert('Valor da vaca atualizada com sucesso')}) 
        )
        
        }
        



    }
    return (
        <View >
            <TextInput
                placeholder="valor na conta"
                keyboardType="numeric"
                onChangeText={(e) => setSaldo(e)}
            />
            <TouchableOpacity onPress={() => inserirSaldo()}>
                <Text>adicionar</Text>
            </TouchableOpacity>

            <TextInput

                placeholder="valor na vaquinha"
                keyboardType="numeric"
                onChangeText={(e)=>{setValorUsuario(e)}}

            />
            <RNPickerSelect
                onValueChange={(value,id) => {
                    setVaquinha(value)
                    setIdVaca(id)
                }
                
                }
                items={
                    dadosVacas.map((elemento)=>(
                        { label: elemento.nome, value: elemento.nome ,id:elemento.id_vaquinha}
                    ))
                }


            />
            <TouchableOpacity onPress={()=>{inserirSaldoVaca()}}>
                <Text>contribuir</Text>
            </TouchableOpacity>

            <Button title={'teste'} onPress={()=>testaValor()} />
        </View>


    )
}