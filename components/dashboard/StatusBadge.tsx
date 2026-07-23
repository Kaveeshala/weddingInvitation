type StatusBadgeProps = {
  status: "pending" | "attending" | "declined";
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    pending: "border-[#f0d9a6] bg-[#fff7e8] text-[#b7791f]",
    attending: "border-[#b9debf] bg-[#eef8ef] text-[#2d7a46]",
    declined: "border-[#e7b7b7] bg-[#fdeeee] text-[#b45252]",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}