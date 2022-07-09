export interface Skill{
    id: number;
    categoryId: number;
    title: string;
}

export const skills : Skill[] = [
    {
        id: 1,
        categoryId: 1,
        title: "Bathroom"
    },
    {
        id: 2,
        categoryId: 1,
        title: "Livingroom"
    },
    {
        id: 3,
        categoryId: 2,
        title: "Air Conditioner"
    },
    {
        id: 4,
        categoryId: 2,
        title: "Fan"
    },
    {
        id: 5,
        categoryId: 3,
        title: "Architech"
    },
    {
        id: 6,
        categoryId: 3,
        title: "Engineer"
    },
]