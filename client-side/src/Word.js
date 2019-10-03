import React from 'react';
import classNames from 'classnames';
import './Word.css';
export const Word = ({word, highlight, deb}) => {
	return (
		<>
			<span className={classNames('main', {highlightClass: highlight})}>
				{`${word}`}
			</span>
			{` `}
		</>
	);
};
