import { useState } from "react";
import { DiaryEntry, VisibilityState, WeatherState } from "../types";
import diariesService from "../services/diariesService";

type Props = {
    diaries: DiaryEntry[],
    setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>,
    setNotification: React.Dispatch<React.SetStateAction<string>>
};

export const DiaryForm = ({ diaries, setDiaries, setNotification }: Props) => {

    const [ date, setDate ] = useState<string>('');
    const [ visibility, setVisibility ] = useState<VisibilityState>('');
    const [ weather, setWeather ] = useState<WeatherState>('');
    const [ comment, setComment ] = useState<string>('');

    const handleAdd = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        
        try {
            const { data } = await diariesService.addDiary({
                date,
                visibility,
                weather,
                comment
            });
            setDiaries([...diaries, data]);
        } catch (error) {
            if(error instanceof Error) {
                setNotification(error.message);
                setTimeout(() => {
                    setNotification('');
                },3000);
            }
        }
    };

    return(
        <div id="diary-Form">
            <form>
                <div>
                    <label>date: </label>
                    <input id="DIARY-date" type="text" name="date" value={date} onChange={({ target }) => setDate(target.value)}></input>
                </div>
                <div>
                    <label>visibility: </label>
                    <input id="DIARY-visibility" type="text" name="visibility" value={visibility} onChange={({ target }) => setVisibility(target.value as VisibilityState)}></input>
                </div>
                <div>
                    <label>weather: </label>
                    <input id="DIARY-weather" type="text" name="weather" value={weather} onChange={({ target }) => setWeather(target.value as WeatherState)}></input>
                </div>
                <div>
                    <label>comment: </label>
                    <input id="DIARY-comment" type="text" name="comment" value={comment} onChange={({ target }) => setComment(target.value)}></input>
                </div>
                <button onClick={handleAdd}>Add diary</button>
            </form>
        </div>
    );
};