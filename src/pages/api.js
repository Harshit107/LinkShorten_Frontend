import React, { useState } from "react";
import { getTokenFromLocalStorage } from "../helper/LocalStorage";
import { API_BASE_URL } from "../config";
import {
  RiFileCopyLine,
  RiCheckLine,
  RiKeyLine,
  RiTerminalBoxLine,
  RiCodeSSlashLine,
} from "react-icons/ri";

export default function Api() {
  const [tokenCopied, setTokenCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const token = getTokenFromLocalStorage() || "YOUR_BEARER_TOKEN";

  const handleCopyToken = async () => {
    try {
      await navigator.clipboard.writeText(token);
      setTokenCopied(true);
      setTimeout(() => setTokenCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const curlExample = `curl -X POST "${API_BASE_URL}api/v1/links" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${token}" \\
  -d '{"originalUrl": "https://example.com", "shortLink": "my-alias"}'`;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(curlExample);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "1060px", margin: "40px auto", padding: "0 24px", position: "relative", zIndex: 10 }}>
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          Developer REST API
        </h1>
        <p style={{ color: "#94a3b8", margin: "8px 0 0", fontSize: "1rem" }}>
          Integrate programmatic URL shortening, custom slugs, and telemetry directly into your workflows
        </p>
      </div>

      {/* API Key / Token Card */}
      <div
        style={{
          background: "linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 25px rgba(37, 99, 235, 0.12)",
          backdropFilter: "blur(20px)",
          padding: "28px",
          marginBottom: "32px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
          <RiKeyLine size={24} color="#38bdf8" />
          <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "#ffffff" }}>
            Your Authorization Token
          </h3>
        </div>
        <p style={{ color: "#94a3b8", fontSize: "0.92rem", margin: "0 0 18px", lineHeight: 1.5 }}>
          Pass this personal authentication token in the <code>Authorization: Bearer &lt;token&gt;</code> HTTP header for all requests.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(15, 23, 42, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "10px",
            padding: "10px 14px",
            gap: "12px",
          }}
        >
          <code
            style={{
              flex: 1,
              fontFamily: "monospace",
              fontSize: "0.88rem",
              color: "#38bdf8",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {token}
          </code>
          <button
            onClick={handleCopyToken}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "7px 14px",
              background: tokenCopied ? "#10b981" : "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: 600,
              boxShadow: "0 2px 8px rgba(37, 99, 235, 0.35)",
              transition: "all 0.2s ease",
            }}
          >
            {tokenCopied ? <RiCheckLine size={16} /> : <RiFileCopyLine size={16} />}
            {tokenCopied ? "Copied" : "Copy Token"}
          </button>
        </div>
      </div>

      {/* Code Snippet Card */}
      <div
        style={{
          background: "linear-gradient(145deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.6)",
          padding: "28px",
          color: "#f8fafc",
          marginBottom: "32px",
          backdropFilter: "blur(20px)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <RiTerminalBoxLine size={22} color="#38bdf8" />
            <span style={{ fontWeight: 700, fontSize: "1rem", color: "#ffffff" }}>
              Quickstart: Create Short Link via cURL
            </span>
          </div>
          <button
            onClick={handleCopyCode}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "8px",
              padding: "7px 14px",
              color: "#ffffff",
              cursor: "pointer",
              fontSize: "0.82rem",
              fontWeight: 500,
              transition: "all 0.2s ease",
            }}
          >
            {codeCopied ? <RiCheckLine size={14} color="#34d399" /> : <RiFileCopyLine size={14} />}
            {codeCopied ? "Copied" : "Copy cURL"}
          </button>
        </div>

        <pre
          style={{
            margin: 0,
            padding: "18px",
            background: "rgba(10, 15, 26, 0.9)",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            fontSize: "0.88rem",
            lineHeight: 1.6,
            overflowX: "auto",
            color: "#38bdf8",
          }}
        >
          {curlExample}
        </pre>
      </div>

      {/* API Reference Table */}
      <div
        style={{
          background: "linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 25px rgba(37, 99, 235, 0.12)",
          backdropFilter: "blur(20px)",
          padding: "32px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <RiCodeSSlashLine size={24} color="#38bdf8" />
          <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800, color: "#ffffff" }}>
            Core API Endpoints
          </h3>
        </div>

        <div style={{ overflowX: "auto", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "12px", background: "rgba(15, 23, 42, 0.5)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "rgba(15, 23, 42, 0.85)", color: "#94a3b8", fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                <th style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>Method</th>
                <th style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>Endpoint</th>
                <th style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>Auth</th>
                <th style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                  Description
                </th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "0.9rem" }}>
              <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                <td style={{ padding: "16px" }}>
                  <span style={{ background: "rgba(37, 99, 235, 0.2)", color: "#60a5fa", border: "1px solid rgba(37, 99, 235, 0.4)", padding: "4px 10px", borderRadius: "6px", fontWeight: 800, fontSize: "0.8rem" }}>
                    POST
                  </span>
                </td>
                <td style={{ padding: "16px", fontFamily: "monospace", color: "#38bdf8" }}>/api/v1/links</td>
                <td style={{ padding: "16px", color: "#34d399", fontWeight: 600 }}>Bearer</td>
                <td style={{ padding: "16px", color: "#cbd5e1" }}>Create short link (auto-generated or custom alias)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                <td style={{ padding: "16px" }}>
                  <span style={{ background: "rgba(16, 185, 129, 0.2)", color: "#34d399", border: "1px solid rgba(16, 185, 129, 0.4)", padding: "4px 10px", borderRadius: "6px", fontWeight: 800, fontSize: "0.8rem" }}>
                    GET
                  </span>
                </td>
                <td style={{ padding: "16px", fontFamily: "monospace", color: "#38bdf8" }}>/api/v1/links</td>
                <td style={{ padding: "16px", color: "#34d399", fontWeight: 600 }}>Bearer</td>
                <td style={{ padding: "16px", color: "#cbd5e1" }}>List all user links with click metrics</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                <td style={{ padding: "16px" }}>
                  <span style={{ background: "rgba(245, 158, 11, 0.2)", color: "#fbbf24", border: "1px solid rgba(245, 158, 11, 0.4)", padding: "4px 10px", borderRadius: "6px", fontWeight: 800, fontSize: "0.8rem" }}>
                    PATCH
                  </span>
                </td>
                <td style={{ padding: "16px", fontFamily: "monospace", color: "#38bdf8" }}>/api/v1/links/:id</td>
                <td style={{ padding: "16px", color: "#34d399", fontWeight: 600 }}>Bearer</td>
                <td style={{ padding: "16px", color: "#cbd5e1" }}>Update destination URL or custom alias</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                <td style={{ padding: "16px" }}>
                  <span style={{ background: "rgba(239, 68, 68, 0.2)", color: "#f87171", border: "1px solid rgba(239, 68, 68, 0.4)", padding: "4px 10px", borderRadius: "6px", fontWeight: 800, fontSize: "0.8rem" }}>
                    DELETE
                  </span>
                </td>
                <td style={{ padding: "16px", fontFamily: "monospace", color: "#38bdf8" }}>/api/v1/links/:id</td>
                <td style={{ padding: "16px", color: "#34d399", fontWeight: 600 }}>Bearer</td>
                <td style={{ padding: "16px", color: "#cbd5e1" }}>Permanently delete link</td>
              </tr>
              <tr>
                <td style={{ padding: "16px" }}>
                  <span style={{ background: "rgba(16, 185, 129, 0.2)", color: "#34d399", border: "1px solid rgba(16, 185, 129, 0.4)", padding: "4px 10px", borderRadius: "6px", fontWeight: 800, fontSize: "0.8rem" }}>
                    GET
                  </span>
                </td>
                <td style={{ padding: "16px", fontFamily: "monospace", color: "#38bdf8" }}>/:urlId</td>
                <td style={{ padding: "16px", color: "#94a3b8" }}>Public</td>
                <td style={{ padding: "16px", color: "#cbd5e1" }}>HTTP 302 Found redirect & atomic click increment</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
