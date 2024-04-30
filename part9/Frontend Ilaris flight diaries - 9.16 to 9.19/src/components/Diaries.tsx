import { DiaryEntry } from "../types";

export const Diaries = ({ diaries }: {diaries: DiaryEntry[]}) => {
    return(
        <div>
            <h2>Diary Entries:</h2>
            {diaries.map((diarie) => {
                return(
                    <div className="diarie_description" key={diarie.id}>
                        <h3>{diarie.date}</h3>
                        <p>Visibility: {diarie.visibility}</p>
                        <p>Weather: {diarie.weather}</p>
                    </div>
                );
            })}
        </div>
    );
};