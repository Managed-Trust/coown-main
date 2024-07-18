import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Grid,
  Typography,
  Chip,
  TextField,
  IconButton,
  CardMedia,
  Skeleton,
  Button,
  MenuItem,
  FormControl,
  Select,
  Paper,
  Menu,
  CircularProgress,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import BlankCard from "../../../../components/shared/BlankCard";
import CustomFormLabel from "../../../forms/theme-elements/CustomFormLabel";
import { useSelector, useDispatch } from "react-redux";
import { fetchPhotos } from "../../../../store/apps/userProfile/UserProfileSlice";
import { IconDotsVertical } from "@tabler/icons";
import emailjs from "@emailjs/browser";
import { useConnect } from "@connect2ic/react";
import ic from "ic0";
const ledger = ic.local("bd3sg-teaaa-aaaaa-qaaba-cai"); // Ledger canister

import CryptoJS from "crypto-js";

const secretKey = "your-secret-key"; // Use a strong secret key

const hashData = (data) => {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
};

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const initialState = {
  groupName: "",
  groupId: "",
  addressOfLegalEntity: "",
  residencyOfGroup: "",
  groupDescription: "",
  groupImage: "",
};

const GalleryCard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [formData, setFormData] = useState(initialState);
  const [filePreviews, setFilePreviews] = useState({});
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const [showInviteUserForm, setShowInviteUserForm] = useState(false);
  const [groups, setGroups] = useState([]);
  const [fetchingGroups, setFetchingGroups] = useState(true);

  const { isConnected, principal } = useConnect({
    onConnect: () => {},
    onDisconnect: () => {},
  });

  useEffect(() => {
    console.log("Principal:", principal);
  }, [principal]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setShowInviteUserForm(true);
  };

  const handleInputChange = (e) => {
    const { id, value, name } = e.target;
    const inputId = id || name; // for Select component
    setFormData((prevData) => ({
      ...prevData,
      [inputId]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const { id, files } = e.target;
    const file = files[0];

    if (id === "groupImage") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1]; // Extract base64 string
        setFormData((prevData) => ({
          ...prevData,
          [id]: base64String,
        }));
        setFilePreviews((prev) => ({
          ...prev,
          [id]: URL.createObjectURL(file),
        }));
      };
      reader.readAsDataURL(file);
    } else {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      setFormData((prevData) => ({
        ...prevData,
        [id]: uint8Array,
      }));
      setFilePreviews((prev) => ({
        ...prev,
        [id]: URL.createObjectURL(file),
      }));
    }
  };

  useEffect(() => {
    const fetchGroup = async () => {
      setFetchingGroups(true);
      try {
        if (principal) {
          const response = await ledger.call("getGroupIdsByUserId", principal);
          if (response != null) {
            setGroups(response);
            console.log("Group IDs:", response);
            const groupDetails = await Promise.all(
              response.map(async (groupId) => {
                try {
                  const groupDetailResponse = await ledger.call(
                    "getGroup",
                    groupId
                  );
                  return groupDetailResponse;
                } catch (e) {
                  console.error(
                    `Error fetching group details for group ID ${groupId}:`,
                    e
                  );
                  return null;
                }
              })
            );
            setGroups(groupDetails.filter((group) => group !== null));
            console.log("Groups:", groupDetails[0][0]);
          }
        }
      } catch (e) {
        console.log("Error fetching groups:", e);
      } finally {
        setFetchingGroups(false);
      }
    };

    fetchGroup();
  }, [principal, ledger]);

  const generateGroupId = () => {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    return `${principal}-${timestamp}-${randomNum}`;
  };

  const handleCreateGroupClick = () => {
    const groupId = generateGroupId();
    setFormData((prevData) => ({
      ...prevData,
      groupId: groupId,
    }));
    setShowCreateGroupForm(true);
    setShowInviteUserForm(false);
  };

  const handleCreateGroup = async () => {
    console.log("Create Group Data:", formData);
    try {
      const response = await ledger.call(
        "createGroup",
        encryptData(formData.groupName),
        principal,
        formData.groupId,
        encryptData(formData.addressOfLegalEntity),
        encryptData(formData.residencyOfGroup),
        encryptData(formData.groupDescription),
        encryptData(formData.groupImage)
      );
      alert(response);
    } catch (e) {
      console.log("Error Creating Group:", e);
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={12} lg={12}>
          <Stack direction="row" alignItems="center" mt={2}>
            <Box>
              <Typography variant="h3">
                Groups &nbsp;
                <Chip label={groups.length} color="secondary" size="small" />
              </Typography>
            </Box>
            <Box ml="auto">
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateGroupClick}
                sx={{ mr: 2 }}
              >
                Create Group
              </Button>
            </Box>
          </Stack>
        </Grid>
        {showCreateGroupForm || showInviteUserForm ? (
          <>
            {showCreateGroupForm && (
              <Grid container spacing={3} mt={3}>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="groupName">
                    Group Name
                  </CustomFormLabel>
                  <TextField
                    id="groupName"
                    fullWidth
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="addressOfLegalEntity">
                    Address of Legal Entity
                  </CustomFormLabel>
                  <TextField
                    id="addressOfLegalEntity"
                    fullWidth
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="residencyOfGroup">
                    Residency of Group
                  </CustomFormLabel>
                  <TextField
                    id="residencyOfGroup"
                    fullWidth
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="groupDescription">
                    Group Description
                  </CustomFormLabel>
                  <TextField
                    id="groupDescription"
                    fullWidth
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="groupImage">
                    Group Image
                  </CustomFormLabel>
                  <TextField
                    id="groupImage"
                    type="file"
                    fullWidth
                    onChange={handleFileChange}
                  />
                  {filePreviews.groupImage && (
                    <Paper
                      elevation={3}
                      sx={{ mt: 2, width: 100, height: 100 }}
                    >
                      <img
                        src={filePreviews.groupImage}
                        alt="Group Image"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Paper>
                  )}
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="flex-end"
                    mt={3}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCreateGroup}
                    >
                      Create Group
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            )}
          </>
        ) : (
          <Grid container spacing={3}>
            <Grid item sm={12} lg={12}>
              <Stack direction="row" alignItems="center" mt={2}>
                <Box>
                  <Typography variant="h3">
                    Groups &nbsp;
                    <Chip
                      label={groups.length}
                      color="secondary"
                      size="small"
                    />
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            {fetchingGroups ? (
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
              groups.map((group) => (
                <Grid item xs={12} lg={4} key={group[0].adminId}>
                  <Link
                    to={`/group/${group[0].adminId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <BlankCard className="hoverCard cursor-pointer">
                      <CardMedia
                        component={"img"}
                        height="220"
                        alt="Group Image"
                        src={
                          group[0].groupImage && group[0].groupImage.length > 0
                            ? "data:image/png;base64," + group[0].groupImage[0]
                            : "https://via.placeholder.com/150"
                        }
                      />
                      <Box p={3}>
                        <Stack direction="row" gap={1}>
                          <Box>
                            <Typography variant="h6" color="textPrimary">
                              {group[0].name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {group.description}
                            </Typography>
                          </Box>
                          <Box ml={"auto"}>
                            <IconButton onClick={handleMenuClick}>
                              <IconDotsVertical size="16" />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleMenuClose}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                            >
                              <MenuItem onClick={handleMenuClose}>
                                Invite User to Group
                              </MenuItem>
                            </Menu>
                          </Box>
                        </Stack>
                      </Box>
                    </BlankCard>
                  </Link>
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default GalleryCard;
