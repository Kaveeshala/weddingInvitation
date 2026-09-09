type StatsCardProps = {
  label: string;
  value: number | string;
  tone?: "neutral" | "green" | "amber" | "rose";
  note?: string;
};

export default function StatsCard({
  label,
  value,
  tone = "neutral",
  note,
}: StatsCardProps) {
  const toneStyles = {
    neutral: "bg-white border border-black text-black",
    green: "bg-white border border-black text-[#2d7a46]",
    amber: "bg-white border border-black text-[#b7791f]",
    rose: "bg-white border border-black text-[#b45252]",
  };

  return (
    <div className={`rounded-[1.5rem] p-4 flex flex-col items-center justify-center text-center ${toneStyles[tone]}`}>
      <p className="text-xs uppercase tracking-[0.18em] opacity-70">
        {label}
      </p>

      <p className="mt-2 text-3xl font-semibold">{value}</p>

      {note ? (
        <p className="mt-2 text-sm text-[#8a7a6a]">
          {note}
        </p>
      ) : null}
    </div>
  );
}