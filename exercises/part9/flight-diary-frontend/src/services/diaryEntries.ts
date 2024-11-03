import axios from 'axios';
import { DiaryEntry } from './../types';

const baseUrl = '/api/diaries';

const getAllDiaryEntries = () => {
  const request = axios.get<DiaryEntry[]>(baseUrl);
  return request.then((response) => response.data);
};

export { getAllDiaryEntries };
