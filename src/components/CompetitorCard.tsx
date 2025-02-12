import React from "react";
import * as S from "../styles/MatchDisplay.styles";

interface CompetitorCardProps {
  name: string;
  university: string;
  score: number;
  color: "red" | "blue";
}

const CompetitorCard: React.FC<CompetitorCardProps> = ({
  name,
  university,
  score,
  color,
}) => (
  <S.CompetitorCard color={color}>
    <S.CompetitorName>{name}</S.CompetitorName>
    <S.CompetitorUniversity>{university}</S.CompetitorUniversity>
    <S.CompetitorScore>{score}</S.CompetitorScore>
  </S.CompetitorCard>
);

export default React.memo(CompetitorCard);
