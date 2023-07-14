import { extendType, floatArg, nonNull, objectType, stringArg } from "nexus";
import { Product } from "../entities/Product";
import { Context } from "../types/Context";
import { User } from "../entities/User";
//query type schema
export const ProductType = objectType({
  name: "Product",
  definition(t) {
    t.nonNull.int("id"),
      t.nonNull.string("name"),
      t.nonNull.float("price"),
      t.nonNull.int("creatorId"),
      t.field("createdBy", {
        type: "User",
        resolve(parent, _args, _ctx, _info): Promise<User | null> {
          return User.findOne({ where: { id: parent.creatorId } });
        },
      });
  },
});

export const ProductQuery = extendType({
  type: "Query",
  definition(t) {
    //name of query -> products
    t.nonNull.list.nonNull.field("products", {
      //type of products query
      type: "Product",
      resolve(_parents, _args, _context, _info): Promise<Product[]> {
        return Product.find();
      },
    });
  },
});

export const createProductMutation = extendType({
  type: "Mutation",
  definition(t) {
    //name of mutation -> createProduct
    t.nonNull.field("createProduct", {
      //create product should follow Product type
      type: "Product",
      args: {
        name: nonNull(stringArg()),
        price: nonNull(floatArg()),
      },
      resolve(_parents, args, context: Context, _info): Promise<Product> {
        const { name, price } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error("User is not authenticated");
        }

        return Product.create({
          name,
          price,
          creatorId: userId,
        }).save();
      },
    });
  },
});
