export interface ISessionResponse {
    accessToken: string;
    tokenType: string;
}

export interface ISession extends ISessionResponse {
  autorization: boolean;
}


