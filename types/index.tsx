export type Frequency = 'daily' | 'weekly';

export interface Habit {
    id: string;
    name: string;
    title: string;
    frequency: Frequency;
    completion: {
        [date: string]: boolean;
    };
}
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}
