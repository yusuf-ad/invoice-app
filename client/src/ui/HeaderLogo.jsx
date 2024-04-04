export function HeaderLogo() {
  return (
    <div className="relative xl:w-full xl:h-28 h-full w-20 rounded-r-3xl bg-purple overflow-hidden cursor-pointer group">
      <div className="absolute bottom-0 w-full h-1/2 rounded-tl-3xl bg-heliotrope transition-all duration-300 group-hover:h-[85%]"></div>
      <img
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 "
        src="./assets/logo.svg"
        alt="invoice app logo"
      />
    </div>
  );
}
