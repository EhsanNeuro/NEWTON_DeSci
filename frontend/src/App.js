import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { AppRoot, List, Chip, Avatar, Image } from '@telegram-apps/telegram-ui';
import { MyTabbar } from './components/MyTabbar'; // Assuming you have this component
import NewtonLogo from '../src/images/apologonobg.png'; // Assuming your logo path is correct
import LoadingPage from './components/LoadingPage'; // Assuming you have this component
import { retrieveLaunchParams } from '@telegram-apps/sdk';


export const App = () => {
  const { initDataRaw } = retrieveLaunchParams();
// Base API URL

    const [user, setUser] = useState(null); // Telegram user data
    const [userData, setUserData] = useState(0); // User token balance
    const [loading, setLoading] = useState(true); // Loading state

    fetch('http://37.27.29.15:3000/auth/login', {
      method: 'POST',
      headers: {
        'Authorization': `tma ${initDataRaw}`, // Ensure initDataRaw contains the correct value
        'Content-Type': 'application/json', // Required for JSON payloads
      },
      body: JSON.stringify({
        initData: {initDataRaw}, // Replace with the actual initData value
        referralToken: "string", // Replace with the actual referralToken value
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => console.log('Response:', data))
      .catch(error => console.error('Error:', error));
    
    useEffect(() => {
        const tg = window.Telegram.WebApp;

        // Initialize Telegram WebApp
        tg.ready();

        // Fetch and set user data
        const telegramUser = tg.initDataUnsafe?.user || null;
        setUser(telegramUser);

        // Fetch user token balance from backend
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://37.27.29.15:3000/user/me/', {
                    userId: telegramUser?.id,
                });
                setUserData(response);
            } catch (error) {
                console.error('Error fetching tokens:', error);
            } finally {
                setLoading(false); // Stop loading spinner
            }
        };

        if (telegramUser) {
            fetchUser();
        } else {
            setLoading(false); // No user data, stop loading
        }

        // Set theme colors dynamically
        const { secondary_bg_color } = tg.themeParams || {};
        if (secondary_bg_color) {
            document.body.style.backgroundColor = secondary_bg_color;
        }
    }, []);

    if (loading) {
        return <AppRoot><LoadingPage /></AppRoot> ;
    }

    return (
        <AppRoot>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh', // Full viewport height
                overflow: 'hidden', // Prevent overall scrolling
            }}>
                {/* Fixed Header */}
                <List style={{
                    background: 'var(--tgui--secondary_bg_color)',
                    padding: 10,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0, // Prevent shrinking
                }}>
                    <div style={{
                        display: 'flex',
                        gap: 25,
                        alignItems: 'center',
                        backgroundColor: 'var(--tgui--primary_bg_color)'
                    }}>
                        <Chip mode="elevated" before={<Avatar size={20} />}>
                            {user?.first_name || 'Guest'}
                        </Chip>
                        <Image
                            size={64}
                            src={NewtonLogo}
                            alt="App logo"
                        />
                        <Chip mode="elevated" before={<Avatar size={20} />}>
                            {userData.tokens || 100}
                        </Chip>
                    </div>
                </List>

                {/* Tabbar Navigation */}
                <MyTabbar />
            </div>
        </AppRoot>
    );
};

export default App;
