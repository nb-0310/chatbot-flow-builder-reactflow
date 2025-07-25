import { useState, useCallback, useRef, type RefObject } from "react";
import {
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
  type ReactFlowInstance,
  type Node,
  type Edge,
  type Connection,
  type NodeChange,
  type EdgeChange,
} from "reactflow";
import validateFlow from "../utils/validateFlow";

type UseFlowBuilderReturn = {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  showError: boolean;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  onInit: (instance: ReactFlowInstance) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onNodeClick: (event: React.MouseEvent, node: Node) => void;
  onPaneClick: () => void;
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => void;
  handleSave: () => void;
  updateNodeText: (nodeId: string, newText: string) => void;
  setSelectedNode: React.Dispatch<React.SetStateAction<Node | null>>;
};

const useFlowBuilder = (
  reactFlowWrapper: RefObject<HTMLDivElement | null>
): UseFlowBuilderReturn => {
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showError, setShowError] = useState(false);
  const nodeIdRef = useRef(1);

  const onInit = useCallback((instance: ReactFlowInstance) => {
    setReactFlowInstance(instance);
  }, []);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onConnect = useCallback(
    (params: Connection) => {
      const sourceHasEdge = edges.some((edge) => edge.source === params.source);
      if (sourceHasEdge) return;
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
            style: { stroke: "#6b7280", strokeWidth: 2 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: "#6b7280",
            },
          },
          eds
        )
      );
    },
    [edges, setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const newNode: Node = {
        id: `node_${nodeIdRef.current++}`,
        type: "textNode",
        position,
        data: { text: `test message ${nodeIdRef.current - 1}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes, reactFlowWrapper]
  );

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const updateNodeText = useCallback(
    (nodeId: string, newText: string) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, text: newText } }
            : node
        )
      );
      setSelectedNode((current) =>
        current && current.id === nodeId
          ? { ...current, data: { ...current.data, text: newText } }
          : current
      );
    },
    [setNodes]
  );

  const handleSave = () => {
    const isValid = validateFlow(nodes, edges);
    setShowError(!isValid);
    if (isValid) {
      console.log("Flow saved successfully!", { nodes, edges });
    }
  };

  return {
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
  };
};

export default useFlowBuilder;
