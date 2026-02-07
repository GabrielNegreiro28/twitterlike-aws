import React, { useEffect, useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { generateClient } from "aws-amplify/api";
import { createPost, listGlobalFeed } from "./graphql";

const client = generateClient();

function FeedApp({ user, signOut }) {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function refreshFeed() {
    setLoading(true);
    try {
      const res = await client.graphql({
        query: listGlobalFeed,
        variables: { limit: 30 }
      });
      setPosts(res.data.listGlobalFeed);
    } finally {
      setLoading(false);
    }
  }

  async function onCreatePost() {
    const text = content.trim();
    if (!text) return;

    setLoading(true);
    try {
      await client.graphql({
        query: createPost,
        variables: { content: text }
      });
      setContent("");
      await refreshFeed();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshFeed();
  }, []);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 24, fontFamily: "system-ui" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0 }}>Missiva</h1>
        <button onClick={signOut}>Sair</button>
      </div>

      <p style={{ marginTop: 8 }}>
        Logado como: <b>{user?.signInDetails?.loginId || user?.username}</b>
      </p>

      <div style={{ marginTop: 16, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          placeholder="Escreva sua missiva..."
          style={{ width: "100%", padding: 10, resize: "vertical" }}
        />
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button onClick={onCreatePost} disabled={loading}>
            Publicar
          </button>
          <button onClick={refreshFeed} disabled={loading}>
            Atualizar
          </button>
        </div>
      </div>

      <h2 style={{ marginTop: 24 }}>Feed global</h2>
      {loading && <p>Carregando...</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {posts.map((p) => (
          <div key={p.id} style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}>
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              <b>{p.author}</b> • {new Date(p.createdAt).toLocaleString()}
            </div>
            <div style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>{p.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => <FeedApp user={user} signOut={signOut} />}
    </Authenticator>
  );
}
