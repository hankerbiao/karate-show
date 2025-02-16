import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import * as S from '../styles/MatchDisplay.styles';
import { playAlertSound, playEndSound } from "../utils/sound";
import { INITIAL_TIME } from "../constants/mockData";

const ALERT_TIME = 15;
const END_TIME = 0;

// 自定义 Hook 用于计时器逻辑
const useTimer = (initialTime: number, onReset: () => void) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef<number | null>(null);

    const resetTimer = useCallback(() => {
        setIsRunning(false);
        setTimeLeft(initialTime);
        onReset();
    }, [initialTime, onReset]);

    const toggleTimer = useCallback(() => {
        setIsRunning(prev => !prev);
    }, []);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            timerRef.current = window.setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        if (timeLeft === ALERT_TIME) {
            playAlertSound();
        } else if (timeLeft === END_TIME) {
            playEndSound();
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [isRunning, timeLeft]);

    return { timeLeft, isRunning, resetTimer, toggleTimer };
};

// 显示组件
const TimerDisplay: React.FC<{ timeLeft: number; isRunning: boolean }> = React.memo(({ timeLeft, isRunning }) => {
    const displayText = useMemo(() => {
        if (timeLeft === INITIAL_TIME) return '准备中';
        if (timeLeft === END_TIME) return '比赛结束';

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (!isRunning && timeLeft !== INITIAL_TIME) {
            return `▶${formattedTime}`;
        }

        return formattedTime;
    }, [isRunning, timeLeft]);

    const isWarning = timeLeft < ALERT_TIME && timeLeft > END_TIME;
    return (
        <S.TimerDisplay>
            <S.TimerText>
                <span style={{ color: isWarning ? 'orange' : 'inherit' }}>{displayText}</span>
            </S.TimerText>
        </S.TimerDisplay>
    );
});

interface TimerProps {
    onReset: () => void;
}

const Timer: React.FC<TimerProps> = ({ onReset }) => {
    const { timeLeft, isRunning, resetTimer, toggleTimer } = useTimer(INITIAL_TIME, onReset);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                playEndSound();
                event.preventDefault();
                toggleTimer();
            } else if (event.key.toLowerCase() === 'r') {
                resetTimer();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [toggleTimer, resetTimer]);

    return <TimerDisplay timeLeft={timeLeft} isRunning={isRunning} />;
};

export default React.memo(Timer);