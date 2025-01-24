import React from 'react';
import { Row, Col } from 'antd';
import { Match } from '../types';
import CompetitorCard from './CompetitorCard';

interface ScoreBoardProps {
    match: Match;
    scores: { competitor1: number; competitor2: number };
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ match, scores }) => (
    <Row style={{ flex: 1, width: '100%' }}>
        {(['competitor1', 'competitor2'] as const).map((competitor, index) => (
            <Col span={12} key={competitor}>
                <CompetitorCard
                    name={match[competitor].name}
                    university={match[competitor].university}
                    score={scores[competitor]}
                    color={index === 0 ? 'red' : 'blue'}
                />
            </Col>
        ))}
    </Row>
);

export default React.memo(ScoreBoard);