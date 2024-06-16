import { v4 as uuidv4 } from 'uuid';

interface HeaderProps {
  name: string;
}

interface ContentProps {
  parts: Part[];
}

interface Part {
  name: string;
  exerciseCount: number;
}

interface PartProps {
  part: Part;
}

interface TotalProps {
  sum: number;
}

const Header = (props: HeaderProps) => <h1>{props.name}</h1>;

const Content = (props: ContentProps) =>
  props.parts.map((part) => <Part key={uuidv4()} part={part} />);

const Part = (props: PartProps) => (
  <p>
    {props.part.name} {props.part.exerciseCount}
  </p>
);

const Total = (props: TotalProps) => <p>Number of exercises {props.sum}</p>;

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total
        sum={courseParts.reduce((total, part) => total + part.exerciseCount, 0)}
      />
    </div>
  );
};

export default App;
