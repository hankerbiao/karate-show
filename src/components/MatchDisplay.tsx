import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Row, Col, Space, Modal } from 'antd';
import { Match } from '../types';
import { PlusOutlined, MinusOutlined, PlayCircleOutlined, PauseCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import * as S from '../styles/MatchDisplay.styles';  // 假设我们把所有的样式组件都移到了这个文件


const INITIAL_TIME = 120;
const MAX_FOULS = 4;

const useTimer = (initialTime: number) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRunning && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [isRunning, timeLeft]);

    const startTimer = useCallback(() => setIsRunning(true), []);
    const pauseTimer = useCallback(() => setIsRunning(false), []);
    const resetTimer = useCallback(() => {
        setIsRunning(false);
        setTimeLeft(initialTime);
    }, [initialTime]);

    return { timeLeft, isRunning, startTimer, pauseTimer, resetTimer };
};

const CompetitorControls: React.FC<{
    competitor: 'competitor1' | 'competitor2';
    score: number;
    fouls: number;
    onScoreChange: (change: number) => void;
    onFoulChange: (change: number) => void;
}> = React.memo(({fouls, onScoreChange, onFoulChange }) => (
    <S.CompetitorControls>
        <S.ScoreButtons>
            <S.StyledButton icon={<PlusOutlined />} onClick={() => onScoreChange(1)}>1分</S.StyledButton>
            <S.StyledButton icon={<MinusOutlined />} onClick={() => onScoreChange(-1)}>1分</S.StyledButton>
            <S.StyledButton onClick={() => onFoulChange(1)}>+ 1犯规</S.StyledButton>
            <S.StyledButton onClick={() => onFoulChange(-1)}>- 1犯规</S.StyledButton>
        </S.ScoreButtons>
        <S.FoulDots>
            {[...Array(fouls)].map((_, i) => <S.FoulDot key={i} />)}
        </S.FoulDots>
    </S.CompetitorControls>
));

const MatchDisplay: React.FC<{ match: Match }> = ({ match }) => {
    const { timeLeft, isRunning, startTimer, pauseTimer, resetTimer } = useTimer(INITIAL_TIME);
    const [scores, setScores] = useState({ competitor1: 0, competitor2: 0 });
    const [fouls, setFouls] = useState({ competitor1: 0, competitor2: 0 });

    const resetMatch = useCallback(() => {
        Modal.confirm({
            title: '确定要重置比赛吗？',
            onOk: () => {
                resetTimer();
                setScores({ competitor1: 0, competitor2: 0 });
                setFouls({ competitor1: 0, competitor2: 0 });
            },
        });
    }, [resetTimer]);

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

    const formattedTime = useMemo(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, [timeLeft]);


    return (
        <S.FullScreenContainer>
            <S.MatchTitle>{match.name}</S.MatchTitle>
            <Row style={{ flex: 1, width: '100%' }}>
                {(['competitor1', 'competitor2'] as const).map((competitor, index) => (
                    <Col span={12} key={competitor}>
                        <S.CompetitorCard color={index === 0 ? 'red' : 'blue'}>
                            <S.CompetitorName>{match[competitor].name}</S.CompetitorName>
                            <S.CompetitorUniversity>{match[competitor].university}</S.CompetitorUniversity>
                            <S.CompetitorScore>{scores[competitor]}</S.CompetitorScore>
                        </S.CompetitorCard>
                    </Col>
                ))}
            </Row>
            <S.CenterContainer>
                <S.TimerDisplay>
                    <S.TimerText>{formattedTime}</S.TimerText>
                </S.TimerDisplay>
            </S.CenterContainer>
            <S.ButtonContainer>
                <CompetitorControls
                    competitor="competitor1"
                    score={scores.competitor1}
                    fouls={fouls.competitor1}
                    onScoreChange={(change) => handleScoreChange('competitor1', change)}
                    onFoulChange={(change) => handleFoulChange('competitor1', change)}
                />
                <Space>
                    <S.StyledButton icon={isRunning ? <PauseCircleOutlined /> : <PlayCircleOutlined />} onClick={isRunning ? pauseTimer : startTimer}>
                        {isRunning ? '暂停' : '开始'}
                    </S.StyledButton>
                    <S.StyledButton icon={<ReloadOutlined />} onClick={resetMatch}>重置</S.StyledButton>
                </Space>
                <CompetitorControls
                    competitor="competitor2"
                    score={scores.competitor2}
                    fouls={fouls.competitor2}
                    onScoreChange={(change) => handleScoreChange('competitor2', change)}
                    onFoulChange={(change) => handleFoulChange('competitor2', change)}
                />
            </S.ButtonContainer>
        </S.FullScreenContainer>
    );
};

export default React.memo(MatchDisplay);