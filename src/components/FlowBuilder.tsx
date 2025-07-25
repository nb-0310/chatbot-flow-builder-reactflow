import React, { useRef } from "react";
import ReactFlow, { Controls, Background, type ReactFlowInstance } from "reactflow";
import "reactflow/dist/style.css";
import useFlowBuilder from "../hooks/useFlowBuilder";
import TextNode from "./TextNode";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";

const nodeTypes = { textNode: TextNode };

const FlowBuilder: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const {
    nodes,
    edges,
    selectedNode,
    showError,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onInit,
    onDrop,
    onDragOver,
    onNodeClick,
    onPaneClick,
    onDragStart,
    handleSave,
    updateNodeText,
    setSelectedNode,
  } = useFlowBuilder(reactFlowWrapper);

  return (
    <div className="w-full h-screen bg-gray-100 flex">
      <div className="flex-1 relative">
        {showError && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2">
            Cannot save Flow
          </div>
        )}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={handleSave}
            className="bg-white border border-blue-500 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition-colors"
          >
            Save Changes
          </button>
        </div>
        <div ref={reactFlowWrapper} className="w-full h-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={(instance: ReactFlowInstance) => onInit(instance)}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <Background color="#f1f5f9" gap={16} />
          </ReactFlow>
        </div>
      </div>
      <div className="w-80 bg-white border-l border-gray-300 flex flex-col">
        {selectedNode ? (
          <SettingsPanel
            selectedNode={selectedNode}
            updateNodeText={updateNodeText}
            onBack={() => setSelectedNode(null)}
          />
        ) : (
          <NodesPanel onDragStart={onDragStart} />
        )}
      </div>
    </div>
  );
};

export default FlowBuilder;
