export interface IOnboardContext {
  data: IOnboardData;
  onUpdateState: (value: Partial<IOnboardData>) => void;
}

export interface IOnboardData {
  fields: {
    username: string;
    address: string;
    dob: string;
    gender: string;
    email: string;
    avatar: string;
    preference: string[];
  };
  step: number;
}
