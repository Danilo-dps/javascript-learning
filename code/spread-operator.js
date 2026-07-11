/**
 * ============================================
 * OPERADOR SPREAD (...) EM JAVASCRIPT
 * ============================================
 *
 * O spread "espalha" os elementos de um iterável (array, string, Set,
 * Map...) ou as propriedades de um objeto, um por um, no lugar onde
 * ele é usado — dentro de um array literal, de um objeto literal, ou
 * como argumentos de uma chamada de função.
 *
 * Não existe equivalente direto de sintaxe no Java. O mais próximo,
 * dependendo do caso, é combinar coisas como:
 *   - new ArrayList<>(listaOriginal)              -> cópia de coleção
 *   - Stream.concat(stream1, stream2)              -> concatenar
 *   - metodo(algumaLista.toArray(new Tipo[0]))     -> varargs
 * O JS resolve os três casos com o mesmo símbolo: "...".
 *
 * Atenção de início: spread faz CÓPIA RASA (shallow copy). Isso volta
 * na Parte 6.
 * ============================================
 */

// ============================================
// PARTE 1: SPREAD EM ARRAYS — copiar
// ============================================

console.log('=== PARTE 1: COPIAR ARRAYS ===\n');

const original = [1, 2, 3];
const copia = [...original];

console.log('original:', original);
console.log('copia:', copia);
console.log('São arrays diferentes na memória?', original !== copia); // true

// Prova de que são independentes: mudar a cópia não afeta o original
copia.push(4);
console.log('\nDepois de copia.push(4):');
console.log('original:', original); // [1, 2, 3] -> não mudou
console.log('copia:', copia); // [1, 2, 3, 4]

console.log('\nEm Java, o equivalente seria: new ArrayList<>(listaOriginal)');
console.log('Sem spread, "const copia = original" copiaria a REFERÊNCIA, não o array —');
console.log('mudar copia mudaria original também. Spread evita esse problema.');

// ============================================
// PARTE 2: SPREAD EM ARRAYS — concatenar e combinar
// ============================================

console.log('\n=== PARTE 2: CONCATENAR E COMBINAR ARRAYS ===\n');

const frutas = ['maçã', 'banana'];
const legumes = ['cenoura', 'batata'];

// Concatenar sem usar .concat()
const alimentos = [...frutas, ...legumes];
console.log('frutas + legumes:', alimentos);

// Inserir elementos EM QUALQUER POSIÇÃO — algo que .concat() não faz
// direto (ele só adiciona no fim)
const comExtra = [...frutas, 'uva', ...legumes];
console.log('frutas + "uva" no meio + legumes:', comExtra);

// Adicionar um item específico no início, mantendo o resto
const numeros = [2, 3, 4];
const comZeroNoInicio = [0, ...numeros];
console.log('\n0 no início:', comZeroNoInicio);

// ============================================
// PARTE 3: SPREAD EM OBJETOS — copiar e mesclar
// ============================================

console.log('\n=== PARTE 3: COPIAR E MESCLAR OBJETOS ===\n');

const usuarioBase = { nome: 'Danilo', idade: 29 };
const copiaUsuario = { ...usuarioBase };

console.log('usuarioBase:', usuarioBase);
console.log('copiaUsuario:', copiaUsuario);
console.log('São objetos diferentes?', usuarioBase !== copiaUsuario); // true

// Mesclar dois objetos em um só
const endereco = { cidade: 'São Paulo', estado: 'SP' };
const usuarioCompleto = { ...usuarioBase, ...endereco };
console.log('\nusuarioBase + endereco mesclados:', usuarioCompleto);

// Sobrescrever campos: a ORDEM importa — quem vem depois GANHA
const usuarioAtualizado = { ...usuarioBase, idade: 30 };
console.log('\nusuarioBase com idade sobrescrita:', usuarioAtualizado);
console.log('usuarioBase original não mudou:', usuarioBase); // idade continua 29

// Se a ordem for invertida, o spread perde para o campo fixo:
const tentativaErrada = { idade: 30, ...usuarioBase };
console.log('\nSe o spread vier DEPOIS, ele sobrescreve o campo fixo:');
console.log('{ idade: 30, ...usuarioBase } =', tentativaErrada); // idade volta a 29

// ============================================
// PARTE 4: SPREAD EM CHAMADAS DE FUNÇÃO
// ============================================

console.log('\n=== PARTE 4: SPREAD COMO ARGUMENTOS DE FUNÇÃO ===\n');

function somarTres(a, b, c) {
  return a + b + c;
}

const valores = [10, 20, 30];

// Sem spread, seria: somarTres(valores[0], valores[1], valores[2])
console.log('somarTres(...valores) =', somarTres(...valores));

// Uso muito comum: Math.max/Math.min não aceitam array direto
const pontuacoes = [88, 95, 72, 100, 60];
console.log('\nMath.max(pontuacoes) [ERRADO, sem spread] =', Math.max(pontuacoes)); // NaN
console.log('Math.max(...pontuacoes) [CORRETO, com spread] =', Math.max(...pontuacoes));
console.log('Math.min(...pontuacoes) =', Math.min(...pontuacoes));

console.log('\nEm Java, o mais próximo seria usar varargs com um array:');
console.log('  metodo(lista.toArray(new Integer[0]))  — mais verboso que "...valores"');

// ============================================
// PARTE 5: SPREAD COM STRINGS E OUTROS ITERÁVEIS
// ============================================

console.log('\n=== PARTE 5: SPREAD COM STRINGS, SET E MAP ===\n');

// String é iterável -> spread quebra em caracteres
const palavra = 'JS';
const letras = [...palavra];
console.log('[...("JS")] =', letras); // ['J', 'S']

// Muito útil para remover duplicados de um array via Set
const comDuplicados = [1, 2, 2, 3, 3, 3, 4];
const semDuplicados = [...new Set(comDuplicados)];
console.log('\nArray com duplicados:', comDuplicados);
console.log('Sem duplicados (via Set + spread):', semDuplicados);

// Set também aceita spread na criação
const conjunto = new Set(['a', 'b', 'c']);
const arrayDoSet = [...conjunto];
console.log('\nSet original:', conjunto);
console.log('Convertido para array:', arrayDoSet);

// Map -> spread gera um array de pares [chave, valor]
const mapa = new Map([
  ['nome', 'Danilo'],
  ['idade', 29],
]);
console.log('\nMap convertido em array de pares:', [...mapa]);

// ============================================
// PARTE 6: CUIDADO — SPREAD FAZ CÓPIA RASA (SHALLOW COPY)
// ============================================

console.log('\n=== PARTE 6: SHALLOW COPY — a pegadinha mais importante ===\n');

// Spread copia APENAS o primeiro nível. Se houver objeto/array
// ANINHADO, o nível interno continua sendo a MESMA referência.
const pedido = {
  numero: 1001,
  cliente: { nome: 'Ana', vip: false },
};

const copiaPedido = { ...pedido };

console.log('pedido e copiaPedido são objetos diferentes?', pedido !== copiaPedido); // true
console.log(
  'pedido.cliente e copiaPedido.cliente são o MESMO objeto?',
  pedido.cliente === copiaPedido.cliente
); // true -> aqui mora o perigo

copiaPedido.cliente.vip = true; // muda o objeto aninhado pela cópia...
console.log('\nDepois de mudar copiaPedido.cliente.vip:');
console.log('copiaPedido.cliente.vip:', copiaPedido.cliente.vip); // true
console.log('pedido.cliente.vip:', pedido.cliente.vip); // TAMBÉM true! vazou pro original

console.log('\nPara cópia profunda de verdade, é preciso copiar cada nível manualmente');
console.log('(ou usar structuredClone(objeto), disponível nativamente no Node/navegadores atuais).');

const copiaProfunda = structuredClone(pedido);
copiaProfunda.cliente.vip = false;
console.log('\nCom structuredClone, mudar a cópia não afeta o original:');
console.log('copiaProfunda.cliente.vip:', copiaProfunda.cliente.vip); // false
console.log('pedido.cliente.vip continua:', pedido.cliente.vip); // true, intocado

// ============================================
// PARTE 7: SPREAD x REST — mesmo símbolo, papéis opostos
// ============================================

console.log('\n=== PARTE 7: SPREAD x REST (não confundir) ===\n');

/*
 * Os "..." de SPREAD e de REST usam o MESMO símbolo, mas fazem o
 * OPOSTO um do outro:
 *
 *   SPREAD: "espalha" um iterável em elementos individuais
 *           -> usado onde se ESPERA vários valores (array, objeto,
 *              lista de argumentos)
 *
 *   REST:   "agrupa" vários valores soltos em um único array
 *           -> usado num PARÂMETRO de função, para juntar argumentos
 *              extras
 *
 * A diferença é só a POSIÇÃO onde "..." aparece.
 */

function somarTudo(...numeros) {
  // aqui "...numeros" é REST: agrupa todos os argumentos num array
  console.log('  argumentos recebidos como array:', numeros);
  return numeros.reduce((acc, n) => acc + n, 0);
}

console.log('somarTudo(1, 2, 3, 4) [REST na declaração]:');
console.log('  resultado =', somarTudo(1, 2, 3, 4));

console.log('\nsomarTudo(...valores) [SPREAD na chamada]:');
console.log('  resultado =', somarTudo(...valores)); // valores = [10, 20, 30] da Parte 4

// ============================================
// RESUMO
// ============================================

console.log('\n=== RESUMO ===\n');
console.log('Arrays: copiar [...arr], concatenar [...a, ...b], inserir no meio [...a, x, ...b]');
console.log('Objetos: copiar {...obj}, mesclar {...a, ...b}, sobrescrever {...a, campo: novoValor}');
console.log('  (em objetos, quem vem DEPOIS no literal sempre vence)');
console.log('Funções: espalhar array como argumentos -> fn(...array)');
console.log('Iteráveis: string, Set e Map também podem ser espalhados em array');
console.log('');
console.log('CUIDADO: spread é cópia RASA — objetos/arrays aninhados continuam');
console.log('compartilhando referência. Para cópia profunda, use structuredClone().');
console.log('');
console.log('Spread e rest usam o mesmo símbolo "...", mas são opostos:');
console.log('  spread espalha um iterável em valores | rest agrupa valores num array');