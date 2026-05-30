import Image from "next/image";

export function ArhiLogo() {
  return (
    <Image
      src="/logo-arhi.png"
      alt="ARHI"
      width={180}
      height={52}
      priority
      className="h-auto w-[130px] md:w-[240px]"
    />
  );
}
