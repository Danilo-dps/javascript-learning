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
 *    - Recebe UMA OU MAIS funções como argumento (callback)
 *    - OU retorna uma função como resultado
 *    - OU ambos!
 * 
 * 2. CALLBACK (Função de Retorno)
 *    =============================
 *    É uma função que é passada COMO ARGUMENTO para outra função
 *    e é executada em um momento posterior (agora, depois, ou quando
 *    um evento acontecer).
 * 
 * 3. COMPARAÇÃO COM JAVA
 *    ===================
 *    Em Java, a mesma ideia existe com interfaces funcionais:
 *    - Function<T,R>, Predicate<T>, Consumer<T>, Supplier<T>
 *    - A sintaxe com lambdas: list.stream().map(x -> x*2)
 * 
 *    Em JS, é MAIS DIRETO porque funções são cidadãos de primeira classe!
 *    Não precisa de interfaces, não precisa de classes anônimas.
 * 
 * Por que isso é importante?
 * - Programação funcional (map, filter, reduce)
 * - Assincronismo (callbacks, promises, eventos)
 * - Composição de funções
 * - Código mais declarativo e reutilizável
 * 
 * Vamos ver na prática!
 * ============================================
 */

// ============================================
// EXEMPLO 1: HIGH-ORDER FUNCTION BÁSICA
// ============================================

console.log('=== EXEMPLO 1: HIGH-ORDER FUNCTION BÁSICA ===\n');

// Esta é uma HIGH-ORDER FUNCTION porque recebe uma função como argumento
function executarOperacao(a, b, operacao) {
    // 'operacao' é um CALLBACK
    // A função executa o callback com os dois números
    console.log(`Executando operação com ${a} e ${b}...`);
    const resultado = operacao(a, b);
    console.log(`Resultado: ${resultado}`);
    return resultado;
}

// Definindo funções callback
function somar(x, y) {
    return x + y;
}

function multiplicar(x, y) {
    return x * y;
}

function subtrair(x, y) {
    return x - y;
}

// Usando a high-order function com diferentes callbacks
console.log('Usando callbacks nomeados:');
executarOperacao(10, 5, somar);       // 15
executarOperacao(10, 5, multiplicar); // 50
executarOperacao(10, 5, subtrair);    // 5

// Com arrow functions (forma mais comum)
console.log('\nUsando arrow functions como callback:');
executarOperacao(10, 5, (x, y) => x + y);      // 15
executarOperacao(10, 5, (x, y) => x * y);      // 50
executarOperacao(10, 5, (x, y) => x / y);      // 2

console.log('\nPerceba: a HIGH-ORDER FUNCTION não sabe o que o callback faz!');
console.log('Ela apenas executa a função que recebeu. Isso é flexibilidade.');

// ============================================
// EXEMPLO 2: HIGH-ORDER FUNCTION QUE RETORNA FUNÇÃO
// ============================================

console.log('\n=== EXEMPLO 2: HIGH-ORDER QUE RETORNA FUNÇÃO ===\n');

// Esta HIGH-ORDER FUNCTION RETORNA uma função (closure)
function criarOperacao(operacao) {
    // Retorna uma função que lembra da operação
    if (operacao === 'soma') {
        return function(a, b) {
            console.log(`Somando ${a} + ${b}`);
            return a + b;
        };
    } else if (operacao === 'multiplica') {
        return function(a, b) {
            console.log(`Multiplicando ${a} * ${b}`);
            return a * b;
        };
    } else {
        return function(a, b) {
            console.log(`Operação desconhecida, retornando 0`);
            return 0;
        };
    }
}

// Criando funções especializadas
const funcaoSoma = criarOperacao('soma');
const funcaoMultiplica = criarOperacao('multiplica');

console.log('Funções criadas pela high-order function:');
console.log('funcaoSoma(10, 5) =', funcaoSoma(10, 5));    // 15
console.log('funcaoMultiplica(10, 5) =', funcaoMultiplica(10, 5)); // 50

console.log('\nNote: a high-order function CRIOU funções personalizadas!');
console.log('Isso é uma factory de funções.');

// ============================================
// EXEMPLO 3: HIGH-ORDER FUNCTION COM ARRAY (MAP)
// ============================================

console.log('\n=== EXEMPLO 3: MAP - Transformação de Arrays ===\n');

// .map() é uma HIGH-ORDER FUNCTION nativa do JS
// Ela recebe um CALLBACK que transforma cada elemento

const numeros = [1, 2, 3, 4, 5];
console.log('Array original:', numeros);

// Callback que dobra o valor
const dobrados = numeros.map(function(numero) {
    return numero * 2;
});
console.log('Dobrados (com function):', dobrados);

// Mesmo com arrow function (mais comum)
const triplicados = numeros.map(numero => numero * 3);
console.log('Triplicados (arrow):', triplicados);

// Callback mais complexo
const descricao = numeros.map(numero => {
    if (numero % 2 === 0) {
        return `${numero} é par`;
    } else {
        return `${numero} é ímpar`;
    }
});
console.log('Descrições:', descricao);

// Map com índice
const comIndice = numeros.map((numero, index) => {
    return `Elemento ${index}: ${numero}`;
});
console.log('Com índice:', comIndice);

// ============================================
// EXEMPLO 4: FILTER - Filtragem de Arrays
// ============================================

console.log('\n=== EXEMPLO 4: FILTER - Filtragem ===\n');

// .filter() é outra HIGH-ORDER FUNCTION
// Recebe um CALLBACK que retorna true/false para cada elemento

const numerosMix = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('Array original:', numerosMix);

// Filtrar números pares
const pares = numerosMix.filter(numero => numero % 2 === 0);
console.log('Números pares:', pares);

// Filtrar números maiores que 5
const maioresQue5 = numerosMix.filter(numero => numero > 5);
console.log('Maiores que 5:', maioresQue5);

// Filtrar com condições compostas
const paresEMaioresQue5 = numerosMix.filter(numero => 
    numero % 2 === 0 && numero > 5
);
console.log('Pares e maiores que 5:', paresEMaioresQue5);

// Filtrar com índice
const impares = numerosMix.filter((numero, index) => {
    console.log(`Verificando ${numero} no índice ${index}`);
    return numero % 2 !== 0;
});
console.log('Ímpares:', impares);

// Filtrar objetos
const pessoas = [
    { nome: 'João', idade: 25 },
    { nome: 'Maria', idade: 30 },
    { nome: 'Carlos', idade: 18 },
    { nome: 'Ana', idade: 40 }
];

const maioresDe20 = pessoas.filter(pessoa => pessoa.idade > 20);
console.log('\nPessoas com mais de 20 anos:', maioresDe20);

// ============================================
// EXEMPLO 5: REDUCE - Agregação de Arrays
// ============================================

console.log('\n=== EXEMPLO 5: REDUCE - Agregação ===\n');

// .reduce() é uma HIGH-ORDER FUNCTION que reduz o array a um único valor
// Recebe um CALLBACK com: acumulador, elemento atual, índice, array

const valores = [10, 20, 30, 40, 50];
console.log('Array:', valores);

// Somar todos os elementos
const soma = valores.reduce((acumulador, valorAtual) => {
    console.log(`Acumulador: ${acumulador} + ${valorAtual} = ${acumulador + valorAtual}`);
    return acumulador + valorAtual;
}, 0); // 0 é o valor inicial do acumulador
console.log('Soma total:', soma);

// Multiplicar todos os elementos
const produto = valores.reduce((acumulador, valorAtual) => acumulador * valorAtual, 1);
console.log('Produto total:', produto);

// Encontrar o maior valor
const maior = valores.reduce((acumulador, valorAtual) => 
    valorAtual > acumulador ? valorAtual : acumulador
);
console.log('Maior valor:', maior);

// Agrupar elementos (caso real)
const produtos = [
    { nome: 'Notebook', categoria: 'Eletrônicos', preco: 3000 },
    { nome: 'Teclado', categoria: 'Eletrônicos', preco: 200 },
    { nome: 'Cadeira', categoria: 'Móveis', preco: 800 },
    { nome: 'Mesa', categoria: 'Móveis', preco: 1200 },
    { nome: 'Mouse', categoria: 'Eletrônicos', preco: 100 }
];

console.log('\nProdutos:', produtos);

// Agrupar por categoria
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
// EXEMPLO 6: HIGH-ORDER FUNCTION COM COMPARAÇÃO
// ============================================

console.log('\n=== EXEMPLO 6: COMPARAÇÃO COM JAVA ===\n');

/*
 * EM JAVA (Stream API):
 * 
 * List<Integer> numeros = Arrays.asList(1, 2, 3, 4, 5);
 * 
 * // MAP - transforma
 * List<Integer> dobrados = numeros.stream()
 *     .map(n -> n * 2)
 *     .collect(Collectors.toList());
 * 
 * // FILTER - filtra
 * List<Integer> pares = numeros.stream()
 *     .filter(n -> n % 2 == 0)
 *     .collect(Collectors.toList());
 * 
 * // REDUCE - agrega
 * int soma = numeros.stream()
 *     .reduce(0, (a, b) -> a + b);
 * 
 * EM JAVASCRIPT (mesma ideia, sintaxe diferente):
 * 
 * const numeros = [1, 2, 3, 4, 5];
 * 
 * const dobrados = numeros.map(n => n * 2);
 * const pares = numeros.filter(n => n % 2 === 0);
 * const soma = numeros.reduce((a, b) => a + b, 0);
 * 
 * A grande diferença:
 * - Java: precisa de streams, interfaces, collectors
 * - JS: é nativo, mais conciso, funções são cidadãs
 */

// Criando um pipeline com HIGH-ORDER FUNCTIONS
console.log('Pipeline de transformações:');

const pipeline = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    .filter(n => n % 2 === 0)           // Filtra pares: [2,4,6,8,10]
    .map(n => n * 3)                    // Triplica: [6,12,18,24,30]
    .filter(n => n > 20)                // Filtra > 20: [24,30]
    .reduce((acc, n) => acc + n, 0);    // Soma: 54

console.log('Resultado do pipeline:', pipeline);
console.log('Equivalente a: filtra pares → triplica → filtra >20 → soma');

// ============================================
// EXEMPLO 7: COMPOSIÇÃO DE FUNÇÕES
// ============================================

console.log('\n=== EXEMPLO 7: COMPOSIÇÃO DE FUNÇÕES ===\n');

// HIGH-ORDER FUNCTION que compõe duas funções
function compor(f, g) {
    // Retorna uma função que executa f(g(x))
    return function(x) {
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

// Compondo: primeiro multiplica por 3, depois adiciona 2
const adicionarDepoisMultiplicar = compor(adicionar2, multiplicarPor3);
console.log('adicionarDepoisMultiplicar(5):', adicionarDepoisMultiplicar(5)); // 5*3+2 = 17

// Compondo: primeiro adiciona 2, depois multiplica por 3
const multiplicarDepoisAdicionar = compor(multiplicarPor3, adicionar2);
console.log('multiplicarDepoisAdicionar(5):', multiplicarDepoisAdicionar(5)); // (5+2)*3 = 21

console.log('\nOrdem importa! A composição é a base da programação funcional.');

// ============================================
// EXEMPLO 8: CALLBACKS ASSÍNCRONOS
// ============================================

console.log('\n=== EXEMPLO 8: CALLBACKS ASSÍNCRONOS ===\n');

// Simulando uma operação assíncrona com setTimeout
function processarDados(dados, callbackSucesso, callbackErro) {
    console.log(`⏳ Processando dados: ${dados}...`);
    
    setTimeout(() => {
        // Simula processamento
        const sucesso = Math.random() > 0.3; // 70% chance de sucesso
        
        if (sucesso) {
            const resultado = dados.toUpperCase();
            console.log(`✅ Processamento concluído!`);
            callbackSucesso(resultado); // Chama callback de sucesso
        } else {
            console.log(`❌ Erro no processamento!`);
            callbackErro('Falha ao processar dados'); // Chama callback de erro
        }
    }, 1000); // Simula delay de 1 segundo
}

console.log('Iniciando processamento assíncrono...');
console.log('(O código continua executando enquanto o processamento roda)');

// Usando a função com callbacks
processarDados(
    'dados importantes',
    function(resultado) {
        // Callback de sucesso
        console.log(`🎉 Sucesso! Resultado: ${resultado}`);
    },
    function(erro) {
        // Callback de erro
        console.log(`💥 Erro: ${erro}`);
    }
);

console.log('Esse log aparece ANTES do resultado assíncrono!');
console.log('Isso mostra que callbacks permitem código não-bloqueante.');

// ============================================
// EXEMPLO 9: FORR EACH - Callback por elemento
// ============================================

console.log('\n=== EXEMPLO 9: FOR-EACH COM CALLBACK ===\n');

// .forEach() executa um callback para CADA elemento do array

const frutas = ['Maçã', 'Banana', 'Laranja', 'Uva'];
console.log('Frutas:', frutas);

// Usando forEach com callback
frutas.forEach(function(fruta, index) {
    console.log(`Fruta ${index + 1}: ${fruta}`);
});

// Com arrow function
frutas.forEach((fruta, index) => {
    console.log(`- ${fruta} (posição ${index})`);
});

// Exemplo prático: construir uma lista HTML
console.log('\nLista HTML gerada:');
let html = '<ul>\n';
frutas.forEach(fruta => {
    html += `  <li>${fruta}</li>\n`;
});
html += '</ul>';
console.log(html);

// ============================================
// EXEMPLO 10: HIGH-ORDER FUNCTION CUSTOMIZADA
// ============================================

console.log('\n=== EXEMPLO 10: HIGH-ORDER FUNCTION CUSTOMIZADA ===\n');

// Criando uma HIGH-ORDER FUNCTION para validação
function validarDados(dados, validadores) {
    // 'validadores' é um array de funções callback
    const erros = [];
    
    validadores.forEach(validador => {
        const resultado = validador(dados);
        if (resultado !== true) {
            erros.push(resultado);
        }
    });
    
    return {
        valido: erros.length === 0,
        erros: erros
    };
}

// Definindo validadores (callbacks)
const validadores = [
    function(dados) {
        return dados.nome && dados.nome.length >= 3 ? true : 'Nome deve ter pelo menos 3 caracteres';
    },
    function(dados) {
        return dados.idade && dados.idade >= 18 ? true : 'Idade deve ser maior ou igual a 18';
    },
    function(dados) {
        return dados.email && dados.email.includes('@') ? true : 'Email deve conter @';
    }
];

// Dados válidos
const dadosValidos = {
    nome: 'João',
    idade: 25,
    email: 'joao@email.com'
};

console.log('Validando dados válidos:');
const resultadoValido = validarDados(dadosValidos, validadores);
console.log('Resultado:', resultadoValido);

// Dados inválidos
const dadosInvalidos = {
    nome: 'Jo',
    idade: 16,
    email: 'joaoemail.com'
};

console.log('\nValidando dados inválidos:');
const resultadoInvalido = validarDados(dadosInvalidos, validadores);
console.log('Resultado:', resultadoInvalido);
console.log('Erros encontrados:');
resultadoInvalido.erros.forEach(erro => console.log(`- ${erro}`));

// ============================================
// EXEMPLO 11: CALLBACK HELL (E COMO EVITAR)
// ============================================

console.log('\n=== EXEMPLO 11: CALLBACK HELL ===\n');

// Callback Hell = quando temos callbacks aninhados
// Isso era comum antes das Promises/Async-Await

console.log('Exemplo de CALLBACK HELL (aninhamento excessivo):');

// Simulando operações assíncronas encadeadas
function operacao1(callback) {
    setTimeout(() => {
        console.log('  🔹 Operação 1 concluída');
        callback('dado1');
    }, 500);
}

function operacao2(dado, callback) {
    setTimeout(() => {
        console.log(`  🔹 Operação 2 concluída com ${dado}`);
        callback('dado2');
    }, 500);
}

function operacao3(dado, callback) {
    setTimeout(() => {
        console.log(`  🔹 Operação 3 concluída com ${dado}`);
        callback('dado3');
    }, 500);
}

// CALLBACK HELL - código difícil de ler e manter
console.log('❌ CALLBACK HELL:');
/*
operacao1(function(result1) {
    operacao2(result1, function(result2) {
        operacao3(result2, function(result3) {
            operacao4(result3, function(result4) {
                // ... e assim vai
                console.log('✅ Todas operações concluídas!');
            });
        });
    });
});
*/

// Solução moderna: Promises + Async/Await
console.log('\n✅ Solução moderna (Promises):');
function operacao1Promise() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('  🔹 Operação 1 concluída (Promise)');
            resolve('dado1');
        }, 500);
    });
}

function operacao2Promise(dado) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`  🔹 Operação 2 concluída com ${dado} (Promise)`);
            resolve('dado2');
        }, 500);
    });
}

function operacao3Promise(dado) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`  🔹 Operação 3 concluída com ${dado} (Promise)`);
            resolve('dado3');
        }, 500);
    });
}

// Encadeamento com Promises (mais legível)
operacao1Promise()
    .then(result1 => operacao2Promise(result1))
    .then(result2 => operacao3Promise(result2))
    .then(result3 => {
        console.log('✅ Todas operações concluídas com Promises!');
    });

// Ou melhor ainda: Async/Await (mais legível)
async function executarOperacoes() {
    console.log('\n✅ Solução com Async/Await:');
    const result1 = await operacao1Promise();
    const result2 = await operacao2Promise(result1);
    const result3 = await operacao3Promise(result2);
    console.log('✅ Todas operações concluídas com Async/Await!');
}

// Descomente a linha abaixo para executar
// executarOperacoes();

// ============================================
// RESUMO VISUAL
// ============================================

console.log('\n=== RESUMO: HIGH-ORDER FUNCTIONS E CALLBACKS ===\n');

console.log('📚 CONCEITOS CHAVE:');
console.log('1. HIGH-ORDER FUNCTION: recebe função como parâmetro OU retorna função');
console.log('2. CALLBACK: função passada como argumento para ser executada depois');
console.log('3. Map: transforma cada elemento → array do mesmo tamanho');
console.log('4. Filter: seleciona elementos → array menor ou igual');
console.log('5. Reduce: agrega elementos → um único valor');
console.log('6. ForEach: executa ação para cada elemento (sem retornar array)');

console.log('\n🔑 DIFERENÇA CHAVE DO JAVA:');
console.log('Java: funções não são cidadãs → precisa de interfaces funcionais');
console.log('JS: funções são cidadãs de primeira classe → uso direto e natural');

console.log('\n✅ QUANDO USAR:');
console.log('- Transformações de dados: map, filter, reduce');
console.log('- Operações assíncronas: callbacks, promises');
console.log('- Validações personalizadas');
console.log('- Composição de comportamentos');
console.log('- Event listeners e handlers');

console.log('\n⚠️ CUIDADOS:');
console.log('- Evite CALLBACK HELL (aninhamento excessivo)');
console.log('- Use Promises ou Async/Await para assincronismo');
console.log('- Callbacks em loops com var podem dar problema (use let)');
console.log('- Cuidado com perda de contexto (this) em callbacks');

// ============================================
// EXERCÍCIOS PRÁTICOS
// ============================================

console.log('\n=== EXERCÍCIOS PRÁTICOS ===\n');

console.log('DESAFIO 1: Pipeline de dados');
console.log('Crie um pipeline que:');
console.log('  1. Recebe um array de números');
console.log('  2. Filtra os pares');
console.log('  3. Eleva ao quadrado');
console.log('  4. Soma tudo');
console.log('  -> Resultado esperado para [1,2,3,4,5]: (2² + 4²) = 20');

const numerosDesafio = [1, 2, 3, 4, 5];
const resultadoDesafio1 = numerosDesafio
    .filter(n => n % 2 === 0)      // [2,4]
    .map(n => n * n)               // [4,16]
    .reduce((acc, n) => acc + n, 0); // 20
console.log(`Resultado: ${resultadoDesafio1}`);

console.log('\nDESAFIO 2: Agrupar por primeira letra');
console.log('Agrupe palavras por primeira letra:');
const palavras = ['casa', 'carro', 'bola', 'cachorro', 'bicicleta', 'aviao'];
const agrupado = palavras.reduce((acc, palavra) => {
    const letra = palavra[0];
    if (!acc[letra]) acc[letra] = [];
    acc[letra].push(palavra);
    return acc;
}, {});
console.log('Resultado:', agrupado);
// Saída: { c: ['casa','carro','cachorro'], b: ['bola','bicicleta'], a: ['aviao'] }

// ============================================
// FIM DO PROGRAMA
// ============================================

console.log('\n========================================');
console.log('      FIM DO ESTUDO SOBRE HIGH-ORDER');
console.log('========================================');

// Aguarda um pouco antes de finalizar para ver os logs assíncronos
setTimeout(() => {
    console.log('\n[Programa finalizado]');
}, 2000);