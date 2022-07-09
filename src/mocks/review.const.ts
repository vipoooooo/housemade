import { Leangsuor, Sambath, Seyla, Vichea } from "../constants/icon.const";

export interface Ireview {
  id: number;
  workerId: number;
  createdAt: string;
  pfp: string;
  username: string;
  description: string;
  rating: number;
}

const ratingValue = Math.floor((Math.random() * 5) + 1);

export const reviews: Ireview[] = [
  {
    id: 1,
    workerId: 1,
    createdAt: "12 minutes ago",
    pfp: Leangsuor,
    username: "Reviewr A",
    rating: ratingValue,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 2,
    workerId: 1,
    createdAt: "1 hour ago",
    pfp: Leangsuor,
    username: "Reviewr B",
    rating: ratingValue,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 3,
    workerId: 2,
    createdAt: "1 day ago",
    pfp: Leangsuor,
    username: "Reviewr C",
    rating: ratingValue,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 4,
    workerId: 2,
    createdAt: "2 days ago",
    pfp: Leangsuor,
    username: "Reviewr D",
    rating: ratingValue,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 5,
    workerId: 2,
    createdAt: "3 days ago",
    pfp: Leangsuor,
    username: "Reviewr E",
    rating: ratingValue,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 6,
    workerId: 3,
    createdAt: "4 days ago",
    pfp: Leangsuor,
    username: "Reviewr F",
    rating: ratingValue,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 7,
    workerId: 3,
    createdAt: "12 minutes ago",
    pfp: Leangsuor,
    username: "Reviewr A",
    rating: ratingValue,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 8,
    workerId: 4,
    createdAt: "1 hour ago",
    pfp: Leangsuor,
    username: "Reviewr B",
    rating: ratingValue,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 9,
    workerId: 5,
    createdAt: "1 day ago",
    pfp: Leangsuor,
    username: "Reviewr C",
    rating: ratingValue,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 10,
    workerId: 6,
    createdAt: "2 days ago",
    pfp: Leangsuor,
    username: "Reviewr D",
    rating: ratingValue,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 11,
    workerId: 6,
    createdAt: "3 days ago",
    pfp: Leangsuor,
    username: "Reviewr E",
    rating: ratingValue,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 12,
    workerId: 6,
    createdAt: "4 days ago",
    pfp: Leangsuor,
    username: "Reviewr F",
    rating: ratingValue,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
];
