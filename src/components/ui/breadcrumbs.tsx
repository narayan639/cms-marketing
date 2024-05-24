import { clsx } from "clsx";
import Link from "next/link";
import { ChevronRight } from 'lucide-react';


interface Breadcrumb {
  label?: string ;
  href: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

export default function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="">
      <ol className="flex text-[1.8xl]">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active ? "page" : undefined}
            className={clsx(
              breadcrumb.active ? "text-gray-900" : "text-gray-500"
            )}
          >
            {breadcrumb.active ? (
              <span>{breadcrumb.label}</span> 
            ) : (
              <div className="flex items-center">
              <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 && <span className="mx-1"><ChevronRight size={16}/></span>}
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
