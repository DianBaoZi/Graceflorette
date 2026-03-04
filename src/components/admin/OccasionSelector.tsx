"use client";

interface OccasionSelectorProps {
  selected: string[];
  onChange: (occasions: string[]) => void;
}

const OCCASIONS = [
  { value: "birthday", label: "Birthday", emoji: "🎂" },
  { value: "anniversary", label: "Anniversary", emoji: "💝" },
  { value: "romantic", label: "Romantic", emoji: "💕" },
  { value: "valentine", label: "Valentine's Day", emoji: "❤️" },
  { value: "wedding", label: "Wedding", emoji: "💐" },
  { value: "congratulations", label: "Congratulations", emoji: "🎉" },
  { value: "graduation", label: "Graduation", emoji: "🎓" },
  { value: "housewarming", label: "Housewarming", emoji: "🏠" },
];

export default function OccasionSelector({
  selected,
  onChange,
}: OccasionSelectorProps) {
  const toggleOccasion = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((o) => o !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {OCCASIONS.map((occasion) => {
        const isSelected = selected.includes(occasion.value);
        return (
          <button
            key={occasion.value}
            type="button"
            onClick={() => toggleOccasion(occasion.value)}
            className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
              isSelected
                ? "border-primary-dark bg-primary/20 text-primary-dark"
                : "border-primary/20 text-warm-gray hover:border-primary-dark hover:bg-primary/5"
            }`}
          >
            <span className="mr-2">{occasion.emoji}</span>
            {occasion.label}
          </button>
        );
      })}
    </div>
  );
}
