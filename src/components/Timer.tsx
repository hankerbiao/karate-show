// Timer.tsx
import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {Space} from 'antd';
import {PlayCircleOutlined, PauseCircleOutlined, ReloadOutlined} from '@ant-design/icons';
import * as S from '../styles/MatchDisplay.styles';
import {playAlertSound, playEndSound} from "../utils/sound";
import {INITIAL_TIME} from "../constants/mockData";

interface TimerProps {
    onReset: () => void;
}

const Timer: React.FC<TimerProps> = ({onReset}) => {
    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer: number;
        if (isRunning && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
        }
        console.log(timeLeft);
        if (timeLeft === 15) {
            console.log('15 seconds left');
            playAlertSound();
        }
        if (timeLeft === 0) {
            playEndSound();
        }
        return () => clearTimeout(timer);
    }, [isRunning, timeLeft]);

    const startTimer = useCallback(() => setIsRunning(true), []);
    const pauseTimer = useCallback(() => setIsRunning(false), []);
    const resetTimer = useCallback(() => {
        setIsRunning(false);
        setTimeLeft(INITIAL_TIME);
        onReset();
    }, [onReset]);

    const formattedTime = useMemo(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, [timeLeft]);

    return (
        <>
            <S.TimerDisplay>
                <S.TimerText>{formattedTime}</S.TimerText>
            </S.TimerDisplay>
            <Space>
                <S.StyledButton
                    icon={isRunning ? <PauseCircleOutlined/> : <PlayCircleOutlined/>}
                    onClick={isRunning ? pauseTimer : startTimer}
                >
                    {isRunning ? '暂停' : '开始'}
                </S.StyledButton>
                <S.StyledButton icon={<ReloadOutlined/>} onClick={resetTimer}>
                    重置
                </S.StyledButton>
            </Space>
        </>
    );
};

export default React.memo(Timer);