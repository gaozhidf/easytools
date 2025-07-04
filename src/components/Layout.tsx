import React, { useState } from 'react';
import { Layout, Menu, Button, Space, Select, Drawer } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  GlobalOutlined,
  LockOutlined,
  FileTextOutlined,
  PictureOutlined,
  ClockCircleOutlined,
  LinkOutlined,
  SearchOutlined,
  BgColorsOutlined,
  QrcodeOutlined,
  FileMarkdownOutlined,
  NumberOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import Logo from './Logo';
import ThemeSwitch from './ThemeSwitch';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // 监听窗口大小变化
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
  };

  const menuItems = [
    {
      key: '/base64',
      label: t('base64.title'),
      icon: <LockOutlined />
    },
    {
      key: '/json',
      label: t('json.title'),
      icon: <FileTextOutlined />
    },
    {
      key: '/ip',
      label: t('ip.title'),
      icon: <GlobalOutlined />
    },
    {
      key: '/image',
      label: t('image.title'),
      icon: <PictureOutlined />
    },
    {
      key: '/timestamp',
      label: t('timestamp.title'),
      icon: <ClockCircleOutlined />
    },
    {
      key: '/url',
      label: t('url.title'),
      icon: <LinkOutlined />
    },
    {
      key: '/regex',
      label: t('regex.title'),
      icon: <SearchOutlined />
    },
    {
      key: '/color',
      label: t('color.title'),
      icon: <BgColorsOutlined />
    },
    {
      key: '/qrcode',
      label: t('qrcode.title'),
      icon: <QrcodeOutlined />
    },
    {
      key: '/markdown',
      label: t('markdown.title'),
      icon: <FileMarkdownOutlined />
    },
    {
      key: '/number',
      label: t('number.title'),
      icon: <NumberOutlined />
    },
    {
      key: '/md5',
      label: t('md5.title'),
      icon: <SafetyCertificateOutlined />
    }
  ];

  const getThemeColors = (themeName: string) => {
    switch (themeName) {
      case 'default':
        return {
          primaryColor: '#1890ff',
          secondaryColor: '#52c41a',
          backgroundColor: '#ffffff',
          textColor: '#000000',
          borderColor: '#d9d9d9'
        };
      default:
        return {
          primaryColor: '#1890ff',
          secondaryColor: '#52c41a',
          backgroundColor: '#ffffff',
          textColor: '#000000',
          borderColor: '#d9d9d9'
        };
    }
  };

  const colors = getThemeColors(currentTheme);

  const renderMenu = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <Logo />
      </div>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => {
          navigate(key);
          if (isMobile) {
            setCollapsed(true);
          }
        }}
        style={{ 
          flex: 1, 
          overflow: 'auto',
          width: collapsed ? 80 : 256,
          transition: 'width 0.2s'
        }}
      />
    </div>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isMobile ? (
        <Drawer
          placement="left"
          onClose={() => setCollapsed(true)}
          open={!collapsed}
          width={250}
          bodyStyle={{ padding: 0 }}
        >
          {renderMenu()}
        </Drawer>
      ) : (
        <Sider 
          trigger={null} 
          collapsible 
          collapsed={collapsed}
          style={{
            background: colors.backgroundColor,
            borderRight: `1px solid ${colors.borderColor}`,
            position: 'relative',
            height: '100vh',
            overflow: 'hidden',
            transition: 'all 0.2s'
          }}
        >
          {renderMenu()}
        </Sider>
      )}
      <Layout>
        <Header 
          style={{ 
            padding: 0, 
            background: colors.backgroundColor,
            borderBottom: `1px solid ${colors.borderColor}`,
            position: isMobile ? 'fixed' : 'relative',
            top: 0,
            zIndex: 999,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'all 0.2s'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
                color: colors.textColor,
                transition: 'all 0.2s'
              }}
            />
          </div>
          <Space style={{ padding: '0 16px' }}>
            <ThemeSwitch currentTheme={currentTheme} onThemeChange={handleThemeChange} />
            <Select
              defaultValue="zh"
              style={{ width: 100 }}
              options={[
                { value: 'zh', label: '中文' },
                { value: 'en', label: 'English' }
              ]}
              onChange={(value) => {
                i18n.changeLanguage(value);
                
              }}
            />
          </Space>
        </Header>
        <Content 
          style={{ 
            margin: isMobile ? '64px 16px 16px' : '16px',
            padding: 16,
            background: colors.backgroundColor,
            minHeight: 280,
            borderRadius: '4px'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;