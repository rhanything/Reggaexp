const Automata = require('./models/automata.class');
console.log(Automata);
const M = new Automata();
M.alphabet = ['a', 'b'];
M.states = ['q0', 'q1', 'q3'];
M.initialState = 'q0';
M.finalStates = ['q1'];
M.transitions = {
	q0: {
		a: ['q1', 'q3'],
	},
	q1: {
		b: ['q3'],
	},
	q3: {},
};

const result = M.test('ab');

if (result) {
	console.log('Has been Accepted.');
} else {
	console.log('Has been Rejected.');
}
