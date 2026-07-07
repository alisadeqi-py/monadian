export default function Slide({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  return (
    <div data-slide={index} className="min-h-screen w-full snap-start">
      {children}
    </div>
  );
}
