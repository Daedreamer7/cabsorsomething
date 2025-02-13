const GMAIL_API_CONFIG = {
  clientId: process.env.REACT_APP_GMAIL_CLIENT_ID,
  apiKey: process.env.REACT_APP_GMAIL_API_KEY,
  scope: 'https://www.googleapis.com/auth/gmail.readonly',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest']
};

export const initGmailAPI = () => {
  return new Promise((resolve, reject) => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init(GMAIL_API_CONFIG)
        .then(() => {
          resolve(window.gapi);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

export const signInToGmail = async () => {
  const auth = window.gapi.auth2.getAuthInstance();
  try {
    const user = await auth.signIn();
    return user;
  } catch (error) {
    throw new Error('Gmail sign-in failed: ' + error.message);
  }
};

export const signOutFromGmail = async () => {
  const auth = window.gapi.auth2.getAuthInstance();
  try {
    await auth.signOut();
  } catch (error) {
    throw new Error('Gmail sign-out failed: ' + error.message);
  }
};

export const getGmailMessages = async (maxResults = 10) => {
  try {
    const response = await window.gapi.client.gmail.users.messages.list({
      userId: 'me',
      maxResults: maxResults
    });
    
    const messages = await Promise.all(
      response.result.messages.map(async (message) => {
        const messageDetails = await window.gapi.client.gmail.users.messages.get({
          userId: 'me',
          id: message.id
        });
        return messageDetails.result;
      })
    );
    
    return messages;
  } catch (error) {
    throw new Error('Failed to fetch Gmail messages: ' + error.message);
  }
};
