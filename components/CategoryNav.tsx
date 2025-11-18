"use client";

interface Category {
  key: CategoryFilter;
  label: string;
  description: string;
  count: number;
}

type CategoryFilter = "all" | "crypto" | "sports";

interface Props {
  categories: Category[];
  selected: CategoryFilter;
  onSelect: (key: CategoryFilter) => void;
}

export function CategoryNav({categories, selected, onSelect}: Props) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {categories.map((category) => (
        <button
          key={category.key}
          type="button"
          onClick={() => onSelect(category.key)}
          className={`rounded-2xl border px-4 py-3 text-left transition ${
            selected === category.key ? "border-brand bg-brand/10 text-white" : "border-white/10 text-slate-300"
          }`}
        >
          <p className="text-xs uppercase tracking-wide text-slate-400">{category.label}</p>
          <p className="mt-1 text-2xl font-semibold text-white">{category.count}</p>
          <p className="mt-1 text-xs text-slate-400">{category.description}</p>
        </button>
      ))}
    </div>
  );
}

export type {CategoryFilter, Category};
