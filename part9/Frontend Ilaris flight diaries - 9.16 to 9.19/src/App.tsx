import { useEffect, useState } from 'react';
import './App.css';
import { NotificationComponent } from './components/NotificationComponent';
import diariesService from './services/diariesService';
import { DiaryEntry } from './types';
import { Diaries } from './components/Diaries';
import { DiaryForm } from './components/DiaryForm';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ notification, setNotification ] = useState<string>('');
  const [ diaries, setDiaries ] = useState<DiaryEntry[]>([]);
  
  useEffect(() => {
    const fetchDiariesList = async () => {
      const diariesFromServer = await diariesService.getAll();
      setDiaries(diariesFromServer);
    };

    fetchDiariesList();
  }, []);

  return (
    <>
      <div>
        <h2>Add new Entry!</h2>
        {
          notification ? <NotificationComponent message={notification}></NotificationComponent> : <></>
        }
        <DiaryForm diaries={diaries} setDiaries={setDiaries} setNotification={setNotification}></DiaryForm>
        <Diaries diaries={diaries}></Diaries>
      </div>
    </>
  );
}

export default App;
