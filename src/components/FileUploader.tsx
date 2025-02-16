// components/FileUploader.tsx
import React, { useCallback } from 'react';
import { Button, Upload, message } from 'antd';
import {UploadOutlined, CloudUploadOutlined, DownloadOutlined} from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import * as XLSX from 'xlsx';
import { Match } from '../types';
import styled, { keyframes } from 'styled-components';

interface FileUploaderProps {
    onUploadSuccess: (matches: Match[]) => void;
}

type ExcelRow = {
    'ID': number;
    '比赛名称': string;
    '红方单位': string;
    '红方姓名': string;
    '蓝方单位': string;
    '蓝方姓名': string;
};

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
    0% { box-shadow: 0 0 0 0 rgba(64, 158, 255, 0.4); }
    70% { box-shadow: 0 0 0 12px rgba(64, 158, 255, 0); }
    100% { box-shadow: 0 0 0 0 rgba(64, 158, 255, 0); }
`;

const StyledUploadContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2.5rem;
    background: linear-gradient(135deg, #f8f9ff 0%, #f0f5ff 100%);
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.3);
    animation: ${fadeIn} 0.6s ease-out;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-2px);
    }
`;

const StyledUploadButton = styled(Button)`
  margin-bottom: 1.5rem;
  height: 48px;
  padding: 0 2rem;
  font-weight: 500;
  background: linear-gradient(135deg, #409eff, #6c5ce7);
  color: white;
  border: none;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 6px rgba(64, 158, 255, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(64, 158, 255, 0.3);
    background: linear-gradient(135deg, #52a3ff, #7d6dec);
  }

  &:active {
    transform: translateY(0);
  }
`;

const StyledText = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0;
  font-weight: 300;
  text-align: center;
  line-height: 1.6;
  max-width: 280px;
`;

const IconWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  &:after {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 50%;
    animation: ${pulse} 2s infinite;
  }
`;

const DownloadButton = styled(Button)`
  margin-top: 1rem;
`;

const FileUploader: React.FC<FileUploaderProps> = ({ onUploadSuccess }) => {
    const parseExcelFile = useCallback((file: RcFile): Promise<Match[]> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target?.result as ArrayBuffer);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const jsonData = XLSX.utils.sheet_to_json<ExcelRow>(worksheet);

                    const importedMatches: Match[] = jsonData.map((row) => ({
                        id: row['ID'].toString(),
                        name: row['比赛名称'],
                        competitor1: {
                            university: row['红方单位'],
                            name: row['红方姓名'],
                        },
                        competitor2: {
                            university: row['蓝方单位'],
                            name: row['蓝方姓名'],
                        },
                    }));

                    resolve(importedMatches);
                } catch (error) {
                    reject(new Error('文件解析失败，请检查文件格式是否正确。'));
                }
            };
            reader.onerror = () => reject(new Error('文件读取失败。'));
            reader.readAsArrayBuffer(file);
        });
    }, []);

    const handleFileUpload = useCallback(async (file: RcFile) => {
        try {
            if (file.size > 5 * 1024 * 1024) {
                throw new Error('文件大小不能超过5MB。');
            }

            const importedMatches = await parseExcelFile(file);
            onUploadSuccess(importedMatches);
            message.success('文件导入成功！');
        } catch (error) {
            message.error(error instanceof Error ? error.message : '文件导入失败。');
        }
        return false;
    }, [onUploadSuccess, parseExcelFile]);

    const downloadTemplate = useCallback(() => {
        const template = [
            {
                'ID': '1',
                '比赛名称': '天津市大学生空手道比赛男子68kg级1/4',
                '红方单位': '天津城建大学',
                '红方姓名': '张三',
                '蓝方单位': '天津理工大学',
                '蓝方姓名': '李四'
            },
            {
                'ID': '2',
                '比赛名称': '天津市大学生空手道比赛男子68kg级1/2',
                '红方单位': '天津财经大学',
                '红方姓名': '王五',
                '蓝方单位': '天津工业大学',
                '蓝方姓名': '赵六'
            }
        ];

        const ws = XLSX.utils.json_to_sheet(template);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "模板");

        XLSX.writeFile(wb, "比赛数据导入模板.xlsx");
    }, []);

    return (
        <StyledUploadContainer>
            <IconWrapper>
                <CloudUploadOutlined style={{
                    fontSize: '2.2rem',
                    color: '#409eff',
                    filter: 'drop-shadow(0 4px 6px rgba(64, 158, 255, 0.2))'
                }} />
            </IconWrapper>
            <Upload
                accept=".xlsx,.xls"
                beforeUpload={handleFileUpload}
                showUploadList={false}
            >
                <StyledUploadButton icon={<UploadOutlined style={{ fontSize: '1.2rem' }} />} size="large">
                    导入比赛数据
                </StyledUploadButton>
            </Upload>
            <StyledText>
                支持 .xlsx 和 .xls 格式文件<br />
                文件大小不超过5MB
            </StyledText>
            <DownloadButton
                icon={<DownloadOutlined />}
                onClick={downloadTemplate}
                type="link"
            >
                下载Excel模板
            </DownloadButton>
        </StyledUploadContainer>
    );
};


export default FileUploader;