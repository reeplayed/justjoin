import React, { Component } from 'react';
import styled, {ThemeProvider} from 'styled-components'
import { darkMode, lightMode } from './theme';
import MainPage from './pages/Main';
import GlobalStyles from './GlobalStyle';
import { connect } from 'react-redux';
import './App.css'
import {BrowserRouter} from 'react-router-dom';

class App extends Component {
  
  render() {
    return (
      <ThemeProvider theme={this.props.state.dark_mode ? darkMode : lightMode}>
        <BrowserRouter>
          <MainPage/>
          <GlobalStyles/>
        </BrowserRouter>
      </ThemeProvider>
      
    );
  }
}
const mapStateToProps = state => {
  return {
      state: state
  };
};
export default connect(mapStateToProps)(App);