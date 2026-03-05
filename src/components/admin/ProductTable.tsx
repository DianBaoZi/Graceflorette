"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  deleteProduct,
  toggleAvailable,
  toggleTag,
} from "@/lib/actions/products";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  is_available: boolean;
  tags: string[];
  category?: {
    name: string;
  } | null;
}

interface ProductTableProps {
  products: Product[];
  sectionLabels: Record<string, string>;
}

const PAGE_SIZE = 20;

const SECTION_TAGS = [
  { id: "featured",   color: "#C9A2A7" },
  { id: "valentine",  color: "#E11D48" },
  { id: "mothersday", color: "#DB2777" },
];

export default function ProductTable({ products: initialProducts, sectionLabels }: ProductTableProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const paginated = products.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?\n\nThis cannot be undone.`)) return;
    setDeletingId(id);
    setError("");
    const result = await deleteProduct(id);
    if (result?.error) {
      setError(result.error);
      setDeletingId(null);
    } else {
      // Remove from local state immediately
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setDeletingId(null);
      // If we deleted the last item on this page, go back one page
      setPage((prev) => {
        const newTotal = Math.ceil((products.length - 1) / PAGE_SIZE);
        return Math.min(prev, Math.max(0, newTotal - 1));
      });
    }
  };

  const handleToggleAvailable = async (id: string, currentValue: boolean) => {
    const newValue = !currentValue;
    // Optimistic update
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_available: newValue } : p))
    );
    const result = await toggleAvailable(id, newValue);
    if (result?.error) {
      // Revert on error
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_available: currentValue } : p))
      );
      setError(result.error);
    }
  };

  const handleToggleTag = async (id: string, tag: string, currentTags: string[]) => {
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];
    // Optimistic update
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, tags: newTags } : p))
    );
    const result = await toggleTag(id, tag, currentTags);
    if (result?.error) {
      // Revert on error
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, tags: currentTags } : p))
      );
      setError(result.error);
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-20 rounded-2xl" style={{ background: "white", border: "1px solid #F2D7D9" }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "#FDF8F4" }}>
          <svg className="w-8 h-8" style={{ color: "#C9A2A7" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h3 className="font-heading text-xl mb-2" style={{ color: "#2C2826" }}>No products yet</h3>
        <p className="text-sm mb-7" style={{ color: "#9B9593" }}>Create your first arrangement to get started</p>
        <Link
          href="/grace-admin/products/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #C9A2A7, #b5828a)" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create First Product
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
        <table className="w-full bg-white" style={{ minWidth: "900px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #F2D7D9", background: "#FDF8F4" }}>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#9B9593", width: 56 }}>Image</th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#9B9593" }}>Product</th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#9B9593" }}>Price</th>
              <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider" style={{ color: "#9B9593" }}>Available</th>
              {SECTION_TAGS.map((tag) => (
                <th key={tag.id} className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider" style={{ color: tag.color }}>
                  {sectionLabels[tag.id] ?? tag.id}
                </th>
              ))}
              <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider" style={{ color: "#9B9593" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((product, i) => (
              <tr
                key={product.id}
                style={{
                  borderBottom: i < paginated.length - 1 ? "1px solid rgba(242,215,217,0.45)" : "none",
                  background: "white",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#FFFAF9")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
              >
                <td className="px-3 py-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden" style={{ background: "#F5EDE5" }}>
                    {product.images?.[0] ? (
                      <Image src={product.images[0]} alt={product.name} width={40} height={40} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-4 h-4" style={{ color: "#C9A2A7" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </td>

                <td className="px-3 py-3">
                  <div className="text-sm font-medium" style={{ color: "#2C2826" }}>{product.name}</div>
                </td>

                <td className="px-3 py-3">
                  <span className="text-sm font-semibold" style={{ color: "#2C2826" }}>${product.price.toFixed(2)}</span>
                </td>

                <td className="px-3 py-3 text-center">
                  <button
                    onClick={() => handleToggleAvailable(product.id, product.is_available)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all hover:opacity-80"
                    style={product.is_available ? { background: "#DCFCE7", color: "#166534" } : { background: "#F5F5F5", color: "#9CA3AF" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: product.is_available ? "#22C55E" : "#D1D5DB" }} />
                    {product.is_available ? "Live" : "Hidden"}
                  </button>
                </td>

                {SECTION_TAGS.map((tag) => {
                  const active = (product.tags || []).includes(tag.id);
                  return (
                    <td key={tag.id} className="px-3 py-3 text-center">
                      <button
                        onClick={() => handleToggleTag(product.id, tag.id, product.tags || [])}
                        className="text-lg transition-all hover:scale-110"
                        style={{ color: active ? "#F59E0B" : "#D1C9C8" }}
                      >
                        {active ? "★" : "☆"}
                      </button>
                    </td>
                  );
                })}

                <td className="px-3 py-3">
                  <div className="flex items-center gap-1.5 justify-end">
                    <Link
                      href={`/shop/${product.slug}`}
                      target="_blank"
                      title="View"
                      className="p-1.5 rounded-lg transition-all hover:opacity-80"
                      style={{ background: "#EFF6FF", color: "#3B82F6" }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                    <Link
                      href={`/grace-admin/products/${product.id}`}
                      title="Edit"
                      className="p-1.5 rounded-lg transition-all hover:opacity-80"
                      style={{ background: "rgba(242,215,217,0.35)", color: "#C9A2A7" }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      disabled={deletingId === product.id}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ background: "#FEF2F2", color: "#EF4444" }}
                    >
                      {deletingId === product.id ? (
                        <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                      {deletingId === product.id ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-1">
          <p className="text-xs" style={{ color: "#9B9593" }}>
            Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, products.length)} of {products.length} products
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: "#F5EDE5", color: "#2C2826" }}
            >
              ← Prev
            </button>
            <span className="text-xs font-medium" style={{ color: "#6B6462" }}>
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: "#F5EDE5", color: "#2C2826" }}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
