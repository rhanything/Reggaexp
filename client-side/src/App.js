import React, { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { post } from 'axios';
import { LoremIpsum as text } from './LoremIpsum';
import './App.css';

function App() {
  const urlApi = 'http://localhost:3001/';
  const stringMatchPath = 'match';
  const [wordsMatched, setWordsMatched] = useState([]);
  const textInputHandler = async ({ value }) => {
    const reqBody = {
      regex: value,
      text,
    };
    const response = await post(urlApi + stringMatchPath, reqBody).then(
      response => response.data,
    );
    console.log(response);
    setWordsMatched(response);
  };
  return (
    <div className='App'>
      <header className='App-header'>
        <input
          type='text'
          onChange={e => {
            textInputHandler(e.target);
          }}
        />
        <br />

        <Highlighter
          highlightClassName='YourHighlightClass'
          searchWords={wordsMatched}
          autoEscape={true}
          textToHighlight={text}
        />
      </header>
    </div>
  );
}

export default App;
