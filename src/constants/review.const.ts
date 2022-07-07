import { Leangsuor, Sambath, Seyla, Vichea } from "../constants/icon.const";

export interface Ireview {
  id: number;
  workerId: number;
  createdAt: string;
  pfp: string;
  username: string;
  description: string;
}

export const reviews: Ireview[] = [
  {
    id: 1,
    workerId: 1,
    createdAt: "12 minutes ago",
    pfp: Leangsuor,
    username: "Reviewr A",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 2,
    workerId: 1,
    createdAt: "1 hour ago",
    pfp: Leangsuor,
    username: "Reviewr B",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 3,
    workerId: 1,
    createdAt: "1 day ago",
    pfp: Leangsuor,
    username: "Reviewr C",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 4,
    workerId: 2,
    createdAt: "2 days ago",
    pfp: Leangsuor,
    username: "Reviewr D",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 5,
    workerId: 2,
    createdAt: "3 days ago",
    pfp: Leangsuor,
    username: "Reviewr E",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 6,
    workerId: 3,
    createdAt: "4 days ago",
    pfp: Leangsuor,
    username: "Reviewr F",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 7,
    workerId: 3,
    createdAt: "12 minutes ago",
    pfp: Leangsuor,
    username: "Reviewr A",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 8,
    workerId: 4,
    createdAt: "1 hour ago",
    pfp: Leangsuor,
    username: "Reviewr B",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 9,
    workerId: 5,
    createdAt: "1 day ago",
    pfp: Leangsuor,
    username: "Reviewr C",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 10,
    workerId: 6,
    createdAt: "2 days ago",
    pfp: Leangsuor,
    username: "Reviewr D",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 11,
    workerId: 6,
    createdAt: "3 days ago",
    pfp: Leangsuor,
    username: "Reviewr E",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 12,
    workerId: 6,
    createdAt: "4 days ago",
    pfp: Leangsuor,
    username: "Reviewr F",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
];
