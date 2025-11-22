export type ElementData = {
    id: number;
    page: string;
    component: string;
    position: number;
    priority: number;
    status: string;
    content: any;
    createdAt: string;
    updatedAt: string;
};
export type ElementListData = {
    id: number;
    page: string;
    component: string;
    position: number;
    priority: number;
    status: string;
    content: any;
    createdAt: string;
    updatedAt: string;
};
export type RoleData = {
    id: number;
    name: string;
    permissions: any;
    createdAt: string | null;
};
export type RoleListData = {
    id: number;
    name: string;
    createdAt: string | null;
};
export type UserListData = {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    status: string;
    phoneNumber: string | null;
    profilePicture: string | null;
    createdAt: string;
    emailVerifiedAt: string | null;
};
