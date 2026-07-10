# JavaScript — Fundamentos (repo de estudos)

---

## 1. Conceitos essenciais (nessa ordem faz sentido)

### 1.1 Variáveis: `var`, `let`, `const`
- `var` — evite. Tem escopo de função (não de bloco) e "hoisting" estranho. É legado.
- `let` — variável com escopo de bloco (`{ }`), pode reatribuir.
- `const` — não pode reatribuir a referência (mas se for objeto/array, o **conteúdo**
  pode mudar — const não é imutabilidade, é só "não reatribuível").

Diferente do Java: não existe tipo declarado na variável (`let x` serve pra qualquer
tipo). Isso é o próprio ponto onde o TypeScript depois vai "devolver" a tipagem estática.

### 1.2 Tipos e coerção
- Tipos primitivos: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`.
- `typeof valor` para inspecionar.
- **Coerção implícita** é uma pegadinha clássica: `"5" + 1` vira `"51"`, mas `"5" - 1`
  vira `4`. Vale a pena testar isso no REPL até internalizar.
- Sempre use `===` e `!==` (comparação estrita), evite `==`/`!=` (fazem coerção
  automática e geram bugs sutis).

### 1.3 Funções
```js
function soma(a, b) { return a + b; }        // declaração de função
const soma = (a, b) => a + b;                 // arrow function
```
- Arrow functions são a forma mais comum hoje em dia (usadas o tempo todo em Angular/RxJS).
- Diferença importante de arrow function: **não têm seu próprio `this`** — elas
  herdam o `this` do escopo onde foram definidas. Isso resolve um problema clássico
  de callbacks perdendo o contexto.

### 1.3.1 Função como valor (first-class functions) — diferença real com Java

Esse ponto merece destaque à parte porque é a raiz de tudo que vem depois (callbacks,
`.then()`, `.map()`/`.filter()` recebendo função como argumento, etc).

Em Java você sempre consegue guardar numa variável o **resultado** de um método:

```java
public double valor() { return 10; }
double num = valor(); // executa o método AGORA, guarda o RESULTADO (10)
```

Mas Java **não tem um tipo primitivo "função"**. Para guardar a **função em si** (sem
executar, para chamar depois), ele precisa de uma interface funcional como ponte —
`Function<T,R>`, `Supplier<T>`, `Runnable`, etc:

```java
Function<Integer, Integer> dobro = x -> x * 2; // guarda a FUNÇÃO, não executa ainda
int resultado = dobro.apply(5);                // só agora ela roda
```

Por baixo dos panos, `dobro` continua sendo um **objeto** que implementa essa interface
(a lambda é açúcar sintático para uma classe anônima). Ou seja: mesmo a programação
funcional em Java opera dentro do modelo de classes/objetos — porque Java nasceu 100%
orientado a objetos e função sempre precisou pertencer a uma classe.

Em JavaScript, função é um **tipo de dado nativo**, no mesmo nível de `number` ou
`string`. Não existe "ponte"/interface nenhuma — o `()` é que decide se você está
executando ou só referenciando:

```js
function valor() { return 10; }

const resultado = valor();   // executa AGORA, guarda o RESULTADO (10)
const referencia = valor;    // guarda a PRÓPRIA FUNÇÃO (sem executar)

referencia(); // só agora executa -> 10
```

Resumo:

| | Java | JavaScript |
|---|---|---|
| Guardar o **retorno** de uma função | Direto | Direto |
| Guardar a **função em si** (sem executar) | Só via interface funcional (objeto "empacotando" a função) | Direto — função já é um tipo nativo, sem empacotamento |

### 1.3.2 Closures

Uma closure é uma função que **lembra** do ambiente (escopo) onde foi criada, mesmo
depois que esse ambiente já deveria ter deixado de existir.

```js
function contador() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const c1 = contador();
c1(); // 1
c1(); // 2
c1(); // 3
```

`contador()` já terminou de rodar, mas a função interna retornada continua com acesso
vivo à variável `count`. Isso é possível porque a função interna não guarda uma
**cópia** de `count` — ela guarda uma **referência viva** ao ambiente onde `count` mora.

Comparando com Java: o parente mais próximo é uma classe anônima/lambda capturando uma
variável do escopo externo — mas o Java exige que essa variável seja `final` ou
*effectively final* (não pode mudar depois de capturada), porque ele captura o
**valor** naquele instante, não uma referência viva. Em JS não existe essa restrição:
a closure acessa a variável real, por isso `count` consegue incrementar a cada chamada.
É uma diferença de fundo, não só de sintaxe — closures são a base de padrões como
factory functions, funções de configuração (`const multiplicador = criar(x) => ...`) e
boa parte do gerenciamento de estado que ocorre em Angular/RxJS.

### 1.4 `this` e contexto de execução
Esse é o conceito que mais foge da sintaxe do Java (onde `this` é sempre
a instância). Em JS, `this` depende de **como a função foi chamada**, não de onde foi
definida. Vale um exercício dedicado só para isso — é a maior fonte de bugs para quem
vem de linguagens orientadas a objeto "tradicionais".

### 1.5 Objetos e Arrays (e os métodos funcionais)
```js
const nums = [1, 2, 1, 4];
nums.map(n => n * 2);          // transforma
nums.filter(n => n % 2 === 0); // filtra
nums.reduce((acc, n) => acc + n, 0); // agrega
```
Isso é o equivalente direto do Stream API do Java (`.map`, `.filter`, `.reduce`).
Desestruturação (bem usada em Angular):
```js
const { nome, idade } = pessoa;
const [primeiro, segundo] = lista;
```

### 1.6 Call Stack, Web APIs, Callback Queue e Event Loop

Antes de ver `async/await` na prática, vale entender o mecanismo que faz o
assincronismo funcionar numa linguagem **single-threaded** (sem Thread/Executor como
no Java).

- **Call Stack**: pilha (LIFO) onde o motor do JS empilha cada função em execução. Só
  existe uma call stack — por isso "single-threaded": só dá pra executar uma coisa por
  vez.
- **Web APIs** (no navegador) / **APIs do runtime via libuv** (no Node): quando você
  chama `setTimeout`, `fetch` ou `fs.readFile`, o motor JS não executa isso ele mesmo —
  delega para o ambiente, que roda essa tarefa por fora da call stack, em paralelo, e
  libera a stack imediatamente.
- **Callback Queue** (fila de tarefas / *macrotask queue*): quando a Web API termina
  (o timer disparou, a resposta HTTP chegou), o callback correspondente não entra
  direto na call stack — ele vai para essa fila, esperando a vez.
- **Event Loop**: fica checando repetidamente uma pergunta simples — "a call stack
  está vazia?". Se estiver, pega o próximo item da fila e empurra pra call stack
  executar. Isso é o que dá a sensação de assincronismo numa linguagem de thread única.

Exemplo clássico:

```js
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');

// saída: 1, 3, 2
```

Mesmo com `0`ms de delay, `'2'` sai por último — `setTimeout` sempre passa pela Web API
e pela callback queue, e só entra na call stack quando ela estiver vazia (depois que
`console.log('3')` já rodou).

Detalhe extra: Promises não usam a callback queue "normal" — elas têm uma fila própria,
a **microtask queue**, com prioridade maior. O event loop sempre esvazia toda a
microtask queue antes de pegar a próxima macrotask. É por isso que
`Promise.resolve().then(...)` executa antes de um `setTimeout(fn, 0)`, mesmo os dois
estando "prontos" ao mesmo tempo.

### 1.7 Assincronismo — Promises e async/await
Evolução histórica (bom entender as 3 formas, porque código legado ainda usa as antigas):
```js
// 1. Callback (forma antiga)
fs.readFile('arquivo.txt', (err, data) => { ... });

// 2. Promise
fetch(url).then(res => res.json()).then(data => console.log(data));

// 3. async/await (forma atual, mais legível)
async function buscar() {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
```
`async/await` é só açúcar sintático sobre Promises — não é uma engine diferente.
Por baixo dos panos continua sendo call stack + Web API + microtask queue + event loop
funcionando do jeito que vimos acima. Vale entender bem porque é a base de todo
HttpClient do Angular.

### 1.8 Módulos
```js
// export
export function soma(a, b) { return a + b; }
export default MinhaClasse;

// import
import { soma } from './matematica.js';
import MinhaClasse from './minha-classe.js';
```
Isso é ESM (ECMAScript Modules), o padrão atual — o que você vai usar no Angular.
Existe também CommonJS (`require`/`module.exports`), mais comum em projetos Node mais
antigos/backend puro. Bom saber que os dois existem, mas para Angular foque em ESM.

### 1.9 Classes e prototype
```js
class Pessoa {
  constructor(nome) { this.nome = nome; }
  falar() { return `Oi, eu sou ${this.nome}`; }
}
```
Sintaticamente parece Java, mas por baixo é **prototype-based**, não é o mesmo modelo
de classes "de verdade" do Java. Não precisa aprofundar muito nisso agora — mas saiba
que `class` em JS é açúcar sintático sobre prototypes.

---