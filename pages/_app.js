import 'tailwindcss/tailwind.css';
import { store } from '../app/store';
import { Provider } from 'react-redux';
import { UserProvider } from '@auth0/nextjs-auth0';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </UserProvider>
  );
}

export default MyApp;
