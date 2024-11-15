import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import { ChevronRight } from 'lucide-react';

export default function Dashboard() {
  const acceptedRules = [
    {
      id: 1,
      ruleName: 'Send unlimited wrapped bitcoin to a system user',
      assetType: 'ckBTC',
      fee: '0.00002 ckBTC',
    },
    {
      id: 2,
      ruleName: 'Send unlimited wrapped bitcoin to an unknown user',
      assetType: 'ckBTC',
      fee: '0.00002 ckBTC',
    },
    {
      id: 3,
      ruleName: 'Send up to 1,000 € worth of ckBTC to a known user',
      assetType: 'ckBTC',
      fee: '0.00002 ckBTC',
    },
  ];

  const availableRules = [
    {
      id: 4,
      ruleName: 'Sending ICP',
      assetType: 'ICP',
      fee: '0.005 ICP',
    },
    {
      id: 5,
      ruleName: 'Send any NFT',
      assetType: 'NFT',
      fee: '0.05 USD',
    },
    {
      id: 6,
      ruleName: 'Send custom NFT',
      assetType: 'NFT',
      fee: '0.05 USD',
    },
    {
      id: 7,
      ruleName: 'Sent to DEX where we get kick',
      assetType: 'ckBTC',
      fee: '0.00002 ckBTC',
    },
  ];

  const RulesTable = ({ rules, title }) => (
    <Card sx={{ mb: 4, borderRadius: 2, boxShadow: 3 }}>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: 'h5', fontWeight: 500 }}
        sx={{ pb: 0 }}
      />
      <CardContent>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontSize:'14px' }}>ID</TableCell>
                <TableCell style={{ fontSize:'14px' }}>Rule name</TableCell>
                <TableCell style={{ fontSize:'14px' }}>Asset type</TableCell>
                <TableCell style={{ fontSize:'14px' }}>Your fee</TableCell>
                <TableCell width={50}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule.id} hover>
                  <TableCell style={{ fontSize:'14px' }} >{rule.id}</TableCell>
                  <TableCell style={{ fontWeight:'600',fontSize:'14px' }}>{rule.ruleName}</TableCell>
                  <TableCell style={{ fontSize:'14px' }}>{rule.assetType}</TableCell>
                  <TableCell style={{ fontSize:'14px' }}>{rule.fee}</TableCell>
                  <TableCell>
                    <IconButton size="small" color="primary">
                      <ChevronRight className="h-4 w-4" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <RulesTable title="Accepted Transaction Rules" rules={acceptedRules} />
      <RulesTable title="Available Transaction Rules" rules={availableRules} />
    </Box>
  );
}
