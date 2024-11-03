import { useEffect, useState } from 'react';
import { getAllDiaryEntries } from './services/diaryEntries';
import { DiaryEntry } from './types';
import { Header } from './components/Header';
import { Content } from './components/Content';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaryEntries().then((data: DiaryEntry[]) => {
      setDiaryEntries(data);
    });
  }, []);

  return (
    <div>
      <Header name="Diary entries" />
      <Content diaryEntries={diaryEntries} />
    </div>
  );
}

export default App;
