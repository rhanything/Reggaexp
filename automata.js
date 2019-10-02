const CircularJSON = require('circular-json');

// this.alphabet = [];
// this.states = [];
// this.initialState = '';
// this.finalStates = [];
// this.transitions = {};

/*
  Thompson NFA Construction and Search.
*/

/*
  A state in Thompson's NFA can either have
   - a single symbol transition to a state
    or
   - up to two epsilon transitions to another states
  but not both.
*/
// eslint-disable-next-line require-jsdoc
function createState(isEnd) {
	return {
		isEnd,
		transition: {},
		epsilonTransitions: [],
	};
}

// eslint-disable-next-line require-jsdoc
function addEpsilonTransition(from, to) {
	from.epsilonTransitions.push(to);
}
/*
Thompson's NFA state can have only one transition
to another state for a given symbol.
*/
// eslint-disable-next-line require-jsdoc
function addTransition(from, to, symbol) {
	from.transition[symbol] = to;
}

/*
Construct an NFA that recognizes only the empty string.
*/
// eslint-disable-next-line require-jsdoc
function fromEpsilon() {
	const start = createState(false);
	const end = createState(true);
	addEpsilonTransition(start, end);

	return {start, end};
}

/*
Construct an NFA that recognizes only a single character string.
*/
// eslint-disable-next-line require-jsdoc
function fromSymbol(symbol) {
	const start = createState(false);
	const end = createState(true);
	addTransition(start, end, symbol);

	return {start, end};
}

/*
Concatenates two NFAs.
*/
// eslint-disable-next-line require-jsdoc
function concat(first, second) {
	addEpsilonTransition(first.end, second.start);
	first.end.isEnd = false;

	return {start: first.start, end: second.end};
}

/*
Unions two NFAs.
*/
// eslint-disable-next-line require-jsdoc
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
Apply Closure (Kleene's Star) on an NFA.
*/
// eslint-disable-next-line require-jsdoc
function closure(nfa) {
	const start = createState(false);
	const end = createState(true);

	addEpsilonTransition(start, end);
	addEpsilonTransition(start, nfa.start);

	addEpsilonTransition(nfa.end, end);
	addEpsilonTransition(nfa.end, nfa.start);
	nfa.end.isEnd = false;

	return {start, end};
}

/*
Converts a postfix regular expression into a Thompson NFA.
*/
// eslint-disable-next-line require-jsdoc
function toNFA(postfixExp) {
	if (postfixExp === '') {
		return fromEpsilon();
	}

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

// eslint-disable-next-line require-jsdoc
function search(nfa, word) {
	let currentStates = [];
	/* The initial set of current states is either the start state or
	the set of states reachable by epsilon transitions from the start state */
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

// eslint-disable-next-line require-jsdoc
function recognize(nfa, word) {
	// return recursiveBacktrackingSearch(nfa.start, [], word, 0);
	return search(nfa, word);
}

module.exports = {
	toNFA,
	recognize,
};
