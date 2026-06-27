import { HistoryItem, useAsciiHistory } from "@/lib/hooks/useAsciiHistory";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, StarOff, Trash2, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface HistorySidebarProps {
  type: "image" | "text";
  onLoadItem: (item: HistoryItem) => void;
}

export function HistorySidebar({ type, onLoadItem }: HistorySidebarProps) {
  const { history, isLoaded, toggleFavorite, removeItem, clearHistory } = useAsciiHistory();

  if (!isLoaded) return null;

  const filteredHistory = history.filter(h => h.type === type);

  if (filteredHistory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8 text-center space-y-4">
        <Clock className="h-12 w-12 opacity-20" />
        <div>
          <p className="font-medium">No history yet</p>
          <p className="text-sm">Generations will appear here automatically.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center justify-between px-2">
        <h3 className="font-medium text-sm">Recent Creations</h3>
        <Button variant="ghost" size="sm" onClick={clearHistory} className="h-8 px-2 text-xs text-muted-foreground">
          Clear Unpinned
        </Button>
      </div>

      <ScrollArea className="flex-1 -mx-2 px-2">
        <div className="space-y-3 pb-4">
          {filteredHistory.map((item) => (
            <Card key={item.id} className="p-3 overflow-hidden flex flex-col group relative">
              <div className="flex items-start justify-between mb-2">
                <div className="text-xs text-muted-foreground">
                  {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                  >
                    {item.isFavorite ? (
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    ) : (
                      <StarOff className="h-3 w-3" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {item.isFavorite && (
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 absolute top-3 right-3 group-hover:hidden" />
              )}

              <div
                className="bg-black rounded p-2 text-[4px] leading-[1] font-mono text-white/70 h-20 overflow-hidden cursor-pointer hover:ring-2 ring-primary/50 transition-all mb-2"
                onClick={() => onLoadItem(item)}
              >
                <pre>{item.resultPreview}</pre>
              </div>

              <Button
                variant="secondary"
                size="sm"
                className="w-full text-xs h-7"
                onClick={() => onLoadItem(item)}
              >
                Load into Editor
              </Button>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
