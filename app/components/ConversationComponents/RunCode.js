import React, { useState } from 'react';

import SmallButton from '../styled/SmallButton';

import CodeConsole from './CodeConsole';

export default ({ reply, idx }) => {
  const [isRunning, setIsRunning] = useState(false);

  const handleOnClick = () => {
    setIsRunning(!isRunning);
  }

  return (
    <div>
      { isRunning ? (
        <div>
          <CodeConsole reply={reply} idx={idx}/>
          <SmallButton secondary onClick={handleOnClick}>Hide Code</SmallButton>
        </div>
      ) : <SmallButton onClick={handleOnClick}>Run Code</SmallButton>}
    </div>
  )
}