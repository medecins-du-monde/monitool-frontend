import { Component, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { Edge, Node, ClusterNode, GraphComponent } from '@swimlane/ngx-graph';
import { Subject, Subscription, timeout } from 'rxjs';
import { Project } from 'src/app/models/classes/project.model';
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectIndicator } from 'src/app/models/classes/project-indicator.model';
import * as svg from 'save-svg-as-png';
import { Entity } from 'src/app/models/classes/entity.model';


const GRAPH_PADDING = {x: 5, y: 5};
const GROUP_PADDING = {x: 5, y: 5};
const NODE_SIZE = {width: 280, height: 40};
const ROW_GAP = 5;
const COLUMN_GAP = 5;

type GraphItemProperties = {
  x: number,
  y: number,
  width: number,
  height: number
}

/**
 * Each item of the graph tree
 */
type GraphTreeItem = {
  name: string,
  children?: GraphTreeItemArray,
  linksFrom?: string[],
  linksTo?: string[],
  other?: any
}

type GraphTreeItemArray = {[id: string]: GraphTreeItem}

@Component({
  selector: 'app-dataflow',
  templateUrl: './dataflow.component.html',
  styleUrls: ['./dataflow.component.scss']
})
export class DataflowComponent implements OnInit, OnDestroy {

  @ViewChild(GraphComponent) graphRef: GraphComponent;

  private subscription: Subscription = new Subscription();
  public update$: Subject<boolean> = new Subject();
  public zoomToFit$: Subject<boolean> = new Subject();
  public center$: Subject<boolean> = new Subject();

  private project: Project;

  public nodes: Node[] = [];
  public edges: Edge[] = [];
  public clusters: ClusterNode[] = [];

  private graphTree: GraphTreeItemArray = {};

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.projectService.lastSavedVersion.subscribe((savedProject: Project) => {
        const breadCrumbs = [
          {
            value: 'Projects',
            link: './../../projects'
          } as BreadcrumbItem,
          {
            value: savedProject.country,
          } as BreadcrumbItem,
          {
            value: savedProject.name,
          } as BreadcrumbItem,
          {
            value: 'Reporting',
          } as BreadcrumbItem,
        ];
        this.projectService.updateBreadCrumbs(breadCrumbs);
      })
    );

    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        if (this.project) {
          return;
        }
        this.project = project;
        this.graphTree = this.parseProjectToTree(this.project);
        this.updateGraph();
        this.setGraph(this.graphTree);
      })
    );
  }

  private parseProjectToTree(project: Project): GraphTreeItemArray {
    const graphTree: GraphTreeItemArray = {
      groups: {name: 'CollectionSiteGroups', children: {}},
      sites: {name: 'CollectionSites', children: {}},
      sources: {name: 'DataSources', children: {}},
      datas: {name: 'Data', children: {}},
      indicators: {name: 'Indicators', children: {}}
    };

    const entities = {}

    for(const [index, site] of project.entities.entries()) {
      graphTree.sites.children[`site-${site.id}`] = {
        name: site.name,
        linksTo: [],
        linksFrom: [],
        other: {index}
      }
    }

    for(const group of project.groups) {
      graphTree.groups.children[`group-${group.id}`] = {
        name: group.name
      }
      for(const site of group.members) {
        graphTree.sites.children[`site-${site.id}`].linksFrom.push(`group-${group.id}`);
      }
    }

    for(const source of project.forms) {
      graphTree.sources.children[`source-${source.id}`] = {
        name: source.name
      }
      for(const site of source.entities) {
        graphTree.sites.children[`site-${site.id}`].linksTo.push(`source-${source.id}`);
      }
      
      const dataGroup: GraphTreeItem = {
        name: source.name,
        children: {}
      }

      for (const data of source.elements) {
        dataGroup.children[`data-${data.id}`] = {
          name: data.name,
          other: {periodicity: `Enum.Periodicity.${source.periodicity}`},
          linksFrom: [`source-${source.id}`]
        }
      }

      graphTree.datas.children[`dataGroup-${source.id}`] = dataGroup;
    }

    console.log(graphTree.sites.children);
    
    /**
     * Utility function of parseProjectToTree().
     * Iterates through indicators and formats them as GraphTreeItem's.
     * 
     * @param indicators Array of project indicators.
     * @returns Object with a GraphTreeItem for each indicator.
     */
    const parseIndicatorsAsChildren = (indicators: ProjectIndicator[]): GraphTreeItemArray => {
      const result: GraphTreeItemArray = {};
      for (const indicator of indicators) {
        result[`indicator-${indicator.id}`] = {
          name: indicator.display || indicator.id,
          linksFrom: Object.keys(indicator.computation.parameters)
            .map(key => `data-${indicator.computation.parameters[key].elementId}`)
        }
      }
      return result;
    }

    // Iterates through Logical Frames + sub-sections and adds them to graphTree.
    for (const logFrame of this.project.logicalFrames) {
      const logFrameItem: GraphTreeItem = {
        name: logFrame.name,
        children: {}
      }

      if (logFrame.indicators.length > 0) {
        logFrameItem.children[`generalObjective-logFrame-${logFrame.id}`] = {
          name: logFrame.goal,
          children: parseIndicatorsAsChildren(logFrame.indicators)
        }
      }

      for (const purpose of logFrame.purposes) {
        const purposeItem: GraphTreeItem = {
          name: purpose.description,
          children: parseIndicatorsAsChildren(purpose.indicators)
        }

        for (const output of purpose.outputs) {
          const outputItem: GraphTreeItem = {
            name: output.description,
            children: parseIndicatorsAsChildren(output.indicators)
          }

          for (const activity of output.activities) {
            outputItem.children[`activity-${activity.id}`] = {
              name: activity.description,
              children: parseIndicatorsAsChildren(activity.indicators)
            }
          }

          purposeItem.children[`output-${output.id}`] = outputItem;
        }

        logFrameItem.children[`purpose-${purpose.id}`] = purposeItem;
      }
    
      graphTree.indicators.children[`logFrame-${logFrame.id}`] = logFrameItem;
    }
    
    // Iterates through all Extra Indicators and adds them to graphTree.
    if (project.extraIndicators.length > 0) {
      graphTree.indicators.children[`extraIndicators`] = {
        name: 'ExtraIndicators',
        children: parseIndicatorsAsChildren(project.extraIndicators)
      }
    }
    
    // Iterates through all Cross Cutting Indicators and adds them to graphTree.
    if (Object.keys(project.crossCutting).length > 0) {
      console.log(parseIndicatorsAsChildren(Object.keys(project.crossCutting).map(key => project.crossCutting[key])));
      graphTree.indicators.children[`crossCuttingIndicators`] = {
        name: 'CrossCuttingIndicators',
        children: parseIndicatorsAsChildren(Object.keys(project.crossCutting).map(key => project.crossCutting[key]))
      }
    }

    return graphTree;
  }

  private setGraph(graphTree: GraphTreeItemArray) {
    this.nodes = [];
    this.edges = [];
    this.clusters = [];

    const itemProp: GraphItemProperties = { x: 0, y: 0, width: 0, height: 0 };
    for (const key of Object.keys(graphTree)) {
      const columnProp = this.setItem(graphTree[key], key, itemProp);
      itemProp.x = columnProp.width + COLUMN_GAP;
    }
  }

  private setItem(item: GraphTreeItem, itemId: string, properties: GraphItemProperties ): GraphItemProperties {
    if (!item.children) {
      
      this.nodes.push({
        id: itemId,
        label: item.name,
        dimension: NODE_SIZE,
        // position: {x: properties.x, y: properties.y}
      })

      if (item.linksTo) {
        for (const id of item.linksTo) {
          this.edges.push({source: itemId, target: id, data: item.other})
        }
      }
      if (item.linksFrom) {
        for (const id of item.linksFrom) {
          this.edges.push({source: id, target: itemId, data: item.other})
        }
      }

      return {
        ...properties, // x and y.
        ...NODE_SIZE // width and height.
      }

    } else {

      let childProp: GraphItemProperties = {
        height: 0,
        width: 0,
        x: properties.x + GROUP_PADDING.x,
        y: properties.y + GROUP_PADDING.y
      };

      for (const key of Object.keys(item.children)) {
        childProp = this.setItem(item.children[key], key, childProp);
        childProp.y += childProp.height + ROW_GAP;
      }

      const itemProp: GraphItemProperties = {
        x: properties.x,
        y: properties.y + properties.height + (properties.height > 0 ? ROW_GAP : 0),
        width: childProp.width + GROUP_PADDING.x * 2,
        height: (childProp.height - ROW_GAP) + GROUP_PADDING.y,
      };

      this.clusters.push({
        id: itemId,
        label: item.name,
        childNodeIds: item.children ? Object.keys(item.children) : [],
        // dimension: {width: itemProp.width, height: itemProp.height},
        // position: {x: itemProp.x, y: itemProp.y}
      })

      return itemProp;
    }
  }

  /**
   * Updates the graph.
   */
  public updateGraph() {
      this.update$.next(true);
  }

  /**
   * Updates the graph.
   */
  public zoomToFit() {
      this.zoomToFit$.next(true);
  }

  /**
   * Updates the graph.
   */
  public center() {
      this.center$.next(true);
  }

  public downloadGraph() {
    const graphSvg: SVGGraphicsElement = document.getElementById('DataflowGraph').children[0].children[0] as SVGGraphicsElement;
    // graphSvg.setAttribute('width', `${this.graphRef.graphDims.width}`)

    console.log(this.graphRef, graphSvg.getBBox());
    this.center()
    this.zoomToFit()
    // const svgBody: any = graphSvg.children[0].innerHTML;
    // const svgToExport= document.createElement("svg");
    // svgToExport.setAttribute('width', this.graphRef.dims.width + 'px');
    // svgToExport.setAttribute('height', this.graphRef.dims.height + 'px');
    // svgToExport.innerHTML = svgBody;
    // svg.saveSvgAsPng(graphSvg, 'test.png');
    

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
