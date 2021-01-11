import { act } from 'react-test-renderer';
import ACTION_TYPE from '../actions/type';

const INIT = {
    apartmentFilter: {
        coordinate: [],
        address: {},
        districts: [],
        rent: {},
        area: {},
        facilities: []
    }
};

const defaultLocationFilter = {
    coordinate: [],
    address: {},
    districts: []
}

const getNewFilter = (filtersState, filter) => {
    switch (filter.type) {
        case 'coordinate':
            return {...filtersState, ...defaultLocationFilter, coordinate: filter.data};
        case 'address':
            return {...filtersState, ...defaultLocationFilter, address: filter.data};
        case 'districts':
            return {...filtersState, ...defaultLocationFilter, districts: filter.data}
        case 'rent':
            return {...filtersState, rent: filter.data}
        case 'area':
            return {...filtersState, area: filter.data}
        case 'facilities':
            return {...filtersState, facilities: filter.data}
    }
};

const inputReducer = (state = INIT, action) => {
    switch (action.type) {
        case ACTION_TYPE.FILTER_SETTING:
            return {...state, apartmentFilter: getNewFilter(state.apartmentFilter, action.payload)};
        case ACTION_TYPE.FILTER_RESETTING:
            return {...state, apartmentFilter: INIT};
        default:
            return state;
    }
};

export default inputReducer;