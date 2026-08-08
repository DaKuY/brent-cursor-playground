import type { ChoiceOption } from "../types";

type Props = {
  options: ChoiceOption[];
  selectedId: string | undefined;
  onSelect: (option: ChoiceOption) => void;
  disabled?: boolean;
};

export function ChoiceBubbles({ options, selectedId, onSelect, disabled }: Props) {
  return (
    <div className="choice-bubbles" role="listbox" aria-label="Choices">
      {options.map((opt) => {
        const active = selectedId === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="option"
            aria-selected={active}
            className={active ? "choice-bubble active" : "choice-bubble"}
            disabled={disabled}
            onClick={() => onSelect(opt)}
          >
            <span className="choice-emoji" aria-hidden>
              {opt.emoji}
            </span>
            <span className="choice-label">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
