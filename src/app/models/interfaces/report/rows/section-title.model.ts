export interface SectionTitle{
    title: string;
    disabled?: boolean;
    sectionId: number;
    open: boolean;
    click: (id: number) => void;
    level: number;
    commentID: string;
    comment: {
      value: string,
      cellValue?: string
    };
  }
