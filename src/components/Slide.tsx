export default function Slide({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  return (
    <div
      data-slide={index}
      className="h-dvh w-full snap-start overflow-y-auto"
      style={{ scrollSnapStop: "always" }}
    >
      {children}
    </div>
  );
}
