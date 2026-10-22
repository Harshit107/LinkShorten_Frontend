import React, { useEffect, useState, useCallback } from "react";
import { GET_ALL_LINK_API, defaultSetting } from "../config";
import { useServer } from "../hooks/useServer";
import { formatMongoTimestamp } from "../helper/Common";
import { motion } from "framer-motion";
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
  const { handleAPICall, isLoading } = useServer();
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
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "1.9rem",
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.025em",
              margin: 0,
            }}
          >
            Analytics & Performance
          </h1>
          <p style={{ color: "#64748b", margin: "6px 0 0", fontSize: "0.95rem" }}>
            Track real-time engagement and visitor clicks across all your shortened URLs
          </p>
        </div>
        <button
          onClick={fetchAnalytics}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "9px 18px",
            background: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: "10px",
            color: "#334155",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.9rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            transition: "all 0.2s ease",
          }}
        >
          <RiRefreshLine size={16} /> Refresh Metrics
        </button>
      </div>

      {/* KPI Cards with Framer Motion hover and entrance */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "36px",
        }}
      >
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          style={{
            background: "#ffffff",
            padding: "24px",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#2563eb" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "#eff6ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RiLinkM size={22} />
            </div>
            <span style={{ color: "#64748b", fontSize: "0.9rem", fontWeight: 600 }}>
              Total Short Links
            </span>
          </div>
          <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", marginTop: "16px" }}>
            {totalLinks}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          style={{
            background: "#ffffff",
            padding: "24px",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#10b981" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "#ecfdf5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RiCursorLine size={22} />
            </div>
            <span style={{ color: "#64748b", fontSize: "0.9rem", fontWeight: 600 }}>
              Total Visits
            </span>
          </div>
          <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", marginTop: "16px" }}>
            {totalClicks}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          style={{
            background: "#ffffff",
            padding: "24px",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#8b5cf6" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "#f5f3ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RiBarChartBoxLine size={22} />
            </div>
            <span style={{ color: "#64748b", fontSize: "0.9rem", fontWeight: 600 }}>
              Average per Link
            </span>
          </div>
          <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", marginTop: "16px" }}>
            {avgClicks}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          style={{
            background: "#ffffff",
            padding: "24px",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#f59e0b" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "#fef3c7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RiFireLine size={22} />
            </div>
            <span style={{ color: "#64748b", fontSize: "0.9rem", fontWeight: 600 }}>
              Top Performer
            </span>
          </div>
          <div
            style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "#0f172a",
              marginTop: "16px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {topLink ? `/${topLink.urlId}` : "N/A"}
          </div>
          <span style={{ fontSize: "0.82rem", color: "#10b981", fontWeight: 600 }}>
            {topLink ? `${topLink.click || 0} visits recorded` : "No visits yet"}
          </span>
        </motion.div>
      </div>

      {/* Breakdown Table Card */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 25px rgba(0,0,0,0.05)",
          padding: "28px",
        }}
      >
        <h3 style={{ margin: "0 0 20px", color: "#0f172a", fontSize: "1.2rem", fontWeight: 700 }}>
          Link Engagement Breakdown
        </h3>

        {isLoading && links.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
            Loading analytics...
          </div>
        ) : links.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 20px", color: "#64748b" }}>
            <p style={{ margin: "0 0 12px", fontSize: "1rem" }}>No analytics data yet.</p>
            <Link
              to="/dashboard"
              style={{
                color: "#2563eb",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "0.95rem",
              }}
            >
              Go to Dashboard to create your first link →
            </Link>
          </div>
        ) : (
          <div style={{ overflowX: "auto", border: "1px solid #e2e8f0", borderRadius: "10px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "#f8fafc", color: "#475569", fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  <th style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0" }}>
                    Short ID
                  </th>
                  <th style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0" }}>
                    Destination URL
                  </th>
                  <th style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0" }}>
                    Visits
                  </th>
                  <th style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0" }}>
                    Engagement Share
                  </th>
                  <th style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0" }}>
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
                        borderBottom: "1px solid #f1f5f9",
                        fontSize: "0.9rem",
                      }}
                    >
                      <td style={{ padding: "14px 16px", fontWeight: 700, color: "#2563eb" }}>
                        <a
                          href={shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#2563eb",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          /{link.urlId} <RiExternalLinkLine size={13} />
                        </a>
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          maxWidth: "320px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          color: "#64748b",
                        }}
                        title={link.originalUrl}
                      >
                        {link.originalUrl}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span
                          style={{
                            background: (link.click || 0) > 0 ? "#ecfdf5" : "#f1f5f9",
                            color: (link.click || 0) > 0 ? "#059669" : "#64748b",
                            border: `1px solid ${(link.click || 0) > 0 ? "#a7f3d0" : "#e2e8f0"}`,
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontWeight: 700,
                            fontSize: "0.82rem",
                          }}
                        >
                          {link.click || 0}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px", minWidth: "150px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div
                            style={{
                              flex: 1,
                              background: "#e2e8f0",
                              height: "8px",
                              borderRadius: "4px",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                width: `${percent}%`,
                                background: "linear-gradient(90deg, #2563eb, #38bdf8)",
                                height: "100%",
                                borderRadius: "4px",
                              }}
                            />
                          </div>
                          <span style={{ fontSize: "0.82rem", color: "#475569", minWidth: "32px", fontWeight: 600 }}>
                            {percent}%
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px", color: "#64748b", fontSize: "0.85rem" }}>
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
