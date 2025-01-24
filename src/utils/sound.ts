// 播放音频
const playSound = (mp3_path: string) => {
    const audio = new Audio(mp3_path);
    audio.play().catch(error => console.error('Error playing sound:', error));
};

// 导出播放特定音效的函数
export const playAlertSound = () => playSound('src/assets/sounds/alert.mp3');
export const playEndSound = () => playSound('src/assets/sounds/end.mp3');
