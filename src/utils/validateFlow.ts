import type { Node, Edge } from "reactflow";

export default function validateFlow(nodes: Node[], edges: Edge[]): boolean {
  if (nodes.length <= 1) return true;

  const nodeIds = nodes.map((node) => node.id);
  const sources = new Set(edges.map((edge) => edge.source));
  const withoutOutgoing = nodeIds.filter((id) => !sources.has(id));

  return withoutOutgoing.length <= 1;
}
