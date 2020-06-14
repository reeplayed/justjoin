import React, { useState } from 'react';
import styled from 'styled-components';
import PinkButton from '../components/PinkButton';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import SideBar from './SideBar';
import AddOffert from './AddOffert';
import Logo from '../components/Logo';

const Header = () => {
  const [open, openDraver] = useState(false);

  const openDrawerHandler = () => {
    openDraver(prev => !prev);
  };

  const DrawerComponent = () => (
    <Drawer anchor="right" open={open} onClose={openDrawerHandler} variant="">
      <SideBar />
    </Drawer>
  );

  return (
    <Container>
      <Wrapper>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <AddOffert />
        <IconButton onClick={openDrawerHandler}>
          <MyMenuIcon />
        </IconButton>
        <DrawerComponent />
      </Wrapper>
    </Container>
  );
};
const Container = styled.header`
  min-height: 65px;
  display: flex;
  padding: 0 15px 0 35px;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const LogoWrapper = styled.div`
  flex: 1;
`;
const MyMenuIcon = styled(MenuIcon)`
  color: ${({ theme }) => theme.colors.title};
`;

export default Header;
