export interface SectionTitle{
    title: string;
    sectionId: number;
    open: boolean;
    click: (id: number) => void;
    level: number;
  }
