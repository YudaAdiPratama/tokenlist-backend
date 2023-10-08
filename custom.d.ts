// custom-types.d.ts

declare namespace Express {
  export interface Request {
    user?: any; // You can replace 'any' with the actual type of 'user' if you have it defined
  }
}
