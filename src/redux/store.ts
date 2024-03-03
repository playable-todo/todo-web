import { configureStore, createSlice, Middleware } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { AuthUserState} from './interface';

// Slices

// loginSlice
const loginSlice = createSlice({
    name: 'authUser',
    initialState: {} as AuthUserState,
    reducers: {
      setLoginData: (state, action) => {
        state.loginData = { ...state.loginData, ...action.payload}
      },
    },
});

// rootReducer
const rootReducer = {
    authUser: loginSlice.reducer
};

// Middleware
const saveToLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);

    localStorage.setItem('authUser', JSON.stringify(store.getState().authUser));
    return result;
};

// Store
const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    // Local Storage'dan veriyi yükleme
    authUser: JSON.parse(localStorage.getItem('authUser') || '{}'),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToLocalStorageMiddleware),
});


export const { setLoginData } = loginSlice.actions;
export default store;

export function removeAllData(){
    localStorage.clear();
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;