import React, { Component } from 'react';
import { connect } from 'react-redux';
import StyledLink from '../helpers/StyledLink';
import styled from 'styled-components';

const Logo = ({ dark_mode, center }) => {
  return (
    <Typography align={center}>
      <StyledLink to="/">justjoin{dark_mode && 't'}.it</StyledLink>
    </Typography>
  );
};

const Typography = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 30px;
  color: ${({ theme }) => theme.colors.logo};
  text-align: ${({ align }) => align && 'center'};
`;

function mapStateToProps(state) {
  return {
    dark_mode: state.dark_mode,
  };
}

export default connect(mapStateToProps)(Logo);
