import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
};

const Statistics = ({good, neutral, bad}) => {
	if (good + neutral + bad === 0) {
		return (
			<div>No feedback given</div>
		)
	};
	return (
		<div>
			<table>
				<tbody>
					<Statistic text='good' value={good} />
					<Statistic text='neutral' value={neutral} />
					<Statistic text='bad' value={bad} />
					<Statistic text='all' value={good + neutral + bad} />
					<Statistic text='average' value={(good - bad) / (good + neutral + bad)} />
					<Statistic text='positive' value={(good / (good + neutral + bad))*100 + ' %'} />
				</tbody>
			</table>
		</div>
	)
};

const Button = ({ onClick, text }) => {
	return (
		<button onClick={onClick}>
			{text}
		</button>
	)
};


const App = (props) => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleFeedbackClick = vote => {
		if (vote === 'good') {
			setGood(good + 1);
		} else if (vote === 'neutral') {
			setNeutral(neutral + 1);
		} else {
			setBad(bad + 1);
		}
	};

	return (
		<div>
			<h1>give feedback</h1>
			<Button onClick={() => handleFeedbackClick('good')} text='good' />
			<Button onClick={() => handleFeedbackClick('neutral')} text='neutral' />
			<Button onClick={() => handleFeedbackClick('bad')} text='bad' />
			<h1>statistics</h1>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	)
};

ReactDOM.render(<App />, document.getElementById('root'));
