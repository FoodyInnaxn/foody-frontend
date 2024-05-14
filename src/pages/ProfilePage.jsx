import React, { useState, useEffect, useContext } from 'react';
import { Avatar, Typography, Button, Divider, TextField } from '@mui/material';
import { styled } from '@mui/system';
import ProfileAPI from '../apis/ProfileAPI';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import UserSavedRecipes from '../components/UserSavedRecipes';
import UserRecipes from '../components/UserRecipes';

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

const RecipesContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: '16px',
});

const RecipeList = styled('div')({
  width: '48%',
});

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState({});
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await ProfileAPI.getProfile(user.userId);
        setUserProfile(response);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          console.error('Error fetching profile:', error);
        }
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [navigate, user]);

  const handleEditProfile = () => {
    setEditing(true);
    setFirstName(userProfile.firstName);
    setLastName(userProfile.lastName);
    setBio(userProfile.bio);
    setUsername(userProfile.username);
    setEmail(userProfile.email);
  };

  const handleSaveProfile = async () => {
    try {
      await ProfileAPI.updateProfile(user.userId, { firstName, lastName, bio });
      setEditing(false);
      setUserProfile({ ...userProfile, firstName, lastName, bio });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleUpdateUsernameEmail = async () => {
    try {
      const id = user.userId
      await ProfileAPI.updateEmailAndUsername(user.userId, {id, username, email });
      setUserProfile({ ...userProfile, username, email });
      setEditing(false);
    } catch (error) {
      console.error('Error updating username and email:', error);
    }
  };

  return (
    <>
      <RootContainer>
        <AvatarImage alt={userProfile.firstName} src={userProfile.avatarUrl} />
        {editing ? (
          <>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              multiline
              rows={4}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSaveProfile}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Name variant="h5">
              {userProfile.firstName} {userProfile.lastName}
            </Name>
            <Typography variant="body1">
              Username: <b>{userProfile.username}</b>
            </Typography>
            <Typography fontWeight="bold" variant="body1">
              {userProfile.email}
            </Typography>
            <Bio variant="body1">About: {userProfile.bio}</Bio>
            <EditButton variant="contained" color="primary" onClick={handleEditProfile}>
              Edit Profile
            </EditButton>
            
          </>
        )}
         {editing && (
          <>
            {/* Input fields for editing username and email */}
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleUpdateUsernameEmail}>
              Update Username & Email
            </Button>
          </>
        )}
      </RootContainer>
      <Divider />
      
      <RecipesContainer>
        <RecipeList>
          <UserSavedRecipes userId={user.userId} />
        </RecipeList>
        <RecipeList>
          <UserRecipes userId={user.userId} />
        </RecipeList>
      </RecipesContainer>
    </>
  );
};

export default ProfilePage;
