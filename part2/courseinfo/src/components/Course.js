import React from 'react';

const Part = ({ part }) => {
	return (
		<p>{part.name} {part.exercises}</p>
	)
};

const Summary = ({ parts }) => {
	const total = parts.reduce((a, b) => a + b.exercises, 0);
	return (
		<b>total of {total} exercises</b>
	)
};

const Course = ({ course }) => {
	const parts = () => course.parts.map(part => 
		<Part key={part.id} part={part} />
	);

	return (
		<div>
			<h2>{course.name}</h2>
			{parts()}
			<Summary parts={course.parts} />
		</div>
	)
};

export default Course