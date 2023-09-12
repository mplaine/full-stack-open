const Header = ({ course }) => <h3>{course}</h3>

const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part} />)

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>

const Course = ({ course }) =>
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total sum={course.parts.reduce((total, part) => total + part.exercises, 0)} />
  </div>

export default Course
