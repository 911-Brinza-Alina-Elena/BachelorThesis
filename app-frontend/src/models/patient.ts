export type Emotion = {
    date: Date,
    emotion: string,
};

type Patient = {
    id?: number,
    username: string,
    email?: string,
    password?: string,
    type_of_account?: string,
    first_name: string,
    last_name: string,
    date_of_birth: Date,
    gender: string,
    country: string,
    city: string,
    emotions: Emotion[]
};

export default Patient;    