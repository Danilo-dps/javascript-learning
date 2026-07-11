// ============================================
// 1. FORMAS BÁSICAS DE console.log()
// ============================================

// Forma mais simples: imprimir texto com aspas simples
console.log('Hello world');
console.log('Aprendendo um pouco da sintaxe');
console.log('Usando o mínimo necessário para fazer o código rodar');
console.log('Node.js');  // Ponto e vírgula adicionado (boa prática)
console.log('JavaScript');

// Usando aspas duplas (funciona igual)
console.log("Hello world com aspas duplas");
console.log("Node.js com aspas duplas");

// ============================================
// 2. USANDO VARIÁVEIS
// ============================================

// Declarando variáveis com const (não pode reatribuir)
const saudacao = 'Hello world';
const tecnologia = 'Node.js';
const linguagem = 'JavaScript';

// Imprimindo variáveis
console.log(saudacao);
console.log('Aprendendo um pouco da sintaxe');
console.log('Usando o mínimo necessário para fazer o código rodar');
console.log(tecnologia);
console.log(linguagem);

// ============================================
// 3. TEMPLATE STRINGS (forma moderna)
// ============================================

// Template strings usam crases `` e ${} para interpolar variáveis
console.log(`${saudacao} - versão com template string`);
console.log(`Estou aprendendo ${linguagem} com ${tecnologia}`);

// ============================================
// 4. CORES NO TERMINAL (opcional)
// ============================================

// Códigos ANSI para cores no terminal
console.log('\x1b[32m%s\x1b[0m', 'Hello world em VERDE');   // Verde
console.log('\x1b[36m%s\x1b[0m', 'Node.js em CIANO');       // Ciano
console.log('\x1b[33m%s\x1b[0m', 'JavaScript em AMARELO');  // Amarelo

// ============================================
// 5. IMPRIMINDO MÚLTIPLOS VALORES
// ============================================

// console.log aceita múltiplos argumentos
console.log('Hoje é', new Date().toLocaleDateString('pt-BR'));
console.log('A hora atual é', new Date().toLocaleTimeString('pt-BR'));

// ============================================
// 6. USANDO DADOS DO USUÁRIO
// ============================================

// Declarando variáveis com informações pessoais
const nome = 'João';        // Altere para seu nome
const idade = 30;           // Altere para sua idade
const cidade = 'São Paulo'; // Adicione sua cidade

// Imprimindo com template strings
console.log('------------------------');
console.log(`Meu nome é ${nome}`);
console.log(`Tenho ${idade} anos`);
console.log(`Moro em ${cidade}`);

// ============================================
// 7. USANDO ARRAYS E LAÇOS
// ============================================

console.log('==================================');
console.log('       *****************          ');
console.log('==================================');
console.log('');

// Criando um array com as mensagens
const mensagens = [
  'Hello world',
  'Aprendendo um pouco da sintaxe',
  'Usando o mínimo necessário para fazer o código rodar',
  'Node.js',
  'JavaScript'
];

// forEach - percorre cada item do array
mensagens.forEach((msg, index) => {
  console.log(`${index + 1}. ${msg}`);
});

// ============================================
// 8. EXTRA: OUTRAS FORMAS DE IMPRIMIR
// ============================================

console.log('');
console.log('--- Formas alternativas de imprimir ---');

// console.error - imprime como erro (em vermelho no terminal)
console.error('Esta é uma mensagem de erro');

// console.warn - imprime como aviso (em amarelo)
console.warn('Esta é uma mensagem de aviso');

// console.table - imprime dados em formato de tabela
console.table([
  { nome: 'João', idade: 30, cidade: 'São Paulo' },
  { nome: 'Maria', idade: 25, cidade: 'Rio de Janeiro' }
]);

// ============================================
// 9. RODAPÉ DO PROGRAMA
// ============================================

console.log('');
console.log('==================================');
console.log('      FIM DO PROGRAMA');
console.log('==================================');
