import { Minus, Plus } from './Icons.jsx';

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  label = 'Quantity',
  compact = false,
}) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <div className={`quantity ${compact ? 'quantity--compact' : ''}`}>
      <button
        type="button"
        className="quantity__button"
        onClick={decrease}
        disabled={value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
      >
        <Minus size={15} />
      </button>
      <input
        type="number"
        className="quantity__input"
        value={value}
        min={min}
        max={max}
        aria-label={label}
        onChange={(event) => {
          const next = Number(event.target.value);
          if (Number.isFinite(next)) onChange(Math.min(max, Math.max(min, Math.round(next))));
        }}
      />
      <button
        type="button"
        className="quantity__button"
        onClick={increase}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
      >
        <Plus size={15} />
      </button>
    </div>
  );
}
