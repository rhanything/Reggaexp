import React, {useState} from 'react';
import {post} from 'axios';
import {LoremIpsum as text} from './LoremIpsum';
import './App.css';
import {Word} from './Word';

function App() {
	const urlApi = 'http://localhost:3001/';
	const stringMatchPath = 'match';
	const [wordsMatched, setWordsMatched] = useState([]);
	const textInputHandler = async ({value}) => {
		const reqBody = {
			regex: value,
			text,
		};
		const response = await post(urlApi + stringMatchPath, reqBody).then(
			(response) => response.data,
		);
		console.log(response);
		setWordsMatched(response);
	};
	return (
		<div className="App">
			<header className="App-header">
				<div className="input-wrapper">
					<input
						className="input-regex"
						type="text"
						onChange={(e) => {
							textInputHandler(e.target);
						}}
					/>
				</div>
				<br />
				<div>
					{text.split(' ').map((w) => (
						<Word word={w} highlight={wordsMatched.includes(w)} />
					))}
				</div>
			</header>
		</div>
	);
}

export default App;
