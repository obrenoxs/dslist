interface Props {
  label: string
  items: string[]
}

function TagList({ label, items }: Props) {
  return (
    <div>
      <dt className="mb-1.5 text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</dt>
      <dd className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-0.5 text-sm text-zinc-300">
            {item}
          </span>
        ))}
      </dd>
    </div>
  )
}

export default TagList
