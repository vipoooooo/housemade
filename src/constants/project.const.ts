import {house1, house2, house3, house4, house5} from '../constants/icon.const';

export interface Iproject {
    id: number;
    workerId: number;
    createdAt: string;
    coverImg: string;
    title: string;
    client: string;
    description: string;
  }

  export const projects: Iproject[] = [
    {
        id: 1,
        workerId: 1,
        createdAt: "1mn ago",
        coverImg: house1,
        title: "project 1",
        client: "client A",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
    },
    {
        id: 2,
        workerId: 1,
        createdAt: "1mn ago",
        coverImg: house2,
        title: "project 2",
        client: "client B",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
    },
    {
        id: 3,
        workerId: 1,
        createdAt: "1mn ago",
        coverImg: house3,
        title: "project 3",
        client: "client C",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
    },
    {
        id: 4,
        workerId: 3,
        createdAt: "1mn ago",
        coverImg: house4,
        title: "project 4",
        client: "client D",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
    },
    {
        id: 5,
        workerId: 4,
        createdAt: "1mn ago",
        coverImg: house5,
        title: "project 5",
        client: "client E",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
    },
]