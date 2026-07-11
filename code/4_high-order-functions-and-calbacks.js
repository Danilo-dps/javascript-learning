/**
 * ============================================
 * HIGH-ORDER FUNCTIONS E CALLBACKS
 * ============================================
 *
 * O que são?
 *
 * 1. HIGH-ORDER FUNCTION (Função de Alta Ordem)
 *    ==========================================
 *    É uma função que:
 *    - Recebe uma ou mais funções como argumento (callback)
 *    - OU retorna uma função como resultado
 *    - OU as duas coisas.
 *    Isso é uma classificação sobre a ASSINATURA da função.
 *
 * 2. CALLBACK (Função de Retorno)
 *    =============================
 *    É a função que É PASSADA como argumento para outra função executar.
 *    Isso é uma classificação sobre o PAPEL que a função exerce naquela
 *    chamada específica — não sobre timing.
 *
 *    IMPORTANTE: callback não é sinônimo de "assíncrono". map/filter/reduce
 *    executam o callback de forma SÍNCRONA, na hora, item por item.
 *    setTimeout/fetch executam o callback de forma ASSÍNCRONA, depois,
 *    passando por Web API + event loop. São coisas independentes: o termo
 *    "callback" descreve o papel da função, não quando ela roda.
 *
 * 3. COMPARAÇÃO COM JAVA
 *    ===================
 *    Em Java a mesma ideia existe via interfaces funcionais:
 *    Function<T,R>, Predicate<T>, Consumer<T>, Supplier<T>
 *    list.stream().map(x -> x * 2)
 *
 *    Em JS é mais direto porque função é um tipo de dado nativo — não
 *    precisa de interface nem de classe anônima para existir como valor.
 *
 * ============================================
 */

// ============================================
// EXEMPLO 1: HIGH-ORDER FUNCTION BÁSICA
// ============================================

console.log('=== EXEMPLO 1: HIGH-ORDER FUNCTION BÁSICA ===\n');

// Esta é uma HIGH-ORDER FUNCTION porque recebe uma função como argumento
function executarOperacao(a, b, operacao) {
  // 'operacao' é o CALLBACK
  console.log(`Executando operação com ${a} e ${b}...`);
  const resultado = operacao(a, b);
  console.log(`Resultado: ${resultado}`);
  return resultado;
}

function somar(x, y) {
  return x + y;
}

function multiplicar(x, y) {
  return x * y;
}

function subtrair(x, y) {
  return x - y;
}

console.log('Usando callbacks nomeados:');
executarOperacao(10, 5, somar); // 15
executarOperacao(10, 5, multiplicar); // 50
executarOperacao(10, 5, subtrair); // 5

console.log('\nUsando arrow functions como callback:');
executarOperacao(10, 5, (x, y) => x + y); // 15
executarOperacao(10, 5, (x, y) => x * y); // 50
executarOperacao(10, 5, (x, y) => x / y); // 2

console.log('\nPerceba: a high-order function não sabe o que o callback faz.');
console.log('Ela só executa a função que recebeu — isso é flexibilidade.');

// ============================================
// EXEMPLO 2: HIGH-ORDER FUNCTION QUE RETORNA FUNÇÃO
// ============================================

console.log('\n=== EXEMPLO 2: HIGH-ORDER QUE RETORNA FUNÇÃO ===\n');

// Esta HIGH-ORDER FUNCTION retorna uma função (closure sobre 'operacao')
function criarOperacao(operacao) {
  if (operacao === 'soma') {
    return function (a, b) {
      console.log(`Somando ${a} + ${b}`);
      return a + b;
    };
  } else if (operacao === 'multiplica') {
    return function (a, b) {
      console.log(`Multiplicando ${a} * ${b}`);
      return a * b;
    };
  } else {
    return function () {
      console.log('Operação desconhecida, retornando 0');
      return 0;
    };
  }
}

const funcaoSoma = criarOperacao('soma');
const funcaoMultiplica = criarOperacao('multiplica');

console.log('Funções criadas pela high-order function:');
console.log('funcaoSoma(10, 5) =', funcaoSoma(10, 5)); // 15
console.log('funcaoMultiplica(10, 5) =', funcaoMultiplica(10, 5)); // 50

console.log('\nA high-order function CRIOU funções personalizadas — isso é');
console.log('uma factory de funções, e só funciona por causa de closures.');

// ============================================
// EXEMPLO 3: HIGH-ORDER FUNCTION COM ARRAY (MAP)
// ============================================

console.log('\n=== EXEMPLO 3: MAP - Transformação de Arrays ===\n');

// .map() é uma high-order function nativa: recebe um callback que
// transforma cada elemento e SEMPRE devolve um array do mesmo tamanho.

const numeros = [1, 2, 3, 4, 5];
console.log('Array original:', numeros);

const dobrados = numeros.map(function (numero) {
  return numero * 2;
});
console.log('Dobrados (com function):', dobrados);

const triplicados = numeros.map((numero) => numero * 3);
console.log('Triplicados (arrow):', triplicados);

const descricao = numeros.map((numero) => {
  return numero % 2 === 0 ? `${numero} é par` : `${numero} é ímpar`;
});
console.log('Descrições:', descricao);

const comIndice = numeros.map((numero, index) => `Elemento ${index}: ${numero}`);
console.log('Com índice:', comIndice);

// ============================================
// EXEMPLO 4: FILTER - Filtragem de Arrays
// ============================================

console.log('\n=== EXEMPLO 4: FILTER - Filtragem ===\n');

// .filter() recebe um callback que retorna true/false para cada elemento
// e devolve um array MENOR OU IGUAL ao original.

const numerosMix = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('Array original:', numerosMix);

const pares = numerosMix.filter((numero) => numero % 2 === 0);
console.log('Números pares:', pares);

const maioresQue5 = numerosMix.filter((numero) => numero > 5);
console.log('Maiores que 5:', maioresQue5);

const paresEMaioresQue5 = numerosMix.filter((numero) => numero % 2 === 0 && numero > 5);
console.log('Pares e maiores que 5:', paresEMaioresQue5);

const impares = numerosMix.filter((numero) => numero % 2 !== 0);
console.log('Ímpares:', impares);

const pessoas = [
  { nome: 'João', idade: 25 },
  { nome: 'Maria', idade: 30 },
  { nome: 'Carlos', idade: 18 },
  { nome: 'Ana', idade: 40 },
];

const maioresDe20 = pessoas.filter((pessoa) => pessoa.idade > 20);
console.log('\nPessoas com mais de 20 anos:', maioresDe20);

// ============================================
// EXEMPLO 5: REDUCE - Agregação de Arrays
// ============================================

console.log('\n=== EXEMPLO 5: REDUCE - Agregação ===\n');

// .reduce() reduz o array a UM único valor. O callback recebe
// (acumulador, valorAtual, índice, array) e o segundo argumento de
// reduce() é o valor inicial do acumulador.

const valores = [10, 20, 30, 40, 50];
console.log('Array:', valores);

const soma = valores.reduce((acumulador, valorAtual) => {
  console.log(`Acumulador: ${acumulador} + ${valorAtual} = ${acumulador + valorAtual}`);
  return acumulador + valorAtual;
}, 0);
console.log('Soma total:', soma);

const produto = valores.reduce((acumulador, valorAtual) => acumulador * valorAtual, 1);
console.log('Produto total:', produto);

// Sempre inicialize o acumulador — sem valor inicial, reduce() lança
// erro em array vazio, e usar o primeiro elemento como início "esconde"
// esse caso de borda.
const maior = valores.reduce(
  (acumulador, valorAtual) => (valorAtual > acumulador ? valorAtual : acumulador),
  -Infinity
);
console.log('Maior valor:', maior);

const produtos = [
  { nome: 'Notebook', categoria: 'Eletrônicos', preco: 3000 },
  { nome: 'Teclado', categoria: 'Eletrônicos', preco: 200 },
  { nome: 'Cadeira', categoria: 'Móveis', preco: 800 },
  { nome: 'Mesa', categoria: 'Móveis', preco: 1200 },
  { nome: 'Mouse', categoria: 'Eletrônicos', preco: 100 },
];

console.log('\nProdutos:', produtos);

const agrupadoPorCategoria = produtos.reduce((acumulador, produto) => {
  const categoria = produto.categoria;
  if (!acumulador[categoria]) {
    acumulador[categoria] = [];
  }
  acumulador[categoria].push(produto);
  return acumulador;
}, {});

console.log('Produtos agrupados por categoria:');
console.log('Eletrônicos:', agrupadoPorCategoria['Eletrônicos']);
console.log('Móveis:', agrupadoPorCategoria['Móveis']);

// ============================================
// EXEMPLO 6: COMPARAÇÃO COM JAVA
// ============================================

console.log('\n=== EXEMPLO 6: COMPARAÇÃO COM JAVA ===\n');

/*
 * EM JAVA (Stream API):
 *
 * List<Integer> numeros = Arrays.asList(1, 2, 3, 4, 5);
 *
 * List<Integer> dobrados = numeros.stream()
 *     .map(n -> n * 2)
 *     .collect(Collectors.toList());
 *
 * List<Integer> pares = numeros.stream()
 *     .filter(n -> n % 2 == 0)
 *     .collect(Collectors.toList());
 *
 * int soma = numeros.stream()
 *     .reduce(0, (a, b) -> a + b);
 *
 * EM JAVASCRIPT (mesma ideia, sintaxe mais enxuta):
 *
 * const numeros = [1, 2, 3, 4, 5];
 * const dobrados = numeros.map(n => n * 2);
 * const pares = numeros.filter(n => n % 2 === 0);
 * const soma = numeros.reduce((a, b) => a + b, 0);
 *
 * A diferença de fundo: em Java, map/filter/reduce recebem um OBJETO
 * que implementa uma interface funcional (Function, Predicate...).
 * Em JS, recebem a função diretamente — não existe essa camada.
 */

console.log('Pipeline de transformações:');

const pipeline = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  .filter((n) => n % 2 === 0) // pares: [2,4,6,8,10]
  .map((n) => n * 3) // triplica: [6,12,18,24,30]
  .filter((n) => n > 20) // > 20: [24,30]
  .reduce((acc, n) => acc + n, 0); // soma: 54

console.log('Resultado do pipeline:', pipeline);
console.log('filtra pares → triplica → filtra >20 → soma');

// ============================================
// EXEMPLO 7: COMPOSIÇÃO DE FUNÇÕES
// ============================================

console.log('\n=== EXEMPLO 7: COMPOSIÇÃO DE FUNÇÕES ===\n');

// compor(f, g) retorna uma função que executa f(g(x)) — ou seja,
// 'g' roda PRIMEIRO (mais interna), 'f' roda DEPOIS (mais externa).
function compor(f, g) {
  return function (x) {
    console.log(`Compondo: ${f.name}(${g.name}(${x}))`);
    return f(g(x));
  };
}

function adicionar2(x) {
  return x + 2;
}

function multiplicarPor3(x) {
  return x * 3;
}

// g = multiplicarPor3 roda primeiro, f = adicionar2 roda depois:
// (5 * 3) + 2 = 17
const multiplicarDepoisAdicionar = compor(adicionar2, multiplicarPor3);
console.log('multiplicarDepoisAdicionar(5):', multiplicarDepoisAdicionar(5)); // 17

// g = adicionar2 roda primeiro, f = multiplicarPor3 roda depois:
// (5 + 2) * 3 = 21
const adicionarDepoisMultiplicar = compor(multiplicarPor3, adicionar2);
console.log('adicionarDepoisMultiplicar(5):', adicionarDepoisMultiplicar(5)); // 21

console.log('\nOrdem importa! O nome da variável agora reflete a ordem real');
console.log('de execução: compor(f, g) roda g primeiro, f por último.');

// ============================================
// EXEMPLO 8: CALLBACKS ASSÍNCRONOS
// ============================================

console.log('\n=== EXEMPLO 8: CALLBACKS ASSÍNCRONOS ===\n');

// Aqui sim o callback é executado DEPOIS — não por ser callback, mas
// porque setTimeout delega para a Web API / libuv e só volta pela
// callback queue quando o "processamento" termina.
function processarDados(dados, callbackSucesso, callbackErro) {
  console.log(`⏳ Processando dados: ${dados}...`);

  setTimeout(() => {
    const sucesso = Math.random() > 0.3; // ~70% de chance de sucesso

    if (sucesso) {
      const resultado = dados.toUpperCase();
      console.log('✅ Processamento concluído!');
      callbackSucesso(resultado);
    } else {
      console.log('❌ Erro no processamento!');
      callbackErro('Falha ao processar dados');
    }
  }, 1000);
}

console.log('Iniciando processamento assíncrono...');
console.log('(o código abaixo continua executando enquanto isso roda)');

processarDados(
  'dados importantes',
  function (resultado) {
    console.log(`🎉 Sucesso! Resultado: ${resultado}`);
  },
  function (erro) {
    console.log(`💥 Erro: ${erro}`);
  }
);

console.log('Esse log aparece ANTES do resultado assíncrono!');
console.log('Isso mostra que callback assíncrono permite código não-bloqueante.');

// ============================================
// EXEMPLO 9: FOREACH - Callback por elemento
// ============================================

console.log('\n=== EXEMPLO 9: FOREACH COM CALLBACK ===\n');

// .forEach() executa um callback (síncrono) para cada elemento do
// array, mas NÃO devolve array novo — diferente de map.

const frutas = ['Maçã', 'Banana', 'Laranja', 'Uva'];
console.log('Frutas:', frutas);

frutas.forEach(function (fruta, index) {
  console.log(`Fruta ${index + 1}: ${fruta}`);
});

console.log('\nLista HTML gerada:');
let html = '<ul>\n';
frutas.forEach((fruta) => {
  html += `  <li>${fruta}</li>\n`;
});
html += '</ul>';
console.log(html);

// ============================================
// EXEMPLO 10: HIGH-ORDER FUNCTION CUSTOMIZADA
// ============================================

console.log('\n=== EXEMPLO 10: HIGH-ORDER FUNCTION CUSTOMIZADA ===\n');

// 'validadores' é um array de funções callback — cada uma recebe os
// dados e devolve true, ou uma string com a mensagem de erro.
function validarDados(dados, validadores) {
  const erros = [];

  validadores.forEach((validador) => {
    const resultado = validador(dados);
    if (resultado !== true) {
      erros.push(resultado);
    }
  });

  return {
    valido: erros.length === 0,
    erros,
  };
}

const validadores = [
  (dados) => (dados.nome && dados.nome.length >= 3 ? true : 'Nome deve ter pelo menos 3 caracteres'),
  (dados) => (dados.idade && dados.idade >= 18 ? true : 'Idade deve ser maior ou igual a 18'),
  (dados) => (dados.email && dados.email.includes('@') ? true : 'Email deve conter @'),
];

const dadosValidos = { nome: 'João', idade: 25, email: 'joao@email.com' };
console.log('Validando dados válidos:');
console.log('Resultado:', validarDados(dadosValidos, validadores));

const dadosInvalidos = { nome: 'Jo', idade: 16, email: 'joaoemail.com' };
console.log('\nValidando dados inválidos:');
const resultadoInvalido = validarDados(dadosInvalidos, validadores);
console.log('Resultado:', resultadoInvalido);
console.log('Erros encontrados:');
resultadoInvalido.erros.forEach((erro) => console.log(`- ${erro}`));

// ============================================
// EXEMPLO 11: CALLBACK HELL (E COMO EVITAR)
// ============================================

console.log('\n=== EXEMPLO 11: CALLBACK HELL ===\n');

// Callback Hell = callbacks aninhados dentro de callbacks. Comum antes
// de Promises/async-await existirem. Deixado comentado só como
// referência de como NÃO estruturar código assíncrono encadeado:
//
// operacao1(function (result1) {
//   operacao2(result1, function (result2) {
//     operacao3(result2, function (result3) {
//       // ... e assim vai, cada vez mais indentado
//     });
//   });
// });

function operacao1Promise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('  🔹 Operação 1 concluída');
      resolve('dado1');
    }, 500);
  });
}

function operacao2Promise(dado) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`  🔹 Operação 2 concluída com ${dado}`);
      resolve('dado2');
    }, 500);
  });
}

function operacao3Promise(dado) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`  🔹 Operação 3 concluída com ${dado}`);
      resolve('dado3');
    }, 500);
  });
}

// async/await é açúcar sintático sobre a mesma cadeia de Promises
// acima — por isso só executamos essa versão (mais legível) para não
// duplicar a mesma sequência de logs duas vezes.
async function executarOperacoes() {
  console.log('✅ Encadeamento com async/await:');
  const result1 = await operacao1Promise();
  const result2 = await operacao2Promise(result1);
  await operacao3Promise(result2);
  console.log('✅ Todas operações concluídas!\n');
}

executarOperacoes();

// ============================================
// RESUMO
// ============================================

console.log('\n=== RESUMO: HIGH-ORDER FUNCTIONS E CALLBACKS ===\n');

console.log('📚 CONCEITOS CHAVE:');
console.log('1. High-order function: recebe função como parâmetro OU retorna função');
console.log('2. Callback: função passada como argumento para outra executar');
console.log('3. Ser callback não implica ser assíncrono — depende de quem chama');
console.log('4. map: transforma cada elemento → array do mesmo tamanho');
console.log('5. filter: seleciona elementos → array menor ou igual');
console.log('6. reduce: agrega elementos → um único valor');
console.log('7. forEach: executa ação por elemento, sem devolver array novo');

console.log('\n🔑 DIFERENÇA CHAVE DO JAVA:');
console.log('Java: função não é um tipo nativo → precisa de interface funcional');
console.log('JS: função é um tipo de dado nativo → uso direto, sem empacotamento');

console.log('\n⚠️ CUIDADOS:');
console.log('- Evite callback hell (aninhamento excessivo) — prefira async/await');
console.log('- reduce() sem valor inicial quebra em array vazio');
console.log('- Cuidado com perda de contexto (this) dentro de callbacks');

// ============================================
// EXERCÍCIOS PRÁTICOS
// ============================================

console.log('\n=== EXERCÍCIOS PRÁTICOS ===\n');

console.log('DESAFIO 1: Pipeline de dados');
console.log('Filtrar pares → elevar ao quadrado → somar. Para [1,2,3,4,5]:');
console.log('  esperado: (2² + 4²) = 20');

const numerosDesafio = [1, 2, 3, 4, 5];
const resultadoDesafio1 = numerosDesafio
  .filter((n) => n % 2 === 0) // [2,4]
  .map((n) => n * n) // [4,16]
  .reduce((acc, n) => acc + n, 0); // 20
console.log(`Resultado: ${resultadoDesafio1}`);

console.log('\nDESAFIO 2: Agrupar palavras por primeira letra');
const palavras = ['casa', 'carro', 'bola', 'cachorro', 'bicicleta', 'aviao'];
const agrupado = palavras.reduce((acc, palavra) => {
  const letra = palavra[0];
  if (!acc[letra]) acc[letra] = [];
  acc[letra].push(palavra);
  return acc;
}, {});
console.log('Resultado:', agrupado);
// Saída: { c: ['casa','carro','cachorro'], b: ['bola','bicicleta'], a: ['aviao'] }