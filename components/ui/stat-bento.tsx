export type Stat = { value: string; label: string; detail?: string };

/**
 * Three figures as a bento: the first one leads in a dark tile that spans
 * two rows, the other two sit beside it in tinted tiles. For point data
 * only (counts, fees, one-word facts); the copy around it stays readable
 * text. `lead="light"` inverts the palette for aubergine sections.
 * Pattern approved on the Awake Lipo 360 landing, 22 Sep 2026.
 */
export function StatBento({
  stats,
  className,
  lead = "dark",
}: {
  stats: readonly Stat[];
  className?: string;
  lead?: "dark" | "light";
}) {
  const classes = ["stat-bento", lead === "light" ? "stat-bento--light" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");
  return (
    <ul className={classes}>
      {stats.map((st, i) => (
        <li className={i === 0 ? "stat-tile stat-tile--lead" : "stat-tile"} key={`${st.value} ${st.label}`}>
          <strong className="stat-tile-value">{st.value}</strong>
          <span className="stat-tile-copy">
            <span className="stat-tile-label">{st.label}</span>
            {st.detail && <span className="stat-tile-detail">{st.detail}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}
