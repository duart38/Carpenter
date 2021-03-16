export enum LOGICAL {
    AND,
    OR,
}
export interface Logical {
    and(): this;
    or(): this;
}