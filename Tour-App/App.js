import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import { NavigationMain, NavigationAccount, NavigationFirstLogin } from './navigation';
import { ScreensGGMap } from './screens';

const AppScreen = () => {
  const isLogin = useSelector(state => state.user.isLogIn);
  const isFirstLogin = useSelector(state => state.user.firstLogIn);
  console.log(isLogin)
  console.log(isFirstLogin)

  // return isFirstLogin ? <NavigationFirstLogin /> : isLogin ? <NavigationMain /> : <NavigationAccount />
  return <ScreensGGMap/>
};

export default function App() {

  return (
    <Provider store={store}>
      <AppScreen />
    </Provider>
  );
}
