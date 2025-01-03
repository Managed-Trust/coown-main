import {
  CardContent,
  Box,
  Avatar,
  InputAdornment, 
  Grid,
  Typography,
  Chip,
  Divider,
  IconButton,
   TextField,Button, MenuItem, FormControl, Select, Stack 
} from '@mui/material';
import React, { useEffect } from 'react';
import BlankCard from '../../../../components/shared/BlankCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFollwores } from '../../../../store/apps/userProfile/UserProfileSlice';
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTwitter,
  IconSearch,
} from '@tabler/icons';

const SocialIcons = [
  {
    name: 'Facebook',
    icon: <IconBrandFacebook size="18" color="#1877F2" />,
  },
  {
    name: 'Instagram',
    icon: <IconBrandInstagram size="18" color="#D7336D" />,
  },
  {
    name: 'Github',
    icon: <IconBrandGithub size="18" color="#006097" />,
  },
  {
    name: 'Twitter',
    icon: <IconBrandTwitter size="18" color="#1C9CEA" />,
  },
];

const FriendsCard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFollwores());
  }, [dispatch]);

  const filterFriends = (friends, cSearch) => {
    if (friends)
      return friends.filter((t) =>
        t.name.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase()),
      );

    return friends;
  };
  const [search, setSearch] = React.useState('');
  const getFriends = useSelector((state) =>
    filterFriends(state.userpostsReducer.followers, search),
  );

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" spacing={2} mt={2} sx={{ backgroundColor: '#F8F9FB', p: 2, borderRadius: '8px' }}>
            {/* Search Input */}
            <Box flex={1}>
              <TextField
                id="outlined-search"
                placeholder="Search for contact"
                size="small"
                type="search"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size="16" />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>

            {/* Groups Select */}
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <Select
                defaultValue="All groups"
                displayEmpty
                variant="outlined"
                sx={{ backgroundColor: 'white' }}
              >
                <MenuItem value="All groups">All groups</MenuItem>
                <MenuItem value="Friends">Friends</MenuItem>
                <MenuItem value="Family">Family</MenuItem>
                <MenuItem value="Work">Work</MenuItem>
              </Select>
            </FormControl>

            {/* Invite Button */}
            <Button
              variant="contained"
              color="primary"
              sx={{ minWidth: 120, textTransform: 'none' }}
            >
              + Invite
            </Button>
          </Stack>
        </Grid>
        {getFriends.map((profile) => {
          return (
            <Grid item xs={12} lg={4} key={profile.id}>
              <BlankCard className="hoverCard">
                <CardContent>
                  <Stack direction={'column'} gap={2} alignItems="center">
                    <Avatar
                      alt="Remy Sharp"
                      src={profile.avatar}
                      sx={{ width: '80px', height: '80px' }}
                    />
                    <Box textAlign={'center'}>
                      <Typography variant="h5">{profile.name}</Typography>
                      <Typography variant="caption">{profile.role}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
                <Divider />
                <Box p={2} py={1} textAlign={'center'} sx={{ backgroundColor: 'grey.100' }}>
                  {SocialIcons.map((sicon) => {
                    return <IconButton key={sicon.name}>{sicon.icon}</IconButton>;
                  })}
                </Box>
              </BlankCard>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default FriendsCard;
