import React from 'react';
// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourePartBaseExtended extends CoursePartBase {
  name: string;
  description: string;
}

interface MyCoursePart extends CourePartBaseExtended{
  name: 'My Course Part';
  submissions: number; 
}

interface CoursePartOne extends CourePartBaseExtended {
  name: "Fundamentals";
  description: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CourePartBaseExtended {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | MyCoursePart;

function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}

const Header: React.FC<{ name: string }> = ({ name }) => {
  return (
    <h1>{name}</h1>
  );
};

const Part: React.FC<{ coursePart: CoursePart }> = ({ coursePart }) => {
  switch(coursePart.name) {
    case "Fundamentals":
      return (
        <div>
          name: {coursePart.name}<br/>
          exercise count: {coursePart.exerciseCount}<br/>
          description: {coursePart.description}
        </div>
      )
    case 'Using props to pass data':
      return (
        <div>
          name: {coursePart.name}<br/>
          exercise count: {coursePart.exerciseCount}<br/>
          group project count: {coursePart.groupProjectCount}
        </div>
      )
    case 'Deeper type usage':
      return (
        <div>
          name: {coursePart.name}<br/>
          exerciseCount: {coursePart.exerciseCount}<br/>
          description: {coursePart.description}<br/>
          exercise submission link: {coursePart.exerciseSubmissionLink}<br/>
        </div>
      )
    case 'My Course Part':
      return (
        <div>
          name: {coursePart.name} <br/>
          exerciseCount: {coursePart.exerciseCount}<br/>
          description: {coursePart.description}<br/>
          submissions: {coursePart.submissions}
        </div>
      )
    default:
      assertNever(coursePart);
      return null;
  }
};

const Content: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => {
  return (
    <div>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
        <Part coursePart={courseParts[0]} />
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
        <Part coursePart={courseParts[1]} />
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
        <Part coursePart={courseParts[2]} />
      </p>
      <p>
        {courseParts[3].name} {courseParts[3].exerciseCount}
        <Part coursePart={courseParts[3]} />
      </p>
    </div>
    
  )
};

const Total: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
};

const App: React.FC = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: 'My Course Part',
      exerciseCount: 10,
      description: 'This is my course part...',
      submissions: 12
    }
  ];

  courseParts.forEach(part => {
    switch (part.name) {
      case "Fundamentals":
        return;
      case 'Using props to pass data':
        return;
      case 'Deeper type usage':
        return;
      case 'My Course Part':
        return;
      default:
        return assertNever(part);
    }
  });

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;