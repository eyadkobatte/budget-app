export interface AuthPayload {
  name: string;
  email: string;
  email_verified: boolean;
  auth_time: number;
  user_id: string;
  firebase: {
    identities: { email: string[]; 'google.com': string[] };
    sign_in_provider: 'google.com';
  };
  iat: number;
  exp: number;
  aud: string;
  iss: string;
  sub: string;
}
