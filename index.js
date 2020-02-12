const {insertExplicitConcatOperator, toPostfix} = require('./regexParse');
const {toNFA, recognize} = require('./automata');
const {server} = require('./server');
const serverConfig = {
	port: 3001,
};
const app = server(serverConfig);

app.post('/match', (req, res) => {
	// const exp = '(a|a|a(a*|b(a*)))';
	const {regex, text} = req.body;
	const expWithConcatenationOperator = insertExplicitConcatOperator(regex);
	console.log(expWithConcatenationOperator);
	const postfixExp = toPostfix(expWithConcatenationOperator);
	console.log(postfixExp);
	// Build NFA
	const nfa = toNFA(postfixExp);
	const words = text.split(' ');
	const matchedWords = words.filter((word) => recognize(nfa, word));
	res.send(matchedWords);
});
