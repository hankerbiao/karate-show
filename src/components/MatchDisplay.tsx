import React, { useState, useCallback } from 'react';
import { Match } from '../types';
import * as S from '../styles/MatchDisplay.styles';
import { MAX_FOULS } from "../constants/mockData.ts";
import Timer from "./Timer.tsx";
import ScoreBoard from "./ScoreBoard.tsx";
import CompetitorControls from "./CompetitorControls.tsx";




const MatchDisplay: React.FC<{ match: Match }> = ({ match }) => {
    const [scores, setScores] = useState({ competitor1: 0, competitor2: 0 });
    const [fouls, setFouls] = useState({ competitor1: 0, competitor2: 0 });

    const resetMatch = useCallback(() => {
        setScores({ competitor1: 0, competitor2: 0 });
        setFouls({ competitor1: 0, competitor2: 0 });
    }, []);

    const handleScoreChange = useCallback((competitor: 'competitor1' | 'competitor2', change: number) => {
        setScores(prev => ({
            ...prev,
            [competitor]: Math.max(0, prev[competitor] + change),
        }));
    }, []);

    const handleFoulChange = useCallback((competitor: 'competitor1' | 'competitor2', change: number) => {
        setFouls(prev => ({
            ...prev,
            [competitor]: Math.max(0, Math.min(MAX_FOULS, prev[competitor] + change)),
        }));
    }, []);

    return (
        <S.FullScreenContainer>
            <S.MatchTitle>{match.name}</S.MatchTitle>
            <ScoreBoard match={match} scores={scores} />
            <S.CenterContainer>
                <Timer onReset={resetMatch} />
            </S.CenterContainer>
            <S.ButtonContainer>
                {(['competitor1', 'competitor2'] as const).map((competitor) => (
                    <CompetitorControls
                        key={competitor}
                        competitor={competitor}
                        score={scores[competitor]}
                        fouls={fouls[competitor]}
                        onScoreChange={(change) => handleScoreChange(competitor, change)}
                        onFoulChange={(change) => handleFoulChange(competitor, change)}
                    />
                ))}
            </S.ButtonContainer>
        </S.FullScreenContainer>
    );
};


export default React.memo(MatchDisplay);