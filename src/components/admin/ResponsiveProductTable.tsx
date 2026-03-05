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
  { id: "featured",   color: "#C9A2A7", label: "Featured" },
  { id: "valentine",  color: "#E11D48", label: "Valentine" },
  { id: "mothersday", color: "#DB2777", label: "Mother's Day" },
];

export default function ResponsiveProductTable({ products: initialProducts, sectionLabels }: ProductTableProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const paginated = products.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?\n\nThis cannot be undone.`)) return;
    setDeletingId(id);
    setError("");
    const result = await deleteProduct(id);
    if (result?.error) {
      setError(result.error);
      setDeletingId(null);
    } else {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setDeletingId(null);
      setPage((prev) => {
        const newTotal = Math.ceil((products.length - 1) / PAGE_SIZE);
        return Math.min(prev, Math.max(0, newTotal - 1));
      });
    }
  };

  const handleToggleAvailable = async (id: string, currentValue: boolean) => {
    const newValue = !currentValue;
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_available: newValue } : p))
    );
    const result = await toggleAvailable(id, newValue);
    if (result?.error) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_available: currentValue } : p))
      );
      setError(result.error);
    }
  };

  const handleToggleTag = async (id: string, tagId: string, currentTags: string[]) => {
    const hasTag = currentTags.includes(tagId);
    const newTags = hasTag
      ? currentTags.filter((t) => t !== tagId)
      : [...currentTags, tagId];
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, tags: newTags } : p))
    );
    const result = await toggleTag(id, tagId, hasTag);
    if (result?.error) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, tags: currentTags } : p))
      );
      setError(result.error);
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12 sm:py-20 rounded-2xl" style={{ background: "white", border: "1px solid #F2D7D9" }}>
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5" style={{ background: "#FDF8F4" }}>
          <svg className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: "#C9A2A7" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h3 className="font-heading text-lg sm:text-xl mb-2 px-4" style={{ color: "#2C2826" }}>No products yet</h3>
        <p className="text-sm mb-5 sm:mb-7 px-4" style={{ color: "#9B9593" }}>Create your first arrangement</p>
        <Link
          href="/grace-admin/products/new"
          className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm font-semibold text-white transition-all active:scale-95"
          style={{ background: "linear-gradient(135deg, #C9A2A7, #b5828a)" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Product
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {error && (
        <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "#FEF2F2", color: "#B91C1C", border: "1px solid #FECACA" }}>
          {error}
        </div>
      )}

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-3">
        {paginated.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl p-4 border"
            style={{ borderColor: "#F2D7D9" }}
          >
            {/* Header with image and actions */}
            <div className="flex gap-3 mb-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0" style={{ background: "#F5EDE5" }}>
                {product.images?.[0] ? (
                  <Image src={product.images[0]} alt={product.name} width={64} height={64} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-6 h-6" style={{ color: "#C9A2A7" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-base mb-1 truncate" style={{ color: "#2C2826" }}>{product.name}</h3>
                <p className="text-lg font-semibold" style={{ color: "#C9A2A7" }}>${product.price.toFixed(2)}</p>
              </div>
            </div>

            {/* Status and Tags */}
            <div className="space-y-2 mb-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-warm-gray-light">Status</span>
                <button
                  onClick={() => handleToggleAvailable(product.id, product.is_available)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95"
                  style={product.is_available ? { background: "#DCFCE7", color: "#166534" } : { background: "#F5F5F5", color: "#9CA3AF" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: product.is_available ? "#22C55E" : "#D1D5DB" }} />
                  {product.is_available ? "Live" : "Hidden"}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {SECTION_TAGS.map((tag) => {
                  const active = (product.tags || []).includes(tag.id);
                  return (
                    <button
                      key={tag.id}
                      onClick={() => handleToggleTag(product.id, tag.id, product.tags || [])}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95"
                      style={active
                        ? { background: tag.color, color: "white" }
                        : { background: "#F5F5F5", color: "#9B9593" }
                      }
                    >
                      {sectionLabels[tag.id] ?? tag.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-3 border-t" style={{ borderColor: "rgba(242,215,217,0.3)" }}>
              <Link
                href={`/grace-admin/products/${product.id}`}
                className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-95"
                style={{ background: "#FDF8F4", color: "#6B6462" }}
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(product.id, product.name)}
                disabled={deletingId === product.id}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 disabled:opacity-50"
                style={{ background: "#FEF2F2", color: "#DC2626" }}
              >
                {deletingId === product.id ? "..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto rounded-2xl" style={{ border: "1px solid #F2D7D9" }}>
        <table className="w-full bg-white" style={{ minWidth: "900px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #F2D7D9", background: "#FDF8F4" }}>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#9B9593", width: 56 }}>Image</th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#9B9593" }}>Product</th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#9B9593" }}>Price</th>
              <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider" style={{ color: "#9B9593" }}>Available</th>
              {SECTION_TAGS.map((tag) => (
                <th key={tag.id} className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider" style={{ color: tag.color }}>
                  {sectionLabels[tag.id] ?? tag.label}
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
                        style={{ color: active ? tag.color : "#D1D5DB" }}
                        title={active ? `Remove from ${sectionLabels[tag.id] ?? tag.label}` : `Add to ${sectionLabels[tag.id] ?? tag.label}`}
                      >
                        {active ? "★" : "☆"}
                      </button>
                    </td>
                  );
                })}
                <td className="px-3 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/grace-admin/products/${product.id}`}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
                      style={{ background: "#FDF8F4", color: "#6B6462" }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      disabled={deletingId === product.id}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80 disabled:opacity-50"
                      style={{ background: "#FEF2F2", color: "#DC2626" }}
                    >
                      {deletingId === product.id ? "..." : "Delete"}
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
        <div className="flex items-center justify-between px-2">
          <p className="text-xs sm:text-sm" style={{ color: "#9B9593" }}>
            Page {page + 1} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all active:scale-95 disabled:opacity-30"
              style={{ background: "#FDF8F4", color: "#6B6462" }}
            >
              Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all active:scale-95 disabled:opacity-30"
              style={{ background: "#FDF8F4", color: "#6B6462" }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
