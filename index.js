const Automata = require('./models/automata.class');
console.log(Automata);
const M = new Automata();
M.alphabet = ['a', 'b'];
M.states = ['q0', 'q1', 'q3'];
M.initialState = 'q0';
M.finalStates = ['q1', 'q3'];
M.transitions = {
	q0: {
		a: 'q0',
		b: 'q1',
	},
	q1: {
		a: 'q3',
		b: 'q1',
	},
	q3: {},
};

const result = M.test('bab');

if (result) {
	console.log('Has been Accepted.');
} else {
	console.log('Has been Rejected.');
}
