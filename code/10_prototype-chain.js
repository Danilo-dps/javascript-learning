/**
 * ============================================
 * CADEIA DE PROTÓTIPOS — VERIFICANDO NA PRÁTICA
 * ============================================
 *
 * Regra central: todo objeto tem um link interno para OUTRO objeto
 * (o [[Prototype]]). Object.getPrototypeOf(x) revela esse link.
 *
 * Object.prototype é o ÚNICO TOPO de verdade — equivalente direto ao
 * Object do Java. Array.prototype e Function.prototype NÃO são topos
 * paralelos — são degraus INTERMEDIÁRIOS, específicos de cada tipo,
 * que ficam no caminho antes de chegar no topo comum.
 * ============================================
 */

// ============================================
// PARTE 1: FUNÇÃO AUXILIAR PARA PERCORRER A CADEIA
// ============================================

function mostrarCadeia(valor, nomeDoValor) {
  console.log(`\nCadeia de protótipos de ${nomeDoValor}:`);
  let atual = valor;
  let passo = 0;
  while (atual !== null) {
    const nome = atual.constructor ? atual.constructor.name : '(sem constructor)';
    console.log(`  ${'  '.repeat(passo)}-> ${atual === valor ? nomeDoValor : nome + '.prototype'}`);
    atual = Object.getPrototypeOf(atual);
    passo++;
  }
  console.log(`  ${'  '.repeat(passo)}-> null (fim da cadeia)`);
}

// ============================================
// PARTE 2: CADEIA DE INSTÂNCIAS (o que você cria no dia a dia)
// ============================================

console.log('=== PARTE 2: CADEIA DE INSTÂNCIAS ===');

const meuArray = [1, 2, 3];
mostrarCadeia(meuArray, 'meuArray ([1,2,3])');

function minhaFuncao() {}
mostrarCadeia(minhaFuncao, 'minhaFuncao (function(){})');

const meuObjeto = { nome: 'Danilo' };
mostrarCadeia(meuObjeto, 'meuObjeto ({nome: "Danilo"})');

console.log('\nRepare: meuArray e minhaFuncao passam por um degrau A MAIS');
console.log('(Array.prototype / Function.prototype) antes de chegar no MESMO');
console.log('topo que meuObjeto já alcança direto: Object.prototype.');

// ============================================
// PARTE 3: PROVANDO QUE O TOPO É O MESMO PARA TODOS
// ============================================

console.log('\n=== PARTE 3: TODOS CONVERGEM NO MESMO Object.prototype ===\n');

const topoDoArray = Object.getPrototypeOf(Object.getPrototypeOf(meuArray));
const topoDaFuncao = Object.getPrototypeOf(Object.getPrototypeOf(minhaFuncao));
const topoDoObjeto = Object.getPrototypeOf(meuObjeto);

console.log('topo do array === topo da função?', topoDoArray === topoDaFuncao);
console.log('topo da função === topo do objeto?', topoDaFuncao === topoDoObjeto);
console.log('topo do objeto === Object.prototype?', topoDoObjeto === Object.prototype);
console.log('\nOs três chegam EXATAMENTE no mesmo objeto — não existem "três topos",');
console.log('existe um único topo, alcançado por caminhos de tamanhos diferentes.');

// ============================================
// PARTE 4: A OUTRA CADEIA — O PRÓPRIO CONSTRUTOR TAMBÉM É FUNÇÃO
// ============================================

console.log('\n=== PARTE 4: Array, Function e Object TAMBÉM SÃO FUNÇÕES ===\n');

console.log('typeof Array:', typeof Array); // "function"
console.log('typeof Function:', typeof Function); // "function"
console.log('typeof Object:', typeof Object); // "function"

console.log('\nComo são funções, ELES TAMBÉM seguem a cadeia de instância de função:');
mostrarCadeia(Array, 'Array (o construtor)');
mostrarCadeia(Object, 'Object (o construtor)');

console.log('\nIsso é uma cadeia DIFERENTE da Parte 2 — ali percorremos "de onde');
console.log('[1,2,3] herda métodos". Aqui percorremos "de onde o PRÓPRIO Array,');
console.log('como função, herda métodos" — duas perguntas diferentes.');

// ============================================
// PARTE 5: ONDE class SE ENCAIXA NISSO TUDO
// ============================================

console.log('\n=== PARTE 5: class É AÇÚCAR SOBRE ESSE MESMO MECANISMO ===\n');

class Pessoa {
  constructor(nome) {
    this.nome = nome;
  }
  falar() {
    return `Oi, sou ${this.nome}`;
  }
}

console.log('typeof Pessoa:', typeof Pessoa); // "function" -> confirma que é função por baixo
console.log('Pessoa.prototype.falar existe?', typeof Pessoa.prototype.falar === 'function');

const danilo = new Pessoa('Danilo');
mostrarCadeia(danilo, 'danilo (new Pessoa("Danilo"))');

console.log('\nO método "falar" foi parar em Pessoa.prototype — exatamente o mesmo');
console.log('padrão de Array.prototype/Function.prototype, só com sintaxe de classe.');

// ============================================
// RESUMO
// ============================================

console.log('\n=== RESUMO ===\n');
console.log('Object.prototype é o ÚNICO topo — papel equivalente ao Object do Java.');
console.log('Array.prototype/Function.prototype/Pessoa.prototype são degraus');
console.log('INTERMEDIÁRIOS específicos de tipo, não topos paralelos.');
console.log('');
console.log('O mecanismo de fundo é sempre o mesmo: cada objeto aponta para UM');
console.log('outro objeto via [[Prototype]] — Object.getPrototypeOf(x) revela isso.');
console.log('');
console.log('Construtores (Array, Object, Function, e classes que você cria) são');
console.log('eles mesmos funções, então TAMBÉM seguem essa cadeia — só que numa');
console.log('pergunta diferente: "de onde ELES herdam", não "o que ELES entregam".');