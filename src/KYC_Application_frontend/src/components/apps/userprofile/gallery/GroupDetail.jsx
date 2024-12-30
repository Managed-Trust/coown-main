import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Card,
  Grid,
  CardContent,
  CardMedia,
  Typography,
  Paper,
  Box,
  Button,
  CircularProgress,
  Tabs,
  Tab,
  Avatar
} from "@mui/material";
import { useConnect } from "@connect2ic/react";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ic from "ic0";
import DetailComponent from "./DetailComponent";
import GroupMembers from "./GroupMembers";
import Overview from "./overviewComponent/overview";
import ChatComponent from "./chatComponent/ChatComponent";
import Setting from "./settingComponent/setting";
import Stakeholder from "./stakeHolderComponent/index";
import Accounts from "./accountComponent/account";
import Rewards from "./rewardComponent/reward";
import { useUser } from "../../../../userContext/UserContext";

// const ledger = ic.local('bkyz2-fmaaa-aaaaa-qaaaq-cai'); //local
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai"); // Ledger canister



const groupDetails = {
  name: "Tech Innovators Inc.",
  balances: [
    {
      currency: "ckBTC",
      amount: 1.715156,
      usd: 11193.91,
      change: 7.11,
    },
    {
      currency: "ckUSDC",
      amount: 25458,
      usd: 25458,
      change: -3.64,
    },
    {
      currency: "ICP",
      amount: 120,
      usd: 9512.4,
      change: 7.11,
    },
    {
      currency: "$COOWN",
      amount: 120,
      usd: 9512.4,
      change: 7.11,
    },
  ],
  isAdmin: true,
  users: [
    {
      name: "John Doe",
      avatarUrl:
        "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg",
      role: "Member",
      status: "Inactive",
      limitPerTransaction: 100,
      dailyLimitation: 1000,
      monthlyLimitation: 30000,
      limitationPercentage: 5,
    },
    {
      name: "Jane Smith",
      avatarUrl:
        "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg",
      role: "Admin",
      status: "Active",
      limitPerTransaction: 200,
      dailyLimitation: 2000,
      monthlyLimitation: 60000,
      limitationPercentage: 10,
    },
    {
      name: "Sam Wilson",
      avatarUrl:
        "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg",
      role: "Moderator",
      status: "Pending",
      limitPerTransaction: 150,
      dailyLimitation: 1500,
      monthlyLimitation: 45000,
      limitationPercentage: 7,
    },
  ],
};

const GroupDetailPage = () => {
  const { user, setUser } = useUser();
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [fetchingGroup, setFetchingGroup] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  const { isConnected, principal } = useConnect({
    onConnect: () => { },
    onDisconnect: () => { },
  });


  useEffect(() => {
    if (user) {
      fetchGroup();
    }
  }, [user]);

  const fetchGroup = async () => {
    setFetchingGroup(true);
    try {
      const groupDetailResponse = await ledger.call("getGroup", groupId);
      setGroup(groupDetailResponse);
      console.log("Group", groupDetailResponse);

    } catch (e) {
      console.log("Error fetching groups:", e);
    } finally {
      setFetchingGroup(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };


  return (
    <Container>
      {fetchingGroup ? (
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Grid>
      ) : (
        <>
          {group && (
            <>
              <Card style={{ padding: "0px" }}>
                <CardMedia
                  component="img"
                  height="300"
                  image="/images/groupCover/default.svg"
                  alt={groupDetails.name}
                />
                <CardContent
                  sx={{
                    position: "relative",
                    top: -140,
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  <Card>
                    <CardContent
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="start"
                        mb={2}
                        gap={0.5}
                      >
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar
                            alt={groupDetails.name}
                            src="/images/logos/appleLogo.svg" // Replace with the actual avatar URL or path
                            style={{ width: 120, height: 120 }}
                          />
                          <Box display="flex" alignItems="start" flexDirection="column">
                            <Typography variant="body2" color="textSecondary">
                              Groups • {groupDetails.name}
                            </Typography>
                            <Typography gutterBottom variant="h2" component="div">
                              {groupDetails.name}
                            </Typography>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              style={{
                                borderRadius: "12px",
                                textTransform: "none",
                                backgroundColor: "#E0E7FF",
                                color: "#3B82F6",
                              }}
                            >
                              {group[0] && (group[0].groupType)}
                            </Button>
                          </Box>

                        </Box>

                      </Box>
                      <Box display="flex" justifyContent="flex-end">
                        <Button
                          variant="outlined"
                          color="primary"
                          style={{ marginRight: "8px", height: "fit-content" }}
                        >
                          Edit details
                        </Button>
                        <Button
                          variant="outlined"
                          color="primary"
                          style={{ height: "fit-content" }}
                        >
                          Edit cover
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>

                  {group[0] && group[0].groupType == "Incorporation" &&
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#4e84ff',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        color: '#fff',
                        my: 1,
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      {/* Left side - Info text with an icon */}
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <InfoOutlinedIcon sx={{ marginRight: '8px', color: '#fff' }} />
                        <Typography variant="body1">
                          To begin using your group and accounts, please compete the initial group setup and the KYC verification.

                        </Typography>
                      </Box>
                      {groupId &&
                        <Link to={`/group/registerCompany/${groupId}`} >
                          <Typography
                            sx={{
                              color: '#fff',
                              borderRadius: '20px',
                              padding: '6px 16px',
                              textTransform: 'none',
                              '&:hover': {
                                backgroundColor: '#333',
                              },
                            }}
                          >
                            Start verification
                          </Typography>
                        </Link>
                      }
                    </Box>
                  }
                  {group[0] &&
                    <>
                      {group[0] && group[0].groupType === "Incorporation" ?
                        <>
                          <Card style={{ marginTop: "16px", paddingBottom: "0px" }}>
                            <Box mt={0}>

                              <Tabs value={tabValue} onChange={handleTabChange} aria-label="group detail tabs" >
                                <Tab label="Overview" />
                                <Tab label="Account" />
                                <Tab label="Assets" />
                                <Tab label="Members" />
                                <Tab label="Stakeholders" />
                                <Tab label="Subgroups" />
                                <Tab label="Rewards" />
                                <Tab label="Chats" />
                                <Tab label="Details" />
                                <Tab label="Settings" />
                              </Tabs>
                            </Box>
                          </Card>

                          <Card style={{ marginTop: "6px" }}>
                            <Box>
                              <CardContent>
                                {tabValue === 0 && (
                                  <Box>
                                    <Overview />
                                  </Box>
                                )}
                                {tabValue === 1 && (
                                  <Accounts />
                                )}
                                {tabValue === 2 && (
                                  <Box>
                                    {/* Assets Component */}
                                    <Typography>Assets Component</Typography>
                                  </Box>
                                )}
                                {tabValue === 3 && (
                                  <Box>
                                    {/* Member Component */}
                                    <GroupMembers groupId = {groupId}/>
                                  </Box>
                                )}
                                {tabValue === 4 && (
                                  <>
                                    <Box>
                                      {/* <Stakeholder groupId={groupId} /> */}
                                      <Stakeholder groupId={groupId} />
                                    </Box>
                                  </>
                                )}
                                {tabValue === 5 && (
                                  <>
                                    <Box>
                                      <Typography>Subgroups Component</Typography>
                                    </Box>
                                  </>
                                )}
                                {tabValue === 6 && (
                                  <Box>
                                    <Rewards />
                                  </Box>
                                )}

                                {tabValue === 7 && (
                                  <Box>
                                    <ChatComponent />
                                  </Box>
                                )}
                                {tabValue === 8 && (
                                  <Box>
                                    {/* Details Component */}
                                    <DetailComponent Group={group} />
                                  </Box>
                                )}
                                {tabValue === 9 && (
                                  <Box>
                                    {/* Setting Component */}
                                    <Setting />
                                  </Box>
                                )}
                              </CardContent>
                            </Box>
                          </Card>
                        </> : <>
                          <Card style={{ marginTop: "16px", paddingBottom: "0px" }}>
                            <Box mt={0}>

                              <Tabs value={tabValue} onChange={handleTabChange} aria-label="group detail tabs" >
                                <Tab label="Overview" />
                                <Tab label="Account" />
                                <Tab label="Assets" />
                                <Tab label="Members" />
                                <Tab label="Chats" />
                                <Tab label="Rewards" />
                                <Tab label="Details" />
                                <Tab label="Settings" />
                              </Tabs>
                            </Box>
                          </Card>
                          <Card style={{ marginTop: "6px" }}>
                            <Box>
                              <CardContent>
                                {tabValue === 0 && (
                                  <Box>
                                    <Overview />
                                  </Box>
                                )}
                                {tabValue === 1 && (
                                  <Accounts />
                                )}
                                {tabValue === 2 && (
                                  <Box>
                                    {/* Assets Component */}
                                    <Typography>Assets Component</Typography>
                                  </Box>
                                )}
                                {tabValue === 3 && (
                                  <Box>
                                    {/* Member Component */}
                                    <GroupMembers groupId={groupId}/>
                                  </Box>
                                )}
                                {tabValue === 4 && (
                                  <Box>
                                    <ChatComponent />
                                  </Box>
                                )}
                                {tabValue === 5 && (
                                  <Box>
                                    <Rewards />
                                  </Box>
                                )}
                                {tabValue === 6 && (
                                  <Box>
                                    {/* Details Component */}
                                    <DetailComponent Group={group} />
                                  </Box>
                                )}
                                {tabValue === 7 && (
                                  <Box>
                                    {/* Setting Component */}
                                    <Setting />
                                  </Box>
                                )}
                              </CardContent>
                            </Box>
                          </Card>
                        </>}
                    </>}
                </CardContent>
              </Card>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default GroupDetailPage;
