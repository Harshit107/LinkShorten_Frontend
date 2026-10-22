import React, { useState } from "react";
import { getTokenFromLocalStorage } from "../helper/LocalStorage";
import { API_BASE_URL } from "../config";
import {
  RiFileCopyLine,
  RiCheckLine,
  RiKeyLine,
  RiTerminalBoxLine,
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
    <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#111827", margin: 0 }}>
          Developer REST API
        </h1>
        <p style={{ color: "#6b7280", margin: "4px 0 0" }}>
          Integrate programmatic URL shortening and click tracking directly into your applications
        </p>
      </div>

      {/* API Key / Token Card */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          padding: "24px",
          marginBottom: "28px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <RiKeyLine size={22} color="#2563eb" />
          <h3 style={{ margin: 0, fontSize: "1.1rem", color: "#111827" }}>
            Your Authorization Token
          </h3>
        </div>
        <p style={{ color: "#6b7280", fontSize: "0.9rem", margin: "0 0 16px" }}>
          Pass this token in the <code>Authorization: Bearer &lt;token&gt;</code> HTTP header for all
          API requests.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "8px 12px",
            gap: "10px",
          }}
        >
          <code
            style={{
              flex: 1,
              fontFamily: "monospace",
              fontSize: "0.85rem",
              color: "#374151",
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
              padding: "6px 12px",
              background: tokenCopied ? "#10b981" : "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: 500,
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
          background: "#1e293b",
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          padding: "24px",
          color: "#f8fafc",
          marginBottom: "28px",
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
            <RiTerminalBoxLine size={20} color="#38bdf8" />
            <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>
              Quickstart: Create Short Link via cURL
            </span>
          </div>
          <button
            onClick={handleCopyCode}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: "6px",
              padding: "6px 12px",
              color: "#ffffff",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            {codeCopied ? <RiCheckLine size={14} color="#4ade80" /> : <RiFileCopyLine size={14} />}
            {codeCopied ? "Copied" : "Copy cURL"}
          </button>
        </div>

        <pre
          style={{
            margin: 0,
            padding: "16px",
            background: "#0f172a",
            borderRadius: "8px",
            fontSize: "0.85rem",
            lineHeight: 1.5,
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
          background: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          padding: "24px",
        }}
      >
        <h3 style={{ margin: "0 0 16px", fontSize: "1.1rem", color: "#111827" }}>
          Core Endpoints
        </h3>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "#f9fafb", color: "#4b5563", fontSize: "0.85rem" }}>
              <th style={{ padding: "10px 14px", borderBottom: "1px solid #e5e7eb" }}>Method</th>
              <th style={{ padding: "10px 14px", borderBottom: "1px solid #e5e7eb" }}>Endpoint</th>
              <th style={{ padding: "10px 14px", borderBottom: "1px solid #e5e7eb" }}>Auth</th>
              <th style={{ padding: "10px 14px", borderBottom: "1px solid #e5e7eb" }}>
                Description
              </th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "0.9rem" }}>
            <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
              <td style={{ padding: "12px 14px" }}>
                <span style={{ background: "#dbeafe", color: "#1d4ed8", padding: "2px 8px", borderRadius: "4px", fontWeight: 700, fontSize: "0.8rem" }}>
                  POST
                </span>
              </td>
              <td style={{ padding: "12px 14px", fontFamily: "monospace" }}>/api/v1/links</td>
              <td style={{ padding: "12px 14px", color: "#059669" }}>Bearer</td>
              <td style={{ padding: "12px 14px" }}>Create short link (auto-generated or custom alias)</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
              <td style={{ padding: "12px 14px" }}>
                <span style={{ background: "#ecfdf5", color: "#047857", padding: "2px 8px", borderRadius: "4px", fontWeight: 700, fontSize: "0.8rem" }}>
                  GET
                </span>
              </td>
              <td style={{ padding: "12px 14px", fontFamily: "monospace" }}>/api/v1/links</td>
              <td style={{ padding: "12px 14px", color: "#059669" }}>Bearer</td>
              <td style={{ padding: "12px 14px" }}>List all user links with click metrics</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
              <td style={{ padding: "12px 14px" }}>
                <span style={{ background: "#fef3c7", color: "#b45309", padding: "2px 8px", borderRadius: "4px", fontWeight: 700, fontSize: "0.8rem" }}>
                  PATCH
                </span>
              </td>
              <td style={{ padding: "12px 14px", fontFamily: "monospace" }}>/api/v1/links/:id</td>
              <td style={{ padding: "12px 14px", color: "#059669" }}>Bearer</td>
              <td style={{ padding: "12px 14px" }}>Update destination URL or custom alias</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
              <td style={{ padding: "12px 14px" }}>
                <span style={{ background: "#fee2e2", color: "#b91c1c", padding: "2px 8px", borderRadius: "4px", fontWeight: 700, fontSize: "0.8rem" }}>
                  DELETE
                </span>
              </td>
              <td style={{ padding: "12px 14px", fontFamily: "monospace" }}>/api/v1/links/:id</td>
              <td style={{ padding: "12px 14px", color: "#059669" }}>Bearer</td>
              <td style={{ padding: "12px 14px" }}>Permanently delete link</td>
            </tr>
            <tr>
              <td style={{ padding: "12px 14px" }}>
                <span style={{ background: "#ecfdf5", color: "#047857", padding: "2px 8px", borderRadius: "4px", fontWeight: 700, fontSize: "0.8rem" }}>
                  GET
                </span>
              </td>
              <td style={{ padding: "12px 14px", fontFamily: "monospace" }}>/:urlId</td>
              <td style={{ padding: "12px 14px", color: "#6b7280" }}>Public</td>
              <td style={{ padding: "12px 14px" }}>HTTP 302 Found redirect & atomic click increment</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
