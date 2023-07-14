import { extendType, floatArg, nonNull, objectType, stringArg } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";
//query type schema
export const ProductType = objectType({
  name: "Product",
  definition(t) {
    t.nonNull.int("id"), t.nonNull.string("name"), t.nonNull.float("price");
  },
});

// dummy products
let products: NexusGenObjects["Product"][] = [
  {
    id: 1,
    name: "Product 1",
    price: 15.99,
  },
  {
    id: 2,
    name: "Product 2",
    price: 8.99,
  },
];

//populate graphql query

export const ProductQuery = extendType({
  type: "Query",
  definition(t) {
    //name of query -> products
    t.nonNull.list.nonNull.field("products", {
      //type of products query
      type: "Product",
      resolve(_parents, _args, _context, _info) {
        //return dummy products
        return products;
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
      resolve(_parents, args, _context, _info) {
        const { name, price } = args;
        //dummy product
        const product = {
          id: products.length + 1,
          name,
          price,
        };

        products.push(product);

        return product;
      },
    });
  },
});
