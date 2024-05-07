import React from 'react';
import { Avatar, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const RootContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px',
});

const AvatarImage = styled(Avatar)({
  width: '96px',
  height: '96px',
  marginBottom: '8px',
});

const Name = styled(Typography)({
  marginBottom: '4px',
});

const Bio = styled(Typography)({
  marginBottom: '8px',
});

const EditButton = styled(Button)({
  marginTop: '8px',
});

const ProfilePage = () => {
  const userProfile = {
    name: 'John Doe',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    avatarUrl: 'https://example.com/avatar.jpg',
  };

  const handleEditProfile = () => {
    // Handle edit profile action
  };

  return (
    <RootContainer>
      <AvatarImage alt={userProfile.name} src={userProfile.avatarUrl} />
      <Name variant="h5">{userProfile.name}</Name>
      <Bio variant="body1">{userProfile.bio}</Bio>
      <EditButton
        variant="contained"
        color="primary"
        onClick={handleEditProfile}
      >
        Edit Profile
      </EditButton>
    </RootContainer>
  );
};

export default ProfilePage;
