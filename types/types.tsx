export type Frequency = 'daily' | 'weekly';

export interface Habit {
  id: string;
  name: string;
  frequency: Frequency;
  completion?: { [date: string]: boolean };
  completedDates: string[];

}
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

