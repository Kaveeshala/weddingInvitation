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
    neutral: "bg-[#fcf7f0] text-[#2f2a24]",
    green: "bg-[#eef8ef] text-[#2d7a46]",
    amber: "bg-[#fff7e8] text-[#b7791f]",
    rose: "bg-[#fdeeee] text-[#b45252]",
  };

  return (
    <div className={`rounded-[1.5rem] p-4 ${toneStyles[tone]}`}>
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