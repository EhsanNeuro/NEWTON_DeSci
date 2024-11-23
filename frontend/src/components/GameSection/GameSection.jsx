import React from 'react';
import { Button, Avatar, Badge, List, Cell, Section } from '@telegram-apps/telegram-ui';
import HowToPlay from './HowToPlay';
import Games from './Games';

export const GameSection = () => (
<div 
        style={{
          height: 'calc(100vh - 180px)', 
          overflowY: 'auto', 
          overflowX: 'hidden', 
        }}>

        <HowToPlay/>
      <Games/>
    
  </div>
);

export default GameSection;
