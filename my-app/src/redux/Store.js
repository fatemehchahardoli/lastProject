import { configureStore } from '@reduxjs/toolkit'
import { HotelApi , CountryApi} from './services/HotelApi'

const store = configureStore({
    reducer: {
        [HotelApi.reducerPath]: HotelApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(HotelApi.middleware)
});

export default store;
