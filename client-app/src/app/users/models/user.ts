export type Role = 'admin' | 'manager' | 'user'

export interface User {
    id: string,
    displayName: string,
    role: Role,
    email: string
}