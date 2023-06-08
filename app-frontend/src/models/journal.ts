export type Journal = {
    _id?: number;
    entry_title: string;
    entry_text: string;
    entry_date?: Date;
    entry_emotion?: string;
}