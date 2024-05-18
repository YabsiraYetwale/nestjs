import { Company, User } from '@prisma/client';
import { Strategy } from 'passport-jwt';
interface ValidatedUser extends User {
    company: Company;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: User): Promise<ValidatedUser>;
}
export {};
