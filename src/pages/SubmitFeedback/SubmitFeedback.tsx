import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonButton, IonItem, IonLabel, IonSelect, IonSelectOption,
  IonTextarea, IonToggle, IonText, IonBackButton, IonButtons,
  IonRange, IonSpinner
} from '@ionic/react';
import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { submitFeedback } from '../../services/api.service';

const categories = ['General', 'Venue', 'Registration', 'Staff', 'Food', 'Technical', 'Other'];

const SubmitFeedback: React.FC = () => {
  const { guestId, eventId } = useParams<{ guestId: string; eventId: string }>();
  const history = useHistory();

  const [rating, setRating]           = useState(3);
  const [category, setCategory]       = useState('General');
  const [message, setMessage]         = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');

  const handleSubmit = async () => {
    if (!message.trim()) {
      setError('Message is required.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const result = await submitFeedback({
        Event_id: parseInt(eventId),
        Rating: rating,
        Category: category,
        Message: message,
        Is_Anonymous: isAnonymous,
      });
      history.replace(`/feedback-status/${result.id}`);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Submit Feedback</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Event {eventId} — Guest {guestId}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>

            <IonItem>
              <IonLabel>Rating: {rating} / 5</IonLabel>
              <IonRange
                min={1} max={5} step={1} snaps
                value={rating}
                onIonChange={e => setRating(e.detail.value as number)}
              />
            </IonItem>

            <IonItem>
              <IonLabel>Category</IonLabel>
              <IonSelect
                value={category}
                onIonChange={e => setCategory(e.detail.value)}
              >
                {categories.map(c => (
                  <IonSelectOption key={c} value={c}>{c}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Message</IonLabel>
              <IonTextarea
                rows={4}
                value={message}
                onIonChange={e => setMessage(e.detail.value!)}
                placeholder="Share your experience about this event..."
              />
            </IonItem>

            <IonItem>
              <IonLabel>Submit Anonymously</IonLabel>
              <IonToggle
                checked={isAnonymous}
                onIonChange={e => setIsAnonymous(e.detail.checked)}
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
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <IonSpinner name="crescent" /> : 'Submit Feedback'}
            </IonButton>

          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default SubmitFeedback;