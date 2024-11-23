import React from 'react';
import { SegmentedControl,Cell,Spoiler } from '@telegram-apps/telegram-ui';
function LearnSection() {
  return (
    <div >
        <SegmentedControl>
  <SegmentedControl.Item
    disabled
  >
    Courses
  </SegmentedControl.Item>
  <SegmentedControl.Item
    disabled
  >
    Events
  </SegmentedControl.Item>
 
</SegmentedControl>
<Cell >
      Courses and events are on the way!
    </Cell>
<Spoiler>
    <Cell description>
    For paid ones, <br/> you'll be able to pay<br/> with Eureka token
    </Cell>
  </Spoiler>
    </div>
  )
}

export default LearnSection
