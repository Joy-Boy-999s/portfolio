export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-10]">
      {/* Subtle modern CSS grid without spanning thousands of DOM elements */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]"
        style={{ backgroundSize: '50px 50px' }}
      />
      {/* Radial fade to make the edges dark */}
      <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}
