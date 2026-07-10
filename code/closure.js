/**
 * ============================================
 * CLOSURES EM JAVASCRIPT
 * ============================================
 *
 * O que é uma closure?
 * Uma closure é uma função que "lembra" do ambiente (escopo)
 * onde foi criada, mesmo depois que esse ambiente já foi executado.
 *
 * Em outras palavras: a função interna tem acesso às variáveis
 * da função externa, mesmo depois que a função externa já terminou.
 *
 * Por que isso é importante?
 * - Encapsulamento de dados (como "private" em Java)
 * - Factory functions (funções que criam outras funções)
 * - Callbacks e event handlers
 * - Programação funcional
 *
 * Ponto de atenção: closure mantém a variável VIVA na memória enquanto
 * a função interna existir. Isso é ótimo para estado (contador, cache),
 * mas também pode causar retenção de memória desnecessária se a closure
 * guardar referência a objetos grandes que não são mais precisos — algo
 * parecido com segurar uma referência em Java que impede o Garbage
 * Collector de liberar o objeto.
 *
 * Vamos ver na prática!
 * ============================================
 */

// ============================================
// EXEMPLO 1: CLOSURE BÁSICA
// ============================================

console.log('=== EXEMPLO 1: CLOSURE BÁSICA ===\n');

function contador() {
  // Esta variável está no escopo da função contador()
  let count = 0;

  // A função interna tem acesso à variável count
  // Ela "fecha" sobre o escopo da função externa
  function incrementar() {
    count++; // Acessa a variável do escopo pai
    return count;
  }

  return incrementar;
}

// Criamos uma instância do contador
const contador1 = contador();
console.log('contador1():', contador1()); // 1
console.log('contador1():', contador1()); // 2
console.log('contador1():', contador1()); // 3

// Criamos uma segunda instância independente
const contador2 = contador();
console.log('contador2():', contador2()); // 1 (começa do zero!)
console.log('contador2():', contador2()); // 2

console.log('\nO contador1 e contador2 são INDEPENDENTES!');
console.log('Cada um tem seu próprio "count" isolado.');
console.log('A closure mantém o estado de cada contador separadamente.\n');

// ============================================
// EXEMPLO 2: COMPARANDO COM JAVA
// ============================================

console.log('=== EXEMPLO 2: COMPARANDO COM JAVA ===\n');

/*
 * Em Java, para fazer algo parecido, você usaria uma classe:
 *
 * public class Contador {
 *     private int count = 0;
 *     public int incrementar() {
 *         return ++count;
 *     }
 * }
 *
 * Contador c1 = new Contador();
 * c1.incrementar(); // 1
 * c1.incrementar(); // 2
 *
 * A closure em JS faz a mesma coisa sem precisar declarar uma classe —
 * o "objeto" com estado privado é simulado pelo escopo da função.
 */

function criarContador() {
  let count = 0; // "atributo privado" da closure

  // Retornamos um objeto com múltiplas funções que compartilham o
  // mesmo escopo (e portanto o mesmo 'count')
  return {
    incrementar: function () {
      count++;
      return count;
    },
    decrementar: function () {
      count--;
      return count;
    },
    getValor: function () {
      return count;
    },
    reset: function () {
      count = 0;
      return count;
    },
  };
}

const meuContador = criarContador();
console.log('Contador com múltiplas funções:');
console.log('incrementar:', meuContador.incrementar()); // 1
console.log('incrementar:', meuContador.incrementar()); // 2
console.log('incrementar:', meuContador.incrementar()); // 3
console.log('getValor:', meuContador.getValor()); // 3
console.log('decrementar:', meuContador.decrementar()); // 2
console.log('reset:', meuContador.reset()); // 0
console.log('incrementar:', meuContador.incrementar()); // 1

// ============================================
// EXEMPLO 3: FACTORY FUNCTIONS
// ============================================

console.log('\n=== EXEMPLO 3: FACTORY FUNCTIONS ===\n');

// Uma factory é uma função que cria e retorna outras funções
function criarMultiplicador(fator) {
  // A função retornada "lembra" do fator
  return function (numero) {
    return numero * fator;
  };
}

const dobrar = criarMultiplicador(2);
const triplicar = criarMultiplicador(3);
const quadruplicar = criarMultiplicador(4);

console.log('Factory de multiplicadores:');
console.log('dobrar(5):', dobrar(5)); // 10
console.log('triplicar(5):', triplicar(5)); // 15
console.log('quadruplicar(5):', quadruplicar(5)); // 20
console.log('dobrar(10):', dobrar(10)); // 20

console.log('\nCada função "lembra" seu fator específico:');
console.log('dobrar usa fator 2, triplicar usa fator 3, etc.');

// ============================================
// EXEMPLO 4: CLOSURE COM PARÂMETROS DINÂMICOS
// ============================================

console.log('\n=== EXEMPLO 4: CLOSURE COM PARÂMETROS ===\n');

function criarSaudacao(saudacao) {
  return function (nome) {
    // A closure captura 'saudacao' do escopo pai
    return `${saudacao}, ${nome}!`;
  };
}

const saudarOla = criarSaudacao('Olá');
const saudarOi = criarSaudacao('Oi');
const saudarBomDia = criarSaudacao('Bom dia');

console.log('Saudações personalizadas:');
console.log(saudarOla('João')); // Olá, João!
console.log(saudarOi('Maria')); // Oi, Maria!
console.log(saudarBomDia('Carlos')); // Bom dia, Carlos!
console.log(saudarOla('Ana')); // Olá, Ana!

// ============================================
// EXEMPLO 5: CLOSURE PARA PRIVACIDADE (ENCAPSULAMENTO)
// ============================================

console.log('\n=== EXEMPLO 5: ENCAPSULAMENTO ===\n');

/*
 * Em Java, usamos 'private' para esconder dados.
 * Em JS, closures permitem um padrão equivalente: a variável nunca
 * é exposta no objeto retornado, só é acessível pelas funções que
 * foram criadas no mesmo escopo.
 */

function criarPessoa(nome, idade) {
  // Variáveis "privadas" — só acessíveis pela closure
  let _nome = nome;
  let _idade = idade;

  // Retornamos um objeto com métodos públicos
  return {
    getNome: function () {
      return _nome;
    },
    getIdade: function () {
      return _idade;
    },
    setIdade: function (novaIdade) {
      if (novaIdade < 0 || novaIdade > 150) {
        console.log('Idade inválida!');
        return false;
      }
      _idade = novaIdade;
      return true;
    },
    apresentar: function () {
      return `Olá, eu sou ${_nome} e tenho ${_idade} anos.`;
    },
    aniversario: function () {
      _idade++;
      console.log(`🎉 Parabéns! ${_nome} agora tem ${_idade} anos!`);
      return _idade;
    },
  };
}

const pessoa1 = criarPessoa('João', 30);
console.log('Pessoa 1:');
console.log('getNome():', pessoa1.getNome()); // João
console.log('getIdade():', pessoa1.getIdade()); // 30
console.log('apresentar():', pessoa1.apresentar());

console.log('\nTentando acessar diretamente (não funciona):');
console.log('pessoa1._nome:', pessoa1._nome); // undefined — não existe no objeto retornado
console.log('pessoa1._idade:', pessoa1._idade); // undefined

console.log('\nModificando com setter:');
pessoa1.setIdade(31);
console.log('Nova idade:', pessoa1.getIdade()); // 31

console.log('\nTentando idade inválida:');
pessoa1.setIdade(200); // Idade inválida!
console.log('Idade ainda é:', pessoa1.getIdade()); // 31 (não mudou)

console.log('\nFazendo aniversário:');
pessoa1.aniversario(); // 🎉 Parabéns! João agora tem 32 anos!

console.log('\nCriando outra pessoa independente:');
const pessoa2 = criarPessoa('Maria', 25);
console.log(pessoa2.apresentar()); // Olá, eu sou Maria e tenho 25 anos.
console.log('pessoa2 não afeta pessoa1:');
console.log('pessoa1 ainda é:', pessoa1.getNome(), pessoa1.getIdade()); // João 32

// ============================================
// EXEMPLO 6: CLOSURE EM LAÇOS (CUIDADO!)
// ============================================

console.log('\n=== EXEMPLO 6: CLOSURE EM LAÇOS ===\n');

console.log('PROBLEMA: closures capturam a REFERÊNCIA da variável, não o valor');

function criarFuncoesProblema() {
  const funcoes = [];

  // 'var' tem escopo de FUNÇÃO, não de bloco — então existe apenas UM
  // 'i' compartilhado por todas as iterações do loop.
  for (var i = 0; i < 3; i++) {
    funcoes.push(function () {
      return i; // todas as funções capturam o MESMO 'i'
    });
  }

  return funcoes;
}

const funcoesProblema = criarFuncoesProblema();
console.log('Com var:');
console.log('funcoesProblema[0]():', funcoesProblema[0]()); // 3 (não 0!)
console.log('funcoesProblema[1]():', funcoesProblema[1]()); // 3 (não 1!)
console.log('funcoesProblema[2]():', funcoesProblema[2]()); // 3 (não 2!)
console.log('Todas retornam 3 porque o loop já terminou com i = 3.');

// Solução 1: IIFE (Immediately Invoked Function Expression)
console.log('\nSOLUÇÃO 1: IIFE (cria um novo escopo por iteração)');

function criarFuncoesSolucao1() {
  const funcoes = [];

  for (var i = 0; i < 3; i++) {
    // A IIFE executa NA HORA, recebendo o valor atual de i como
    // argumento — isso cria uma cópia local ('valor') por iteração.
    (function (valor) {
      funcoes.push(function () {
        return valor;
      });
    })(i);
  }

  return funcoes;
}

const funcoesSolucao1 = criarFuncoesSolucao1();
console.log('Com IIFE:');
console.log('funcoesSolucao1[0]():', funcoesSolucao1[0]()); // 0
console.log('funcoesSolucao1[1]():', funcoesSolucao1[1]()); // 1
console.log('funcoesSolucao1[2]():', funcoesSolucao1[2]()); // 2

// Solução 2: usar let (escopo de bloco)
console.log('\nSOLUÇÃO 2: usar let (escopo de bloco)');

function criarFuncoesSolucao2() {
  const funcoes = [];

  // 'let' cria uma NOVA BINDING de 'i' a cada iteração do loop — é
  // esse comportamento (não só "escopo de bloco" em geral) que resolve
  // o problema. É a solução padrão hoje em dia.
  for (let i = 0; i < 3; i++) {
    funcoes.push(function () {
      return i;
    });
  }

  return funcoes;
}

const funcoesSolucao2 = criarFuncoesSolucao2();
console.log('Com let:');
console.log('funcoesSolucao2[0]():', funcoesSolucao2[0]()); // 0
console.log('funcoesSolucao2[1]():', funcoesSolucao2[1]()); // 1
console.log('funcoesSolucao2[2]():', funcoesSolucao2[2]()); // 2

// Solução 3: usar .bind() para fixar o valor no momento da criação
console.log('\nSOLUÇÃO 3: usar .bind()');

function criarFuncoesSolucao3() {
  const funcoes = [];

  for (var i = 0; i < 3; i++) {
    // .bind(null, i) cria uma NOVA função com o primeiro argumento já
    // fixado no valor ATUAL de i (copiado agora, não uma referência
    // futura) — o primeiro argumento de bind é o 'this' (irrelevante
    // aqui, por isso null).
    funcoes.push(
      function (valor) {
        return valor;
      }.bind(null, i)
    );
  }

  return funcoes;
}

const funcoesSolucao3 = criarFuncoesSolucao3();
console.log('Com bind:');
console.log('funcoesSolucao3[0]():', funcoesSolucao3[0]()); // 0
console.log('funcoesSolucao3[1]():', funcoesSolucao3[1]()); // 1
console.log('funcoesSolucao3[2]():', funcoesSolucao3[2]()); // 2

// ============================================
// EXEMPLO 7: CLOSURE EM EVENTOS (USO REAL)
// ============================================

console.log('\n=== EXEMPLO 7: SIMULAÇÃO DE EVENTOS ===\n');

// Simulando botões com closures
function criarBotoes() {
  const botoes = [];

  for (let i = 1; i <= 3; i++) {
    // Cada botão "lembra" seu próprio número, graças ao 'let'
    const botao = {
      id: i,
      onClick: function () {
        console.log(`Botão ${i} foi clicado!`);
        console.log(`  -> Você clicou no botão #${i}`);
        console.log(`  -> Este botão lembra que é o número ${i}`);
      },
      onMouseOver: function () {
        console.log(`Mouse passou sobre o botão ${i}`);
      },
    };
    botoes.push(botao);
  }

  return botoes;
}

const botoes = criarBotoes();
console.log('Simulando eventos com closures:');
botoes[0].onClick(); // Botão 1 foi clicado!
botoes[1].onClick(); // Botão 2 foi clicado!
botoes[2].onClick(); // Botão 3 foi clicado!
botoes[0].onMouseOver(); // Mouse passou sobre o botão 1

// ============================================
// EXEMPLO 8: CLOSURE PARA CACHE/MEMOIZAÇÃO
// ============================================

console.log('\n=== EXEMPLO 8: CACHE COM CLOSURE ===\n');

function criarCache() {
  // Cache privado
  const cache = {};
  let totalAcessos = 0;
  let totalCacheHits = 0;

  return {
    get: function (chave) {
      totalAcessos++;
      if (cache[chave] !== undefined) {
        totalCacheHits++;
        console.log(`✅ Cache HIT! Chave "${chave}" encontrada.`);
        return cache[chave];
      }
      console.log(`❌ Cache MISS! Chave "${chave}" não encontrada.`);
      return null;
    },
    set: function (chave, valor) {
      cache[chave] = valor;
      console.log(`💾 Cache SET: "${chave}" = ${valor}`);
      return valor;
    },
    getStats: function () {
      const taxaAcerto = totalAcessos > 0 ? ((totalCacheHits / totalAcessos) * 100).toFixed(2) : 0;
      return {
        totalAcessos,
        totalCacheHits,
        taxaAcerto: `${taxaAcerto}%`,
        tamanho: Object.keys(cache).length,
      };
    },
    clear: function () {
      for (let chave in cache) {
        delete cache[chave];
      }
      console.log('🧹 Cache limpo!');
    },
  };
}

const meuCache = criarCache();

console.log('Usando cache:');
meuCache.get('usuario_1'); // Cache MISS
meuCache.set('usuario_1', 'João Silva');
meuCache.get('usuario_1'); // Cache HIT
meuCache.get('usuario_2'); // Cache MISS
meuCache.set('usuario_2', 'Maria Santos');
meuCache.get('usuario_2'); // Cache HIT
meuCache.get('usuario_1'); // Cache HIT

console.log('\nEstatísticas do cache:');
console.table(meuCache.getStats());

// ============================================
// RESUMO
// ============================================

console.log('\n=== RESUMO: O QUE APRENDEMOS ===\n');

console.log('📚 CONCEITOS CHAVE:');
console.log('1. Closure = função que "lembra" do escopo onde foi criada');
console.log('2. Permite encapsulamento (dados "privados")');
console.log('3. Factory functions criam funções personalizadas');
console.log('4. Cada closure tem seu próprio estado isolado');
console.log('5. Útil para: contadores, caches, eventos, callbacks');
console.log('6. Cuidado com loops usando var — prefira let (ou IIFE/bind se precisar de var)');
console.log('7. Closures mantêm variáveis vivas na memória — atenção a vazamentos');

console.log('\n🔑 DIFERENÇA CHAVE DO JAVA:');
console.log('Java: lambda/classe anônima captura valor (effectively final)');
console.log('JS: closure captura referência viva ao ambiente (pode mutar)');
console.log('Isso permite padrões que em Java exigiriam uma classe inteira!');

console.log('\n✅ QUANDO USAR CLOSURES:');
console.log('- Para criar funções com "configurações" fixas (factories)');
console.log('- Para esconder dados privados (encapsulamento)');
console.log('- Em callbacks que precisam de contexto');
console.log('- Em cache/memoização e contadores com estado isolado');

// ============================================
// FIM DO PROGRAMA
// ============================================

console.log('\n========================================');
console.log('      FIM DO ESTUDO SOBRE CLOSURES');
console.log('========================================');