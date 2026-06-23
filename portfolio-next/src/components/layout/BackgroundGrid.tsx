const TILE = 50;
const SOLID = 48;

const tileMask = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${TILE}' height='${TILE}'><rect width='${SOLID}' height='${SOLID}' rx='4' ry='4' fill='white'/></svg>")`;

export default function BackgroundGrid() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none hidden sm:block z-[-5]"
      style={{
        background:
          "radial-gradient(circle 340px at var(--cursor-x, 50%) var(--cursor-y, 50%), transparent 0%, rgba(15,15,23,0.35) 35%, #0f0f17 80%)",
        WebkitMaskImage: tileMask,
        maskImage: tileMask,
        WebkitMaskRepeat: "repeat",
        maskRepeat: "repeat",
        WebkitMaskSize: `${TILE}px ${TILE}px`,
        maskSize: `${TILE}px ${TILE}px`,
      }}
    />
  );
}
