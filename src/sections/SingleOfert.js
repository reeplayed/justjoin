import Typography from '../helpers/Typography';
import InfoLabel from '../components/InfoLabel';
import TechRange from '../components/TechRange';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import {setMarkers, setGoogleMap, setOffersList, setMarkerClass, setParams} from '../store/actions';
import createHTMLMapMarker from '../GoogleMapMarker';
import axios, {baseURL} from '../axios'
import {initMapOptions} from '../googleMapOptions';
import CircularProgress from '@material-ui/core/CircularProgress';


const SingleOfert = ({history, setMarkers,setMarkerClass, setParams, setGoogleMap,setOffersList, state, state: {params, loading, markers, allOffers,markerClass, offersList}} ) => {

    const {slug} = useParams()

    const [offer, setOffer] = useState(null)

    const ref = useRef()

    useEffect(()=>{
        if(!loading && _.isEmpty(markers)){
            
            const params = JSON.parse(localStorage.getItem('params')) || params
            
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

            if(offer){
                markers[offer.place_id].activeMarker()
            }
        }
    },[markers, loading])

    useEffect(()=>{

        async function offerFetch(){
            try{
                const {data} = await axios.get(`/posts/${slug}`)
                
                setOffer(prev=>{
                    if(prev){
                        markers[prev.place_id].deactiveMarker()
                    }
                    return data
                }) 
                
                ref.current = data.place_id

                if(markers){
                    markers[data.place_id].activeMarker(data.tech)
                }
            }
            catch{
                alert('Error')
            }
        }
        offerFetch()
    },[slug])

    useEffect(() => {
        return () => {
            document.getElementById(ref.current).classList.remove('active_marker')
        };
      }, []);

    const createMarkup = () => {
        return { __html: offer && offer.description };
    }

    return offer && (
        <Container>
           <ContainerScroll>
                
           {loading && (
                    <ProgressWrapper>
                        <CircularProgress size='30px'/>
                    </ProgressWrapper>
            )}
            
            <HeaderContainer>
                <HeaderInner tech={offer.tech}>
                    <HeadreWrapper>
                        <ImgBackground>
                            
                            <Img src={baseURL + offer.image}/>
                        
                        </ImgBackground>
                        <MainInfoContainer>
                            <Typography 
                                color='white' 
                                align='flex-start' 
                                fontSize='1rem'
                                as='span'
                                margin='4px 0'
                                fWeight='400'
                                >
                                {offer.salary_from} - {offer.salary_to} PLN
                            </Typography>
                            <Typography 
                                color='white' 
                                align='flex-start' 
                                fontSize='1.2rem'
                                as='span'
                                margin='4px 0'
                                >
                                {offer.offer_title}
                            </Typography>
                            <Typography 
                                color='white' 
                                align='flex-start' 
                                fontSize='1rem'
                                as='span'
                                margin='4px 0'
                                fWeight='400'
                                >
                                {offer.street}, {offer.city}
                            </Typography>
                        </MainInfoContainer>
                    </HeadreWrapper>
                    
                </HeaderInner>
                <InfoLabelsContainer>
                    <InfoLabel icon={1} title={offer.company_name}/>
                    <InfoLabel icon={2} title={offer.company_size}/>
                    <InfoLabel icon={3} title={offer.emp_type}/>
                    <InfoLabel icon={4} title={offer.exp_lvl}/>
                    <InfoLabel icon={5} title={offer.company_name}/>
                </InfoLabelsContainer>
            </HeaderContainer>
            <TechStackContainer>
                <Typography
                    color='title'
                    fWeight='400'
                    fontSize='1.2rem'
                    align='flex-start'
                    margin='10px 20px'
                    >
                    Tech stack
                </Typography>
                <Wrapper>

                    {offer.technology.map(tech=>(
                        <TechRange range={Number(tech.tech_lvl)} tech={tech.tech}/>
                    ))}
                    
                </Wrapper>
                
            </TechStackContainer>
            <DescriptionContainer>
                <Typography
                    color='title'
                    fWeight='400'
                    fontSize='1.2rem'
                    align='flex-start'
                    margin='10px 20px'
                    >
                    Description
                </Typography>


                <Wrapper>
                    <DescriptionContent dangerouslySetInnerHTML={createMarkup()} className='editor'></DescriptionContent>
                </Wrapper>
            </DescriptionContainer>
            
            </ContainerScroll>
        </Container>
    );
};
const Container = styled.div`
   flex:1;
    background: ${({theme})=>theme.colors.secondary};
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    position: relative;
    flex: 1 1 0%;
`;
const ContainerScroll = styled.div`
position: absolute;
top: 0px;
right: 0px;
bottom: 0px;
left: 0px;
padding: 0 15px;
overflow: auto;
@media only screen and (max-width: ${({theme})=>theme.breakpoints.md}) {
    padding: 0 3px;
  }

`;
const HeaderContainer = styled.div`
    height: 235px;
    position: relative;
    margin: 0px 0px 50px 0px;

`;
const HeaderInner = styled.div`
    background : url(https://justjoin.it/static/media/header_background.0ef18c97.png) center center / cover no-repeat, ${({theme, tech})=>theme.techColors[tech]};
    height: 100%;
    border-radius: 0px 0px 4px 4px;
    padding: 40px 40px 0px;
`;
const HeadreWrapper = styled.div`
    display: flex;
    align-items: center;
    align-content: flex-start;
    justify-content: center;
`;
const ImgBackground = styled.div`
background-color: rgb(255, 255, 255);
width: 107px;
height: 107px;
display: flex;
position: relative;
border-radius: 50%;
align-items:center;
justify-content: center;

&:after, &:before{
    content: '';
    position:absolute;
    border-radius: 50%;
    width: 100%;
    height: 100%;
}
&:before{
    background: rgba(255, 255, 255, 0.5);
    transform: scale(1.2);
}
&:after{
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.4);
}
`;
const Img = styled.img`
    max-width: 70px;
    max-height: 45px;
`;
const MainInfoContainer = styled.div`
    flex:1;
    margin: 0 0 0 40px;

`;
const InfoLabelsContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
transform: translateY(-50%);
width: 100%;
padding: 0px 15px;
@media only screen and (max-width: ${({theme})=>theme.breakpoints.md}) {
    transform: translateY(-25%);
  }
`;
const TechStackContainer = styled.div`
padding: 5px 0;
box-shadow: ${({theme})=>theme.colors.shadow};
margin-top: 40px;
background: ${({theme})=>theme.colors.primary};
border-radius: 5px;
@media only screen and (max-width: ${({theme})=>theme.breakpoints.md}) {
    margin-top: 170px;
  }
`;
const Wrapper = styled.div`
    padding: 24px;
    border-top: 2px solid ${({theme})=>theme.colors.secondary};
    display: flex;
    flex-wrap: wrap;
`;
const DescriptionContainer = styled.div`
    margin: 30px 0;
    padding: 5px 0;
    box-shadow: ${({theme})=>theme.colors.shadow};
    background: ${({theme})=>theme.colors.primary};
    border-radius: 5px;
    @media only screen and (max-width: ${({theme})=>theme.breakpoints.md}) {
        margin: 15px 0;
      }
`;
const DescriptionContent = styled.div`
    padding: 0 15px;
    color: ${({theme})=>theme.colors.logo};
`;
const ProgressWrapper = styled.div`
      display: flex;
      justify-content: center;
      padding-top: 40px;
`;

const mapStateToProps = state => {
    return {
        state: state
    };
  };

  export default connect(mapStateToProps, {setGoogleMap,setMarkers,setMarkerClass,setParams, setOffersList})(SingleOfert);