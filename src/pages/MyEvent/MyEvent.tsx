import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonButton, IonText, IonSpinner, IonBackButton, IonButtons,
  IonItem, IonLabel, IonBadge
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getFeedbackByEvent } from '../../services/api.service';

const MyEvent: React.FC = () => {
  const { guestId, eventId } = useParams<{ guestId: string; eventId: string }>();
  const history = useHistory();
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const guestIdNum = parseInt(guestId);
  const eventIdNum = parseInt(eventId);

  useEffect(() => {
    getFeedbackByEvent(eventIdNum)
      .then(data => {
        setFeedbacks(data);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, [eventIdNum]);

  const alreadySubmitted = feedbacks.some(f =>
    !f.is_Anonymous && f.guestName !== 'Anonymous'
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>My Event</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Event ID: {eventId}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem lines="none">
              <IonLabel>Guest ID: {guestId}</IonLabel>
              <IonBadge slot="end" color={alreadySubmitted ? 'success' : 'warning'}>
                {alreadySubmitted ? 'Submitted' : 'Not Submitted'}
              </IonBadge>
            </IonItem>
          </IonCardContent>
        </IonCard>

        {loading && (
          <div className="ion-text-center ion-padding">
            <IonSpinner />
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <IonCard color="danger">
            <IonCardContent>
              <IonText color="light"><p>{error}</p></IonText>
            </IonCardContent>
          </IonCard>
        )}

        {!loading && (
          <>
            <IonButton
              expand="block"
              className="ion-margin-top"
              onClick={() => history.push(`/submit-feedback/${guestId}/${eventId}`)}
            >
              Submit Feedback
            </IonButton>

            <IonButton
              expand="block"
              fill="outline"
              className="ion-margin-top"
              onClick={() => history.push(`/analytics/${eventId}`)}
            >
              View Event Analytics
            </IonButton>
          </>
        )}

      </IonContent>
    </IonPage>
  );
};

export default MyEvent;