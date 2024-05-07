export type DatabaseConfig = {
    host: string;
    name: string;
    user: string;
    password: string;
    port: number;
}

export type ServerConfig = {
    port: number;
    database: DatabaseConfig;
}

export type Rashad = {
    name: string;
}