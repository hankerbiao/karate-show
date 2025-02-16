// pages/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FileUploader from '../components/FileUploader';
import { Match } from '../types';
import backgroundImage from '../assets/background.jpg';

const FullScreenContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100vw;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

const ContentWrapper = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    padding: 2rem;
    border-radius: 10px;
`;

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleUploadSuccess = (importedMatches: Match[]) => {
        // 将比赛数据存储到 localStorage
        localStorage.setItem('matches', JSON.stringify(importedMatches));
        // 导航到比赛详情页面
        navigate('/matches');
    };

    return (
        <FullScreenContainer>
            <ContentWrapper>
                <FileUploader onUploadSuccess={handleUploadSuccess} />
            </ContentWrapper>
        </FullScreenContainer>
    );
};

export default HomePage;