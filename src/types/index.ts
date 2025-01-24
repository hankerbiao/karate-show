// src/types/index.ts

export interface Competitor {
    university: string;
    name: string;
}

export interface Match {
    id: string;
    name: string;
    competitor1: Competitor;
    competitor2: Competitor;
}