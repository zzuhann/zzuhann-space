import { useState, useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { Box } from '@mui/material';
import lottieJson from '../../../public/assets/loading2.json';

// ----------------------------------------------------------------------

const StyledRoot = styled(Box)(() => ({
  right: 0,
  bottom: 0,
  zIndex: 9998,
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
}));

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

// ----------------------------------------------------------------------

export function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <StyledRoot>
      <StyledBox>
        <Player
          lottieRef={(ref) => {
            ref.playSegments([0, 138], true);
          }}
          autoplay
          loop
          src={lottieJson}
          style={{ height: '300px', width: '300px' }}
        >
          <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
        </Player>
      </StyledBox>
    </StyledRoot>
  );
}
