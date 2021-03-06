import React from 'react';
import styled from 'styled-components';
import CloseButton from './CloseButton';
import Typography from '../helpers/Typography';

const Header = ({ children, close }) => {
  return (
    <HeaderWrapper>
      <Typography color="text" as="span" fWeight="400" fontSize="1.2rem">
        {children}
      </Typography>
      {close && <CloseButton onclick={close} />}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.s}) {
    padding: 10px;
  }
`;

export default Header;
