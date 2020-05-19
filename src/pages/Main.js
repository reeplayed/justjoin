import React, { Component, useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../sections/Header';
import Filters from '../sections/Filters';
import OffertList from '../sections/OfertList';
import Map from '../sections/Map';
import SingleOfert from '../sections/SingleOfert';
import axios from '../axios';
import createHTMLMapMarker from '../GoogleMapMarker'
import _ from 'lodash';
import { Switch, Route, useParams } from 'react-router-dom';
import {setMarkers, setAllOffers} from '../store/actions';
import { connect } from 'react-redux';

const Main = ({setAllOffers, state})=> {

        function load_script_promise(){
            return new Promise(function(resolve, reject){
                const googleMapScript = document.createElement('script')
                googleMapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCzuSdRVtpNzkDqnPd2NuF7x_4ZLR_92pc'
                window.document.body.appendChild(googleMapScript)
                googleMapScript.addEventListener('load', function(){
                    resolve()
                })
            })
        }

        useEffect(()=>{
            Promise.all([
                axios.get('/posts/'),
                load_script_promise()
            ])
            .then(([{data}])=>{       
                setAllOffers(data)
            })    
        },[])
    
        return (
            <MainContainer>
                    <Header/>
                    <Filters/>
                    <SubContainer>
                        <OfertConatiner>
                            <OfertConatinerScroll>
                                <Switch>
                                    <Route path='/offer/:slug?' component={SingleOfert}/>
                                    <Route path='/:location?/:tech?/:exp_lvl?/:from?/:to?' component={OffertList}/>
                                </Switch>
                            </OfertConatinerScroll>
                            
                        </OfertConatiner>
                        <Map/>
                    </SubContainer> 
            </MainContainer>
        );
    
}
const MainContainer = styled.main`
    height: 100vh;
    display: flex;
    flex-direction: column;
`;
const SubContainer = styled.div`
    display:flex;
    flex:1;
`;
const OfertConatiner = styled.div`
    width: 60%;
    height: 100%;
    background: ${({theme})=>theme.colors.secondary};
    display: flex;
    flex-direction: column;
    @media (max-width: 1025px) {
        width: 100%;
    }
`; 
const OfertConatinerScroll = styled.div`
    display: flex;
    position: relative;
    flex: 1 1 0%;
`;

const mapStateToProps = state => {
    return {
        state: state
    };
  };

  export default connect(mapStateToProps, { setAllOffers, setMarkers })(Main);