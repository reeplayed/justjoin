import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Label from '../components/Label';
import SortFilter from '../components/SortFilter';
import OffertCard from '../components/OffertCard';
import {useParams,useLocation, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {setMarkers, setGoogleMap, setOffersList, setMarkerClass, setParams} from '../store/actions';
import createHTMLMapMarker from '../GoogleMapMarker';
import closure from '../helpers/closure';
import {locationArray, expLvlArray, techArray, sortArray} from '../helpers/Options';
import {initMapOptions} from '../googleMapOptions';
import _ from 'lodash';

const OfertList = ({history, setMarkers,setMarkerClass, setParams, setGoogleMap,setOffersList, state, state: {loading, markers, allOffers,markerClass, offersList}}) => {
    
    let sort = new URLSearchParams(useLocation().search).get('sort')
    let { location, tech, from, to, exp_lvl} = useParams()

    const params = {
        location: locationArray.includes(location) ? location : null, 
        tech: techArray.includes(tech) ? tech : null, 
        exp_lvl: expLvlArray.includes(exp_lvl) ? exp_lvl : null, 
        from: from && Number(from.split('k')[0]) && Number(from.split('k')[0]) > 0 ? Number(from.split('k')[0])*1000 : null,
        to: to && Number(to.split('k')[0]) && Number(to.split('k')[0]) > 0 ? Number(to.split('k')[0])*1000 : null,
        sort: sortArray.includes(sort) ? sort : null
    }

    useEffect(()=>{

        console.log(state)

        if(!loading && _.isEmpty(markers)){
            
            const map = new global.google.maps.Map(document.getElementById('map'), initMapOptions());            
            
            const markers = {}
           
            const CustomMarker = createHTMLMapMarker(history)

            let list = []

            allOffers.forEach(item => {
                list = list.concat(item.offerts)
                markers[item.place_id] = new CustomMarker(item, map, params)
            });

            setGoogleMap(map)
            setMarkers(markers)
            setParams(params)
            setMarkerClass(CustomMarker)
            setOffersList(list)

            localStorage.setItem('params', JSON.stringify(params))
        }

        else if(!_.isEmpty(markers)){
            
            closure(()=>{
                _.forEach(markers, (item)=>{
                    item.update(params)
                })
                setParams(params)
                localStorage.setItem('params', JSON.stringify(params))
            }) 
        }
        
    },[location, tech, from, to, exp_lvl, markers, loading, sort])
    
    return (
        <Container>
            <FiltersWrapper>
                <SalaryFiltersWrapper>
                    
                    <Label active>
                        All offerts
                    </Label>
                </SalaryFiltersWrapper>
                <SortFiltersWrapper>
                    <SortFilter/>
                </SortFiltersWrapper>
            </FiltersWrapper>
            <ContainerScroll>
            <ListContainer>

                {offersList && markerClass.prototype.filterOffers(offersList, params).map((item, index)=>{
                    
                 return(
                     <OffertCard 
                        slug={item.slug}
                        tech={item.tech}
                        title={item.offer_title}
                        company_name={item.company_name}
                        city={item.city}
                        from={item.salary_from}
                        to={item.salary_to}
                        image={item.image}
                        technology={item.technology}
                        place_id={item.place_id}
                        date_add={item.date_add}
                    />
                 ) 
                })}

             
               
            </ListContainer>
        </ContainerScroll>
        </Container>
    );
};
const Container = styled.div`
    width: 100%;
    height: 100%;
    background: ${({theme})=>theme.colors.secondary};
    display: flex;
    flex-direction: column;
`;
const ContainerScroll = styled.div`
    display: flex;
    position: relative;
    flex: 1 1 0%;
`
const FiltersWrapper = styled.div`
    background: ${({theme})=>theme.colors.primary};
    display: flex;
    margin-bottom: 5px;
`;
const SalaryFiltersWrapper = styled.div`
    padding-left: 25px;
    display: flex;
`;
const SortFiltersWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    padding: 3px;
`;
const ListContainer = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    padding: 0 15px;
    overflow: auto;

    @media only screen and (max-width: ${({theme})=>theme.breakpoints.md}) {
        padding: 0;
      }
`;
const InfoSpan = styled.span`
    display: block;
    color: ${({theme})=>theme.colors.logo}; 
    font-size: 1.2rem;
`;

const mapStateToProps = state => {
    return {
        state: state
    };
  };

export default connect(mapStateToProps, {setGoogleMap,setMarkers,setMarkerClass,setParams, setOffersList})(OfertList);