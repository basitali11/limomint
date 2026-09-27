import Image from "next/image";

export default function PageHeader({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle?: string;
  image: string;
}) {
  return (
    <section className="relative flex h-52 items-end overflow-hidden border-b border-ink-line sm:h-60 md:h-72">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/35" />
      <div className="container-x relative pb-8 md:pb-10">
        <h1 className="font-display text-3xl text-paper sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 max-w-lg text-sm text-paper-dim sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
