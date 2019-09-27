module.exports = class Automata {
  constructor() {
    this.alphabet = [];
    this.states = [];
    this.initialState = '';
    this.finalStates = [];
    this.transitions = {};
  }

  transitionFunction(state, symbol) {
    return this.transitions[state][symbol];
  }

  extendedTransitionFunction(state, word) {
    for (let i = 0; i < word.length; i++) {
      const nextState = this.transitionFunction(state, word[i]);

      console.log(state + ' -> ', word);
      console.log('next state: ', nextState);
      console.log('\n');

      if (!nextState) {
        return false;
      }

      word = word.slice(1);
      if (!word) {
        return nextState;
      }
      return this.extendedTransitionFunction(nextState, word);
    }
  }

  test(word) {
    const stoppedState = this.extendedTransitionFunction(
      this.initialState,
      word,
    );
    console.log('stoppedState: ', stoppedState);
    if (!this.finalStates.includes(stoppedState)) {
      return false;
    }
    return true;
  }
};

// - encontrar o proximo estado
// - vai pro poximo estado (recursao)

// - nao encontrar o proximo estado
// - estado atual nao é final (reject)
// - estado atual e final (accept)
