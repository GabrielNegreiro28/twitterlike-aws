import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div style={{ padding: 24, fontFamily: "system-ui" }}>
          <h1>Missiva</h1>

          <p>
            Logado como:{" "}
            <b>{user?.signInDetails?.loginId || user?.username}</b>
          </p>

          <button onClick={signOut}>Sair</button>

          <hr style={{ margin: "24px 0" }} />

          <p>✅ Login com Cognito funcionando.</p>
          <p>Próximo passo: criar e listar missivas.</p>
        </div>
      )}
    </Authenticator>
  );
}
