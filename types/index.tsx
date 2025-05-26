export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}
export interface Habit {
    id: string;
    name: string;
    description?: string;
    frequency: 'daily' | 'weekly';
    createdAt: string;
    completedDates: string[];
}
export interface HabitCompletion {
    habitId: string;
    date: string;
    completed: boolean;
}
export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    CreateHabbit: undefined;
    HabbitList: undefined;
    Progress: undefined;
};
