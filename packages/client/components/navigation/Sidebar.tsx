import { useTranslation } from 'next-i18next';
import {
  Avatar,
  Stack,
  Button,
  Box,
  Divider,
  Link,
  Heading,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ClipboardList, Users } from 'tabler-icons-react';
import NextLink from 'next/link';
import { useState } from 'react';

import Navbar from './Navbar';

export default function Sidebar() {
  const { t } = useTranslation('common');
  const sidebar = useDisclosure();

  /**
   * @todo Add default userPurpose based on default user onboarding choice
   */
  const [userPurpose, setUserPurpose] = useState('/earn');
  const SidebarContent = (props: any) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      h="full"
      overflowX="hidden"
      overflowY="auto"
      bg="utility.light80"
      borderColor="gray.200"
      borderRightWidth="1px"
      w="72"
      {...props}
    >
      <Flex
        borderBottom="1px solid"
        borderColor="neutral.200"
        borderWidth="100%"
        h="14"
        px="6"
        width="100%"
        alignItems="center"
      >
        <NextLink href="/" passHref>
          <Link
            _hover={{
              textDecoration: 'none',
            }}
            color="neutral.500"
            display="flex"
          >
            <Flex alignItems="center">
              <Avatar mx="2" size="sm" src="/DevDAO.png" cursor="pointer" />
              {t('components.navigation.dashboard.header')}
              <Text color="primary.500">{userPurpose}</Text>
            </Flex>
          </Link>
        </NextLink>
      </Flex>

      <Stack
        direction="column"
        flex="1"
        d="flex"
        justifyContent="space-between"
        height="100%"
      >
        {userPurpose === '/hire' ? (
          <Stack mt="5%">
            <Heading
              color="neutral.300"
              letterSpacing="2px"
              font="Inter"
              justify="left"
              fontSize="xs"
              p="3"
              pl="5"
            >
              {t('components.navigation.dashboard.hiring')}
            </Heading>
            <NextLink href={'/developers'} passHref>
              <Link
                onClick={sidebar.onClose}
                color="neutral.300"
                p="2"
                pl="5"
                w="100%"
                borderRadius="0px"
                _hover={{
                  textDecoration: 'none',
                  color: 'black',
                  borderLeft: '5px solid #4E00EC',
                }}
                _focus={{ textDecoration: 'none', border: 'none' }}
                transition="0.2s"
              >
                <Flex alignItems="center">
                  <Users />
                  <Text ml="3" size="sm">
                    {t('components.navigation.dashboard.devs')}
                  </Text>
                </Flex>
              </Link>
            </NextLink>
          </Stack>
        ) : null}

        {userPurpose === '/earn' ? (
          <Stack my="5">
            <Heading
              color="neutral.300"
              letterSpacing="2px"
              font="Inter"
              justify="left"
              fontSize="xs"
              p="3"
              pl="8"
              mt={2}
            >
              {t('components.navigation.dashboard.seeking')}
            </Heading>
            <NextLink href={'/jobs'} passHref>
              <Link
                onClick={sidebar.onClose}
                p="2"
                pl="8"
                color="neutral.300"
                w="100%"
                borderRadius="0px"
                _hover={{
                  textDecoration: 'none',
                  color: 'black',
                  borderLeft: '5px solid #4E00EC',
                }}
                _focus={{ textDecoration: 'none', border: 'none' }}
                transition="0.2s"
              >
                <Flex alignItems="center">
                  <ClipboardList />
                  <Text ml="3" size="sm">
                    {t('components.navigation.dashboard.jobs_list')}
                  </Text>
                </Flex>
              </Link>
            </NextLink>
          </Stack>
        ) : null}

        {userPurpose === '/hire' && (
          <Box p="4" textAlign="center">
            <NextLink href={'/post-job'} passHref>
              <Link>
                <Button
                  color="white"
                  colorScheme="neutral"
                  variant="morePadding"
                  bg="neutral.700"
                  _hover={{ bg: 'neutral.500' }}
                  size="sm"
                >
                  + Create new job
                </Button>
              </Link>
            </NextLink>
          </Box>
        )}

      <Divider my="5" />

      <Box p="4" textAlign="center" mb="5">
        <Link href="https://discord.gg/devdao" isExternal>
          <Button
            colorScheme="neutral"
            variant="morePadding"
            border="1px solid #000"
            size="sm"
          >
            <Text mr="2">Contact us in Discord</Text>
          </Button>
        </Link>
      </Box>
    </Stack>
  </Box>
  );

  return (
    <Box as="section" w="100%" pos="fixed" zIndex="overlay" top="0">
      <SidebarContent
        display={{
          xl: 'flex',
          lg: 'none',
          md: 'none',
          sm: 'none',
          base: 'none',
        }}
        flexFlow="column nowrap"
        justifyContent="space-between"
        transition="0.5s ease"
      />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay
          display={{
            '2xl': 'none',
            xl: 'unset',
            lg: 'unset',
            md: 'unset',
            sm: 'unset',
            base: 'unset',
          }}
        />
        <DrawerContent
          display={{
            '2xl': 'none',
            xl: 'unset',
            lg: 'unset',
            md: 'unset',
            sm: 'unset',
            base: 'unset',
          }}
        >
          {/* Mobile version */}
          <SidebarContent
            w="full"
            borderRight="none"
            d="flex"
            flexFlow="column nowrap"
            justifyContent="space-between"
          />
        </DrawerContent>
      </Drawer>
      <Navbar sidebar={sidebar} setUserPurpose={setUserPurpose} />
    </Box>
  )
}
