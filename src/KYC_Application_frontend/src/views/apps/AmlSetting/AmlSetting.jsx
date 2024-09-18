import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import TicketListing from './TicketListing'
import ChildCard from '../../../components/shared/ChildCard';
import React, { useState, useEffect } from 'react';
import { useConnect } from '@connect2ic/react';
import ic from 'ic0';

const ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Ledger canister
// const ledger = ic("sifoc-qqaaa-aaaap-ahorq-cai"); // Production canister

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'AML Setting',
  },
];

const AmlSetting = () => {


  return (
    <PageContainer title="AML Setting" description="this is Note page">
      <Breadcrumb title="AML Setting" items={BCrumb} />
      <ChildCard> 
        <TicketListing />
      </ChildCard>
    </PageContainer>
  );
};

export default AmlSetting;
