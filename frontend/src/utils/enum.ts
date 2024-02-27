export enum UserRecords {
    token = 'dynamic-website.com/user-token',
}

export enum UserRoles {
    guest = 0,
    admin = 1,
    member = 2,
}

export enum Errors {
    badRequest = 400,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    internalServerError = 500,
}
