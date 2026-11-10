import { Project } from '../models/classes/project.model';
import { User } from '../models/classes/user.model';

export interface ReadRestriction {
  logicalFrameIds: Set<string>;
  dataSourceIds: Set<string>;
}

export default class ProjectRoleHelper {

  static findProjectUser(user: User, project: Project): User | undefined {
    if (!user || !project?.users) {
      return undefined;
    }
    return project.users.find(pu =>
      (user.id && pu.id === user.id) ||
      (pu.name === user.name && pu.username === user.username)
    );
  }

  static isProjectAdmin(user: User, project: Project): boolean {
    if (!user) {
      return false;
    }
    if (user.role === 'admin') {
      return true;
    }
    return ProjectRoleHelper.findProjectUser(user, project)?.role === 'owner';
  }

  /**
   * Logical frames and data sources a restricted read-only user may see in the general report.
   * Returns null when the user sees everything (owners, admins, input users, unrestricted readers).
   */
  static getReadRestriction(user: User, project: Project): ReadRestriction | null {
    if (!user || user.role === 'admin') {
      return null;
    }
    // The session user from /resources/myself only keeps its id as _id (see AuthService).
    const userId = user.id || user['_id'];
    const projectUser = (userId && project?.users?.find(pu => pu.id === userId))
      || ProjectRoleHelper.findProjectUser(user, project);
    if (!projectUser || projectUser.role !== 'read' || !projectUser.restricted) {
      return null;
    }
    return {
      logicalFrameIds: new Set((projectUser.logicalFrames || []).map(lf => lf.id)),
      dataSourceIds: new Set((projectUser.dataSources || []).map(ds => ds.id)),
    };
  }
}
