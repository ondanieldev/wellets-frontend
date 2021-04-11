import React from 'react';
import {
  Box,
  Center,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FiUser } from 'react-icons/fi';

import { useAuth } from 'Hooks/auth';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Box
      bg="gray.900"
      p="10px"
      borderBottom="2px solid"
      borderColor="green.300"
    >
      <Center>
        {user && (
          <Menu>
            <MenuButton>
              <Avatar icon={<FiUser size={35} />} bg="green.300" />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={signOut}>Log out</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Center>
    </Box>
  );
};

export default Header;
