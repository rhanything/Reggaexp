// const Automata = require('./models/automata.class');
const {insertExplicitConcatOperator, toPostfix} = require('./regex');
const {toNFA} = require('./automata');
const CircularJSON = require('circular-json');

// const M = new Automata();
// M.alphabet = ['a', 'b'];
// M.states = ['q0', 'q1', 'q3'];
// M.initialState = 'q0';
// M.finalStates = ['q1'];
// M.transitions = {
// 	q0: {
// 		a: ['q1', 'q3'],
// 	},
// 	q1: {
// 		b: ['q3'],
// 	},
// 	q3: {},
// };

// const result = M.test('ab');

// if (result) {
// 	console.log('Has been Accepted.');
// } else {
// 	console.log('Has been Rejected.');
// }

// const exp = 'a*';
const exp = 'a|b';
// const exp = 'ab'

const expWithConcatenationOperator = insertExplicitConcatOperator(exp);
console.log(expWithConcatenationOperator);

// Generates an NFA using a stack
const postfixExp = toPostfix(expWithConcatenationOperator);
console.log(postfixExp);
const nfa = toNFA(postfixExp);

// eslint-disable-next-line
const nfaString = CircularJSON.stringify(nfa);

console.table(nfaString);
