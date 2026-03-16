import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonBadge, IonText, IonSpinner, IonBackButton, IonButtons,
  IonButton, IonItem, IonLabel, IonInput
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFeedbackStatus } from '../../services/api.service';

const statusColor: Record<string, string> = {
  Pending:  'warning',
  Reviewed: 'success',
};

const FeedbackStatus: React.FC = () => {
  const { feedbackId } = useParams<{ feedbackId: string }>();
  const [manualId, setManualId] = useState(feedbackId || '');
  const [data, setData]         = useState<any>(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const checkStatus = async (id: string) => {
    if (!id.trim()) return;
    setLoading(true);
    setError('');
    setData(null);
    try {
      const result = await getFeedbackStatus(parseInt(id));
      setData(result);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (feedbackId) checkStatus(feedbackId);
  }, [feedbackId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Feedback Status</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Check by Feedback ID</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">Feedback ID</IonLabel>
              <IonInput
                type="number"
                value={manualId}
                onIonChange={e => setManualId(e.detail.value!)}
                placeholder="Enter feedback ID"
                clearInput
              />
            </IonItem>
            <IonButton
              expand="block"
              className="ion-margin-top"
              onClick={() => checkStatus(manualId)}
              disabled={loading}
            >
              {loading ? <IonSpinner name="crescent" /> : 'Check Status'}
            </IonButton>
          </IonCardContent>
        </IonCard>

        {error && (
          <IonCard color="danger">
            <IonCardContent>
              <IonText color="light"><p>{error}</p></IonText>
            </IonCardContent>
          </IonCard>
        )}

        {data && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                Feedback #{data.id}{' '}
                <IonBadge color={statusColor[data.status] || 'medium'}>
                  {data.status}
                </IonBadge>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem lines="none">
                <IonLabel>
                  <p><strong>Rating:</strong> {data.rating} / 5</p>
                  <p><strong>Category:</strong> {data.category}</p>
                  <p><strong>Submitted:</strong> {new Date(data.created_at).toLocaleString()}</p>
                </IonLabel>
              </IonItem>
              {data.status === 'Pending' && (
                <IonText color="medium">
                  <p>Your feedback is awaiting review by the event team.</p>
                </IonText>
              )}
              {data.status === 'Reviewed' && (
                <IonText color="success">
                  <p>Your feedback has been reviewed. Thank you!</p>
                </IonText>
              )}
            </IonCardContent>
          </IonCard>
        )}

      </IonContent>
    </IonPage>
  );
};

export default FeedbackStatus;