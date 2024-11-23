import React, { useState, useEffect } from 'react';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { AppRoot, List, Chip, Avatar, Image } from '@telegram-apps/telegram-ui';
import { MyTabbar } from './components/MyTabbar';
import NewtonLogo from '../src/images/apologonobg.png';
import LoadingPage from './components/LoadingPage';
import { retrieveLaunchParams } from '@telegram-apps/sdk';

export const App = () => {
  const { initDataRaw } = retrieveLaunchParams();
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    const telegramUser = tg.initDataUnsafe?.user || null;
    setUser(telegramUser);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${initDataRaw}`);

    // First authenticate
    fetch('http://37.27.29.15:3000/auth/login', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        initData: initDataRaw,
        referralToken: ""
      })
    })
    .then(response => {
      console.log('Auth response status:', response.status);
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(`Auth failed: ${response.status} ${text}`);
        });
      }
      return response.json();
    })
    .then(authData => {
      console.log('Auth successful:', authData);
      
      // After auth success, try user/me
      return fetch('http://37.27.29.15:3000/user/me', {
        method: 'GET',
        headers: headers
      });
    })
    .then(response => {
      console.log('User/me response status:', response.status);
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(`User data failed: ${response.status} ${text}`);
        });
      }
      return response.json();
    })
    .then(data => {
      console.log('User data received:', data);
      setApiData(data);
      setLoading(false);
    })
    .catch(err => {
      console.error('Full error:', err);
      setError(err.message);
      setLoading(false);
    });

  }, [initDataRaw]);

  // Add network status check
  useEffect(() => {
    const checkConnection = () => {
      fetch('http://37.27.29.15:3000/health', { 
        method: 'GET',
        mode: 'no-cors' 
      })
      .then(() => console.log('Server is reachable'))
      .catch(err => console.log('Server connection error:', err));
    };

    checkConnection();
  }, []);

  if (loading) {
    return (
      <AppRoot>
        <LoadingPage />
        <div style={{ padding: 20, textAlign: 'center' }}>
          Connecting to server...
        </div>
      </AppRoot>
    );
  }

  if (error) {
    return (
      <AppRoot>
        <div style={{ padding: 20 }}>
          <h3>Connection Error:</h3>
          <p>{error}</p>
          <p>Server Status: Checking connection...</p>
          <details>
            <summary>Technical Details</summary>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              Init Data: {initDataRaw}
            </pre>
          </details>
        </div>
      </AppRoot>
    );
  }

  return (
    <AppRoot>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}>
        <List style={{
          background: 'var(--tgui--secondary_bg_color)',
          padding: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
        }}>
          <div style={{
            display: 'flex',
            gap: 25,
            alignItems: 'center',
          }}>
            <Chip mode="elevated" before={<Avatar size={20} />}>
              {user?.first_name || 'Guest'}
            </Chip>
            <Image
              size={64}
              src={NewtonLogo}
              alt="App logo"
            />
            <Chip mode="outline" before={<Avatar size={20} />}>
              {apiData?.tokens ?? 0}
            </Chip>
          </div>
        </List>

        <MyTabbar />
      </div>
    </AppRoot>
  );
};

export default App;