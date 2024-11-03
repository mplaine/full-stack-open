import { DiaryEntry as DiaryEntryType } from '../types';

interface DiaryEntryProps {
  diaryEntry: DiaryEntryType;
}

const DiaryEntry = ({ diaryEntry }: DiaryEntryProps) => {
  return (
    <>
      <h3>{diaryEntry.date}</h3>
      <div>visibility: {diaryEntry.visibility}</div>
      <div>weather: {diaryEntry.weather}</div>
    </>
  );
};

export { DiaryEntry };
