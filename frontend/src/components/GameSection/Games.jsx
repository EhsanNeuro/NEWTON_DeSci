import React from 'react'
import {List, Cell, Section,Badge,Avatar, Image, Button, IconButton, Icon20QuestionMark} from '@telegram-apps/telegram-ui'
import I1 from './highest unique.png';
import I2 from './two third.png';
import {CircleHelp,ArrowRight} from 'lucide-react';
export default function Games() {
  return (
<List 
        style={{
          background: 'var(--tgui--secondary_bg_color)',
          width: '100%',
        }}
      >
        <Section
          header="Active Games"
          footer="Each game is repeated daily. More games are on the way!"
        >
          <Cell
          disabled
             after={            <ArrowRight  />         }
             before={<Image size={72} src = {I1} />}
            description="Coming Soon"
            titleBadge={<IconButton
              mode="bezeled"
              size="s"
            >
              <CircleHelp />
            </IconButton>}
          >
            Unique Peak
          </Cell>
          <Cell
            disabled
            after={            <ArrowRight  />         }
            before={<Image size={72} src = {I2} />}
            description="Coming Soon"
            titleBadge={<IconButton
              mode="bezeled"
              size="s"
            >
              <CircleHelp />
            </IconButton>}
          >
            Echo Division
          </Cell>
        
        </Section>
      </List>  )
}
