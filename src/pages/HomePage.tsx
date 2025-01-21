// src/pages/HomePage.tsx
import React from 'react';
import MatchDisplay from '../components/MatchDisplay';
import { mockMatch } from '../constants/mockData';

const HomePage: React.FC = () => {
    return <MatchDisplay match={mockMatch} />;
};

export default HomePage;