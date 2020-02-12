// const CircularJSON = require('circular-json');
/*
  Thompson NFA Builder and Recognizer.
*/

function createState(isEnd) {
	return {
		isEnd,
		transition: {},
		epsilonTransitions: [],
	};
}

function addEpsilonTransition(from, to) {
	from.epsilonTransitions.push(to);
}
/*
Um estado do NFA gerado pelo algoritmo de Thompson
 pode ter apenas 1 transição de símbolo
*/
function addTransition(from, to, symbol) {
	from.transition[symbol] = to;
}

/*
Constroi um NFA que reconhece um símbolo/caracter
*/
function fromSymbol(symbol) {
	const start = createState(false);
	const end = createState(true);
	addTransition(start, end, symbol);

	return {start, end};
}

/*
Concatenação "."
*/
function concat(first, second) {
	addEpsilonTransition(first.end, second.start);
	first.end.isEnd = false;

	return {start: first.start, end: second.end};
}

/*
União "|"
*/
function union(first, second) {
	const start = createState(false);
	addEpsilonTransition(start, first.start);
	addEpsilonTransition(start, second.start);

	const end = createState(true);

	addEpsilonTransition(first.end, end);
	first.end.isEnd = false;
	addEpsilonTransition(second.end, end);
	second.end.isEnd = false;

	return {start, end};
}

/*
Aplica feixe transitivo quando operador estrela "*"
*/
function closure(nfa) {
	const start = createState(false);
	const end = createState(true);

	addEpsilonTransition(start, end); // nenhuma
	addEpsilonTransition(start, nfa.start); // uma

	addEpsilonTransition(nfa.end, end);
	addEpsilonTransition(nfa.end, nfa.start); // mais de uma
	nfa.end.isEnd = false;

	return {start, end};
}

/*
Converte um regex posfixo em NFA usando o algoritmo de Thompson
*/
function toNFA(postfixExp) {
	const stack = [];

	for (const token of postfixExp) {
		if (token === '*') {
			stack.push(closure(stack.pop()));
		} else if (token === '|') {
			const right = stack.pop();
			const left = stack.pop();
			stack.push(union(left, right));
		} else if (token === '.') {
			const right = stack.pop();
			const left = stack.pop();
			stack.push(concat(left, right));
		} else {
			stack.push(fromSymbol(token));
		}
	}

	return stack.pop();
}

function addNextState(state, nextStates, visited) {
	if (state.epsilonTransitions.length) {
		for (const st of state.epsilonTransitions) {
			if (!visited.find((vs) => vs === st)) {
				visited.push(st);
				addNextState(st, nextStates, visited);
			}
		}
	} else {
		nextStates.push(state);
	}
}

function search(nfa, word) {
	let currentStates = [];

	addNextState(nfa.start, currentStates, []);

	for (const symbol of word) {
		const nextStates = [];

		for (const state of currentStates) {
			const nextState = state.transition[symbol];
			if (nextState) {
				addNextState(nextState, nextStates, []);
			}
		}

		currentStates = nextStates;
	}

	return currentStates.find((s) => s.isEnd) ? true : false;
}

function recognize(nfa, word) {
	return search(nfa, word);
}

module.exports = {
	toNFA,
	recognize,
};
