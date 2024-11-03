import { DiaryEntry } from './DiaryEntry';
import { DiaryEntry as DiaryEntryType } from '../types';

interface ContentProps {
  diaryEntries: DiaryEntryType[];
}

const Content = ({ diaryEntries }: ContentProps) =>
  diaryEntries.map((diaryEntry: DiaryEntryType) => (
    <DiaryEntry key={diaryEntry.id} diaryEntry={diaryEntry} />
  ));

export { Content };
