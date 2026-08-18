import Link from "next/link";

export type Crumb = { href?: string; label: string };

type Props = {
  items: Crumb[];
  onDark?: boolean;
};

export function Breadcrumbs({ items, onDark = false }: Props) {
  return (
    <nav
      className={`site-crumbs${onDark ? " site-crumbs--on-dark" : ""}`}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => {
        const last = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`}>
            {index > 0 && (
              <span className="site-crumbs__sep" aria-hidden="true">
                {" "}
                ›{" "}
              </span>
            )}
            {item.href && !last ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current={last ? "page" : undefined}>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
