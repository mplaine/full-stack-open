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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h2>Web development curriculum</h2>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </div>
  )
}

export default App
