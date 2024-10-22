import { Part } from './Part';
import { CoursePart } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface ContentProps {
  parts: CoursePart[];
}

const Content = ({ parts }: ContentProps) =>
  parts.map((part) => <Part key={uuidv4()} part={part} />);

export { Content };
