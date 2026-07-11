/**
 * ============================================
 * OPERADOR REST (...) EM JAVASCRIPT
 * ============================================
 *
 * Rest usa o MESMO símbolo do spread ("..."), mas faz o OPOSTO:
 * em vez de "espalhar" um iterável em valores soltos, ele "agrupa"
 * vários valores soltos em UM ÚNICO ARRAY (ou objeto, no caso de
 * desestruturação de objeto).
 *
 * Rest aparece em 3 lugares possíveis:
 *   1. Parâmetro de função     -> agrupa argumentos extras
 *   2. Desestruturação de array -> agrupa o "resto" dos elementos
 *   3. Desestruturação de objeto -> agrupa as "demais" propriedades
 *
 * Em Java, o mais parecido é varargs (Object... args) — mas varargs só
 * existe em parâmetro de função. Rest em JS também funciona dentro de
 * desestruturação, o que não tem equivalente direto no Java.
 * ============================================
 */

// ============================================
// COMO IDENTIFICAR: SPREAD x REST NO CÓDIGO
// ============================================

console.log('=== COMO DIFERENCIAR SPREAD DE REST ===\n');

console.log('Regra prática: olhe ONDE o "..." aparece.');
console.log('');
console.log('  Aparece no LADO DE QUEM RECEBE valores (parâmetro de função,');
console.log('  ou lado esquerdo de uma desestruturação)?  -> É REST.');
console.log('');
console.log('  Aparece no LADO DE QUEM ENVIA/FORNECE valores (dentro de um');
console.log('  array literal, objeto literal, ou numa chamada de função)?');
console.log('  -> É SPREAD.');
console.log('');
console.log('Outro sinal: REST só pode aparecer UMA VEZ por lista de parâmetros/');
console.log('desestruturação, e sempre como o ÚLTIMO item. SPREAD pode aparecer');
console.log('quantas vezes quiser, em qualquer posição.');

// ============================================
// PARTE 1: REST EM PARÂMETRO DE FUNÇÃO (o uso mais comum)
// ============================================

console.log('\n=== PARTE 1: REST EM PARÂMETRO DE FUNÇÃO ===\n');

// "...numeros" aqui é REST: agrupa TODOS os argumentos passados,
// não importa quantos, dentro de um array chamado 'numeros'.
function somarTudo(...numeros) {
  console.log('  typeof numeros dentro da função:', typeof numeros, Array.isArray(numeros));
  return numeros.reduce((acc, n) => acc + n, 0);
}

console.log('somarTudo(1, 2) =', somarTudo(1, 2));
console.log('somarTudo(1, 2, 3, 4, 5) =', somarTudo(1, 2, 3, 4, 5));
console.log('somarTudo() =', somarTudo()); // array vazio, não erro

console.log('\nEm Java, o equivalente seria varargs:');
console.log('  public int somarTudo(int... numeros) { ... }');
console.log('Sintaxe diferente ("..." depois do tipo em vez de antes do nome),');
console.log('mas a ideia — juntar quantidade variável de argumentos — é a mesma.');

// ============================================
// PARTE 2: REST COMBINADO COM PARÂMETROS FIXOS
// ============================================

console.log('\n=== PARTE 2: REST COMBINADO COM PARÂMETROS FIXOS ===\n');

// Parâmetros normais vêm primeiro, rest sempre por ÚLTIMO —
// ele "pega o resto" do que sobrar na chamada.
function apresentar(saudacao, ...nomes) {
  console.log(`  saudacao = "${saudacao}"`);
  console.log('  nomes (rest) =', nomes);
  nomes.forEach((nome) => console.log(`  ${saudacao}, ${nome}!`));
}

apresentar('Olá', 'João', 'Maria', 'Carlos');

// Isso NÃO compila / dá erro de sintaxe (rest não pode vir no meio):
//
// function invalido(...nomes, saudacao) { }
//   -> SyntaxError: Rest parameter must be last formal parameter
console.log('\nRest sempre tem que ser o ÚLTIMO parâmetro — nunca vem antes de outro.');

// ============================================
// PARTE 3: REST NA DESESTRUTURAÇÃO DE ARRAY
// ============================================

console.log('\n=== PARTE 3: REST NA DESESTRUTURAÇÃO DE ARRAY ===\n');

const numeros = [10, 20, 30, 40, 50];

// Pega o primeiro e o segundo elemento nomeados, e agrupa "o resto"
// em 'demais' — de novo, rest tem que ser o último da lista.
const [primeiro, segundo, ...demais] = numeros;

console.log('array original:', numeros);
console.log('primeiro:', primeiro);
console.log('segundo:', segundo);
console.log('demais (rest):', demais);

// Uso comum: separar "cabeça" e "cauda" de uma lista
const [cabeca, ...cauda] = numeros;
console.log('\ncabeca:', cabeca);
console.log('cauda (rest):', cauda);

// ============================================
// PARTE 4: REST NA DESESTRUTURAÇÃO DE OBJETO
// ============================================

console.log('\n=== PARTE 4: REST NA DESESTRUTURAÇÃO DE OBJETO ===\n');

const produto = {
  id: 1,
  nome: 'Notebook',
  preco: 3500,
  categoria: 'Eletrônicos',
  estoque: 12,
};

// Extrai 'id' e 'nome' nomeados, agrupa TODAS as demais propriedades
// dentro de 'detalhes' (aqui a ordem das chaves não importa, diferente
// do array, que é posicional).
const { id, nome, ...detalhes } = produto;

console.log('produto original:', produto);
console.log('id:', id);
console.log('nome:', nome);
console.log('detalhes (rest):', detalhes);

// Uso muito comum na prática: remover um campo sensível antes de
// enviar um objeto adiante (ex.: não expor senha numa resposta de API)
const usuarioComSenha = { id: 1, nome: 'Danilo', senha: '123456' };
const { senha, ...usuarioSemSenha } = usuarioComSenha;
console.log('\nusuarioComSenha:', usuarioComSenha);
console.log('usuarioSemSenha (sem o campo senha):', usuarioSemSenha);
console.log('(variável "senha" existe, mas simplesmente não é usada/enviada adiante)');

// ============================================
// PARTE 5: REST EM PARÂMETRO DESESTRUTURADO DE FUNÇÃO
// ============================================

console.log('\n=== PARTE 5: REST DENTRO DE DESESTRUTURAÇÃO NO PARÂMETRO ===\n');

// Combina a Parte 4 (rest em objeto) com parâmetro de função —
// muito comum em componentes de UI (props) e em handlers de eventos.
function criarPedido({ id, ...resto }) {
  console.log(`  Pedido #${id}`);
  console.log('  Demais dados do pedido:', resto);
}

criarPedido({ id: 500, cliente: 'Ana', total: 199.9, status: 'pendente' });

// ============================================
// PARTE 6: SPREAD E REST NA MESMA FUNÇÃO (não confundir os papéis)
// ============================================

console.log('\n=== PARTE 6: SPREAD (chamada) + REST (declaração) JUNTOS ===\n');

// Aqui '...numeros' na DECLARAÇÃO é REST (agrupa os argumentos)
function media(...numeros) {
  const soma = numeros.reduce((acc, n) => acc + n, 0);
  return soma / numeros.length;
}

const notas = [8, 7.5, 9, 6];

// Aqui '...notas' na CHAMADA é SPREAD (espalha o array em argumentos)
console.log('notas:', notas);
console.log('media(...notas) =', media(...notas));

console.log('\nRepare: a MESMA função "media" usa REST na própria definição,');
console.log('e é chamada usando SPREAD para passar um array já existente.');
console.log('Isso não é coincidência — é o padrão mais comum de uso combinado.');

// ============================================
// RESUMO
// ============================================

console.log('\n=== RESUMO ===\n');
console.log('REST agrupa valores soltos em UM ARRAY/OBJETO. Aparece em 3 lugares:');
console.log('  1. function f(...args)                  -> parâmetro de função');
console.log('  2. const [a, ...resto] = array           -> desestruturação de array');
console.log('  3. const { a, ...resto } = objeto        -> desestruturação de objeto');
console.log('');
console.log('Como identificar rest x spread:');
console.log('  - Rest fica no lado de quem DECLARA/RECEBE (parâmetro, desestruturação)');
console.log('  - Spread fica no lado de quem FORNECE (array/objeto literal, chamada)');
console.log('  - Rest é sempre o ÚLTIMO da lista e só pode aparecer uma vez');
console.log('  - Spread pode aparecer várias vezes, em qualquer posição');