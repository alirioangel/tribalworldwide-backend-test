export interface BaseTokenInterface {
  method: string;
}

export interface TokenWithUserInterface extends BaseTokenInterface {
  userId: number;
}
