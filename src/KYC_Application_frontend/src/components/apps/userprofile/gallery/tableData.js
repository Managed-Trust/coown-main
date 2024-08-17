import img1 from '../../../../assets/images/profile/user-1.jpg';
import img2 from '../../../../assets/images/profile/user-2.jpg';
import img3 from '../../../../assets/images/profile/user-3.jpg';
import img4 from '../../../../assets/images/profile/user-4.jpg';

const EnhancedTableData = [
  {
    id: '1',
    imgsrc: img1,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    isStakeholder: true,
    accounts: 5,
    role: 'Owner',
    status: 'Active',
  },
  {
    id: '2',
    imgsrc: img2,
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    isStakeholder: true,
    accounts: 4,
    role: 'Admin',
    status: 'Active',
  },
  {
    id: '3',
    imgsrc: img3,
    name: 'Carol White',
    email: 'carol.white@example.com',
    isStakeholder: false,
    accounts: 1,
    role: 'Member',
    status: 'Pending',
  },
  {
    id: '4',
    imgsrc: img4,
    name: 'David Lee',
    email: 'david.lee@example.com',
    isStakeholder: false,
    accounts: 1,
    role: 'Viewer',
    status: 'Deactivated',
  },
];

export { EnhancedTableData };
