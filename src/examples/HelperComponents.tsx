import { ChangeEventHandler, FC } from 'react';

type ToggleType = {
  label: string;
  checked: boolean;
  handler: ChangeEventHandler;
};

export const Toggle: FC<ToggleType> = ({ label, checked, handler }) => {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3 select-none">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span
        className={`relative inline-block h-6 w-10 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <input type="checkbox" checked={checked} onChange={handler} className="sr-only" />
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </span>
    </label>
  );
};

type SliderType = {
  label: string;
  min: number;
  max: number;
  ticks: number[];
  value: number;
  onChange: (value: number) => void;
};

const snapToTick = (value: number, ticks: number[]) =>
  ticks.reduce((closest, tick) => (Math.abs(tick - value) < Math.abs(closest - value) ? tick : closest));

export const Slider: FC<SliderType> = ({ label, min, max, ticks, value, onChange }) => {
  const range = max - min;
  const percent = (tick: number) => ((tick - min) / range) * 100;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    onChange(snapToTick(Number(event.currentTarget.value), ticks));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-900">{value}</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={handleChange}
        className="w-full accent-blue-600"
      />

      <div className="relative h-8">
        {ticks.map((tick) => (
          <div
            key={tick}
            className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
            style={{ left: `${percent(tick)}%` }}
          >
            <span className={`h-2.5 w-px ${tick === value ? 'bg-blue-600' : 'bg-gray-400'}`} />
            <span
              className={`text-[10px] leading-tight ${tick === value ? 'font-semibold text-blue-600' : 'text-gray-500'}`}
            >
              {tick}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
