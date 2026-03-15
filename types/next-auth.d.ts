import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

// Расширяем тип User
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role?: 'USER' | 'ADMIN';
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role?: 'USER' | 'ADMIN';
  }
}

// Расширяем тип JWT
declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id?: string;
    role?: 'USER' | 'ADMIN';
  }
}
