import { memo } from "react";

type PremiumCountdownProps = {
  totalSeconds: number;
};

function clampNonNegative(n: number) {
  return Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function getParts(totalSeconds: number) {
  const safe = clampNonNegative(totalSeconds);
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  return { hours, minutes, seconds };
}

export const PremiumCountdown = memo(function PremiumCountdown({ totalSeconds }: PremiumCountdownProps) {
  const { hours, minutes, seconds } = getParts(totalSeconds);

  return (
    <div className="inline-flex items-stretch justify-center gap-3 sm:gap-4">
      <TimeBlock value={pad2(hours)} label="HORAS" />

      <Separator />

      <TimeBlock value={pad2(minutes)} label="MIN" />

      <Separator />

      <TimeBlock value={pad2(seconds)} label="SEG" />
    </div>
  );
});

function TimeBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="timer-glass w-[84px] sm:w-[96px] rounded-2xl px-4 py-3 text-center shadow-sm">
      <div className="timer-neon font-extrabold leading-none tracking-[0.06em] tabular-nums text-[1.75rem] sm:text-[1.95rem]">
        {value}
      </div>
      <div className="mt-2 text-[0.65rem] sm:text-[0.7rem] font-semibold tracking-[0.28em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div className="flex flex-col justify-center px-0.5">
      <span className="timer-separator select-none text-[1.65rem] sm:text-[1.85rem] leading-none">:</span>
    </div>
  );
}
