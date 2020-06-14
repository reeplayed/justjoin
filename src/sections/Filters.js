import React from 'react';
import styled from 'styled-components';
import LocationFilters from '../components/LocationFilters';
import MoreFilters from '../components/MoreFilters';
import TechFilters from '../components/TechFilters';

const Filters = () => {
  return (
    <Container>
      <LocationFilters />
      <TechFilters />
      <MoreFilters />
    </Container>
  );
};
const Container = styled.div`
  min-height: 65px;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  padding: 0 15px;
`;

export default Filters;
