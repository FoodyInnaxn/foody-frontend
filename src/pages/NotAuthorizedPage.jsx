import React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const NeonText = styled(Typography)(({ theme }) => ({
  fontSize: '10rem',
  color: 'rgb(255, 0, 0)',
  textShadow: '0 0 20px rgb(255, 0, 0), 0 0 30px rgb(255, 0, 0)',
  animation: `${theme.transitions.create('textShadow', {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
    iterationCount: 'infinite',
    direction: 'alternate',
  })}`,
}));

const DoorFrame = styled('div')({
  position: 'relative',
  width: '100px',
  height: '180px',
  perspective: '800px',
});

const Door = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  transformStyle: 'preserve-3d',
  animation: '$open 4s forwards',
});

const Rectangle = styled('div')({
  position: 'absolute',
  top: 'calc(50% - 40px)',
  left: 'calc(50% - 50px)',
  width: '100px',
  height: '80px',
  background: '#6b4c4c',
  boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)',
});

const Handle = styled('div')({
  position: 'absolute',
  top: 'calc(50% - 5px)',
  left: 'calc(50% - 3px)',
  width: '6px',
  height: '10px',
  background: '#403232',
  borderRadius: '10px',
});

const Window = styled('div')({
  position: 'absolute',
  top: 'calc(50% - 30px)',
  left: 'calc(50% - 30px)',
  width: '60px',
  height: '60px',
  background: '#fff',
  border: '3px solid #403232',
  borderRadius: '50%',
  overflow: 'hidden',
});

const Eye = styled('div')({
  position: 'absolute',
  top: 'calc(50% - 10px)',
  left: 'calc(50% - 5px)',
  width: '10px',
  height: '10px',
  background: '#000',
  borderRadius: '50%',
});

const Eye2 = styled('div')({
  position: 'absolute',
  top: 'calc(50% - 10px)',
  left: 'calc(50% - 5px)',
  width: '10px',
  height: '10px',
  background: '#000',
  borderRadius: '50%',
  transform: 'translateX(20px)',
});

const Leaf = styled('div')({
  position: 'absolute',
  top: 'calc(50% + 10px)',
  left: 'calc(50% - 15px)',
  width: '30px',
  height: '20px',
  background: '#005108',
  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
});

function NotAuthorizedPage() {
  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: '2rem' }}>You are not authorized.</Typography>
      <Typography variant="body1" sx={{ marginBottom: '2rem' }}>You tried to access a page you did not have prior authorization for.</Typography>
      <Container>
        <NeonText variant="h1">403</NeonText>
        <DoorFrame>
          <Door>
            <Rectangle />
            <Handle />
            <Window>
              <Eye />
              <Eye2 />
              <Leaf />
            </Window>
          </Door>
        </DoorFrame>
      </Container>
    </div>
  );
}

export default NotAuthorizedPage;
