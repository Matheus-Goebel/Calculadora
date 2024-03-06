const display = document.getElementById("display");
const miniOperator = document.getElementById("miniOperator");
let currentNumber = '';
let previousOperator = '';  
let lastOperation = '';
let result = '';
let hasError = false;
let operatorPressed = false;

//Adiciona o input que você aperta para a variável display
//Depois de usar algum operador ele salva o operador usado e o numero depois do operador em 2 variáveis separadas
//Se algum erro for detectado ele trava o input

function addToDisplay(input) {
    if (!hasError){
        if (!isNaN(input) || input === '.') { //checando pra ver se o input é um numero ou se é um ponto
            display.value += input; 
            currentNumber += input;
        } else if ('+-*/'.includes(input)) { //checando pra ver se o input é um operador e resetando o current number para só pegar o valor depois do operador
            if (currentNumber !== '') {                               
                previousOperator = input;
                operatorPressed = true; 
            }
            display.value += input;      
            currentNumber = ''; 
        }
    }
}

//Calcula a operação e se nenhum valor novo for adicionado e você tentar calcular denovo ele usará o resultado atual em junção a operação passada usada para gerar um novo resultado
//Exemplo: 2x4 = 8, se tentar calcular denovo sem nenhum input adicional ele tentará pegar o 8(resultado atual) e usará o x4(operação passada usada)
//para calcular um novo resultado e assim em diante
//A operação passada só vai atualizar se algum operador for pressionado

function calculate() {
    try {
        if (!hasError) {      
            if (result.length > 0 && previousOperator !== '' && operatorPressed === false) {
                display.value = eval(display.value + lastOperation);
                result = display.value;
            } else {
                if (operatorPressed) {
                    lastOperation = previousOperator + currentNumber;
                }
                display.value = eval(display.value);
                result = display.value;
            }
            operatorPressed = false;
            miniOperator.value = lastOperation;
        }
    } catch (error) {
        display.value = 'Error';
        hasError = true;        
    }
}

//Limpa todas as variáveis da calculadora

function clearDisplay() {
    display.value = '';
    miniOperator.value = '';
    currentNumber = '';
    previousOperator = '';         
    lastOperation = '';
    result = '';
    hasError = false;         
    operatorPressed = false;
}

//Pega o valor de display, ai verifica se não está vazio, retira o ultimo valor adicionado e atualiza o display

function removeLast() {
    if (!hasError){
    let currentValue = display.value;    
    if (currentValue.length > 0) {
        currentValue = currentValue.slice(0, -1);        
        display.value = currentValue;        
    }
  }
}

 // Mudança de opacidade da animação quando ela interage com outro elemento

const bubbles = document.getElementsByClassName('bubble');
const calculator = document.getElementById('calculator');

function checkOverlap() {
    for (let i = 0; i < bubbles.length; i++) {
      const bolha = bubbles[i].getBoundingClientRect();
      const calculadora = calculator.getBoundingClientRect();
  
      // checando pra ver se os elementos se sobrepoem
      if (!(bolha.right < calculadora.left || 
            bolha.left > calculadora.right || 
            bolha.bottom < calculadora.top || 
            bolha.top > calculadora.bottom)) {        
        bubbles[i].style.opacity = '0.5';    
      } else {        
        bubbles[i].style.opacity = '1';
      }
    }
  }

setInterval(checkOverlap, 10)