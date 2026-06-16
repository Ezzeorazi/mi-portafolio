import Link from 'next/link';
import { FaHome, FaChevronRight } from 'react-icons/fa';

export interface Crumb {
  label: string;
  /** Omit href on the current (last) page. */
  href?: string;
}

const BASE_URL = 'https://ezequiel-orazi.online';

/**
 * Visual + SEO breadcrumb trail.
 * - Light theme (matches the light-background detail pages).
 * - Responsive: stays on a single line and truncates the current page
 *   so long titles never break the layout on mobile.
 * - Emits BreadcrumbList JSON-LD for Google rich results.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.label,
      ...(it.href ? { item: `${BASE_URL}${it.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-nowrap items-center gap-1.5 text-sm text-muted overflow-hidden">
          {items.map((it, i) => {
            const isFirst = i === 0;
            const isLast = i === items.length - 1;

            return (
              <li
                key={`${it.label}-${i}`}
                className={`flex items-center gap-1.5 ${isLast ? 'min-w-0' : 'shrink-0'}`}
              >
                {!isFirst && (
                  <FaChevronRight className="text-[10px] text-muted/40 shrink-0" aria-hidden="true" />
                )}

                {it.href && !isLast ? (
                  <Link
                    href={it.href}
                    className="flex items-center gap-1.5 hover:text-pink transition-colors duration-300"
                  >
                    {isFirst && <FaHome className="text-xs shrink-0" aria-hidden="true" />}
                    {it.label}
                  </Link>
                ) : (
                  <span
                    aria-current="page"
                    className="text-dark font-semibold truncate"
                    title={it.label}
                  >
                    {it.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
