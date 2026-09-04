export default interface ProjectAction{
    title: string;
    infos: string;
    action?: () => Promise<any>;
    successMessage?: string;
    errorMessage?: string;
  }
