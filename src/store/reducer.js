import {
  CHANGE_VIEW_MODE,
  SET_MARKERS,
  SET_MARKER_ClASS,
  SET_ALL_OFFERS,
  SET_MAP,
  SET_OFFERS_LIST,
  SET_PARAMS,
} from './types';

const initialState = {
  dark_mode: JSON.parse(localStorage.dark_mode || false),
  markerClass: null,
  markers: null,
  loading: true,
  allOffers: null,
  offersList: null,
  map: null,
  params: {
    location: null,
    tech: null,
    exp_lvl: null,
    from: null,
    to: null,
    sort: null,
  },
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_VIEW_MODE:
      localStorage.setItem('dark_mode', JSON.stringify(!state.dark_mode));
      return {
        ...state,
        dark_mode: !state.dark_mode,
      };

    case SET_MARKERS:
      return {
        ...state,
        markers: action.payload,
      };
    case SET_MARKER_ClASS:
      console.log(action.payload, 'bitt');
      return {
        ...state,
        markerClass: action.payload,
      };
    case SET_ALL_OFFERS:
      return {
        ...state,
        loading: false,
        allOffers: action.payload,
      };
    case SET_MAP:
      return {
        ...state,
        map: action.payload,
      };

    case SET_OFFERS_LIST:
      return {
        ...state,
        offersList: action.payload,
      };
    case SET_PARAMS:
      return {
        ...state,
        params: action.payload,
      };

    default:
      return state;
  }
};

export default Reducer;
