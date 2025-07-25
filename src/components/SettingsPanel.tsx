import { ArrowLeft } from "lucide-react";

type SettingsPanelProps = {
  selectedNode: { id: string; data: { text: string } };
  updateNodeText: (nodeId: string, newText: string) => void;
  onBack: () => void;
};

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  selectedNode,
  updateNodeText,
  onBack,
}) => (
  <div className="p-4 flex-1">
    <div className="flex items-center gap-3 mb-6">
      <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
        <ArrowLeft size={20} />
      </button>
      <h3 className="text-lg font-medium text-gray-900">Message</h3>
    </div>
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Text</label>
      <textarea
        value={selectedNode.data.text || ""}
        onChange={(e) => updateNodeText(selectedNode.id, e.target.value)}
        className="w-full h-32 text-black p-3 border border-gray-300 rounded resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        placeholder="Enter your message..."
      />
    </div>
  </div>
);

export default SettingsPanel;
