import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonLd";

type HeaderProps = {
  title: string;
  subtitle?: string;
  image: string;
  pathname?: string;
  breadcrumbs?: Array<{ name: string; path: string }>;
};

export default function PageHeader({ title, subtitle, image, pathname, breadcrumbs }: HeaderProps) {
  const trail = breadcrumbs || (pathname ? [{ name: "Home", path: "/" }, { name: title, path: pathname }] : undefined);

  return (
    <>
      {trail && <JsonLd data={breadcrumbJsonLd(trail)} />}
      <section className="relative isolate flex min-h-[310px] items-end overflow-hidden bg-forest-deep text-paper sm:min-h-[360px] lg:min-h-[420px]">
        <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-deep/95 via-forest-deep/75 to-forest-deep/25" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep/80 to-transparent" />
        <div className="container-x w-full pb-10 pt-16 sm:pb-12 lg:pb-14">
          {!breadcrumbs && <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-sm text-paper-dim">
            <Link href="/" className="transition-colors hover:text-paper">Home</Link>
            <span aria-hidden="true" className="text-gold">/</span>
            <span aria-current="page" className="min-w-0 break-words text-paper">{title}</span>
          </nav>}
          <h1 className="mt-8 min-w-0 max-w-3xl break-words font-display text-[2.75rem] leading-[1.05] tracking-tight sm:mt-10 sm:text-6xl lg:text-[4.5rem]">{title}</h1>
          {subtitle && <p className="mt-5 max-w-xl break-words border-l-2 border-gold pl-5 text-base leading-7 text-paper-dim sm:mt-6 sm:text-lg sm:leading-8">{subtitle}</p>}
        </div>
      </section>
    </>
  );
}
