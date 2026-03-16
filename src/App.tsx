import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Landing      from './pages/Landing/Landing';
import FeedbackForm from './pages/FeedbackForm/FeedbackForm';
import ThankYou     from './pages/ThankYou/ThankYou';

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
        <Route exact path="/"                        component={Landing} />
        <Route exact path="/feedback/:eventId"       component={FeedbackForm} />
        <Route exact path="/thank-you/:feedbackId"   component={ThankYou} />
        <Redirect to="/" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;