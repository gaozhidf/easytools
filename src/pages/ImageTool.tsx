import React, { useState } from 'react';
import { Card, Upload, Select, Button, message, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { UploadOutlined, FileImageOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';

const { Option } = Select;
const { Text } = Typography;

const ImageTool: React.FC = () => {
  const { t } = useTranslation();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [format, setFormat] = useState('jpeg');
  const [preview, setPreview] = useState<string>('');

  const convertImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const convertedDataUrl = canvas.toDataURL(`image/${format}`);
          setPreview(convertedDataUrl);
          message.success(t('common.success'));
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = (file: File) => {
    convertImage(file);
    return false;
  };

  const downloadImage = () => {
    if (preview) {
      const link = document.createElement('a');
      link.href = preview;
      link.download = `converted.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const fillWithExample = () => {
    message.info(t('image.exampleMessage'));
  };

  return (
    <Card title={t('image.title')}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <Text type="secondary">{t('image.description')}</Text>
        </div>
        <div>
          <Text strong>{t('common.example')}:</Text>
          <Text type="secondary" style={{ marginLeft: 8 }}>{t('image.example')}</Text>
          <Button 
            type="link" 
            icon={<FileImageOutlined />} 
            onClick={fillWithExample}
            size="small"
            style={{ marginLeft: 8 }}
          >
            {t('common.fillExample')}
          </Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Upload
            customRequest={({ file }) => handleUpload(file as File)}
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>{t('image.select')}</Button>
          </Upload>
          <Select value={format} onChange={setFormat} style={{ width: 100 }}>
            <Option value="jpeg">JPEG</Option>
            <Option value="png">PNG</Option>
            <Option value="webp">WebP</Option>
          </Select>
        </div>
        {preview && (
          <div>
            <div style={{ marginBottom: 8 }}>
              <Button type="primary" onClick={downloadImage}>
                {t('qrcode.download')}
              </Button>
            </div>
            <img 
              src={preview} 
              alt={t('image.convertedImage')} 
              style={{ maxWidth: '100%', borderRadius: '4px' }} 
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default ImageTool; 