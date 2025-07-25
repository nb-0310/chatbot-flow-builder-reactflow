import { Handle, Position } from "reactflow";
import { MessageSquare } from "lucide-react";

type TextNodeProps = {
  data: { text: string };
  selected: boolean;
};

// Custom text node displayed in the flow
const TextNode: React.FC<TextNodeProps> = ({ data, selected }) => (
  <div
    className={`bg-white rounded-lg shadow-md border-2 ${
      selected ? "border-blue-500" : "border-gray-200"
    } min-w-48 relative`}
  >
    <Handle
      type="target"
      position={Position.Top}
      className="w-3 h-3 bg-gray-400 border-2 border-white rounded-full"
      style={{ top: -6 }}
    />
    <div className="bg-teal-300 px-3 py-2 rounded-t-lg flex items-center gap-2">
      <MessageSquare size={16} className="text-teal-700" />
      <span className="text-sm font-medium text-teal-700">Send Message</span>
      <div className="ml-auto w-2 h-2 bg-teal-600 rounded-full"></div>
    </div>
    <div className="p-3 bg-white rounded-b-lg">
      <div className="text-sm text-gray-700 min-h-6">
        {data.text || "Enter your message..."}
      </div>
    </div>
    <Handle
      type="source"
      position={Position.Bottom}
      className="w-3 h-3 bg-gray-400 border-2 border-white rounded-full"
      style={{ bottom: -6 }}
    />
  </div>
);

export default TextNode;
