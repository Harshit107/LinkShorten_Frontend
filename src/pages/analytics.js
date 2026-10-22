import React, { useEffect, useState, useCallback } from "react";
import { GET_ALL_LINK_API, defaultSetting } from "../config";
import { useServer } from "../hooks/useServer";
import { formatMongoTimestamp } from "../helper/Common";
import {
  RiBarChartBoxLine,
  RiCursorLine,
  RiLinkM,
  RiFireLine,
  RiExternalLinkLine,
  RiRefreshLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Analytics() {
  const { handleAPICall, isLoading, error } = useServer();
  const [links, setLinks] = useState([]);

  const fetchAnalytics = useCallback(async () => {
    const res = await handleAPICall(GET_ALL_LINK_API, "GET");
    const linkList = Array.isArray(res?.data)
      ? res.data
      : Array.isArray(res?.links)
      ? res.links
      : null;

    if (Array.isArray(linkList)) {
      setLinks(linkList);
    }
  }, [handleAPICall]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const totalLinks = links.length;
  const totalClicks = links.reduce((sum, l) => sum + (l.click || 0), 0);
  const avgClicks = totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : 0;

  const topLink =
    links.length > 0
      ? [...links].sort((a, b) => (b.click || 0) - (a.click || 0))[0]
      : null;

  return (
    <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "28px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "#111827",
              margin: 0,
            }}
          >
            Analytics & Performance
          </h1>
          <p style={{ color: "#6b7280", margin: "4px 0 0" }}>
            Track real-time engagement and visitor clicks across all your shortened URLs
          </p>
        </div>
        <button
          onClick={fetchAnalytics}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 16px",
            background: "#ffffff",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            color: "#374151",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          <RiRefreshLine size={16} /> Refresh
        </button>
      </div>

      {/* KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#2563eb" }}>
            <RiLinkM size={24} />
            <span style={{ color: "#6b7280", fontSize: "0.9rem", fontWeight: 500 }}>
              Total Short Links
            </span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "#111827", marginTop: "12px" }}>
            {totalLinks}
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#10b981" }}>
            <RiCursorLine size={24} />
            <span style={{ color: "#6b7280", fontSize: "0.9rem", fontWeight: 500 }}>
              Total Clicks
            </span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "#111827", marginTop: "12px" }}>
            {totalClicks}
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#8b5cf6" }}>
            <RiBarChartBoxLine size={24} />
            <span style={{ color: "#6b7280", fontSize: "0.9rem", fontWeight: 500 }}>
              Average per Link
            </span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "#111827", marginTop: "12px" }}>
            {avgClicks}
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#f59e0b" }}>
            <RiFireLine size={24} />
            <span style={{ color: "#6b7280", fontSize: "0.9rem", fontWeight: 500 }}>
              Top Performer
            </span>
          </div>
          <div
            style={{
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "#111827",
              marginTop: "12px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {topLink ? `/${topLink.urlId}` : "N/A"}
          </div>
          <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>
            {topLink ? `${topLink.click || 0} visits` : "No visits recorded"}
          </span>
        </div>
      </div>

      {/* Breakdown Table */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
          padding: "24px",
        }}
      >
        <h3 style={{ margin: "0 0 16px", color: "#111827", fontSize: "1.1rem" }}>
          Link Engagement Breakdown
        </h3>

        {isLoading && links.length === 0 ? (
          <div style={{ textAlign: "center", padding: "30px", color: "#6b7280" }}>
            Loading analytics...
          </div>
        ) : links.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#6b7280" }}>
            <p>No analytics data yet.</p>
            <Link
              to="/dashboard"
              style={{
                color: "#2563eb",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Go to Dashboard to create your first link →
            </Link>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "#f9fafb", color: "#4b5563", fontSize: "0.85rem" }}>
                  <th style={{ padding: "10px 14px", borderBottom: "1px solid #e5e7eb" }}>
                    Short ID
                  </th>
                  <th style={{ padding: "10px 14px", borderBottom: "1px solid #e5e7eb" }}>
                    Original URL
                  </th>
                  <th style={{ padding: "10px 14px", borderBottom: "1px solid #e5e7eb" }}>
                    Clicks
                  </th>
                  <th style={{ padding: "10px 14px", borderBottom: "1px solid #e5e7eb" }}>
                    Share of Total
                  </th>
                  <th style={{ padding: "10px 14px", borderBottom: "1px solid #e5e7eb" }}>
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {links.map((link) => {
                  const percent =
                    totalClicks > 0
                      ? Math.round(((link.click || 0) / totalClicks) * 100)
                      : 0;
                  const shortUrl = `${defaultSetting.domain}${link.urlId}`;

                  return (
                    <tr
                      key={link._id}
                      style={{
                        borderBottom: "1px solid #f3f4f6",
                        fontSize: "0.9rem",
                      }}
                    >
                      <td style={{ padding: "12px 14px", fontWeight: 600, color: "#2563eb" }}>
                        <a
                          href={shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#2563eb",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          /{link.urlId} <RiExternalLinkLine size={13} />
                        </a>
                      </td>
                      <td
                        style={{
                          padding: "12px 14px",
                          maxWidth: "320px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          color: "#6b7280",
                        }}
                        title={link.originalUrl}
                      >
                        {link.originalUrl}
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        <span
                          style={{
                            background: "#ecfdf5",
                            color: "#059669",
                            padding: "3px 10px",
                            borderRadius: "12px",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                          }}
                        >
                          {link.click || 0}
                        </span>
                      </td>
                      <td style={{ padding: "12px 14px", minWidth: "140px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div
                            style={{
                              flex: 1,
                              background: "#e5e7eb",
                              height: "6px",
                              borderRadius: "3px",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                width: `${percent}%`,
                                background: "#2563eb",
                                height: "100%",
                              }}
                            />
                          </div>
                          <span style={{ fontSize: "0.8rem", color: "#6b7280", minWidth: "30px" }}>
                            {percent}%
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: "12px 14px", color: "#6b7280", fontSize: "0.85rem" }}>
                        {formatMongoTimestamp(link.createdAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
