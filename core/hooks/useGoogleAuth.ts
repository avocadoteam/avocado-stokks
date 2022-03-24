import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();
export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '940068648762-otm7q9hjrmfu4gs4f6fblpgqebck6hek.apps.googleusercontent.com',
    iosClientId: '940068648762-3trqaflmrrrs8si6h32faqh8lolq6g6u.apps.googleusercontent.com',
    androidClientId: '940068648762-2g3vastu7nkaddgk9vcjmoal209cka7g.apps.googleusercontent.com',
    webClientId: '940068648762-cj5aoh5d1nkb9dffbo1j63ndjc4hmlav.apps.googleusercontent.com',
  });

  return {
    request,
    promptAsync,
    response,
  };
};
