import { Route, Redirect } from 'react-router-dom';
import AuthenticationService from './services/auth-service';
  
const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route {...rest} render={(props) => {
    const isAuthenticated = AuthenticationService.isAuthenticated;
    if (!isAuthenticated) {    
      return <Redirect to={{ pathname: '/login' }} />
    }
  
    return <Component {...props} />
  }} />
);
  
export default PrivateRoute;