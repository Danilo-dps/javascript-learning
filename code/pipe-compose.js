/**
 * ============================================
 * PIPE E COMPOSE EM JAVASCRIPT
 * ============================================
 *
 * Os dois fazem a MESMA COISA — encadear várias funções, passando o
 * resultado de uma como entrada da próxima — mas em ORDEM DE LEITURA
 * oposta:
 *
 *   pipe(f, g, h)(x)     executa h(g(f(x)))   -> esquerda para direita
 *   compose(f, g, h)(x)  executa f(g(h(x)))   -> direita para esquerda
 *
 * compose segue a notação matemática clássica de composição de
 * funções: (f ∘ g)(x) = f(g(x)) — g roda primeiro por estar mais perto
 * de x, f roda por último por estar mais longe.
 *
 * pipe inverteu essa leitura de propósito, para bater com a ordem
 * natural de leitura de código (cima pra baixo, esquerda pra direita)
 * — é a mesma filosofia por trás do encadeamento do Stream API do
 * Java (.filter().map().sorted()...), onde a ordem escrita é a ordem
 * de execução.
 * ============================================
 */

// ============================================
// PARTE 1: IMPLEMENTANDO pipe DO ZERO
// ============================================

console.log('=== PARTE 1: IMPLEMENTANDO pipe ===\n');

// pipe recebe uma lista de funções (rest) e devolve UMA NOVA função
// que, quando chamada com um valor inicial, aplica cada função na
// ordem em que foi passada, usando reduce da esquerda pra direita.
function pipe(...funcoes) {
  return function (valorInicial) {
    return funcoes.reduce((valorAtual, funcaoAtual) => funcaoAtual(valorAtual), valorInicial);
  };
}

const somar2 = (x) => x + 2;
const multiplicarPor3 = (x) => x * 3;
const elevarAoQuadrado = (x) => x * x;

const pipeline = pipe(somar2, multiplicarPor3, elevarAoQuadrado);

console.log('pipe(somar2, multiplicarPor3, elevarAoQuadrado)(5):');
console.log('  passo a passo: (5 + 2) = 7  ->  (7 * 3) = 21  ->  (21 * 21) = 441');
console.log('  resultado real:', pipeline(5));

// ============================================
// PARTE 2: IMPLEMENTANDO compose DO ZERO
// ============================================

console.log('\n=== PARTE 2: IMPLEMENTANDO compose ===\n');

// compose faz o mesmo reduce, só que percorrendo as funções de trás
// pra frente -> reduceRight em vez de reduce.
function compose(...funcoes) {
  return function (valorInicial) {
    return funcoes.reduceRight((valorAtual, funcaoAtual) => funcaoAtual(valorAtual), valorInicial);
  };
}

const pipelineInvertido = compose(somar2, multiplicarPor3, elevarAoQuadrado);

console.log('compose(somar2, multiplicarPor3, elevarAoQuadrado)(5):');
console.log('  passo a passo: (5 * 5) = 25  ->  (25 * 3) = 75  ->  (75 + 2) = 77');
console.log('  resultado real:', pipelineInvertido(5));

console.log('\nMesmas 3 funções, mesma ordem de escrita, resultado DIFERENTE —');
console.log('porque compose começa pela última função da lista.');

// ============================================
// PARTE 3: PROVANDO QUE compose = pipe COM AS FUNÇÕES INVERTIDAS
// ============================================

console.log('\n=== PARTE 3: compose É SÓ UM pipe COM ORDEM INVERTIDA ===\n');

// Reimplementando compose EM CIMA de pipe, sem reduceRight —
// só invertendo o array de funções antes de delegar pro pipe.
function composeViaPipe(...funcoes) {
  return pipe(...funcoes.reverse());
}

const pipelineComposeViaPipe = composeViaPipe(somar2, multiplicarPor3, elevarAoQuadrado);

console.log('composeViaPipe(...)(5):', pipelineComposeViaPipe(5));
console.log('compose(...)(5):        ', pipelineInvertido(5));
console.log('São iguais?', pipelineComposeViaPipe(5) === pipelineInvertido(5));

console.log('\nIsso confirma: a mecânica de encadear é idêntica nos dois —');
console.log('a única diferença real é a convenção de ORDEM DE LEITURA.');

// ============================================
// PARTE 4: CASO DE USO REALISTA — pipeline de texto
// ============================================

console.log('\n=== PARTE 4: CASO DE USO — normalizar texto de busca ===\n');

const paraMinusculas = (texto) => texto.toLowerCase();
const removerEspacosExtras = (texto) => texto.trim().replace(/\s+/g, ' ');
const removerAcentos = (texto) => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// Lido de cima pra baixo, na ordem natural: minúsculas -> sem espaço
// extra -> sem acento. Isso é o motivo de pipe ser mais popular em
// código de aplicação do que compose.
const normalizarBusca = pipe(paraMinusculas, removerEspacosExtras, removerAcentos);

const entradaUsuario = '   São PAULO   ';
console.log(`normalizarBusca("${entradaUsuario}") = "${normalizarBusca(entradaUsuario)}"`);

// ============================================
// PARTE 5: COMPARANDO COM O STREAM API DO JAVA
// ============================================

console.log('\n=== PARTE 5: A SEMELHANÇA COM STREAM (Java) ===\n');

/*
 * EM JAVA:
 *
 * List<Integer> resultado = lista.stream()
 *     .filter(n -> n > 0)
 *     .map(n -> n * 2)
 *     .sorted()
 *     .collect(Collectors.toList());
 *
 * A ordem escrita = ordem de execução, igual ao pipe.
 *
 * DIFERENÇA IMPORTANTE: Stream é uma API de método encadeado
 * (cada .filter()/.map() devolve um NOVO Stream, e você encadeia
 * chamando método sobre método). pipe/compose são FUNÇÕES GENÉRICAS
 * que recebem outras funções como argumento — funcionam para
 * qualquer tipo de valor (número, string, objeto), não só coleções.
 * Não existe uma "stream" por trás, é só reduce() acumulando o
 * resultado de uma chamada de função na próxima.
 */

const numeros = [1, -2, 3, -4, 5];

console.log('Equivalente em JS usando array (parecido com Stream):');
const viaArrayMethods = numeros
  .filter((n) => n > 0)
  .map((n) => n * 2)
  .sort((a, b) => a - b);
console.log('  numeros.filter().map().sort():', viaArrayMethods);

console.log('\npipe genérico funcionando sobre um VALOR ÚNICO (não uma coleção):');
const processarNumero = pipe(
  (n) => n * 2,
  (n) => n + 1,
  (n) => `resultado final: ${n}`
);
console.log('  processarNumero(10):', processarNumero(10));

// ============================================
// PARTE 6: pipe/compose ASSÍNCRONO (bônus, encontro com async/await)
// ============================================

console.log('\n=== PARTE 6: VERSÃO ASSÍNCRONA (bônus) ===\n');

// Quando as funções do pipeline retornam Promise, o reduce comum não
// espera cada etapa terminar. Solução: acumular com await dentro do
// reduce, usando Promise.resolve() como valor inicial.
function pipeAsync(...funcoes) {
  return function (valorInicial) {
    return funcoes.reduce(
      (promessaAtual, funcaoAtual) => promessaAtual.then((valor) => funcaoAtual(valor)),
      Promise.resolve(valorInicial)
    );
  };
}

const buscarUsuario = async (id) => {
  console.log(`  buscando usuário ${id}...`);
  return { id, nome: 'Danilo' };
};

const adicionarPermissoes = async (usuario) => {
  console.log(`  adicionando permissões para ${usuario.nome}...`);
  return { ...usuario, permissoes: ['leitura', 'escrita'] };
};

const pipelineAsync = pipeAsync(buscarUsuario, adicionarPermissoes);

console.log('Executando pipeline assíncrono:');
pipelineAsync(1).then((resultadoFinal) => {
  console.log('  resultado final:', resultadoFinal);
});

// ============================================
// RESUMO
// ============================================

console.log('\n=== RESUMO ===\n');
console.log('pipe(f, g, h)(x)    = h(g(f(x)))   -> executa esquerda para direita');
console.log('compose(f, g, h)(x) = f(g(h(x)))   -> executa direita para esquerda');
console.log('');
console.log('compose segue a notação matemática (f ∘ g); pipe segue a ordem de');
console.log('leitura natural de código — por isso pipe lembra tanto o Stream API.');
console.log('');
console.log('Mecanicamente são a mesma coisa: reduce (pipe) vs reduceRight (compose).');
console.log('compose(...) é equivalente a pipe(...fns.reverse()).');