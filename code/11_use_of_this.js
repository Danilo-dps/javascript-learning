/**
 * Com functions regulares nós temos 4 opções de comportamentos do "this".
 * 1 - Caso esteja em um método de um objeto, ela vai apontar para esse objeto.
 * 2 - Caso esteja em uma instância de um objeto, ela vai apontar para essa instância.
 * 3 - Caso esteja em uma função regular que não está diretamente ligada a um objeto, ela vai apontar pro objeto "window" ou "global" (NodeJs).
 *     1 - Caso esteja sendo utilizado o "use strict" o "this" fica undefined. É necessário utilizar o "window".
 * 4 - Caso esteja em uma função chamada via "call()", "apply()", ou "bind()", ela vai apontar pro objeto do primeiro parâmetro dessas funções
 */

/**
 * ============================================
 * THIS EM JAVASCRIPT — TODOS OS USOS POSSÍVEIS
 * ============================================
 *
 * Diferente do Java, onde 'this' é sempre resolvido em tempo de
 * COMPILAÇÃO (sempre = a instância atual da classe onde o código está
 * escrito), em JS 'this' é resolvido em tempo de EXECUÇÃO, a cada
 * chamada, seguindo uma de 5 regras possíveis — dependendo de COMO a
 * função foi chamada, não de onde ela foi definida.
 *
 * As 4 primeiras regras valem para function REGULAR. A 5ª (arrow
 * function) quebra essas regras de propósito.
 * ============================================
 */

// ============================================
// REGRA 1: IMPLICIT BINDING — chamada como método de um objeto
// ============================================

console.log('=== REGRA 1: IMPLICIT BINDING ===\n');

const pessoa = {
  nome: 'Danilo',
  falar: function () {
    // 'this' é decidido pelo objeto QUE ESTÁ ANTES DO PONTO na chamada
    console.log(`  this.nome = ${this.nome}`);
    return this;
  },
};

console.log('pessoa.falar() -> this aponta para "pessoa":');
const retorno1 = pessoa.falar();
console.log('  this === pessoa?', retorno1 === pessoa);

// ============================================
// REGRA 2: NEW BINDING — chamada como construtor
// ============================================

console.log('\n=== REGRA 2: NEW BINDING (construtor) ===\n');

function Pessoa(nome, idade) {
  // Aqui 'this' é a INSTÂNCIA NOVA que o 'new' acabou de criar
  this.nome = nome;
  this.idade = idade;
}

// Método compartilhado via prototype (uma cópia só, para todas as
// instâncias — ver conversa anterior sobre economia de memória)
Pessoa.prototype.falar = function () {
  console.log(`  this.nome = ${this.nome}, this.idade = ${this.idade}`);
};

const danilo = new Pessoa('Danilo', 29);
console.log('new Pessoa("Danilo", 29) -> this aponta para a nova instância:');
danilo.falar();
console.log('  this === danilo?', danilo instanceof Pessoa);

// ============================================
// REGRA 3: DEFAULT BINDING — chamada solta, sem objeto na frente
// ============================================

console.log('\n=== REGRA 3: DEFAULT BINDING (chamada solta) ===\n');

function mostrarThisSolto() {
  // Fora de modo estrito: this = objeto global (globalThis/window)
  // Em modo estrito (ou dentro de módulo ES): this = undefined
  console.log('  this é undefined?', this === undefined);
  console.log('  typeof this:', typeof this);
}

console.log('Chamando função solta, sem nenhum objeto antes do ponto:');
mostrarThisSolto();

console.log('\nRegra 3.1 — "arrancar" um método também vira chamada solta:');
const falarSolto = pessoa.falar; // perde a ligação com 'pessoa'
try {
  falarSolto(); // 'this' não é mais 'pessoa'
} catch (erro) {
  console.log('  Erro ao tentar acessar this.nome:', erro.message);
}

// ============================================
// REGRA 4: EXPLICIT BINDING — call, apply, bind
// ============================================

console.log('\n=== REGRA 4: EXPLICIT BINDING (call/apply/bind) ===\n');

function apresentar(saudacao, pontuacao) {
  console.log(`  ${saudacao}, sou ${this.nome}${pontuacao}`);
}

const outraPessoa = { nome: 'Maria' };

// call: argumentos passados um por um
console.log('call (argumentos separados):');
apresentar.call(outraPessoa, 'Olá', '!');

// apply: argumentos passados como array
console.log('\napply (argumentos em array):');
apresentar.apply(outraPessoa, ['Oi', '.']);

// bind: NÃO executa na hora — devolve uma NOVA função com this fixado
console.log('\nbind (cria função nova, this travado para sempre):');
const apresentarComoMaria = apresentar.bind(outraPessoa);
apresentarComoMaria('E aí', '?'); // this já vem fixo, só passa os outros argumentos

// ============================================
// REGRA 5: ARROW FUNCTION — não tem this próprio (lexical this)
// ============================================

console.log('\n=== REGRA 5: ARROW FUNCTION (lexical this) ===\n');

const equipe = {
  nome: 'Backend',

  // function REGULAR: segue a Regra 1 -> this = equipe
  listarComFunctionRegular: function () {
    console.log('  [function regular] this.nome =', this.nome);
  },

  // arrow function como MÉTODO DIRETO: NÃO tem this próprio, herda do
  // escopo onde foi criada — nesse caso, o escopo do módulo (global),
  // não o objeto 'equipe'. Armadilha clássica.
  listarComArrowDireta: () => {
    console.log('  [arrow direta] this.nome =', this?.nome, '(não é "equipe"!)');
  },

  // Uso CORRETO de arrow: dentro de um callback, para herdar o this
  // do método externo (function regular), resolvendo o problema da
  // Regra 3 em callbacks assíncronos/de array
  tarefas: ['revisar código', 'subir deploy'],
  listarTarefas: function () {
    console.log(`  Tarefas do time ${this.nome}:`);
    this.tarefas.forEach((tarefa) => {
      // arrow function aqui herda o 'this' de listarTarefas (regra 1)
      // se fosse function regular, 'this' seria undefined aqui dentro
      console.log(`    - ${this.nome}: ${tarefa}`);
    });
  },
};

equipe.listarComFunctionRegular();
equipe.listarComArrowDireta();
equipe.listarTarefas();

// ============================================
// COMPARANDO COM JAVA
// ============================================

console.log('\n=== COMPARANDO COM JAVA ===\n');

console.log('Java: this SEMPRE = instância atual da classe onde o código está.');
console.log('Decidido em tempo de COMPILAÇÃO, pela posição do código. Nunca muda');
console.log('dependendo de como o método foi chamado.');
console.log('');
console.log('JS: this decidido em tempo de EXECUÇÃO, a cada chamada, seguindo a');
console.log('regra que se aplicar primeiro (implicit > new > explicit > default),');
console.log('exceto arrow function, que ignora tudo isso e herda o this léxico.');

// ============================================
// RESUMO
// ============================================

console.log('\n=== RESUMO ===\n');
console.log('1. Implicit:  obj.metodo()              -> this = obj');
console.log('2. New:       new Funcao()               -> this = instância nova');
console.log('3. Default:   funcaoSolta()               -> this = undefined (strict) ou global');
console.log('4. Explicit:  fn.call(obj) / .apply(obj) / .bind(obj) -> this = obj, forçado');
console.log('5. Arrow:     () => {}                    -> não tem this próprio, herda do escopo externo');
console.log('');
console.log('Prioridade quando mais de uma regra poderia se aplicar:');
console.log('  new > explicit (call/apply/bind) > implicit (obj.metodo()) > default');