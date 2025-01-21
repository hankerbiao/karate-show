// src/types/index.ts

export type CompetitorKey = 'competitor1' | 'competitor2';

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