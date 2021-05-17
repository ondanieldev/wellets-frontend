import React, { useCallback } from 'react';
import {
  Box,
  Center,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  Icon,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { FiUser, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { useAuth } from 'Hooks/auth';

interface IProps {
  color?: string;
}

const Header: React.FC<IProps> = ({ color }) => {
  const history = useHistory();
  const { user, signOut } = useAuth();

  const handleBackward = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleForward = useCallback(() => {
    history.goForward();
  }, [history]);

  return (
    <Box
      bg="gray.900"
      p="10px"
      borderBottom="2px solid"
      borderColor={`${color || 'green'}.300`}
    >
      <Center>
        <Icon
          as={FiArrowLeft}
          w={30}
          h={30}
          color={`${color || 'green'}.300`}
          mr="10px"
          cursor="pointer"
          onClick={handleBackward}
        />
        {user && (
          <Menu>
            <MenuButton>
              <Avatar
                icon={<FiUser size={35} />}
                bg={`${color || 'green'}.300`}
              />
            </MenuButton>
            <MenuList>
              <LinkBox>
                <MenuItem>
                  <LinkOverlay href="/">Menu</LinkOverlay>
                </MenuItem>
              </LinkBox>
              <LinkBox>
                <MenuItem>
                  <LinkOverlay href="/wallets">Wallets</LinkOverlay>
                </MenuItem>
              </LinkBox>
              <LinkBox>
                <MenuItem>
                  <LinkOverlay href="/currencies">Currencies</LinkOverlay>
                </MenuItem>
              </LinkBox>
              <MenuItem onClick={signOut}>Log out</MenuItem>
            </MenuList>
          </Menu>
        )}
        <Icon
          as={FiArrowRight}
          w={30}
          h={30}
          color={`${color || 'green'}.300`}
          ml="10px"
          cursor="pointer"
          onClick={handleForward}
        />
      </Center>
    </Box>
  );
};

export default Header;
