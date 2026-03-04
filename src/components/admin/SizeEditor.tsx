"use client";

import { useState } from "react";

interface ProductSize {
  name: string;
  price: number;
}

interface SizeEditorProps {
  sizes: ProductSize[];
  onChange: (sizes: ProductSize[]) => void;
}

export default function SizeEditor({ sizes, onChange }: SizeEditorProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addSize = () => {
    onChange([...sizes, { name: "", price: 0 }]);
    setEditingIndex(sizes.length);
  };

  const updateSize = (index: number, field: keyof ProductSize, value: string | number) => {
    const newSizes = sizes.map((size, i) =>
      i === index ? { ...size, [field]: value } : size
    );
    onChange(newSizes);
  };

  const removeSize = (index: number) => {
    if (sizes.length <= 1) {
      // Prevent removing the last size
      return;
    }
    const newSizes = sizes.filter((_, i) => i !== index);
    onChange(newSizes);
    setEditingIndex(null);
  };

  return (
    <div className="space-y-3">
      {sizes.map((size, index) => (
        <div
          key={index}
          className="flex gap-3 items-start p-4 bg-cream rounded-lg border border-primary/10"
        >
          <div className="flex-1 grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-warm-gray mb-1">
                Size Name
              </label>
              <input
                type="text"
                value={size.name}
                onChange={(e) => updateSize(index, "name", e.target.value)}
                placeholder="e.g., Standard"
                className="w-full px-3 py-2 rounded-lg border border-primary/20 focus:border-primary-dark focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-warm-gray mb-1">
                Price (SGD)
              </label>
              <input
                type="number"
                value={size.price || ""}
                onChange={(e) =>
                  updateSize(index, "price", parseFloat(e.target.value) || 0)
                }
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full px-3 py-2 rounded-lg border border-primary/20 focus:border-primary-dark focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => removeSize(index)}
            disabled={sizes.length <= 1}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            aria-label="Remove size"
            title={sizes.length <= 1 ? "At least one size is required" : "Remove size"}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addSize}
        className="w-full px-4 py-3 border-2 border-dashed border-primary/30 rounded-lg text-primary-dark hover:border-primary-dark hover:bg-primary/5 transition-all text-sm font-medium"
      >
        + Add Size Option
      </button>

      {sizes.length === 0 && (
        <p className="text-xs text-warm-gray-light text-center py-2">
          Add at least one size option for this product
        </p>
      )}
    </div>
  );
}
