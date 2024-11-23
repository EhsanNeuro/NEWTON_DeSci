import newtonwapple from './newtonwithapple.png'
import { useRef, useState } from 'react';
//import styles from './TooltipSection.module.css';

import { Banner, Button, Section, Tooltip } from '@telegram-apps/telegram-ui';
export default function HowToPlay() {

  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  return (
    <div 
    style={{
      display: "flex",
      alignItems: "center",
      backgroundColor: 'var(--tgui--secondary_bg_color)',
      height: "auto", 
      width: "auto", // Changed from 100vw
      gap: 10,
    }}
  >
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          width: "90%",
        }}
      >
    
        <Button
          ref={ref}
          size="l"
          style={{width:'75%'}}
          onClick={() => setShown(!shown)}
        >
          {shown ? 'Okay!' : 'How to Play?'}
        </Button>
     
      {shown && (
        <Tooltip
          mode="dark"
          targetRef={ref}
        >
         1- Read the laws of each game, it's simple!
<br/>
2- Submit your answer and get instant rewards!
<br/>
3- Come back next to see the results!
<br/>
4- Repeat everyday! The more you're active, the bigger your rewards!
        </Tooltip>
      )}


      </div>
      
      <img
        src={newtonwapple}
        style={{
          objectFit: "contain",
          width: '160px',
        }}
      />
    </div>
  )
}