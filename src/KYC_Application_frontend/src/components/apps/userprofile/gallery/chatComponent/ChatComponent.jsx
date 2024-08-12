import React, { useState } from 'react';
import { Divider, Box } from '@mui/material';
import PageContainer from '../../../../container/PageContainer';
import ChatSidebar from './ChatSidebar';
import ChatContent from './ChatContent';
import ChatMsgSent from './ChatMsgSent';
import AppCard from '../../../../shared/AppCard'

const ChatComponent = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <PageContainer title="Chat ui" description="this is Chat page">
      <AppCard>
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}

        <ChatSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}

        <Box flexGrow={1}>
          <ChatContent toggleChatSidebar={() => setMobileSidebarOpen(true)} />
          <Divider />
          <ChatMsgSent />
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default ChatComponent;
