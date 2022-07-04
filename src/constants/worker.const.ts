import { Leangsuor, Sambath, Seyla, Vichea, zulmaury } from "../constants/icon.const";

export interface IWorker {
  id: number;
  categoryId: number;
  skillId: number;
  pfp: string;
  username: string;
  occupation: string;
  verify: boolean;
  description: string;
  stats: {
    rating: number;
    reviewCount: number;
  };
  link: string;
  time: string;
  email: string;
  phonenumber: string;
  nationality: string;
  bookmark: boolean;
}

export const workers: IWorker[] = [
  {
    id: 1,
    categoryId: 3,
    skillId: 5,
    pfp: Leangsuor,
    username: "Leangsuor Kim",
    occupation: "Architech",
    verify: true,
    description:
      "Im leangsuor",
    stats: {
      rating: 4.7,
      reviewCount: 69,
    },
    link: "https://www.facebook.com/leangsuor.kim",
    time: "September 2021",
    email: "leanguosr@gmail.com",
    phonenumber: "011222333",
    nationality: "Cambodian",
    bookmark: true,
  },
  {
    id: 2,
    categoryId: 3,
    skillId: 5,
    pfp: Sambath,
    username: "Ratanaksambath Sok",
    occupation: "Architech",
    verify: false,
    description:
      "Im sambath",
    stats: {
      rating: 2.9,
      reviewCount: 49,
    },
    link: "",
    time: "September 2021",
    email: "sambath@gmail.com",
    phonenumber: "012345678",
    nationality: "Cambodian",
    bookmark: false,
  },
  {
    id: 3,
    categoryId: 3,
    skillId: 6,
    pfp: Seyla,
    username: "Seyla Mom",
    occupation: "Civil Engineer",
    verify: false,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
    stats: {
      rating: 3.3,
      reviewCount: 39,
    },
    link: "",
    time: "September 2021",
    email: "seylamom@gmail.com",
    phonenumber: "098765432",
    nationality: "Cambodian",
    bookmark: false,
  },
  {
    id: 4,
    categoryId: 2,
    skillId: 2,
    pfp: Vichea,
    username: "Vichea Pak",
    occupation: "Architect",
    verify: false,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
    stats: {
      rating: 5.0,
      reviewCount: 29,
    },
    link: "",
    time: "September 2021",
    email: "vicheapak@gmail.com",
    phonenumber: "077777777",
    nationality: "Cambodian",
    bookmark: false,
  },
  {
    id: 5,
    categoryId: 2,
    skillId: 3,
    pfp: Vichea,
    username: "Salle",
    occupation: "fan",
    verify: false,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
    stats: {
      rating: 5.0,
      reviewCount: 29,
    },
    link: "",
    time: "September 2021",
    email: "vicheapak@gmail.com",
    phonenumber: "077777777",
    nationality: "Cambodian",
    bookmark: false,
  },
  {
    id: 6,
    categoryId: 3,
    skillId: 5,
    pfp: Leangsuor,
    username: "Leangsuor Kim",
    occupation: "Architech",
    verify: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
    stats: {
      rating: 4.7,
      reviewCount: 69,
    },
    link: "https://www.facebook.com/leangsuor.kim",
    time: "September 2021",
    email: "leanguosr@gmail.com",
    phonenumber: "011222333",
    nationality: "Cambodian",
    bookmark: true,
  },
  {
    id: 7,
    categoryId: 3,
    skillId: 5,
    pfp: Sambath,
    username: "Ratanaksambath Sok",
    occupation: "Architech",
    verify: false,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
    stats: {
      rating: 2.9,
      reviewCount: 49,
    },
    link: "",
    time: "September 2021",
    email: "sambath@gmail.com",
    phonenumber: "012345678",
    nationality: "Cambodian",
    bookmark: false,
  },
  {
    id: 8,
    categoryId: 3,
    skillId: 6,
    pfp: Seyla,
    username: "Seyla Mom",
    occupation: "Civil Engineer",
    verify: false,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
    stats: {
      rating: 3.3,
      reviewCount: 39,
    },
    link: "",
    time: "September 2021",
    email: "seylamom@gmail.com",
    phonenumber: "098765432",
    nationality: "Cambodian",
    bookmark: false,
  },
  {
    id: 9,
    categoryId: 2,
    skillId: 2,
    pfp: Vichea,
    username: "Vichea Pak",
    occupation: "Architect",
    verify: false,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
    stats: {
      rating: 5.0,
      reviewCount: 29,
    },
    link: "",
    time: "September 2021",
    email: "vicheapak@gmail.com",
    phonenumber: "077777777",
    nationality: "Cambodian",
    bookmark: false,
  },
  {
    id: 10,
    categoryId: 2,
    skillId: 3,
    pfp: zulmaury,
    username: "Zulmaury",
    occupation: "fan",
    verify: false,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
    stats: {
      rating: 5.0,
      reviewCount: 29,
    },
    link: "",
    time: "September 2021",
    email: "vicheapak@gmail.com",
    phonenumber: "077777777",
    nationality: "Cambodian",
    bookmark: false,
  },
];
