import { Layout } from 'antd';
import type { ReactNode } from 'react';

const { Content } = Layout;

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px',
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default AuthLayout;

