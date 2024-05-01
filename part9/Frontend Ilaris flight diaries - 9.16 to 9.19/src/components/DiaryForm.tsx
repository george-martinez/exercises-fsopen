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
    const [visibility, setSelectedVisibility] = useState<VisibilityState>('');
    const [weather, setSelectedWeather] = useState<WeatherState>('');
    const [ comment, setComment ] = useState<string>('');

    const handleAdd = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        
        console.log("🚀 ~ handleAdd ~ event:", {
            date,
            visibility,
            weather,
            comment,
            event
        });
        
        try {
            const addedDiary = await diariesService.addDiary({
                date,
                visibility,
                weather,
                comment
            });
            setDiaries([...diaries, addedDiary]);
        } catch (error) {
            if(error instanceof Error) {
                setNotification(error.message);
            }
        }
    };

    return(
        <div id="diary-Form">
            <form>
                <div>
                    <label>date: </label>
                    <input id="DIARY-date" type="date" name="date" value={date} onChange={({ target }) => setDate(target.value)}></input>
                </div>
                    <fieldset>
                        <div>
                            visibility:
                            <label> great:</label>
                            <input className="DIARY-visibility" 
                                type="radio" 
                                name="great" 
                                checked={visibility === 'great'} 
                                onChange={() => setSelectedVisibility('great' as VisibilityState)}></input>
                            <label>good: </label>
                            <input className="DIARY-visibility" 
                                type="radio" 
                                name="good" 
                                checked={visibility === 'good'} 
                                onChange={() => setSelectedVisibility('good' as VisibilityState)}></input>
                            <label>ok: </label>
                            <input className="DIARY-visibility" 
                                type="radio" 
                                name="ok" 
                                checked={visibility === 'ok'} 
                                onChange={() => setSelectedVisibility('ok' as VisibilityState)}></input>
                            <label>poor: </label>
                            <input className="DIARY-visibility" 
                                type="radio" 
                                name="poor" 
                                checked={visibility === 'poor'} 
                                onChange={() => setSelectedVisibility('poor' as VisibilityState)}></input>
                        </div>
                    </fieldset>
                    <div>
                        weather:
                        <label> sunny: </label>
                        <input className="DIARY-weather" 
                            type="radio" 
                            name="sunny" 
                            value={weather} 
                            checked={weather === 'sunny'} 
                            onChange={() => setSelectedWeather('sunny' as WeatherState)}></input>
                        <label>rainy: </label>
                        <input className="DIARY-weather" 
                            type="radio" 
                            name="rainy" 
                            value={weather} 
                            checked={weather === 'rainy'} 
                            onChange={() => setSelectedWeather('rainy' as WeatherState)}></input>
                        <label>cloudy: </label>
                        <input className="DIARY-weather" 
                            type="radio" 
                            name="cloudy" 
                            value={weather} 
                            checked={weather === 'cloudy'} 
                            onChange={() => setSelectedWeather('cloudy' as WeatherState)}></input>
                        <label>stormy: </label>
                        <input className="DIARY-weather" 
                            type="radio" 
                            name="stormy" 
                            value={weather} 
                            checked={weather === 'stormy'} 
                            onChange={() => setSelectedWeather('stormy' as WeatherState)}></input>
                        <label>windy: </label>
                        <input className="DIARY-weather" 
                            type="radio" 
                            name="windy" 
                            value={weather} 
                            checked={weather === 'windy'} 
                            onChange={() => setSelectedWeather('windy' as WeatherState)}></input>
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