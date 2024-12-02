import { Pipe, PipeTransform } from '@angular/core';
import { ClusterNode, Edge, Node } from '@swimlane/ngx-graph';

const CONTAINER_CLUSTERS = [
  "groups",
  "sites",
  "sources",
  "datas",
  "indicators",
  "extraIndicators",
  "crossCuttingIndicators"
];

const ARROW_COLORS = [
  "#c23b23",
  "#f39a27",
  "#eada52",
  "#03c03c",
  "#579abe",
  "#976ed7"
]

@Pipe({
  name: 'dataFlowStyle'
})
export class DataFlowStylePipe implements PipeTransform {

  transform(value: Node | ClusterNode | Edge, ...args: unknown[]): {style: string, textStyle: string} {
    let style = "";
    let textStyle = "";
    switch (true) {
      case 'childNodeIds' in value: // Cluster
        style += `
          width:${(value as ClusterNode).dimension.width};
          height:${(value as ClusterNode).dimension.height};
        `;
        textStyle += "font: bold 16px sans-serif;"
        if (CONTAINER_CLUSTERS.includes(value.id)) {
          style += "fill:transparent; stroke-width:3;"
          switch (value.id) {
            case 'sources':
              style += "stroke: #ff00ff;"
              textStyle += "fill: #ff76ff;"
              break;

            case 'datas':
              style += "stroke: #ffbe00;"
              textStyle += "fill: #ffbe00;"
              break;

            case 'indicators':
              style += "stroke: #ff6700;"
              textStyle += "fill: #ff934a;"
              break;
          
            default:
              style += "stroke:rgba(0,0,0,.6);"
              textStyle += "fill: rgba(0,0,0,.4);"
              break;
          }
        } else if (value.id.startsWith('dataGroup')) {
          style += "fill:transparent; stroke-width:3; stroke: blue; stroke-dasharray:4"
          textStyle += "fill: #6495ed"
        } else {
          style += `fill:${(value as ClusterNode).data.color}`;
          textStyle += "fill: rgba(0,0,0,.4);"
        }
        break;
      case 'target' in value: // Edge
        if ((value as Edge).data && typeof (value as Edge).data.index !== 'undefined') {
          style += `stroke: ${ARROW_COLORS[(value as Edge).data.index % ARROW_COLORS.length]}`;
        }
        textStyle += `font: bold 14px sans-serif; fill: #6495ed;`
        break;
    
      default: //Node
        style += `
          width: ${(value as ClusterNode).dimension.width};
          height: ${(value as ClusterNode).dimension.height};
        `
        textStyle += "font: bold 14px sans-serif;"
        if (value.id.startsWith('data')) {
          style += `fill: #ffbe00;`
        } else if (value.id.startsWith('source')) {
          style += `fill: #ff76ff;`
        } else {
          style += `fill: ${(value as ClusterNode).data.color}`;
        }
        break;
    }
    return {style, textStyle};
  }

}
