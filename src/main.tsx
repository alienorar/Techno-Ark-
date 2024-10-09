
import { createRoot } from 'react-dom/client'
import Root from './router/index.tsx'
import { ConfigProvider } from 'antd';
import './index.css'

createRoot(document.getElementById("root")!).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#e35112",
      },
    }}
  >
    <Root />
  </ConfigProvider>
);



