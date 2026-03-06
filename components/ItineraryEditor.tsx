"use client";

import React, { useState } from "react";
import { Pencil, Trash2, Plus, Check, X, GripVertical } from "lucide-react";
import {
    updateItineraryItem,
    addItineraryItem,
    deleteItineraryItem,
    addItineraryDay,
    deleteItineraryDay,
} from "@/lib/itinerary-actions";

interface ItineraryItemData {
    id: string;
    title: string;
    description: string | null;
    timeBucket: string;
    sortOrder: number;
}

interface ItineraryDayData {
    id: string;
    dayIndex: number;
    title: string;
    items: ItineraryItemData[];
}

interface ItineraryEditorProps {
    itineraryId: string;
    initialDays: ItineraryDayData[];
    readOnly?: boolean;
}

export default function ItineraryEditor({ itineraryId, initialDays, readOnly = false }: ItineraryEditorProps) {
    const [days, setDays] = useState(initialDays);
    const [editingItem, setEditingItem] = useState<string | null>(null);
    const [editData, setEditData] = useState({ title: "", description: "", timeBucket: "" });
    const [addingToDay, setAddingToDay] = useState<string | null>(null);
    const [newItem, setNewItem] = useState({ title: "", description: "", timeBucket: "Morning" });
    const [isAddingDay, setIsAddingDay] = useState(false);
    const [newDayTitle, setNewDayTitle] = useState("");
    const [saving, setSaving] = useState(false);

    const startEdit = (item: ItineraryItemData) => {
        setEditingItem(item.id);
        setEditData({
            title: item.title,
            description: item.description || "",
            timeBucket: item.timeBucket,
        });
    };

    const saveEdit = async (itemId: string) => {
        setSaving(true);
        try {
            await updateItineraryItem(itemId, editData);
            setDays(prev =>
                prev.map(day => ({
                    ...day,
                    items: day.items.map(item =>
                        item.id === itemId ? { ...item, ...editData } : item
                    ),
                }))
            );
            setEditingItem(null);
        } catch (err) {
            alert("Failed to save changes");
        } finally {
            setSaving(false);
        }
    };

    const handleAddItem = async (dayId: string) => {
        if (!newItem.title.trim()) return;
        setSaving(true);
        try {
            const item = await addItineraryItem(dayId, newItem);
            setDays(prev =>
                prev.map(day =>
                    day.id === dayId ? { ...day, items: [...day.items, item] } : day
                )
            );
            setNewItem({ title: "", description: "", timeBucket: "Morning" });
            setAddingToDay(null);
        } catch (err) {
            alert("Failed to add activity");
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteItem = async (itemId: string, dayId: string) => {
        if (!confirm("Delete this activity?")) return;
        setSaving(true);
        try {
            await deleteItineraryItem(itemId);
            setDays(prev =>
                prev.map(day =>
                    day.id === dayId
                        ? { ...day, items: day.items.filter(i => i.id !== itemId) }
                        : day
                )
            );
        } catch (err) {
            alert("Failed to delete");
        } finally {
            setSaving(false);
        }
    };

    const handleAddDay = async () => {
        if (!newDayTitle.trim()) return;
        setSaving(true);
        try {
            const day = await addItineraryDay(itineraryId, newDayTitle);
            setDays(prev => [...prev, { ...day, items: [] }]);
            setNewDayTitle("");
            setIsAddingDay(false);
        } catch (err) {
            alert("Failed to add day");
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteDay = async (dayId: string) => {
        if (!confirm("Delete this entire day and all its activities?")) return;
        setSaving(true);
        try {
            await deleteItineraryDay(dayId);
            setDays(prev => prev.filter(d => d.id !== dayId));
        } catch (err) {
            alert("Failed to delete day");
        } finally {
            setSaving(false);
        }
    };

    const inputStyle: React.CSSProperties = {
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid var(--border)',
        borderRadius: '0.5rem',
        padding: '0.5rem 0.75rem',
        color: 'white',
        fontSize: '0.875rem',
        width: '100%',
    };

    const smallBtnStyle: React.CSSProperties = {
        background: 'none',
        border: '1px solid var(--border)',
        borderRadius: '0.5rem',
        padding: '0.35rem 0.5rem',
        color: 'var(--secondary)',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        fontSize: '0.75rem',
        transition: 'all 0.2s',
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {days.map((day) => (
                <div key={day.id} className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)' }}>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ fontWeight: 800, fontSize: '1.5rem', opacity: 0.3 }}>{day.dayIndex}</div>
                            <h3 style={{ fontSize: '1.25rem' }}>{day.title}</h3>
                        </div>
                        {!readOnly && (
                            <button
                                onClick={() => handleDeleteDay(day.id)}
                                style={{ ...smallBtnStyle, color: '#ef4444' }}
                            >
                                <Trash2 size={12} />
                            </button>
                        )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {day.items.map((item) => (
                            <div key={item.id} style={{ paddingLeft: '3rem', borderLeft: '1px solid var(--border)', position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '-5px', top: '8px', width: '9px', height: '9px', borderRadius: '50%', background: 'var(--accent)' }} />

                                {editingItem === item.id ? (
                                    /* Edit Mode */
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <input
                                            value={editData.title}
                                            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                            style={inputStyle}
                                            placeholder="Activity title"
                                        />
                                        <textarea
                                            value={editData.description}
                                            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                            style={{ ...inputStyle, resize: 'none', minHeight: '60px' }}
                                            placeholder="Description"
                                        />
                                        <select
                                            value={editData.timeBucket}
                                            onChange={(e) => setEditData({ ...editData, timeBucket: e.target.value })}
                                            style={inputStyle}
                                        >
                                            <option value="Morning">Morning</option>
                                            <option value="Afternoon">Afternoon</option>
                                            <option value="Evening">Evening</option>
                                            <option value="Night">Night</option>
                                        </select>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => saveEdit(item.id)}
                                                disabled={saving}
                                                style={{ ...smallBtnStyle, color: '#10b981', borderColor: '#10b981' }}
                                            >
                                                <Check size={12} /> Save
                                            </button>
                                            <button onClick={() => setEditingItem(null)} style={smallBtnStyle}>
                                                <X size={12} /> Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    /* View Mode */
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', alignItems: 'flex-start' }}>
                                            <h4 style={{ fontWeight: 600 }}>{item.title}</h4>
                                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0 }}>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', textTransform: 'uppercase' }}>{item.timeBucket}</span>
                                                {!readOnly && (
                                                    <>
                                                        <button onClick={() => startEdit(item)} style={smallBtnStyle} title="Edit">
                                                            <Pencil size={11} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteItem(item.id, day.id)}
                                                            style={{ ...smallBtnStyle, color: '#ef4444' }}
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={11} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--secondary)' }}>{item.description}</p>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Add Activity Form */}
                        {!readOnly && (
                            addingToDay === day.id ? (
                                <div style={{ paddingLeft: '3rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderLeft: '1px dashed var(--accent)' }}>
                                    <input
                                        value={newItem.title}
                                        onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                        style={inputStyle}
                                        placeholder="Activity title"
                                        autoFocus
                                    />
                                    <input
                                        value={newItem.description}
                                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                        style={inputStyle}
                                        placeholder="Brief description"
                                    />
                                    <select
                                        value={newItem.timeBucket}
                                        onChange={(e) => setNewItem({ ...newItem, timeBucket: e.target.value })}
                                        style={inputStyle}
                                    >
                                        <option value="Morning">Morning</option>
                                        <option value="Afternoon">Afternoon</option>
                                        <option value="Evening">Evening</option>
                                        <option value="Night">Night</option>
                                    </select>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => handleAddItem(day.id)}
                                            disabled={saving || !newItem.title.trim()}
                                            style={{ ...smallBtnStyle, color: '#10b981', borderColor: '#10b981' }}
                                        >
                                            <Check size={12} /> Add
                                        </button>
                                        <button onClick={() => setAddingToDay(null)} style={smallBtnStyle}>
                                            <X size={12} /> Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => { setAddingToDay(day.id); setNewItem({ title: '', description: '', timeBucket: 'Morning' }); }}
                                    style={{
                                        ...smallBtnStyle,
                                        marginLeft: '3rem',
                                        color: 'var(--accent)',
                                        borderColor: 'var(--accent)',
                                        borderStyle: 'dashed',
                                        width: 'fit-content'
                                    }}
                                >
                                    <Plus size={12} /> Add Activity
                                </button>
                            )
                        )}
                    </div>
                </div>
            ))}

            {/* Add Day */}
            {!readOnly && (
                isAddingDay ? (
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px dashed var(--accent)' }}>
                        <input
                            value={newDayTitle}
                            onChange={(e) => setNewDayTitle(e.target.value)}
                            style={{ ...inputStyle, marginBottom: '0.75rem' }}
                            placeholder="Day title (e.g., 'Markets & Culture')"
                            autoFocus
                        />
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={handleAddDay}
                                disabled={saving || !newDayTitle.trim()}
                                style={{ ...smallBtnStyle, color: '#10b981', borderColor: '#10b981' }}
                            >
                                <Check size={12} /> Add Day
                            </button>
                            <button onClick={() => setIsAddingDay(false)} style={smallBtnStyle}>
                                <X size={12} /> Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsAddingDay(true)}
                        className="btn btn-secondary"
                        style={{ width: 'fit-content', borderStyle: 'dashed', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <Plus size={16} /> Add Day
                    </button>
                )
            )}
        </div>
    );
}
