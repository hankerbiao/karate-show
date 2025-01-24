import styled from 'styled-components';
import {Button, Typography} from 'antd';

const {Title, Text} = Typography;

export const FullScreenContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background-color: #000;
    overflow: hidden;
    position: relative;
`;

export const MatchTitle = styled(Title)`
    color: white !important;
    text-align: center;
    margin: 2vh 0 !important;
`;

export const CompetitorCard = styled.div<{ color: string }>`
    background-color: ${props => props.color};
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 2vh 2vw 2vh; // 增加顶部内边距，10vh 可以根据需要调整
`;
export const CompetitorName = styled(Title)`
    color: white !important;
    font-size: 5vw !important;
    text-align: center;
    margin-top: 5vh !important;
    margin-bottom: 2vh !important;
`;

export const CompetitorUniversity = styled(Text)`
    color: white !important;
    font-size: 2.5vw !important;
    text-align: center;
    margin-bottom: 3vh;
`;

export const CompetitorScore = styled(Title)`
    color: white !important;
    font-size: 20vw !important;
    line-height: 1 !important;
    margin: 5vh 0 0 0 !important;
`;

export const CenterContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
`;

export const TimerDisplay = styled.div`
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding: 10px 20px;
`;

export const TimerText = styled(Title)`
    color: white !important;
    font-size: 6vw !important;
    margin: 0 !important;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #f0f0f0;
`;

export const CompetitorControls = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ScoreButtons = styled.div`
    display: flex;
    gap: 5px;
    margin-bottom: 5px;
`;

export const StyledButton = styled(Button)`
    font-size: 12px;
    padding: 0 8px;
    height: 24px;
`;

export const FoulDots = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 5px;
`;

export const FoulDot = styled.div`
    width: 20px;
    height: 20px;
    background-color: black;
    border-radius: 50%;
`;