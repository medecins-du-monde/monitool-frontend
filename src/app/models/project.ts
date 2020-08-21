export interface Project {
    active: boolean;
    country: string;
    countryImage?: string;
    name: string;
    themes: string[];
    start: Date;
    end: Date;
    inputDate?: Date;
    _id?: string;
}
