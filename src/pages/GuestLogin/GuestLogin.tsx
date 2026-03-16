import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonItem, IonLabel, IonInput, IonButton, IonText
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const GuestLogin: React.FC = () => {
  const [guestId, setGuestId] = useState('');
  const [eventId, setEventId] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleContinue = () => {
    if (!guestId || !eventId) {
      setError('Please enter both Guest ID and Event ID.');
      return;
    }
    setError('');
    history.push(`/my-event/${guestId}/${eventId}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>EGMS Feedback</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Guest Login</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">Guest ID</IonLabel>
              <IonInput
                type="number"
                value={guestId}
                onIonChange={e => setGuestId(e.detail.value!)}
                placeholder="Enter your Guest ID"
                clearInput
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Event ID</IonLabel>
              <IonInput
                type="number"
                value={eventId}
                onIonChange={e => setEventId(e.detail.value!)}
                placeholder="Enter your Event ID"
                clearInput
              />
            </IonItem>

            {error && (
              <IonText color="danger">
                <p style={{ paddingLeft: 16 }}>{error}</p>
              </IonText>
            )}

            <IonButton
              expand="block"
              className="ion-margin-top"
              onClick={handleContinue}
            >
              Continue
            </IonButton>
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default GuestLogin;