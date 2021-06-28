import * as admin from "firebase-admin";

import * as dotenv from "dotenv";

dotenv.config();

const { env } = process;

const params = {
  projectId: "enchante-ce38a",
  privateKeyId: env.private_key_id,
  privateKey: env.private_key.replace(/\\n/g, "\n"),
  clientEmail: env.client_email,
  clientId: env.client_id,
  authUri: env.auth_uri,
  tokenUri: env.token_uri,
  authProviderX509CertUrl: env.auth_provider_x509_cert_url,
  clientC509CertUrl: env.client_x509_cert_url,
};

admin.initializeApp({
  credential: admin.credential.cert(params),
});

export default admin;
