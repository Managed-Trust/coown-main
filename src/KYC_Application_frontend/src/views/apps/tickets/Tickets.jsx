import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import TicketListing from '../../../components/apps/tickets/TicketListing';
import TicketFilter from '../../../components/apps/tickets/TicketFilter';
import ChildCard from '../../../components/shared/ChildCard';
import React, { useState, useEffect } from 'react';
import { useConnect } from '@connect2ic/react';
import ic from 'ic0';

const ledger = ic.local("bd3sg-teaaa-aaaaa-qaaba-cai"); // Ledger canister
// const ledger = ic("sifoc-qqaaa-aaaap-ahorq-cai"); // Production canister

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Operator',
  },
];

const TicketList = () => {
  const [users, setUsers] = useState(null);
  const { isConnected, principal } = useConnect({
    onConnect: () => {},
    onDisconnect: () => {},
  });

  useEffect( () => {
    const fetchUsers = async () => {
      try{
        const response = await ledger.call("listCustomers");
        console.log("Users:",response);
        setUsers(response);
      }catch(e){
        console.log("Error Fetching Users:",e);
      }
    }

    fetchUsers();

  },[principal])

  return (
    <PageContainer title="Operator App" description="this is Note page">
      <Breadcrumb title="Operator App" items={BCrumb} />
      <ChildCard> 
        <TicketFilter Users={users}  />
        <TicketListing Users={users} />
      </ChildCard>
    </PageContainer>
  );
};

export default TicketList;
