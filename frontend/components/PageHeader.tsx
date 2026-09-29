import Image from "next/image";

export default function PageHeader({ title, subtitle, image }: { title: string; subtitle?: string; image: string }) {
  return (
    <section className="relative isolate flex min-h-[330px] items-end overflow-hidden bg-forest-deep text-white sm:min-h-[380px] md:min-h-[430px]">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(9,15,14,0.86)_0%,rgba(9,15,14,0.69)_38%,rgba(9,15,14,0.20)_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(9,15,14,0.32)_0%,transparent_65%)]" />
      <div className="container-x w-full pb-9 pt-20 sm:pb-12 md:pb-14">
        <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d8bd8a]">
          <span className="h-px w-7 bg-[#c3a36c]" /> LimoMint · Toronto
        </p>
        <h1 className="max-w-2xl font-display text-4xl leading-[1.07] tracking-[-0.025em] text-white sm:text-5xl md:text-[3.5rem]">{title}</h1>
        {subtitle && <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 sm:text-base">{subtitle}</p>}
      </div>
    </section>
  );
}
