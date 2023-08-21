import {create} from 'zustand';

type FormStore = {
  id: number;
  setId: (newId: number) => void;
  loggedIn:boolean;
  setLoggedIn: (isLogIn: boolean) => void;
  loading:boolean;
  setLoading: (isLogIn: boolean) => void;
  isTeacher: boolean;
  setIsTeacher: (teacher: boolean) => void;
  questionSet:any[];
  setQuestionSet:(newQuestionSet: any) => void;
  selectedOptions:boolean[]; 
  setSelectedOptions:(newOption: boolean[]) => void;
  submitted:boolean;
  setSubmitted:(newSubmittion: boolean) => void;
  userAttempted:boolean;
  setUserAttempted:(isUserAttempted: boolean) => void;
  name: string;
  setName: (newName: string) => void;
  age: number;
  setAge: (newAge: number) => void;
  role: string;
  setRole: (newRole: string) => void;
  isEmployee: boolean;
  setIsEmployee: (newIsEmployee: boolean) => void;
  isUpdate: boolean;
  setIsUpdate: (newIsUpdate: boolean) => void;
};

export const testStore = create<FormStore>((set) => ({
    id:100,
    setId:(newId:number) => set({ id: newId }),
    loggedIn:false,
    setLoggedIn:(isLogIn:boolean) => set({loggedIn: isLogIn}),
    loading:true,
    setLoading:(isLoading:boolean) => set({loading:isLoading}),
    isTeacher:false,
    setIsTeacher:(teacher:boolean) => set({isTeacher:teacher}),
    questionSet:[], 
    setQuestionSet:(newQuestionSet: any) => set({questionSet:newQuestionSet}),
    selectedOptions:[],
    setSelectedOptions:(newOption: boolean[]) => set({selectedOptions:newOption}),
    submitted:false,
    setSubmitted:(newSubmittion: boolean) => set({submitted:newSubmittion}),
    userAttempted:false,
    setUserAttempted:(isUserAttempted: boolean) => set({userAttempted:isUserAttempted}),
    name:"User",
    setName:(newName:string) => set({ name: newName }),
    age:18,
    setAge:(newAge:number) => set({ age: newAge }),
    isEmployee:false,
    setIsEmployee:(newIsEmployee:boolean) => set({ isEmployee: newIsEmployee }),
    role:"Tester",
    setRole:(newRole:string) => set({ role: newRole }),
    isUpdate:false,
    setIsUpdate:(newIsUpdate:boolean) => set({ isUpdate: newIsUpdate })
}));

