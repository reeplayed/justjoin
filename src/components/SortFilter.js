import Typography from '../helpers/Typography';
import React, { useState } from 'react';
import CustomButton from './CustomButton';
import styled from 'styled-components';
import { Dialog } from '@material-ui/core';
import Header from './Header';
import stringFormat from '../helpers/stringFormat';
import PinkButton from './PinkButton';
import { connect } from 'react-redux';
import StyledLink from '../helpers/StyledLink';
import url from '../helpers/urlFunc';

const SortFilter = ({ params }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const onClose = () => {
    setDialogOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonWrapper>
        <CustomButton
          onclick={() => setDialogOpen(true)}
          active={params.sort}
          icon
        >
          {params.sort === 'sal-up'
            ? 'highest salary'
            : params.sort === 'sal-down'
            ? 'lowest salary'
            : 'latest'}
        </CustomButton>
      </ButtonWrapper>

      <Dialog
        maxWidth="xs"
        open={dialogOpen}
        onClose={onClose}
        fullWidth="true"
      >
        <Container>
          <StyledLink to={url({ ...params, sort: null })} onClick={onClose}>
            <CustomButton padding="8px 80px" active={!params.sort}>
              latest
            </CustomButton>
          </StyledLink>

          <StyledLink to={url({ ...params, sort: 'sal-up' })} onClick={onClose}>
            <CustomButton padding="8px 80px" active={params.sort === 'sal-up'}>
              highest salary
            </CustomButton>
          </StyledLink>

          <StyledLink
            to={url({ ...params, sort: 'sal-down' })}
            onClick={onClose}
          >
            <CustomButton
              padding="8px 80px"
              active={params.sort === 'sal-down'}
            >
              lowest salary
            </CustomButton>
          </StyledLink>
        </Container>
      </Dialog>
    </React.Fragment>
  );
};
const ButtonWrapper = styled.div`
  margin: 0 5px;
`;
const Container = styled.div`
  height: 220px;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0;
`;

const mapStateToProps = state => {
  return {
    params: state.params,
  };
};

export default connect(mapStateToProps)(SortFilter);
