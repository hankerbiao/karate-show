import React from 'react';
import {PlusOutlined, MinusOutlined} from '@ant-design/icons';
import * as S from '../styles/MatchDisplay.styles';

interface CompetitorControlsProps {
    competitor: 'competitor1' | 'competitor2';
    score: number;
    fouls: number;
    onScoreChange: (change: number) => void;
    onFoulChange: (change: number) => void;
}

const CompetitorControls: React.FC<CompetitorControlsProps> = React.memo(({
                                                                              fouls,
                                                                              onScoreChange,
                                                                              onFoulChange
                                                                          }) => (
    <S.CompetitorControls>
        <S.ScoreButtons>
            <S.StyledButton icon={<PlusOutlined/>} onClick={() => onScoreChange(1)}>1分</S.StyledButton>
            <S.StyledButton icon={<MinusOutlined/>} onClick={() => onScoreChange(-1)}>1分</S.StyledButton>
            <S.StyledButton onClick={() => onFoulChange(1)}>+ 1犯规</S.StyledButton>
            <S.StyledButton onClick={() => onFoulChange(-1)}>- 1犯规</S.StyledButton>
        </S.ScoreButtons>
        <S.FoulDots>
            {[...Array(fouls)].map((_, i) => <S.FoulDot key={i}/>)}
        </S.FoulDots>
    </S.CompetitorControls>
));

export default CompetitorControls;