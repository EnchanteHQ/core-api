import express from "express";
import * as admin from "firebase-admin";

import serviceAccount from "./firebase.json";

const params = {
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

const app = express();
const port = 8000;
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Enchante");
});

admin.initializeApp({
  credential: admin.credential.cert(params),
});

app.post("/verify", (req, res) => {
  const { token } = req.body;
  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const { uid } = decodedToken;
      res.send(uid);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.post("/check", (req, res) => {
  const { email } = req.body;
  admin
    .auth()
    .getUserByEmail(email)
    .then((userRecord) => {
      console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
      res.send(userRecord);
    })
    .catch((error) => {
      console.log("Error fetching user data:", error);
    });
});

app
  .listen(port, () => {
    console.log(`Server running on port ${port}`);
  })
  .on("error", (error: Error) =>
    console.log("Error starting server:>>", error)
  );
