export function AdSlot({ slot, className = "" }: { slot: "leaderboard" | "rectangle" | "sidebar", className?: string }) {
  // Replace this with actual Google AdSense code logic in production

  const getSlotClass = () => {
    switch (slot) {
      case "leaderboard":
        return "w-full max-w-[728px] h-[90px]"; // Desktop
      case "rectangle":
        return "w-[336px] h-[280px]";
      case "sidebar":
        return "w-[300px] h-[250px]";
      default:
        return "w-full h-auto min-h-[50px]";
    }
  };

  return (
    <div className={`flex items-center justify-center bg-muted/30 border border-muted-foreground/20 rounded-md text-xs text-muted-foreground overflow-hidden ${getSlotClass()} ${className}`}>
      <span>Advertisement ({slot})</span>
    </div>
  );
}
