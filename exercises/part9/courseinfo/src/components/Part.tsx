import { CoursePart, CoursePartBase, CoursePartDescription } from '../types';

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  const coursePartBaseTemplate = (part: CoursePartBase) => {
    return (
      <div>
        <b>
          {part.name} {part.exerciseCount}
        </b>
      </div>
    );
  };

  const coursePartDescriptionTemplate = (part: CoursePartDescription) => {
    return (
      <div>
        <i>{part.description}</i>
      </div>
    );
  };

  const assertNever = (value: never): never => {
    throw new Error(`Unhandled course type: ${JSON.stringify(value)}`);
  };

  const baseContent = coursePartBaseTemplate(part);
  let kindContent;
  switch (part.kind) {
    case 'basic':
      kindContent = coursePartDescriptionTemplate(part);
      break;
    case 'group':
      kindContent = <div>Project exercises {part.groupProjectCount}</div>;
      break;
    case 'background':
      kindContent = (
        <>
          {coursePartDescriptionTemplate(part)}
          <div>Submit to {part.backgroundMaterial}</div>
        </>
      );
      break;
    case 'special':
      kindContent = (
        <>
          {coursePartDescriptionTemplate(part)}
          <div>required skills: {part.requirements.join(', ')}</div>
        </>
      );
      break;
    default:
      return assertNever(part);
  }

  return (
    <p>
      {baseContent}
      {kindContent}
    </p>
  );
};

export { Part };
