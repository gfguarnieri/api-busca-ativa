interface ICreateConversationDTO{
    fk_student: string;
    fk_admin: string;
    description: string;
    date?: Date;
}
export { ICreateConversationDTO };
