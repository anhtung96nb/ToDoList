export type Item = {
    id: string;
    title: string;
    completed?: boolean;
  };
  
  export type State = "All" | "Active" | "Completed";
  