// pages/MatchesPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import MatchDisplay from '../components/MatchDisplay';
import useKeyboardNavigation from '../hooks/useKeyboardNavigation';
import { Match } from '../types';


const ContentWrapper = styled.div`
  width: 90%;
  max-width: 1200px;
`;

const MatchesPage: React.FC = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

    useEffect(() => {
        const storedMatches = localStorage.getItem('matches');
        if (storedMatches) {
            setMatches(JSON.parse(storedMatches));
        }
    }, []);

    const changeMatch = useCallback((direction: 'next' | 'previous') => {
        const newIndex = direction === 'next'
            ? Math.min(currentMatchIndex + 1, matches.length - 1)
            : Math.max(currentMatchIndex - 1, 0);

        if (newIndex !== currentMatchIndex) {
            Modal.confirm({
                title: `确定要切换到${direction === 'next' ? '下' : '上'}一场比赛吗？`,
                onOk: () => {
                    setCurrentMatchIndex(newIndex);
                },
            });
        }
    }, [currentMatchIndex, matches.length]);

    const handleNext = useCallback(() => changeMatch('next'), [changeMatch]);
    const handlePrevious = useCallback(() => changeMatch('previous'), [changeMatch]);

    useKeyboardNavigation(handleNext, handlePrevious);

    if (matches.length === 0) {
        return <div>No matches found. Please upload a file first.</div>;
    }

    return (
            <ContentWrapper>
                <MatchDisplay
                    key={currentMatchIndex}
                    match={matches[currentMatchIndex]}
                />
            </ContentWrapper>
    );
};

export default MatchesPage;