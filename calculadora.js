'use strict';

const display = document.querySelector("#resultado");
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador = null;
let numeroAnterior = null;

const operacaoPendente = () => operador !== undefined;

const calcular = () => {
    if (operacaoPendente()){
       const numeroAtual = parseFloat(display.textContent);
       novoNumero = true;
       switch(operador) {
        case '+': 
             atualizarDisplay(numeroAnterior + numeroAtual);
         break;
         case '-': 
             atualizarDisplay(numeroAnterior - numeroAtual);
         break;    
         case 'X':
            atualizarDisplay(numeroAnterior * numeroAtual);
         break;
         case '/': 
             atualizarDisplay(numeroAnterior / numeroAtual);
         break;
     }
    }
}
 
const atualizarDisplay = (texto) => {
    if(novoNumero) {
        display.textContent = texto;
        novoNumero = false;
    }
    else{
        display.textContent += texto;
    }
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

numeros.forEach (numero =>
        numero.addEventListener('click',inserirNumero)
);

const selecionarOperador = (evento) => {
    if(!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent);
        console.log(operador);
    }
}

operadores.forEach (operador => operador.addEventListener('click', selecionarOperador));

const ativarIgual = () => {
    calcular();
    operador = undefined;
}
document.querySelector('#igual').addEventListener('click', ativarIgual);

const limparDisplay = () => display.textContent = '';
document.querySelector('#limpar').addEventListener('click', limparDisplay);

const limparTudo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}

document.querySelector("#limpar").addEventListener('click', limparTudo);

const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
document.querySelector('#limparUm').addEventListener('click', removerUltimoNumero); 

const existeDecimal = () => display.textContent.indexOf('.') !== -1;
const existeValor = () => display.textContent.length > 0;

const inserirDecimal = () => {
    if (!existeDecimal()){
        if(existeValor()){
            atualizarDisplay('.')
        }
        else{
            atualizarDisplay('0.');
        }
    }
}
document.querySelector('#decimal').addEventListener('click', inserirDecimal);

const mapaTeclado = {
    '0' : 'tecla0',
    '1' : 'tecla1',
    '2' : 'tecla2',
    '3' : 'tecla3',
    '4' : 'tecla4',
    '5' : 'tecla5',
    '6' : 'tecla6',
    '7' : 'tecla7',
    '8' : 'tecla8',
    '9' : 'tecla9',
    '/' : 'operadorDividir',
    '*' : 'operadorMultiplicar',
    '-' : 'operadorSubtrair',
    '+' : 'operadorAdicionar',
    '=' : 'igual',
    'Enter' : 'igual',
    'Backspace' : 'limparUM',
    'C' : 'limpar',
    '.' : 'decimal'
}

const mapearTeclado = (evento) => {
     const tecla = evento.key;

     const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
}
document.addEventListener('keydown', mapearTeclado);