/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import Form from './components/Form';
import Clima from './components/Clima';

const App = () => {

  const [ busqueda, guardarBusqueda ] = useState({
    ciudad:'',
    pais:''
  });

  const [consultar, guardarConsutar] = useState(false);
  const [resultado, guardarResultado] = useState(false);
  const [bgcolor, guardarBgcolor] = useState('rgb(71,149,212');

  const {ciudad, pais} = busqueda;
  useEffect(() =>{
    const consultarClima = async () => {
      if(consultar) {
        const appId = '90861208ba42822d887bba6bbf279e01';
        const url= `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        console.log('gggk');
        try{
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          guardarResultado(resultado);
          guardarConsutar(false);
          // Modifica los colores de fondo basado en la temperatura

          const kelvin = 273.15;
          const { main } = resultado;
          const actual = main.temp - kelvin;

          if(actual < 10) {
            guardarBgcolor('rgb(105,108, 149)');
          } else if(actual >= 10 && actual <  25){
            guardarBgcolor('rgb(71,149,212)');
          } else {
            guardarBgcolor('rgb(178,28, 61)');
          }
        }catch(error){
          mostrarAlert();
        }
      }
    }
    consultarClima();
  }, [consultar]);

  const mostrarAlert=()=>{
    guardarConsutar(false);
    Alert.alert(
      'Error',
      'No hay resultado, intenta con otra ciudad o país',
      [{ text: 'OK '}]
    );
  }

  const ocultarTeclado = () => {
    Keyboard.dismiss();
  }

  const bgColorApp = {
    backgroundColor: bgcolor
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.contenido}>
            <Clima resultado={resultado}></Clima>
            <Form 
            busqueda={busqueda}
            guardarBusqueda={guardarBusqueda}
            guardarConsutar={guardarConsutar}/>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    //backgroundColor: 'rgb(71, 149, 212)',
    justifyContent: 'center',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
