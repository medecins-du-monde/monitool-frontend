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
        // if (CONTAINER_CLUSTERS.includes(value.id)) {
          style += "fill: transparent; stroke-width:3;"
          switch (true) {
            case value.id === 'sources':
              style += "stroke: #ff00ff;"
              textStyle += "fill: #ff76ff;"
              break;

            case value.id === 'datas':
              style += "stroke: #ffbe00;"
              textStyle += "fill: #ffbe00;"
              break;

            case value.id === 'groups':
            case value.id === 'sites':
              style += "stroke:rgba(0,0,0,.6);"
              textStyle += "fill: rgba(0,0,0,.4);"
              break;

            case value.id.startsWith('dataGroup'):
              style += "stroke-width:3; stroke: blue; stroke-dasharray:4;"
              textStyle += "fill: #6495ed"
              break;

            case value.id === 'indicators':
              style += "stroke: #ff6700;"
              textStyle += "fill: #ff934a;"
              break;
            
            case value.id.startsWith('extraIndicators'):
            case value.id.startsWith('crossCuttingIndicators'):
            case value.id.startsWith('logFrame'):
              style += "fill: #ff934a;"
              break;
          
            default:
              style += "stroke: #ff6700;"
              // textStyle += "fill: #ff934a;"
              break;
          }
        break;
      case 'target' in value: // Edge
        // if ((value as Edge).data && typeof (value as Edge).data.index !== 'undefined') {
        //   style += `stroke: ${ARROW_COLORS[(value as Edge).data.index % ARROW_COLORS.length]}`;
        // } else {
          style += `stroke:rgb(126, 126, 126)`;
        // }
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
        } else if (value.id.startsWith('indicator')) {
          style += `fill: #ff934a;`
        } else if (value.id.startsWith('group') || value.id.startsWith('site')) {
          style += `fill:rgb(185, 185, 185);`
        } else {
          style += `fill: ${(value as ClusterNode).data.color}`;
        }
        break;
    }
    return {style, textStyle};
  }

}
