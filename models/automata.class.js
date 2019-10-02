const _ = require('lodash');
module.exports = class Automata {
	/**
	 ** @constructor
	 */
	constructor() {
		this.alphabet = [];
		this.states = [];
		this.initialState = '';
		this.finalStates = [];
		this.transitions = {};
	}

	/**
	 *
	 * @param {string} state
	 * @param {string} symbol
	 * @return {string}
	 */
	transitionFunction(state, symbol) {
		return this.transitions[state][symbol];
	}

	/**
	 *
	 * @param {array} states
	 * @param {string} word
	 * @return {string}
	 */
	extendedTransitionFunction(states, word) {
		// console.log(this.transitions);
		// console.log('states: ', states);
		return _.reduce(
			states,
			(result, state) => {
				let wordForState = word;
				for (let i = 0; i < word.length; i++) {
					const nextState = this.transitionFunction(state, wordForState[i]);

					console.log(state + ' -> ', wordForState);
					console.log('next state: ', nextState);
					console.log('\n');

					if (!nextState) {
						return false;
					}

					wordForState = wordForState.slice(1);
					if (!wordForState) {
						console.log(nextState);
						return nextState;
					}
					return this.extendedTransitionFunction(nextState, wordForState);
				}
			},
			[],
		);
	}

	/**
	 * @param {string} word
	 * @return {string}
	 */
	test(word) {
		const stoppedStates = this.extendedTransitionFunction(
			[this.initialState],
			word,
		);

		if (!stoppedStates || !stoppedStates.length) {
			return false;
		}

		console.log('stoppedStates: ', stoppedStates);
		const result = stoppedStates.map((state) => {
			if (this.finalStates.includes(state)) {
				return state;
			}
		});

		return result.length;
	}

	// eslint-disable-next-line require-jsdoc
	createState(isStart, isEnd) {
		console.log('dbgtrans', this.transitions);
		const newState = this.states.length;
		console.log(newState);
		this.states.push(newState);
		this.transitions[newState] = {};

		if (isStart) {
			this.initialState = newState;
		}

		if (isEnd) {
			this.finalStates.push(newState);
		}
		return newState;
	}

	// eslint-disable-next-line require-jsdoc
	addTransition(from, to, symbol) {
		_.set(this.transitions, [from, symbol], to);
	}

	// eslint-disable-next-line require-jsdoc
	addEpsilonTransition(from, to) {
		_.set(this.transitions, [from, 'ε'], to);
	}
};

// - encontrar o proximo estado
// - vai pro poximo estado (recursao)

// - nao encontrar o proximo estado
// - estado atual nao é final (reject)
// - estado atual e final (accept)
