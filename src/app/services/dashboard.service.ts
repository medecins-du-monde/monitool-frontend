import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  private graphs = [];

  addGraph(graph: any) {
    console.log(graph);
    this.graphs.push(graph);
  }

  getGraphs() {
    return this.graphs;
  }
}
