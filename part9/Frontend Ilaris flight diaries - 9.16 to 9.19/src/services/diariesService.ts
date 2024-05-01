import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(
    `${apiBaseUrl}/diaries`
  );

  return data;
};


const addDiary = async (object: NewDiaryEntry): Promise<DiaryEntry> => {
  const { date, visibility, weather, comment } = object;

  try {
    const response  = await axios.post(`${apiBaseUrl}/diaries`, {
      date,
      visibility,
      weather,
      comment
    });

    return response.data;
    
  } catch (error) {
      if(axios.isAxiosError(error)) {
        console.log(error.status);
        console.log(error.response);
        console.log(error.message);
        throw error;
      } else {
        console.log(error);
        throw(error);
      }
  }
};

export default { getAll, addDiary };