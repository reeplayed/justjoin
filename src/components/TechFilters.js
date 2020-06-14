import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TechSvg from '../helpers/TechSvg';
import TechIcon from './TechIcon';
import { Dialog } from '@material-ui/core';
import CustomButton from './CustomButton';
import { connect } from 'react-redux';
import StyledLink from '../helpers/StyledLink';
import url from '../helpers/urlFunc';
import { techArray } from '../helpers/Options';

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

const TechFilters = ({ params }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mobileView, setMobileView] = useState(
    getWidth() <= 1025 ? true : false
  );

  const onClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    const resizeListener = () => {
      setMobileView(getWidth() < 1025 ? true : false);
    };

    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  const DesktopView = () => (
    <Container>
      <StyledLink to={url({ ...params, tech: null })}>
        <AllIconContainer focus={!params.tech}>All</AllIconContainer>
      </StyledLink>
      {techArray.map(tech => (
        <TechIcon tech={tech} onclick={onClose} />
      ))}
    </Container>
  );

  const MobileView = () => (
    <React.Fragment>
      <ButtonWrapper>
        <CustomButton
          onclick={() => setDialogOpen(true)}
          active={params.tech}
          icon
        >
          Tech
        </CustomButton>
      </ButtonWrapper>

      <Dialog
        maxWidth="md"
        open={dialogOpen}
        onClose={onClose}
        fullWidth="true"
      >
        <DesktopView />
      </Dialog>
    </React.Fragment>
  );

  return mobileView ? <MobileView /> : <DesktopView />;
};
const Container = styled.div`
  display: flex;
  align-items: center;

  flex: 1;

  @media (max-width: 1025px) {
    padding: 30px;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const ButtonWrapper = styled.div`
  margin: 0 5px;
`;

const AllIconContainer = styled.div`
  margin: 3px 7px;
  width: 35px;
  height: 35px;
  border-radius: 50px;
  background: ${({ theme, focus }) =>
    focus ? theme.techColors['all'] : theme.techColors.disabled};
  overflow: hidden;
  color: #fff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const mapStateToProps = state => {
  return {
    params: state.params,
  };
};

export default connect(mapStateToProps)(TechFilters);
