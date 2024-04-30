import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(
    `${apiBaseUrl}/diaries`
  );

  return data;
};


const addDiary = async (object: NewDiaryEntry) => {
  const { date, visibility, weather, comment } = object;

  const data  = await axios.post(`${apiBaseUrl}/diaries`, {
    date,
    visibility,
    weather,
    comment
  });
  
  
  return data;
};

export default { getAll, addDiary };