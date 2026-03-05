"use client";

import { useState } from "react";
import { toggleSectionEnabled, updateSectionTitle } from "@/lib/actions/homepage-sections";
import type { HomepageSection } from "@/lib/types";

interface HomepageSectionsClientProps {
  sections: HomepageSection[];
}

const configs: Record<string, { accent: string; bg: string }> = {
  featured:   { accent: "#22C55E", bg: "rgba(34,197,94,0.08)" },
  valentine:  { accent: "#22C55E", bg: "rgba(34,197,94,0.08)" },
  mothersday: { accent: "#22C55E", bg: "rgba(34,197,94,0.08)" },
};

export default function HomepageSectionsClient({ sections }: HomepageSectionsClientProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = async (id: string, currentValue: boolean) => {
    setLoading(id);
    setError(null);
    const result = await toggleSectionEnabled(id, !currentValue);
    if (result?.error) {
      setError(result.error);
    }
    setLoading(null);
  };

  const startEdit = (section: HomepageSection) => {
    setEditingId(section.id);
    setEditTitle(section.title);
    setEditDesc(section.description ?? "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDesc("");
  };

  const handleSave = async (id: string) => {
    if (!editTitle.trim()) return;
    setSaving(true);
    setError(null);
    const result = await updateSectionTitle(id, editTitle.trim(), editDesc.trim());
    if (result?.error) {
      setError(result.error);
      setSaving(false);
      return;
    }
    setSaving(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "#FEF2F2", color: "#B91C1C", border: "1px solid #FECACA" }}>
          {error}
        </div>
      )}
      {sections.map((section) => {
        const cfg = configs[section.id] ?? { icon: "🎁", accent: "#6B6462", bg: "#F5F5F5" };
        const isOn = section.is_enabled;
        const isEditing = editingId === section.id;

        return (
          <div
            key={section.id}
            className="rounded-2xl transition-all overflow-hidden"
            style={{
              background: isOn ? cfg.bg : "white",
              border: `2px solid ${isOn ? cfg.accent : "#E5E7EB"}`,
              boxShadow: isOn ? `0 2px 12px ${cfg.accent}22` : "none",
            }}
          >
            {isOn && (
              <div className="h-1 w-full" style={{ background: cfg.accent }} />
            )}
            <div className="p-4 sm:p-6 flex items-start gap-3 sm:gap-4">
              {/* Content */}
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Section title"
                      className="w-full text-sm px-3 py-2 rounded-lg outline-none"
                      style={{
                        border: `1.5px solid ${cfg.accent}`,
                        color: "#2C2826",
                        background: "white",
                      }}
                      autoFocus
                    />
                    <input
                      type="text"
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      placeholder="Description (optional)"
                      className="w-full text-sm px-3 py-2 rounded-lg outline-none"
                      style={{
                        border: "1.5px solid #F2D7D9",
                        color: "#6B6462",
                        background: "white",
                      }}
                    />
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => handleSave(section.id)}
                        disabled={saving || !editTitle.trim()}
                        className="px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all active:scale-95 disabled:opacity-50"
                        style={{ background: cfg.accent }}
                      >
                        {saving ? "Saving…" : "Save"}
                      </button>
                      <button
                        onClick={cancelEdit}
                        disabled={saving}
                        className="px-4 py-2 rounded-lg text-xs font-medium transition-all active:scale-95 hover:opacity-70"
                        style={{ background: "#F5F5F5", color: "#6B6462" }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-1">
                      <h3 className="font-heading text-base sm:text-lg" style={{ color: "#2C2826" }}>
                        {section.title}
                      </h3>
                      {isOn && (
                        <span
                          className="text-xs px-2 sm:px-2.5 py-0.5 rounded-full font-medium"
                          style={{ background: "#DCFCE7", color: "#166534" }}
                        >
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm" style={{ color: "#9B9593" }}>{section.description}</p>
                  </>
                )}
              </div>

              {/* Edit + Toggle */}
              {!isEditing && (
                <div className="flex items-center gap-2 shrink-0 mt-0.5">
                  <button
                    onClick={() => startEdit(section)}
                    className="p-2 sm:p-1.5 rounded-lg transition-all active:scale-95 hover:opacity-70"
                    style={{ background: "rgba(0,0,0,0.05)", color: "#9B9593" }}
                    title="Edit title"
                  >
                    <svg className="w-4 h-4 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleToggle(section.id, isOn)}
                    disabled={loading === section.id}
                    className="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none shrink-0 disabled:opacity-50 active:scale-95"
                    style={{ background: isOn ? "#22C55E" : "#D1D5DB" }}
                    aria-label={isOn ? "Disable section" : "Enable section"}
                  >
                    {loading === section.id ? (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      </span>
                    ) : (
                      <span
                        className="inline-block h-5 w-5 transform rounded-full bg-white transition-transform"
                        style={{
                          transform: isOn ? "translateX(26px)" : "translateX(4px)",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                        }}
                      />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
