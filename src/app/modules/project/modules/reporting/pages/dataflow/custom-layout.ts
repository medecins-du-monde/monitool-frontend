import { DagreClusterLayout, Graph, Node } from "@swimlane/ngx-graph";
import * as dagre from 'dagre';


export class DagreCustomLayout extends DagreClusterLayout {
    // createDagreGraph(graph: Graph): any {
    //   const settings = Object.assign({}, this.defaultSettings, this.settings);
    //   this.dagreGraph = new dagre.graphlib.Graph({ compound: settings.compound, multigraph: settings.multigraph });
    //   this.dagreGraph.setGraph({
    //     rankdir: settings.orientation,
    //     marginx: settings.marginX,
    //     marginy: settings.marginY,
    //     edgesep: settings.edgePadding,
    //     ranksep: settings.rankPadding,
    //     nodesep: settings.nodePadding,
    //     align: settings.align,
    //     acyclicer: settings.acyclicer,
    //     ranker: settings.ranker,
    //     multigraph: settings.multigraph,
    //     compound: settings.compound
    //   });
  
    //   // Default to assigning a new object as a label for each new edge.
    //   this.dagreGraph.setDefaultEdgeLabel(() => {
    //     return {
    //       /* empty */
    //     };
    //   });
  
    //   this.dagreNodes = graph.nodes.map((n: Node) => {
    //     const node: any = Object.assign({}, n);
    //     node.width = n.dimension.width;
    //     node.height = n.dimension.height;
    //     node.x = n.position.x;
    //     node.y = n.position.y;
    //     return node;
    //   });
  
    //   this.dagreClusters = graph.clusters || [];
  
    //   this.dagreEdges = graph.edges.map(l => {
    //     const newLink: any = Object.assign({}, l);
    //     return newLink;
    //   });
  
    //   for (const node of this.dagreNodes) {
    //     this.dagreGraph.setNode(node.id, node);
    //   }
  
    //   for (const cluster of this.dagreClusters) {
    //     this.dagreGraph.setNode(cluster.id, cluster);
    //     cluster.childNodeIds.forEach(childNodeId => {
    //       this.dagreGraph.setParent(childNodeId, cluster.id);
    //     });
    //   }
  
    //   // update dagre
    //   for (const edge of this.dagreEdges) {
    //     if (settings.multigraph) {
    //       this.dagreGraph.setEdge(edge.source, edge.target, edge, edge.id);
    //     } else {
    //       this.dagreGraph.setEdge(edge.source, edge.target);
    //     }
    //   }
  
    //   return this.dagreGraph;
    // }
}