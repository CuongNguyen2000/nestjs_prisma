/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class NewPost {
    author: string;
    title: string;
    content: string;
}

export class UpdatePost {
    id: string;
    title?: Nullable<string>;
    content?: Nullable<string>;
}

export class NewUser {
    email: string;
    name: string;
    posts?: Nullable<Nullable<string>[]>;
}

export class Post {
    id: string;
    author: User;
    title: string;
    content: string;
    createdAt: string;
}

export abstract class IQuery {
    abstract posts(): Post[] | Promise<Post[]>;

    abstract post(id: string): Nullable<Post> | Promise<Nullable<Post>>;

    abstract users(): User[] | Promise<User[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createPost(input?: Nullable<NewPost>): Post | Promise<Post>;

    abstract updatePost(input?: Nullable<UpdatePost>): Nullable<Post> | Promise<Nullable<Post>>;

    abstract deletePost(id: string): Nullable<Post> | Promise<Nullable<Post>>;

    abstract createUser(input?: Nullable<NewUser>): User | Promise<User>;

    abstract deleteUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    id: string;
    email: string;
    name: string;
    posts: Post[];
    createdAt: string;
}

type Nullable<T> = T | null;
