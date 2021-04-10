import React from 'react';
import {
  Center,
  Heading,
  List,
  ListItem,
  ListIcon,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { FiCheckCircle } from 'react-icons/fi';

import Icon from 'Components/Atoms/Icon';

import { Container } from './styles';

interface IProps {
  icon: string;
  link: string;
  title: string;
  items: string[];
  palette: string[];
}

const MenuItem: React.FC<IProps> = ({ icon, items, palette, title, link }) => {
  return (
    <LinkBox w="100%" h="100%">
      <Center w="100%" h="100%">
        <Container
          py="50px"
          px="25px"
          w="100%"
          h="100%"
          maxW="325px"
          borderBottom="5px solid"
          borderTopRadius="10px"
          borderColor={palette[3]}
        >
          <Icon name={icon} color={palette[0]} />
          <Heading my="20px" color={palette[1]}>
            <LinkOverlay href={link}>{title}</LinkOverlay>
          </Heading>
          <List spacing={2}>
            {items.map(item => (
              <ListItem>
                <ListIcon as={FiCheckCircle} color={palette[2]} />
                {item}
              </ListItem>
            ))}
          </List>
        </Container>
      </Center>
    </LinkBox>
  );
};

export default MenuItem;
