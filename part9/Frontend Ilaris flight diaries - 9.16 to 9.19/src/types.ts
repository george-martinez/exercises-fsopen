export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export type VisibilityState = Visibility | '';

export type WeatherState = Weather | '';

interface DiaryBase {
  id: number;
  date: string;
  comment: string;
}

export interface DiaryEntry extends DiaryBase {
  weather: Weather;
  visibility: Visibility;
}

export interface NewDiaryEntry extends Omit<DiaryBase,'id'> {
  weather: WeatherState;
  visibility: VisibilityState;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
