export default function PortfolioSlide({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  return (
    <div data-slide={index} className="h-screen w-full snap-start overflow-y-auto">
      {children}
    </div>
  );
}
