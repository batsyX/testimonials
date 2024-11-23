import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'


export const authOptions={
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    encryption: true,
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.email = token.email;
      }
      return session;
    },
  },
}

const handler= NextAuth(authOptions)


export {handler as GET,handler as POST}