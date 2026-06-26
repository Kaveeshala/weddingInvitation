export default function FloralDivider() {
  return (
    <div className="flex items-center gap-3 w-full max-w-xs" role="presentation" aria-hidden="true">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4aa7d]" />
      <span className="text-[#b08d57] text-base">✦</span>
      <span className="text-[#d4aa7d] text-xs">❧</span>
      <span className="text-[#b08d57] text-base">✦</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4aa7d]" />
    </div>
  )
}