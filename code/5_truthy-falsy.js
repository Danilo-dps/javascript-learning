/**
 * ============================================
 * TRUTHY / FALSY — CONVERSÃO IMPLÍCITA ToBoolean
 * ============================================
 *
 * Toda vez que um valor NÃO-boolean aparece numa posição que espera
 * boolean (if, while, &&, ||, ternário, negação !), o motor do JS
 * aplica a conversão ToBoolean por baixo dos panos.
 *
 * A lista de valores FALSY é curta — decore ela, porque TUDO O RESTO
 * é truthy:
 *
 *   false, 0, -0, 0n, "", null, undefined, NaN
 *
 * Em Java isso não existe: só boolean entra numa condição, e a
 * conversão precisa ser sempre explícita (valor != null, valor > 0...).
 * ============================================
 */

// ============================================
// PARTE 1: A TABELA DE VALORES FALSY
// ============================================

console.log('=== PARTE 1: TODOS OS VALORES FALSY ===\n');

const valoresFalsy = [false, 0, -0, 0n, '', null, undefined, NaN];

valoresFalsy.forEach((valor) => {
  // Boolean(valor) é a forma EXPLÍCITA de aplicar o mesmo ToBoolean
  // que o if faz implicitamente — útil pra inspecionar sem precisar
  // escrever um if pra cada valor.
  // (usamos String() em vez de JSON.stringify porque JSON.stringify
  // não sabe serializar BigInt, que é um dos valores falsy: 0n)
  console.log(`Boolean(${String(valor)}) =`, Boolean(valor));
});

console.log('\nEsses 8 valores são os ÚNICOS falsy em todo o JavaScript.');

// ============================================
// PARTE 2: TUDO O RESTO É TRUTHY (inclusive casos que enganam)
// ============================================

console.log('\n=== PARTE 2: VALORES "ENGANOSOS" QUE SÃO TRUTHY ===\n');

const valoresTruthyEnganosos = [
  '0', // string com o caractere zero -> NÃO é o número 0
  ' ', // string só com espaço -> não é vazia de verdade
  [], // array vazio
  {}, // objeto vazio
  'false', // a STRING "false", não o boolean false
  -1, // qualquer número diferente de 0 (positivo ou negativo)
  Infinity,
  function () {}, // função também é truthy
];

valoresTruthyEnganosos.forEach((valor) => {
  // JSON.stringify não representa bem 'function' (vira undefined) nem
  // Infinity (vira "null") — por isso tratamos esses dois casos à
  // parte, e usamos JSON.stringify só para os demais valores.
  let representacao;
  if (typeof valor === 'function') {
    representacao = '[Function]';
  } else if (valor === Infinity) {
    representacao = 'Infinity';
  } else {
    representacao = JSON.stringify(valor);
  }
  console.log(`Boolean(${representacao}) =`, Boolean(valor));
});

console.log('\nRepare: "0" (string) e [] (array vazio) são TRUTHY — pegadinha clássica.');

// ============================================
// PARTE 3: NO if
// ============================================

console.log('\n=== PARTE 3: ToBoolean DENTRO DO if ===\n');

function verificarPresenca(valor) {
  // if(valor) aplica ToBoolean(valor) por baixo dos panos —
  // NENHUMA comparação está escrita aqui, mas ela acontece.
  if (valor) {
    console.log(`  if(${JSON.stringify(valor)}) -> ENTROU no if (truthy)`);
  } else {
    console.log(`  if(${JSON.stringify(valor)}) -> ENTROU no else (falsy)`);
  }
}

verificarPresenca(5); // truthy
verificarPresenca(0); // falsy -> cuidado, 0 é um valor "real" mas cai no else
verificarPresenca(''); // falsy
verificarPresenca('texto'); // truthy
verificarPresenca(null); // falsy
verificarPresenca([]); // truthy (array vazio ainda é um objeto -> truthy)

// ============================================
// PARTE 4: NO while
// ============================================

console.log('\n=== PARTE 4: ToBoolean DENTRO DO while ===\n');

// while também aplica ToBoolean na condição a cada volta do laço
let tentativas = 3;
console.log('Contando enquanto "tentativas" for truthy (diferente de 0):');
while (tentativas) {
  console.log(`  tentativas = ${tentativas} (truthy, continua)`);
  tentativas--;
}
console.log(`  tentativas = ${tentativas} (falsy, o while parou aqui)`);

// ============================================
// PARTE 5: NO && e ||
// ============================================

console.log('\n=== PARTE 5: ToBoolean DENTRO DE && e || ===\n');

/*
 * && e || NÃO retornam necessariamente true/false — eles retornam um
 * dos DOIS VALORES ORIGINAIS, não um boolean convertido. Mas para
 * DECIDIR qual dos dois devolver, eles usam ToBoolean por baixo.
 *
 * ||  -> devolve o primeiro valor TRUTHY (ou o último, se nenhum for)
 * &&  -> devolve o primeiro valor FALSY (ou o último, se nenhum for)
 */

console.log('Operador || (retorna o primeiro truthy):');
console.log('  0 || "padrão" =', 0 || 'padrão'); // 0 é falsy -> segue pro segundo
console.log('  "" || "padrão" =', '' || 'padrão'); // "" é falsy -> segue pro segundo
console.log('  "valor" || "padrão" =', 'valor' || 'padrão'); // "valor" é truthy -> para aqui

console.log('\nOperador && (retorna o primeiro falsy, ou o último valor):');
console.log('  5 && "executa" =', 5 && 'executa'); // 5 é truthy -> segue pro segundo
console.log('  0 && "executa" =', 0 && 'executa'); // 0 é falsy -> já para aqui
console.log('  null && "executa" =', null && 'executa'); // null é falsy -> já para aqui

// Uso muito comum em JS: só chama uma função se algo existir, sem if
const usuario = { nome: 'João' };
usuario.nome && console.log('\nExecutou porque usuario.nome é truthy:', usuario.nome);

// ============================================
// PARTE 6: NO operador ternário
// ============================================

console.log('\n=== PARTE 6: ToBoolean NO TERNÁRIO ===\n');

function status(pontos) {
  // pontos ? ... : ... também aplica ToBoolean na condição
  return pontos ? `Tem ${pontos} pontos` : 'Sem pontos (zero ou vazio)';
}

console.log(status(10)); // truthy
console.log(status(0)); // falsy -> cai no "Sem pontos"

// ============================================
// PARTE 7: O CUIDADO COM O ZERO (bug real e comum)
// ============================================

console.log('\n=== PARTE 7: A PEGADINHA DO ZERO SER UM VALOR VÁLIDO ===\n');

function mostrarSaldo(saldo) {
  // BUG: se saldo for 0 (um valor legítimo!), cai no "não informado"
  if (saldo) {
    console.log(`  Saldo: R$ ${saldo}`);
  } else {
    console.log('  Saldo não informado (na verdade pode ser R$ 0, mas o código não distingue)');
  }
}

console.log('Versão com bug (usa truthy/falsy direto):');
mostrarSaldo(150);
mostrarSaldo(0); // trata 0 como "ausente", o que está ERRADO aqui

function mostrarSaldoCorrigido(saldo) {
  // Correção: comparação EXPLÍCITA contra null/undefined, do jeito
  // que o Java já obriga por padrão.
  if (saldo !== null && saldo !== undefined) {
    console.log(`  Saldo: R$ ${saldo}`);
  } else {
    console.log('  Saldo realmente não informado');
  }
}

console.log('\nVersão corrigida (comparação explícita):');
mostrarSaldoCorrigido(150);
mostrarSaldoCorrigido(0); // agora trata corretamente como valor válido
mostrarSaldoCorrigido(undefined); // aqui sim cai no "não informado"

// ============================================
// RESUMO
// ============================================

console.log('\n=== RESUMO ===\n');
console.log('FALSY (decorar): false, 0, -0, 0n, "", null, undefined, NaN');
console.log('TRUTHY: absolutamente tudo o mais, inclusive "0", [], {}');
console.log('');
console.log('if / while / ternário: aplicam ToBoolean na condição.');
console.log('&& / ||: usam ToBoolean para DECIDIR, mas retornam o valor original, não um boolean.');
console.log('');
console.log('Cuidado: se 0 (ou "") for um valor legítimo no seu domínio, não use');
console.log('if (valor) sozinho — compare explicitamente contra null/undefined.');