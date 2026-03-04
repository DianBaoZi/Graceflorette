"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteCategory } from "@/lib/actions/categories";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
  created_at: string;
}

interface CategoryTableProps {
  categories: Category[];
}

export default function CategoryTable({ categories }: CategoryTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?\n\nThis cannot be undone.`)) return;
    setDeletingId(id);
    setError("");
    const result = await deleteCategory(id);
    if (result?.error) {
      setError(result.error);
      setDeletingId(null);
    }
  };

  if (categories.length === 0) {
    return (
      <div className="text-center py-20 rounded-2xl" style={{ background: "white", border: "1px solid #F2D7D9" }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "#FDF8F4" }}>
          <svg className="w-8 h-8" style={{ color: "#C9A2A7" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </div>
        <h3 className="font-heading text-xl mb-2" style={{ color: "#2C2826" }}>No categories yet</h3>
        <p className="text-sm mb-7" style={{ color: "#9B9593" }}>Create your first category to organise your products</p>
        <Link
          href="/Grace-admin/categories/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #C9A2A7, #b5828a)" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create First Category
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "#FEF2F2", color: "#B91C1C", border: "1px solid #FECACA" }}>
          {error}
        </div>
      )}
      <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid #F2D7D9" }}>
        <table className="w-full bg-white" style={{ minWidth: "600px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #F2D7D9", background: "#FDF8F4" }}>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#9B9593", width: 72 }}>Order</th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#9B9593" }}>Name</th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#9B9593" }}>Slug</th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#9B9593" }}>Description</th>
              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider" style={{ color: "#9B9593" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, i) => (
              <tr
                key={category.id}
                style={{
                  borderBottom: i < categories.length - 1 ? "1px solid rgba(242,215,217,0.45)" : "none",
                  background: "white",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#FFFAF9")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
              >
                <td className="px-5 py-4">
                  <span
                    className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-semibold"
                    style={{ background: "#F5EDE5", color: "#C4A882" }}
                  >
                    {category.display_order}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm font-medium" style={{ color: "#2C2826" }}>{category.name}</span>
                </td>
                <td className="px-5 py-4">
                  <code className="text-xs px-2.5 py-1 rounded-md" style={{ background: "#F5EDE5", color: "#6B6462" }}>
                    {category.slug}
                  </code>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm" style={{ color: "#9B9593" }}>{category.description || "—"}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <Link
                      href={`/Grace-admin/categories/${category.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
                      style={{ background: "rgba(242,215,217,0.35)", color: "#C9A2A7" }}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(category.id, category.name)}
                      disabled={deletingId === category.id}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ background: "#FEF2F2", color: "#EF4444" }}
                    >
                      {deletingId === category.id ? (
                        <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                      {deletingId === category.id ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
