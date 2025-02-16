import { Match } from '../types';

export const mockMatches: Match[] = [
    {
        id: '1',
        name: '2025年天津市大学生空手道比赛 - 男子73kg级决赛',
        competitor1: {
            university: '天津城建大学',
            name: '张三',
        },
        competitor2: {
            university: '天津城建大学',
            name: '李四',
        },
    },
    {
        id: '2',
        name: '2025年天津市大学生空手道比赛 - 女子61kg级半决赛',
        competitor1: {
            university: '天津大学',
            name: '王五',
        },
        competitor2: {
            university: '南开大学',
            name: '赵六',
        },
    },
];

export const INITIAL_TIME = 20;  // 单次比赛倒计时
export const MAX_FOULS = 4;  // 最大犯规次数