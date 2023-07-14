import { extendType, nonNull, objectType, stringArg } from "nexus";
import { Context } from "../types/Context";
import argon2 from "argon2";
import { User } from "../entities/User";
import * as jwt from "jsonwebtoken";

export const AuthType = objectType({
  name: "AuthType",
  definition(t) {
    t.nonNull.string("token"),
      t.nonNull.field("user", {
        type: "User", //comes from schema.graphql, generated by nexus,
      });
  },
});

export const AuthMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("login", {
      type: "AuthType",
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_parent, args, _context, _info) {
        const { username, password } = args;
        const user = await User.findOne({ where: { username } });

        if (!user) {
          throw new Error("user not found.");
        }

        const isValid = await argon2.verify(user.password, password);
        if (!isValid) {
          throw new Error("Invalid credentials.");
        }

        const token = jwt.sign(
          { userId: user.id },
          process.env.TOKEN_SECRET as jwt.Secret,
          { expiresIn: "1d" }
        );

        const _user = {
          id: user.id,
          username: user.username,
          email: user.email,
        };
        return {
          token,
          user: _user,
        };
      },
    });
    t.nonNull.field("register", {
      type: "AuthType",
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_parent, args, context: Context, _info) {
        const { username, email, password } = args;
        const hashedPassword = await argon2.hash(password);

        const found = await User.findOne({ where: [{ username }, { email }] }); // where or
        if (found) {
          throw new Error("username or email should be unique.");
        }
        let user;
        let token;

        try {
          const result = await context.conn
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({ username, email, password: hashedPassword })
            .returning("*")
            .execute();

          user = result.raw[0];
          token = jwt.sign(
            { userId: user.id },
            process.env.TOKEN_SECRET as jwt.Secret
          );
          const _user = {
            id: user.id,
            email: user.email,
            username: user.username,
          };
          return {
            user: _user,
            token,
          };
        } catch (e) {
          console.log(e);
        }

        return;
      },
    });
  },
});