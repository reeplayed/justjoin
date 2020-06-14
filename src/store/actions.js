import {
  CHANGE_VIEW_MODE,
  SET_MARKERS,
  SET_MARKER_ClASS,
  SET_ALL_OFFERS,
  SET_MAP,
  SET_OFFERS_LIST,
  SET_PARAMS,
} from './types';

export const changeViewMode = () => {
  return {
    type: CHANGE_VIEW_MODE,
  };
};

export const setMarkers = data => {
  return {
    type: SET_MARKERS,
    payload: data,
  };
};

export const setMarkerClass = markerClass => {
  console.log(markerClass, 'gyd');
  return {
    type: SET_MARKER_ClASS,
    payload: markerClass,
  };
};
export const setAllOffers = data => {
  return {
    type: SET_ALL_OFFERS,
    payload: data,
  };
};

export const setGoogleMap = map => {
  return {
    type: SET_MAP,
    payload: map,
  };
};

export const setOffersList = list => {
  return {
    type: SET_OFFERS_LIST,
    payload: list,
  };
};

export const setParams = params => {
  return {
    type: SET_PARAMS,
    payload: params,
  };
};
