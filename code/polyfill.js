/**
 * ============================================
 * POLYFILL EM JAVASCRIPT
 * ============================================
 *
 * Polyfill = implementação manual de um recurso que já é padrão na
 * linguagem/Web API, mas que pode não existir no ambiente onde o
 * código está rodando (navegador antigo, runtime desatualizado).
 *
 * Padrão sempre igual:
 *   1. Checar se o recurso JÁ EXISTE nativamente (feature detection)
 *   2. Se não existir, implementar manualmente, seguindo o mesmo
 *      comportamento da especificação oficial
 *   3. Nunca sobrescrever a versão nativa — ela é sempre mais rápida
 *      (implementada em C++ dentro do motor, não em JS interpretado)
 *
 * Diferente de TRANSPILER (Babel): transpiler resolve SINTAXE nova
 * (arrow function, const, async/await) convertendo o código-fonte em
 * tempo de build. Polyfill resolve MÉTODOS/APIS ausentes, adicionando
 * implementação que roda em tempo de execução, sem mudar sintaxe.
 * ============================================
 */

// ============================================
// PARTE 1: O PROBLEMA, NA PRÁTICA
// ============================================

console.log('=== PARTE 1: O PROBLEMA QUE O POLYFILL RESOLVE ===\n');

console.log('Array.prototype.includes já existe neste ambiente?', typeof Array.prototype.includes === 'function');
console.log('(Se fosse um ambiente antigo, isso seria "false", e chamar');
console.log('array.includes(x) direto lançaria TypeError.)');

// ============================================
// PARTE 2: FEATURE DETECTION — o primeiro passo sempre
// ============================================

console.log('\n=== PARTE 2: FEATURE DETECTION ===\n');

// O padrão universal: "se NÃO existir, eu crio". Isso garante que em
// ambientes modernos o polyfill nem chega a rodar — a versão nativa
// (mais rápida, escrita em C++) continua sendo usada.
function existeNativamente(objeto, metodo) {
  return typeof objeto[metodo] === 'function';
}

console.log('Array.includes existe nativamente?', existeNativamente(Array.prototype, 'includes'));
console.log('Object.assign existe nativamente?', existeNativamente(Object, 'assign'));

// ============================================
// PARTE 3: POLYFILL DE Array.prototype.includes (ES2016)
// ============================================

console.log('\n=== PARTE 3: POLYFILL DE Array.prototype.includes ===\n');

// Guardamos a versão nativa e REMOVEMOS de propósito, simulando um
// ambiente antigo onde o método realmente não existe — assim o
// polyfill abaixo executa de verdade, e não só confirma que já havia.
const includesNativo = Array.prototype.includes;
delete Array.prototype.includes;
console.log('Simulando ambiente antigo — includes existe agora?', !!Array.prototype.includes);

if (!Array.prototype.includes) {
  console.log('  (não existe — implementando agora)');
  Array.prototype.includes = function (elementoProcurado) {
    // 'this' aqui é o array que chamou o método, ex: [1,2,3].includes(2)
    for (let i = 0; i < this.length; i++) {
      if (this[i] === elementoProcurado) {
        return true;
      }
    }
    return false;
  };
} else {
  console.log('  (já existia nativamente — polyfill não sobrescreveu nada)');
}

console.log('[1, 2, 3].includes(2):', [1, 2, 3].includes(2));
console.log('[1, 2, 3].includes(9):', [1, 2, 3].includes(9));

// Restaurando a versão nativa, para não afetar o restante do arquivo
// nem qualquer outro código que rode depois
Array.prototype.includes = includesNativo;

// ============================================
// PARTE 4: POLYFILL DE Object.assign (ES2015)
// ============================================

console.log('\n=== PARTE 4: POLYFILL DE Object.assign ===\n');

const assignNativo = Object.assign;
delete Object.assign;
console.log('Simulando ambiente antigo — Object.assign existe agora?', !!Object.assign);

if (!Object.assign) {
  console.log('  (não existe — implementando agora)');
  Object.assign = function (alvo, ...fontes) {
    fontes.forEach((fonte) => {
      if (fonte == null) return; // ignora null/undefined, como o original faz
      for (const chave in fonte) {
        if (Object.prototype.hasOwnProperty.call(fonte, chave)) {
          alvo[chave] = fonte[chave];
        }
      }
    });
    return alvo;
  };
} else {
  console.log('  (já existia nativamente — polyfill não sobrescreveu nada)');
}

const base = { nome: 'Danilo' };
const extra = { idade: 29 };
console.log('Object.assign({}, base, extra):', Object.assign({}, base, extra));

Object.assign = assignNativo;

// ============================================
// PARTE 5: POLYFILL DE String.prototype.padStart (ES2017)
// ============================================

console.log('\n=== PARTE 5: POLYFILL DE String.prototype.padStart ===\n');

const padStartNativo = String.prototype.padStart;
delete String.prototype.padStart;
console.log('Simulando ambiente antigo — padStart existe agora?', !!String.prototype.padStart);

if (!String.prototype.padStart) {
  console.log('  (não existe — implementando agora)');
  String.prototype.padStart = function (tamanhoAlvo, stringPreenchimento = ' ') {
    let resultado = String(this);
    while (resultado.length < tamanhoAlvo) {
      resultado = stringPreenchimento + resultado;
    }
    // corta o excesso, caso o preenchimento "passe" do tamanho exato
    return resultado.slice(resultado.length - tamanhoAlvo);
  };
} else {
  console.log('  (já existia nativamente — polyfill não sobrescreveu nada)');
}

console.log('"7".padStart(3, "0"):', '7'.padStart(3, '0')); // "007"
console.log('"42".padStart(5, "0"):', '42'.padStart(5, '0')); // "00042"

String.prototype.padStart = padStartNativo;

// ============================================
// PARTE 6: POLYFILL DE Array.prototype.flat (ES2019)
// ============================================

console.log('\n=== PARTE 6: POLYFILL DE Array.prototype.flat ===\n');

const flatNativo = Array.prototype.flat;
delete Array.prototype.flat;
console.log('Simulando ambiente antigo — flat existe agora?', !!Array.prototype.flat);

if (!Array.prototype.flat) {
  console.log('  (não existe — implementando agora)');
  Array.prototype.flat = function (profundidade = 1) {
    return profundidade > 0
      ? this.reduce(
          (achatado, item) => achatado.concat(Array.isArray(item) ? item.flat(profundidade - 1) : item),
          []
        )
      : this.slice();
  };
} else {
  console.log('  (já existia nativamente — polyfill não sobrescreveu nada)');
}

const aninhado = [1, [2, 3], [4, [5, 6]]];
console.log('aninhado.flat():', aninhado.flat());
console.log('aninhado.flat(2):', aninhado.flat(2));

Array.prototype.flat = flatNativo;

// ============================================
// PARTE 7: ONDE POLYFILLS SÃO CARREGADOS NA PRÁTICA
// ============================================

console.log('\n=== PARTE 7: NA PRÁTICA (fora deste arquivo) ===\n');

console.log('Você raramente escreve polyfill à mão em projeto real. O comum é:');
console.log('  - core-js: biblioteca com polyfills de praticamente todo o ECMAScript');
console.log('  - Babel usa core-js por baixo quando configurado com @babel/preset-env');
console.log('  - Angular CLI já inclui um arquivo polyfills.ts no projeto, onde você');
console.log('    importa o que for necessário para os navegadores-alvo do projeto');
console.log('  - polyfill.io: serviço que detecta o navegador do visitante e serve');
console.log('    só os polyfills que aquele navegador específico precisa');

// ============================================
// RESUMO
// ============================================

console.log('\n=== RESUMO ===\n');
console.log('Polyfill: implementação manual de um recurso PADRÃO da linguagem/API');
console.log('que pode faltar no ambiente de execução (navegador/runtime antigo).');
console.log('');
console.log('Padrão de código: if (!Objeto.metodo) { Objeto.metodo = function... }');
console.log('');
console.log('Polyfill != Transpiler:');
console.log('  Transpiler (Babel) converte SINTAXE nova em tempo de build');
console.log('  Polyfill adiciona MÉTODOS/APIS ausentes em tempo de execução');
console.log('');
console.log('Na prática: usa-se bibliotecas prontas (core-js) em vez de escrever');
console.log('polyfill à mão — os exemplos acima são para entender o mecanismo.');