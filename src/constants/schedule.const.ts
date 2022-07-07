export interface ISchedule {
  id: number;
  createAt: string;
  date: string;
  location: string;
  description: string;
  status: string;
  workerId: number;
  clientId: number;
  workerName: string;
  clientName: string;
}

export enum STATUS {
  REQUEST = "REQUEST",
  UPCOMING = "UPCOMING",
  COMPLETED = "COMPLETED",
}

export const schedules: ISchedule[] = [
  {
    id: 1,
    createAt: "2022 / 7 / 6",
    date: "2022 / 7 / 6",
    location: "Toulkork, Cambodia",
    description: "I need to fix my toilet",
    status: STATUS.REQUEST,
    workerId: 1,
    clientId: 1,
    workerName: "Adam",
    clientName: "vipoo",
  },
  {
    id: 2,
    createAt: "2022 / 7 / 6",
    date: "2022 / 7 / 6",
    location: "Toulkork, Cambodia",
    description: "I need to fix my chair",
    status: STATUS.REQUEST,
    workerId: 2,
    clientId: 1,
    workerName: "slander",
    clientName: "vipoo",
  },
  {
    id: 3,
    createAt: "2022 / 7 / 6",
    date: "2022 / 7 / 6",
    location: "Toulkork, Cambodia",
    description: "I need to fix my toilet",
    status: STATUS.UPCOMING,
    workerId: 1,
    clientId: 1,
    workerName: "marve",
    clientName: "vipoo",
  },
  {
    id: 4,
    createAt: "2022 / 7 / 6",
    date: "2022 / 7 / 6",
    location: "Toulkork, Cambodia",
    description: "I need to fix my chair",
    status: STATUS.COMPLETED,
    workerId: 2,
    clientId: 1,
    workerName: "ethan",
    clientName: "vipoo",
  },
];
