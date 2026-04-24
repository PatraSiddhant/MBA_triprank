"use client";

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface State {
    hasError: boolean;
    message: string;
}

export class ErrorBoundary extends React.Component<{ children: React.ReactNode; fallback?: React.ReactNode }, State> {
    constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, message: "" };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, message: error.message };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error("ErrorBoundary caught:", error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;
            return (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "4rem 2rem",
                        textAlign: "center",
                        minHeight: "300px",
                        gap: "1rem",
                    }}
                >
                    <div
                        style={{
                            padding: "1rem",
                            background: "rgba(239,68,68,0.1)",
                            borderRadius: "50%",
                            color: "#ef4444",
                        }}
                    >
                        <AlertTriangle size={32} />
                    </div>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Something went wrong</h2>
                    <p style={{ color: "var(--secondary)", fontSize: "0.875rem", maxWidth: "360px" }}>
                        {this.state.message || "An unexpected error occurred. Please try refreshing the page."}
                    </p>
                    <button
                        onClick={() => { this.setState({ hasError: false, message: "" }); window.location.reload(); }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.6rem 1.25rem",
                            borderRadius: "0.75rem",
                            background: "var(--accent)",
                            color: "#fff",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                        }}
                    >
                        <RefreshCw size={15} /> Refresh Page
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}
