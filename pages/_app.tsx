import { AppointmentWrapper } from '../context/appointment';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AppointmentWrapper>
      <Component {...pageProps} />
    </AppointmentWrapper>
  );
}

export default MyApp;
