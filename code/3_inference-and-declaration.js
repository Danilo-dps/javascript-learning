/**
 * ============================================
 * INFERÊNCIA DE TIPO E POSIÇÕES DE DECLARAÇÃO
 * ============================================
 *
 * Regra central: o JS nunca exige um TIPO na declaração (diferente do
 * Java) — o tipo é sempre descoberto em tempo de execução, olhando o
 * valor atribuído. Isso vale em TODAS as posições abaixo.
 *
 * O que muda de posição para posição é se a PALAVRA RESERVADA
 * (let/const/var) é obrigatória, ou se a própria sintaxe do lugar já
 * conta como declaração, sem precisar de palavra nenhuma.
 * ============================================
 */

// ============================================
// PARTE 1: POSIÇÕES ONDE let/const/var É OBRIGATÓRIO
// ============================================

console.log('=== PARTE 1: DECLARAÇÃO EXPLÍCITA OBRIGATÓRIA ===\n');

// 1.1 — Variável solta, em qualquer escopo (topo do arquivo, dentro de
// função, dentro de bloco). Sem let/const/var, isso é ERRO (ou cria
// global acidental — ver Parte 3).
let idade = 29;
const nome = 'Danilo';
var legado = 'evite usar var'; // ainda funciona, mas é legado

console.log('idade:', idade, '| typeof:', typeof idade); // number
console.log('nome:', nome, '| typeof:', typeof nome); // string

// O tipo é descoberto pelo VALOR, não pela palavra-chave usada:
let qualquerCoisa = 10;
console.log('\nqualquerCoisa (number):', typeof qualquerCoisa);
qualquerCoisa = 'agora é texto';
console.log('qualquerCoisa (reatribuído):', typeof qualquerCoisa);
qualquerCoisa = true;
console.log('qualquerCoisa (reatribuído de novo):', typeof qualquerCoisa);

// 1.2 — Variável de controle do for: precisa de let/const/var. A
// diferença entre elas aqui é o escopo (let = por iteração, var =
// compartilhado), mas a PALAVRA em si é obrigatória nas duas.
console.log('\nVariável de controle do for (let obrigatório):');
for (let i = 0; i < 3; i++) {
  console.log('  i =', i);
}

// 1.3 — for...of / for...in também exigem let/const
console.log('\nfor...of (let/const obrigatório):');
const frutas = ['maçã', 'banana'];
for (const fruta of frutas) {
  console.log('  fruta:', fruta);
}

// ============================================
// PARTE 2: POSIÇÕES ONDE A DECLARAÇÃO JÁ É IMPLÍCITA
// (não existe let/const/var — e não pode existir)
// ============================================

console.log('\n=== PARTE 2: DECLARAÇÃO IMPLÍCITA (sem palavra reservada) ===\n');

// 2.1 — Parâmetro de função nomeada. 'num' é declarado só por estar
// entre os parênteses. Tentar escrever 'function f(let num)' é erro
// de sintaxe — a posição já basta.
function dobrar(num) {
  console.log('  typeof num dentro da função:', typeof num);
  return num * 2;
}
console.log('Parâmetro de function:');
console.log('  dobrar(5) =', dobrar(5)); // num infere number
console.log('  dobrar("5") =', dobrar('5')); // num infere string, mas '*' converte -> number

// 2.2 — Parâmetro de arrow function. Mesma regra.
const triplicar = (num) => num * 3;
console.log('\nParâmetro de arrow function:');
console.log('  triplicar(4) =', triplicar(4));

// 2.3 — Parâmetro que recebe FUNÇÃO como valor (high-order function).
// 'fn' também é declaração implícita — só que o valor esperado é uma
// função, não um número. O JS só confirma isso quando 'fn' for chamada.
function processar(fn, valor) {
  console.log('  typeof fn:', typeof fn); // "function"
  return fn(valor);
}
console.log('\nParâmetro recebendo função:');
console.log('  processar(dobrar, 10) =', processar(dobrar, 10));
console.log('  processar(triplicar, 10) =', processar(triplicar, 10));

// 2.4 — Parâmetro do catch. 'erro' também nasce sem let/const.
console.log('\nParâmetro de catch:');
try {
  JSON.parse('{ isso não é json }');
} catch (erro) {
  console.log('  typeof erro:', typeof erro); // "object" (instância de Error)
  console.log('  erro.message:', erro.message);
}

// 2.5 — Desestruturação de parâmetro (bem comum em Angular/React)
function apresentar({ nome, idade }) {
  console.log(`  ${nome} tem ${idade} anos`);
}
console.log('\nDesestruturação como parâmetro:');
apresentar({ nome: 'Ana', idade: 30 });

// ============================================
// PARTE 3: A ARMADILHA — atribuição sem declaração
// ============================================

console.log('\n=== PARTE 3: ARMADILHA (evitar!) ===\n');

function exemploPerigoso() {
  // SEM let/const/var: isso não é declaração implícita como nos casos
  // acima — aqui o identificador não está numa posição reservada
  // (não é parâmetro, não é catch). Em modo não-estrito, isso CRIA
  // uma variável GLOBAL sem avisar. Em módulos ES (import/export) ou
  // em modo estrito, isso lança ReferenceError.
  variavelSemDeclaracao = 'vazei para o escopo global';
  return variavelSemDeclaracao;
}

console.log('Chamando função com atribuição sem declaração...');
try {
  console.log('Retorno:', exemploPerigoso());
  console.log('(Se não deu erro, "variavelSemDeclaracao" vazou para o global — evite isso.)');
} catch (erro) {
  console.log('ReferenceError capturado — o motor bloqueou o vazamento:', erro.message);
}

// ============================================
// RESUMO
// ============================================

console.log('\n=== RESUMO ===\n');
console.log('Tipo: SEMPRE inferido em tempo de execução, em qualquer posição.');
console.log('');
console.log('Palavra reservada OBRIGATÓRIA:');
console.log('  - variável solta em qualquer escopo (let/const/var)');
console.log('  - variável de controle do for / for-of / for-in');
console.log('');
console.log('Palavra reservada NÃO EXISTE (a posição já é a declaração):');
console.log('  - parâmetro de function');
console.log('  - parâmetro de arrow function (inclusive quando o parâmetro é outra função)');
console.log('  - parâmetro de catch');
console.log('  - parâmetro desestruturado');
console.log('');
console.log('Armadilha: atribuir a um identificador que não está em NENHUMA dessas');
console.log('posições e nunca foi declarado antes = variável global acidental');
console.log('(ou ReferenceError, dependendo do modo).');
console.log(' --------------------------------------------------------------------------------------')