import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const LogoSVG: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* 工具箱主体 */}
    <rect x="8" y="16" width="32" height="24" rx="2" stroke="#000000" strokeWidth="3.5" fill="#fafafa" />
    {/* 工具箱提手 */}
    <path d="M18 16V12C18 10.8954 18.8954 10 20 10H28C29.1046 10 30 10.8954 30 12V16" stroke="#000000" strokeWidth="3.5" fill="none" />
    {/* 工具箱分隔线 */}
    <line x1="8" y1="24" x2="40" y2="24" stroke="#000000" strokeWidth="2.5" />
    {/* 工具箱锁扣 */}
    <rect x="22" y="20" width="4" height="4" rx="1" fill="#000000" />
    {/* 工具图标 */}
    <path d="M16 32L16 36" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 28L24 36" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M32 30L32 36" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const Logo: React.FC<{ collapsed?: boolean }> = ({ collapsed = false }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: collapsed ? 0 : '8px', justifyContent: collapsed ? 'center' : 'flex-start' }}>
      <LogoSVG size={collapsed ? 32 : 32} />
      {!collapsed && (
        <Title level={4} style={{ margin: 0, whiteSpace: 'nowrap' }}>
          EasyTools
        </Title>
      )}
    </div>
  );
};

export default Logo;