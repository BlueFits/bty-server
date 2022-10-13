export interface PutUserDto {
    email: string,
    password: string,
    goals: Array<string>,
    createdAt: string,
    loggedAt: Array<string>,
};