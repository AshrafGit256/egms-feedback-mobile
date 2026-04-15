import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Splash       from './pages/Splash/Splash';
import Login        from './pages/Login/Login';
import Register     from './pages/Register/Register';
import Landing      from './pages/Landing/Landing';
import FeedbackForm from './pages/FeedbackForm/FeedbackForm';
import ThankYou     from './pages/ThankYou/ThankYou';
import { isLoggedIn } from './services/auth.service';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Splash — entry point for the whole app */}
        <Route exact path="/splash"                component={Splash} />

        <Route exact path="/login"                 component={Login} />
        <Route exact path="/register"              component={Register} />

        <Route exact path="/home"                  render={() =>
          isLoggedIn() ? <Landing /> : <Redirect to="/login" />
        } />

        <Route exact path="/feedback/:eventId"     render={() =>
          isLoggedIn() ? <FeedbackForm /> : <Redirect to="/login" />
        } />

        <Route exact path="/thank-you/:feedbackId" component={ThankYou} />

        {/* Default: always start at splash */}
        <Redirect exact from="/" to="/splash" />
        <Redirect to="/splash" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;