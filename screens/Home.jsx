import { View, Text, Button, Image, Dimensions, TextComponent, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Svg from './../assets/2.png'
import Eye from  './../assets/eye.png'
import Cow from  './../assets/cow.png'
import Saldo from  './../assets/dollar.png'
import Data from  './../assets/data.png'
import CardVaquinha from '../components/CardVaquinha';
import axios from 'axios';
export default function Home({navigation}) {

    const altura = Dimensions.get('screen').height;
    const largura = Dimensions.get('screen').width;
    const [dados,setDados]=useState([]);
    const [viewSaldo,setViewSaldo]=useState(true);
    const [dadosUsuarios,setDadosUsuarios]=useState({})
    useEffect(()=>{
        axios.get('http://10.0.2.2:8000/mostrarVaquinhas').then((resposta)=>setDados(resposta.data));
        axios.get('http://10.0.2.2:8000/usuarios/1').then((resposta)=>{setDadosUsuarios(resposta.data)})

    },[dados])

    return (
        <View style={{
            height: altura * 1, width: largura * 1, backgroundColor: '#C1D4EF', display: 'flex',  justifyContent:'center', alignItems:'center' 
        }}>
            
            <View style={{height:altura*0.04, width:largura*1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'white', fontSize:altura*0.03, fontWeight:'800', }}>saldo:</Text>
            </View>
            <View style={{ backgroundColor: '#D7E3F5', width: largura * 0.90, height: altura * 0.10, borderRadius: 20, marginBottom: altura * 0.015, flexDirection: 'row', alignContent: 'center', marginTop: altura * 0, elevation: 10, shadowColor: 'black', }}>
                <Text style={{ color: 'white', fontSize: altura * 0.05, marginLeft: largura * 0.1 }}>R$:</Text>
                {viewSaldo ?  <Text style={{ color: 'white', fontSize: altura*0.058, marginLeft: largura * 0.05 }}>{dadosUsuarios.saldo}</Text> : <Text style={{ color: 'white', fontSize: altura*0.058, marginLeft: largura * 0.05 }}>------</Text>}
                
                
                <View style={{height:altura*0.06, backgroundColor:'transperent', width:largura*0.15, justifyContent:'center', alignItems:'center', marginLeft:largura*0.06, marginTop:altura*0.03}}>
                <TouchableOpacity onPress={()=>setViewSaldo(!viewSaldo)} style={{height:altura*0.05, width:largura*0.13, backgroundColor:'transparent',}}>
                <Image source={Eye} style={{ height: altura * 0.04, width: largura * 0.10 }} />
                </TouchableOpacity>
                </View>

            </View>

            <View style={{ backgroundColor: '#D7E3F5', width: largura * 0.90, height: altura * 0.10, borderRadius: 20, marginBottom: altura * 0.015, display: 'flex', justifyContent: 'center', alignItems: 'center', elevation: 10 }}>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: altura * 0.075, width: largura * 1, marginTop: altura * 0.01, }}>
                    <TouchableOpacity style={{ height: altura * 0.1, width: largura * 0.15, borderRadius: 1000, marginRight: largura * 0.1, backgroundColor: 'transparent', alignItems:'center', justifyContent:'center', marginTop:altura*0.014 }} onPress={()=>navigation.navigate('inseresaldo')}>
                    <Image source={Saldo} style={{ height: altura * 0.0589, width: largura * 0.116 }} />

                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: 'transparent', height: altura * 0.05, width: largura * 0.15, borderRadius: 1000, marginRight: largura * 0.1 }} onPress={()=>navigation.navigate('criavaca')}>
                    <Image source={Cow} style={{ height: altura * 0.065, width: largura * 0.146 }} />

                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: 'transparent', height: altura * 0.05, width: largura * 0.15, borderRadius: 1000 }}>
                        <Image source={Svg} style={{ height: altura * 0.06, width: largura * 0.15 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: altura * 0.03, width: largura * 0.6, marginBottom: altura * 0.025 }}>
                    <Text style={{ color: 'white', fontSize: altura * 0.025, marginRight: largura * 0.05, fontWeight: 'bold' }}>saldo</Text>
                    <Text style={{ color: 'white', fontSize: altura * 0.025, marginRight: largura * 0.01, fontWeight: 'bold' }}>vaquinhas</Text>
                    <Text style={{ color: 'white', fontSize: altura * 0.025, marginLeft: largura * 0.06, fontWeight: 'bold' }}>conta</Text>
                </View>
            </View>

            <View style={{ height: altura * 0.05, width: largura * 0.25, borderRadius: 15, justifyContent: 'center', alignContent: 'center', marginBottom: altura * 0.015, elevation: 10, shadowColor: 'black', backgroundColor:'#0b5edb', display:'flex', flexDirection:'row' }}>
                <TouchableOpacity style={{ height: altura * 0.05, width: largura * 0.25, backgroundColor: '#0b5edb', borderRadius: 15, justifyContent: 'center' }}>
                    <Text style={{ backgroundColor:'transparent' ,textAlign: 'center', color: 'white' }}>extrato</Text>
                    <Image source={Data} style={{ height: altura * 0.04, width: largura * 0.10 }} />
                </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: '#D7E3F5', width: largura * 0.95, height: altura * 0.60, borderRadius: 20, alignItems: 'center', elevation: 10 }}>

                <View style={{ display: 'flex', flexDirection: 'row', width: largura * 0.60, justifyContent: 'center', backgroundColor: 'transparent' }}>
                    <Text style={{ color: 'white', fontSize: altura * 0.03, marginRight: largura * 0.02 }}>$</Text>
                    <Text style={{ color: 'white', fontSize: altura * 0.033, fontWeight: '600' }}>suas vaquinhas</Text>
                    <Text style={{ color: 'white', fontSize: altura * 0.03, marginLeft: largura * 0.02 }}>$</Text>
                </View>

               
                {dados.map((card)=>(
                    <CardVaquinha nome={card.nome} meta={card.objetivo} valor={card.valor}/>
                ))}
                
                    
                    

            </View>

        </View>
    )
}