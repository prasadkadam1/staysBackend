import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Stay Booking API",
    version: "1.0.0",
    description: "Full Swagger documentation matching your Express codebase",
  },
  servers: [
    {
      url: "https://staysbackend-2.onrender.com/",
      description: "Live server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

const idParam = {
  name: "id",
  in: "path",
  required: true,
  schema: { type: "string" },
};

const collectionParam = {
  name: "collection",
  in: "path",
  required: true,
  schema: {
    type: "string",
    enum: [
      "tents",
      "hotels",
      "homestays",
      "camps",
      "villas",
      "farmhouses",
      "cottages",
      "apartments",
      "treehouses",
      "users",
      "admin",
      "statistics",
      "bookmark",
      "cart",
      "bookNow",
      "bookingDetails",
      "registrations",
    ],
  },
};

const stays = [
  "tents",
  "hotels",
  "homestays",
  "camps",
  "villas",
  "farmhouses",
  "cottages",
  "apartments",
  "treehouses",
];

const others = [
  "users",
  "admin",
  "statistics",
  "bookmark",
  "cart",
  "bookNow",
  "bookingDetails",
  "registrations",
];

swaggerSpec.paths = {};

/* ------------------ AUTH ------------------ */
swaggerSpec.paths["/login"] = {
  post: {
    tags: ["Auth"],
    summary: "User login",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: { type: "object", required: ["email", "password"] },
        },
      },
    },
    responses: {
      200: { description: "Login successful" },
      401: { description: "Invalid credentials" },
    },
  },
};

swaggerSpec.paths["/admin/login"] = {
  post: {
    tags: ["Auth"],
    summary: "Admin login",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: { type: "object", required: ["email", "password"] },
        },
      },
    },
    responses: {
      200: { description: "Admin login successful" },
      401: { description: "Invalid credentials" },
    },
  },
};

/* ------------------ USERS ------------------ */
swaggerSpec.paths["/users"] = {
  get: {
    tags: ["Users"],
    summary: "Get all users",
    responses: { 200: { description: "Users list" } },
  },
  post: {
    tags: ["Users"],
    summary: "Register user",
    requestBody: {
      required: true,
      content: { "application/json": { schema: { type: "object" } } },
    },
    responses: { 201: { description: "User created" } },
  },
};
swaggerSpec.paths["/users/{id}"] = {
  get: {
    tags: ["Users"],
    summary: "Get user by ID",
    parameters: [idParam],
    responses: {
      200: { description: "User found" },
      404: { description: "Not found" },
    },
  },
};

/* ------------------ BOOKMARK ------------------ */
swaggerSpec.paths["/bookmark"] = {
  get: {
    tags: ["Bookmark"],
    summary: "Get all bookmarks",
    responses: { 200: { description: "Bookmarks list" } },
  },
  post: {
    tags: ["Bookmark"],
    summary: "Add bookmark",
    requestBody: {
      required: true,
      content: { "application/json": { schema: { type: "object" } } },
    },
    responses: { 200: { description: "Bookmark added" } },
  },
};
swaggerSpec.paths["/bookmark/{id}"] = {
  get: {
    tags: ["Bookmark"],
    summary: "Get bookmark by ID",
    parameters: [idParam],
    responses: {
      200: { description: "Bookmark found" },
      404: { description: "Not found" },
    },
  },
  delete: {
    tags: ["Bookmark"],
    summary: "Delete bookmark",
    parameters: [idParam],
    responses: { 200: { description: "Bookmark removed" } },
  },
};

/* ------------------ CART ------------------ */
swaggerSpec.paths["/cart"] = {
  get: {
    tags: ["Cart"],
    summary: "Get all cart items",
    responses: { 200: { description: "Cart items list" } },
  },
  post: {
    tags: ["Cart"],
    summary: "Add item to cart",
    requestBody: {
      required: true,
      content: { "application/json": { schema: { type: "object" } } },
    },
    responses: { 200: { description: "Item added" } },
  },
};
swaggerSpec.paths["/cart/{id}"] = {
  get: {
    tags: ["Cart"],
    summary: "Get cart item by ID",
    parameters: [idParam],
    responses: {
      200: { description: "Item found" },
      404: { description: "Not found" },
    },
  },
  delete: {
    tags: ["Cart"],
    summary: "Delete cart item",
    parameters: [idParam],
    responses: { 200: { description: "Item removed" } },
  },
};

/* ------------------ BOOKING ------------------ */
swaggerSpec.paths["/bookNow"] = {
  get: {
    tags: ["Booking"],
    summary: "Get all temporary bookings",
    responses: { 200: { description: "Bookings list" } },
  },
  get: {
    tags: ["Booking"],
    summary: "Get booking by ID",
    responses: { 200: { description: "Booking found" } },
  },
  post: {
    tags: ["Booking"],
    summary: "Temporary booking",
    requestBody: {
      required: true,
      content: { "application/json": { schema: { type: "object" } } },
    },
    responses: { 200: { description: "Booking stored" } },
  },
};
swaggerSpec.paths["/bookNow/{id}"] = {
  get: {
    tags: ["Booking"],
    summary: "Get booking by ID",
    parameters: [idParam],
    responses: {
      200: { description: "Booking found" },
      404: { description: "Not found" },
    },
  },
};

swaggerSpec.paths["/bookingDetails"] = {
  get: {
    tags: ["Booking"],
    summary: "Get all final bookings",
    responses: { 200: { description: "Bookings list" } },
  },
  post: {
    tags: ["Booking"],
    summary: "Final booking",
    requestBody: {
      required: true,
      content: { "application/json": { schema: { type: "object" } } },
    },
    responses: { 201: { description: "Booking confirmed" } },
  },
};
swaggerSpec.paths["/bookingDetails/{id}"] = {
  get: {
    tags: ["Booking"],
    summary: "Get booking details by ID",
    parameters: [idParam],
    responses: {
      200: { description: "Booking found" },
      404: { description: "Not found" },
    },
  },
};

/* ------------------ STAYS ------------------ */
stays.forEach((col) => {
  swaggerSpec.paths[`/${col}`] = {
    get: {
      tags: ["Stays"],
      summary: `Get all ${col}`,
      responses: { 200: { description: `List of ${col}` } },
    },
  };
  swaggerSpec.paths[`/${col}/{id}`] = {
    get: {
      tags: ["Stays"],
      summary: `Get ${col} by ID`,
      parameters: [idParam],
      responses: {
        200: { description: `${col} found` },
        404: { description: "Not found" },
      },
    },
  };
});

/* ------------------ OTHER COLLECTIONS ------------------ */
others.forEach((col) => {
  if (
    !["users", "bookmark", "cart", "bookNow", "bookingDetails"].includes(col)
  ) {
    swaggerSpec.paths[`/${col}`] = {
      get: {
        tags: ["Collections"],
        summary: `Get all ${col}`,
        responses: { 200: { description: `List of ${col}` } },
      },
    };
    swaggerSpec.paths[`/${col}/{id}`] = {
      get: {
        tags: ["Collections"],
        summary: `Get ${col} by ID`,
        parameters: [idParam],
        responses: {
          200: { description: `${col} found` },
          404: { description: "Not found" },
        },
      },
    };
  }
});

/* ------------------ ADMIN DELETE ------------------ */
swaggerSpec.paths["/{collection}/{id}"] = {
  delete: {
    tags: ["Admin"],
    summary: "Delete item from any collection",
    parameters: [collectionParam, idParam],
    responses: {
      200: { description: "Deleted successfully" },
      400: { description: "Invalid collection" },
    },
  },
};

export default swaggerSpec;
