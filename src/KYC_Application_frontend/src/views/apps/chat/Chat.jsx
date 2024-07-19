import React, { useState, useEffect } from 'react';
import { Divider, Box, CircularProgress } from '@mui/material';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import ChatSidebar from '../../../components/apps/chats/ChatSidebar';
import ChatContent from '../../../components/apps/chats/ChatContent';
import ChatMsgSent from '../../../components/apps/chats/ChatMsgSent';
import AppCard from '../../../components/shared/AppCard';
import { useConnect } from '@connect2ic/react';
import ic from 'ic0';

const ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Ledger canister
// const ledger = ic("sifoc-qqaaa-aaaap-ahorq-cai"); // Production canister

const Chats = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const [loading, setLoading] = useState(false);

  const { isConnected, principal } = useConnect({
    onConnect: () => {},
    onDisconnect: () => {},
  });

  const fetchMessages = async () => {
    if (selectedGroup) {
      try {
        console.log("Group:", selectedGroup);
        const res = await ledger.call("getGroupMessaging", selectedGroup.adminId);
        setMessages(res);
        console.log("Fetched Messages", res);
      } catch (e) {
        console.log("Error fetching Message:", e);
      }
    }
  };

  useEffect(() => {
    fetchMessages();
    if (intervalId) {
      clearInterval(intervalId);
    }
    const newIntervalId = setInterval(fetchMessages, 5000); // fetch messages every 5 seconds
    setIntervalId(newIntervalId);

    return () => {
      clearInterval(newIntervalId);
    };
  }, [selectedGroup]);

  const handleSendMessage = async (msg) => {
    if (selectedGroup) {
      setLoading(true);
      try {
        const response = await ledger.call("createGroupMessaging", msg.groupId, principal, msg.msg);
        if (response) {
          fetchMessages(); // Fetch messages immediately after sending a new one
        }
      } catch (e) {
        console.log("Error sending message:", e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <PageContainer title="Chat ui" description="this is Chat page">
      <Breadcrumb title="Chat app" subtitle="Messenger" />
      <AppCard>
        <ChatSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
          onSelectGroup={setSelectedGroup}
        />
        <Box flexGrow={1} display="flex" flexDirection="column">
          <ChatContent
            group={selectedGroup}
            messages={messages}
            toggleChatSidebar={() => setMobileSidebarOpen(true)}
          />
          <Divider />
          {selectedGroup && (
            <ChatMsgSent selectedGroup={selectedGroup} onSendMessage={handleSendMessage} disabled={loading} />
          )}
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default Chats;
