"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextValue {
    toast: (message: string, type?: ToastType) => void;
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
    info: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const ICONS = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
};

const COLORS = {
    success: { bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.3)", icon: "#22c55e" },
    error: { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)", icon: "#ef4444" },
    warning: { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)", icon: "#f59e0b" },
    info: { bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.3)", icon: "#3b82f6" },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const dismiss = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const toast = useCallback((message: string, type: ToastType = "info") => {
        const id = Math.random().toString(36).slice(2);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => dismiss(id), 4000);
    }, [dismiss]);

    const success = useCallback((m: string) => toast(m, "success"), [toast]);
    const error = useCallback((m: string) => toast(m, "error"), [toast]);
    const warning = useCallback((m: string) => toast(m, "warning"), [toast]);
    const info = useCallback((m: string) => toast(m, "info"), [toast]);

    return (
        <ToastContext.Provider value={{ toast, success, error, warning, info }}>
            {children}
            <div
                style={{
                    position: "fixed",
                    bottom: "1.5rem",
                    right: "1.5rem",
                    zIndex: 99999,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    pointerEvents: "none",
                }}
            >
                {toasts.map((t) => {
                    const Icon = ICONS[t.type];
                    const colors = COLORS[t.type];
                    return (
                        <div
                            key={t.id}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                                padding: "0.875rem 1.25rem",
                                borderRadius: "0.875rem",
                                background: colors.bg,
                                border: `1px solid ${colors.border}`,
                                backdropFilter: "blur(20px)",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                                minWidth: "260px",
                                maxWidth: "380px",
                                pointerEvents: "all",
                                animation: "slideInToast 0.25s ease",
                            }}
                        >
                            <Icon size={18} color={colors.icon} style={{ flexShrink: 0 }} />
                            <span style={{ flex: 1, fontSize: "0.875rem", fontWeight: 600, color: "var(--foreground)", lineHeight: 1.4 }}>
                                {t.message}
                            </span>
                            <button
                                onClick={() => dismiss(t.id)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: "var(--secondary)",
                                    padding: "2px",
                                    display: "flex",
                                    flexShrink: 0,
                                    minHeight: "unset",
                                    minWidth: "unset",
                                }}
                            >
                                <X size={14} />
                            </button>
                        </div>
                    );
                })}
            </div>
            <style>{`
                @keyframes slideInToast {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </ToastContext.Provider>
    );
}

export function useToast(): ToastContextValue {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within ToastProvider");
    return ctx;
}
