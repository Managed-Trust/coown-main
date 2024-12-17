import React, { useState } from 'react';
import {
  Box,
  Typography,
  Switch,
  TextField,
  Drawer,
  Fab,
  Tooltip,
  IconButton,
  Tabs,
  Tab,
  Checkbox,
  Select, MenuItem, Button
} from '@mui/material';
import { IconX, IconSettings } from '@tabler/icons';
import blackLogo from '/images/logos/tech-logo-black.jpg';
import Scrollbar from '../../../../components/custom-scroll/Scrollbar';
import Coown_Logo from '../../../../assets/images/profile/user-5.jpg';
const SidebarWidth = '420px';

const TabPanel = ({ children, value, index }) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      sx={{ p: 3 }}
    >
      {value === index && children}
    </Box>
  );
};

const Sidebar = ({ openDrawer, drawer }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <div>
      {/* Floating Button to Open Sidebar */}
      <Tooltip title="Settings">
        <Fab
          color="primary"
          aria-label="settings"
          sx={{ position: 'fixed', right: '25px', bottom: '15px' }}
          onClick={openDrawer}
        >
          <IconSettings stroke={1.5} />
        </Fab>
      </Tooltip>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="right"
        open={drawer}
        onClose={openDrawer}
        PaperProps={{
          sx: {
            width: SidebarWidth,
          },
        }}
      >
        <Scrollbar sx={{ height: 'calc(100vh - 5px)' }}>
          {/* Header */}
          <Box
            px={3}
            pt={3}
            display="flex"
            justifyContent="space-between"
            alignItems="start"
          >
            <Typography variant="h5">Add new affiliate group</Typography>
            <IconButton color="inherit" onClick={openDrawer}>
              <IconX size="1rem" />
            </IconButton>
          </Box>

          {/* Tabs */}
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            sx={{ mt: 1, p: 0.5 }}
          >
            <Tab label="Affiliated Group" />
            <Tab label="Focal Point" />
            <Tab label="SLA" />
            <Tab label="Revenue" />
          </Tabs>

          {/* Tab Panels */}
          <TabPanel value={tabIndex} index={0}>
            <Typography variant="h6" gutterBottom>
              Affiliate group
            </Typography>

            <Box mt={2}>
              <Typography variant="body2" color="textSecondary">
                Select  user group
              </Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                sx={{ mt: 1 }}
                placeholder="Enter Group ID number"
              />
              <Box sx={{ ml: 2 }}>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Find in contacts
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  sx={{ mt: 1 }}
                  placeholder="Search by name or email"
                />
              </Box>
              <Box display="flex" alignItems="center" gap={2} mt={1} mb={1} ml={2}>
                <Box
                  component="img"
                  src={blackLogo}
                  alt="Profile"
                  sx={{ width: 32, height: 32, borderRadius: '50%' }}
                />
                <Box flex={1}>
                  <Typography variant="subtitle2">Alpha Company  Innovators</Typography>
                  <Typography variant="body2" color="textSecondary">
                    ceo@techinnovators.com
                  </Typography>
                </Box>

              </Box>
              <Box display="flex" alignItems="center" gap={2} mt={2} mb={1} ml={2}>
                <Box
                  component="img"
                  src={blackLogo}
                  alt="Profile"
                  sx={{ width: 32, height: 32, borderRadius: '50%' }}
                />
                <Box flex={1}>
                  <Typography variant="subtitle2">Beta Company  Innovators</Typography>
                  <Typography variant="body2" color="textSecondary">
                    ceo@techinnovators.com
                  </Typography>
                </Box>

              </Box>
              <Box display="flex" alignItems="center" gap={2} mt={2} mb={1} ml={2}>
                <Box
                  component="img"
                  src={blackLogo}
                  alt="Profile"
                  sx={{ width: 32, height: 32, borderRadius: '50%' }}
                />
                <Box flex={1}>
                  <Typography variant="subtitle2">Gamma Company  Innovators</Typography>
                  <Typography variant="body2" color="textSecondary">
                    ceo@techinnovators.com
                  </Typography>
                </Box>

              </Box>
              <Box display="flex" alignItems="center" gap={2} mt={2} mb={1} ml={2}>
                <Box
                  component="img"
                  src={blackLogo}
                  alt="Profile"
                  sx={{ width: 32, height: 32, borderRadius: '50%' }}
                />
                <Box flex={1}>
                  <Typography variant="subtitle2">Delta Company  Innovators</Typography>
                  <Typography variant="body2" color="textSecondary">
                    ceo@techinnovators.com
                  </Typography>
                </Box>

              </Box>
            </Box>

            <Box mt={3}>
              <Box display="flex" alignItems="center" gap={1}>
                <Switch defaultChecked /> <Typography variant="body2" sx={{ fontSize: '14px' }}>Represented in the  Steering Committee</Typography>
              </Box>
            </Box>

            <Box mt={2}>
              <Typography variant="h6" color="textSecondary">
                Delegated User
              </Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                sx={{ mt: 1 }}
                placeholder="Enter Email"
              />
              <Box sx={{ ml: 2 }}>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Find in contacts
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  sx={{ mt: 1 }}
                  placeholder="Search by name or email"
                />
              </Box>
              <Box display="flex" alignItems="center" gap={2} mt={1} mb={1} ml={2}>
                <Box
                  component="img"
                  src={Coown_Logo}
                  alt="Profile"
                  sx={{ width: 32, height: 32, borderRadius: '50%' }}
                />
                <Box flex={1}>
                  <Typography variant="subtitle2">Alice Johnson</Typography>
                  <Typography variant="body2" color="textSecondary">
                    alice.johnson@example.com
                  </Typography>
                </Box>

              </Box>
              <Box display="flex" alignItems="center" gap={2} mt={2} mb={1} ml={2}>
                <Box
                  component="img"
                  src={Coown_Logo}
                  alt="Profile"
                  sx={{ width: 32, height: 32, borderRadius: '50%' }}
                />
                <Box flex={1}>
                  <Typography variant="subtitle2">Bob Smith</Typography>
                  <Typography variant="body2" color="textSecondary">
                    bob.smith@example.com
                  </Typography>
                </Box>

              </Box>
              <Box display="flex" alignItems="center" gap={2} mt={2} mb={1} ml={2}>
                <Box
                  component="img"
                  src={Coown_Logo}
                  alt="Profile"
                  sx={{ width: 32, height: 32, borderRadius: '50%' }}
                />
                <Box flex={1}>
                  <Typography variant="subtitle2">Carol White</Typography>
                  <Typography variant="body2" color="textSecondary">
                    carol.white@example.com
                  </Typography>
                </Box>

              </Box>
              <Box display="flex" alignItems="center" gap={2} mt={2} mb={1} ml={2}>
                <Box
                  component="img"
                  src={Coown_Logo}
                  alt="Profile"
                  sx={{ width: 32, height: 32, borderRadius: '50%' }}
                />
                <Box flex={1}>
                  <Typography variant="subtitle2">David Lee</Typography>
                  <Typography variant="body2" color="textSecondary">
                    david.lee@example.com
                  </Typography>
                </Box>

              </Box>
            </Box>
            <Box mt={3}>
              <Box display="flex" alignItems="center" gap={1}>
                <Switch defaultChecked /> <Typography variant="body2" sx={{ fontSize: '14px' }}>Represented in the Coordination Committee</Typography>
              </Box>
            </Box>

            <Box mt={2}>
              <Typography variant="h6" color="textSecondary">
                Associate Type
              </Typography>
              <Select
                fullWidth
                variant="outlined"
                sx={{ mt: 1, fontSize: '14px', fontWeight: 'bold' }}
              > <MenuItem value="All members">All members</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Owner">Owner</MenuItem>
                <MenuItem value="Member">Member</MenuItem>
              </Select>
              <Typography variant="caption" color="textSecondary" sx={{ mt: 1.5 }}>
                External website of affiliate
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography variant="h6" color="textSecondary">
                Website
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="https://"
                sx={{ mt: 1, fontSize: '14px', fontWeight: 'bold' }}
              />
              <Typography variant="caption" color="textSecondary" sx={{ mt: 1.5 }}>
                External website of affiliate
              </Typography>
            </Box>
            <Box
              display="flex"
              gap={2}
              alignItems="center"
              mt={2}
            >
              {/* Cancel Button */}
              <Button
                variant="outlined"
                color="primary"
              >
                Cancel
              </Button>

              {/* Save & Exit Button */}
              <Button
                variant="contained"
                sx={{ backgroundColor: '#4FC3F7', color: '#fff' }}
              >
                Save & Exit
              </Button>

              {/* Save & Next Button */}
              <Button
                variant="contained"
                color="primary"
              >
                Save & Next
              </Button>
            </Box>
          </TabPanel>

          <TabPanel value={tabIndex} index={1} pt={0}>

            <Box>
              <Typography variant="body" sx={{ fontWeight: 'bold' }} color="textSecondary">
                Name
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Name // consider using First Name, Last Name, and Role"
                sx={{ mt: 1, fontSize: '14px', fontWeight: 'bold' }}
              />
            </Box>
            <Box mt={1}>
              <Typography variant="body" sx={{ fontWeight: 'bold' }} color="textSecondary">
                Mail ( mail to be used for BCP implementation)
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Mail"
                sx={{ mt: 1, fontSize: '14px', fontWeight: 'bold' }}
              />
            </Box>
            <Box mt={1}>
              <Typography variant="body" sx={{ fontWeight: 'bold' }} color="textSecondary">
                Phone
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Phone"
                sx={{ mt: 1, fontSize: '14px', fontWeight: 'bold' }}
              />
            </Box>
            <Box mt={1}>
              <Typography variant="body" sx={{ fontWeight: 'bold' }} color="textSecondary">
                Preferred messaging method
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Messenger"
                sx={{ mt: 1, fontSize: '14px', fontWeight: 'bold' }}
              />
            </Box>
            <Box mt={1}>
              <Typography variant="body" sx={{ fontWeight: 'bold' }} color="textSecondary">
                Messenger ID, username, mail
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Messenger ID, username, mail"
                sx={{ mt: 1, fontSize: '14px', fontWeight: 'bold' }}
              />
            </Box>
            <Box mt={1}>
              <Typography variant="body" sx={{ fontWeight: 'bold' }} color="textSecondary">
                Name
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Name // consider using First Name, Last Name, and Role"
                sx={{ mt: 1, fontSize: '14px', fontWeight: 'bold' }}
              />
            </Box>
          </TabPanel>

          <TabPanel value={tabIndex} index={2}>
            {/* CRM Section */}
            <Typography variant="h6" gutterBottom>
              CRM
            </Typography>

            {/* Key Account Manager Section */}
            <Box mt={2}>
              <Typography variant="subtitle2" sx={{ fontSize: '14px', color: '#000', mb: 2 }}>
                Nominated Key Account Manager Supporting the Customer Experience
              </Typography>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Box
                  component="img"
                  src={Coown_Logo}
                  alt="Profile"
                  sx={{ width: 32, height: 32, borderRadius: '50%' }}
                />
                <Box flex={1}>
                  <Typography variant="subtitle2">Alice Johnson</Typography>
                  <Typography variant="body2" color="textSecondary">
                    alice.johnson@example.com
                  </Typography>
                </Box>
                <IconButton size="small">
                  <IconX size="1rem" />
                </IconButton>
              </Box>
              <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
                The Key Account Manager is an individual member of the Operator group nominated by the group owner or admin for supporting the customer experience. As focal point the Key Account Manager is primarily responsible for serving customers who have purchased this product by monitoring the invoices, by providing a first response to support requests, and by assisting the marketing activities of products owners e.g. for upselling additional products and services.
              </Typography>
            </Box>

            {/* Supervisor Section */}
            <Box mt={4}>
              <Typography variant="subtitle2" sx={{ fontSize: '14px', color: '#000', mb: 2 }}>
                Supervisor of Key Account Manager
              </Typography>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Box
                  component="img"
                  src={Coown_Logo}
                  alt="Profile"
                  sx={{ width: 32, height: 32, borderRadius: '50%' }}
                />
                <Box flex={1}>
                  <Typography variant="subtitle2">Alice Johnson</Typography>
                  <Typography variant="body2" color="textSecondary">
                    alice.johnson@example.com
                  </Typography>
                </Box>
                <IconButton size="small">
                  <IconX size="1rem" />
                </IconButton>
              </Box>
              <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
                The owner or an administrator of the Operator group, or the related subgroup shall be set as Supervisor of Key Account Manager ensuring supervision and quality management. The Supervisor also serves as substitute of the Key Account Manager to avoid any service interruption.
              </Typography>
            </Box>

            {/* CRM Team Section */}
            <Box mt={4}>
              <Typography variant="subtitle2" sx={{ fontSize: '14px', color: '#000', mb: 2 }}>
                CRM team
              </Typography>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Box
                  component="img"
                  src="/images/logos/tech-logo.jpg"
                  alt="Company"
                  sx={{ width: 32, height: 32, borderRadius: '50%' }}
                />
                <Box flex={1}>
                  <Typography variant="subtitle2">Tech Innovators</Typography>
                  <Typography variant="body2" color="textSecondary">
                    crm@techinnovators.com
                  </Typography>
                </Box>
                <IconButton size="small">
                  <IconX size="1rem" />
                </IconButton>
              </Box>
              <Box mt={2} display="flex" alignItems="start" gap={1}>
                <Checkbox size="small" />
                <Typography variant="caption" color="textSecondary">
                  Operator should specify a subgroup of members who are involved in the sales and marketing activities including invoicing, customer support, and customer experience management in general. The Supervisor and all Key Account Managers are grouped therein
                </Typography>
              </Box>
            </Box>

            {/* CRM Settings */}
            <Box mt={4}>
              <Box display="flex" alignItems="start" gap={1} mb={2}>
                <Checkbox size="small" />
                <Typography variant="caption" color="textSecondary">
                  CRM is automatically updated after a payment in Crypto is received
                </Typography>
              </Box>
              <Box display="flex" alignItems="start" gap={1} mb={2}>
                <Checkbox size="small" />
                <Typography variant="caption" color="textSecondary">
                  only available if enabled by the Software Developer
                </Typography>
              </Box>
            </Box>

            {/* CRM Tool Section */}
            <Box mt={4}>
              <Typography variant="subtitle2" sx={{ fontSize: '14px', color: '#000', mb: 2 }}>
                CRM tool
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="https://"
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Box display="flex" alignItems="start" gap={1}>
                <Checkbox size="small" />
                <Typography variant="caption" color="textSecondary">
                  External database where CRM tasks are handled
                </Typography>
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={tabIndex} index={3}>
            {/* Localization Section */}
            <Typography variant="h6" gutterBottom>
              Localization
            </Typography>
            <Typography variant="body2">
              Add localization settings and configurations here.
            </Typography>
          </TabPanel>
        </Scrollbar>
      </Drawer>
    </div>
  );
};

export default Sidebar;
