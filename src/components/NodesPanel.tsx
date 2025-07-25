import { MessageSquare } from "lucide-react";

type NodesPanelProps = {
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => void;
};

const NodesPanel: React.FC<NodesPanelProps> = ({ onDragStart }) => (
  <div className="p-4 flex-1">
    <h3 className="text-lg font-medium text-gray-900 mb-6">Nodes Panel</h3>
    <div
      className="border-2 border-blue-500 rounded-lg p-4 cursor-move hover:bg-blue-50 transition-colors"
      draggable
      onDragStart={(e) => onDragStart(e, "textNode")}
    >
      <div className="flex items-center justify-center gap-2 text-blue-600">
        <MessageSquare size={20} />
        <span className="font-medium">Message</span>
      </div>
    </div>
    <div className="mt-4 text-sm text-gray-500 text-center">
      More node types coming soon...
    </div>
  </div>
);

export default NodesPanel;
