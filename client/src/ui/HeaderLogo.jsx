export function HeaderLogo() {
  return (
    <div className="bg-skin-purple group relative h-full w-20 cursor-pointer overflow-hidden rounded-r-3xl xl:h-28 xl:w-full">
      <div className="bg-skin-heliotrope absolute bottom-0 h-1/2 w-full rounded-tl-3xl transition-all duration-300 group-hover:h-[85%]"></div>
      <img
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 "
        src="./assets/logo.svg"
        alt="invoice app logo"
      />
    </div>
  );
}
