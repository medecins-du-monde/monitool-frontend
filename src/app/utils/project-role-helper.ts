import { Project } from '../models/classes/project.model';
import { User } from '../models/classes/user.model';

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
}
