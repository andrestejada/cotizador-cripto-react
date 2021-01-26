import React ,{useEffect,useState} from 'react';
import styled from '@emotion/styled';
import UseMoneda from '../hooks/UseMoneda';
import UseCriptomoneda from '../hooks/UseCriptomoneda';
import axios from 'axios';
import Error from './Error';

const Boton = styled.input`
    margin-top:20px;
    font-weight:bold;
    padding:10px;
    border:none;
    width:100%;
    border-radius: 10px;
    color:#FFF;
    background-color:#66a2fe;
    transition: background-color 0.3s ease;
    &&:hover{
        background-color:#326AC0;
        cursor:pointer;
    }

`

const Formulario = ({guardarCriptomoneda,guardarMoneda}) => {

    const [listacripto,guardarCriptomonedas]= useState([])
    const [error,guardarError]=useState(false)
    
    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' }
    ];

    const [moneda,SeleccionarMoneda]=UseMoneda('Elige tu Moneda','',MONEDAS);
    const [criptomoneda,SeleccCriptoneda]=UseCriptomoneda('Elige tu Criptomoneda','',listacripto)
  

    useEffect(()=>{
        const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`

        const consultarAPI =async()=>{
            const respuesta = await axios.get(url)

           guardarCriptomonedas(respuesta.data.Data)
        }

        consultarAPI()
    },[]);

    //cuando el usuario hace submit

    const cotizarMoneda = e=>{
        e.preventDefault();

        //validar si ambos campos estan llenos
        if(moneda===''||criptomoneda===''){
            guardarError(true)
            return;
        }

        guardarError(false);
        //pasar los datos al componente principal
        guardarCriptomoneda(criptomoneda)
        guardarMoneda(moneda)
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error? <Error mensaje='Todos los campos son obligatorios'/> :null}
            <SeleccionarMoneda/>
            <SeleccCriptoneda/>
            <Boton
                type='submit'
                value='Calcular'
            />
        </form>
     );
    }
 
export default Formulario;