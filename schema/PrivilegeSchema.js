const post = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
  },
};

const all = {
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: post,
        },
        count: { type: "number" },
      },
    },
  },
};

const one = {
  params: {
    id: { type: "number" },
  },
  response: {
    200: post,
  },
};

const create = {
  body: {
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string" },
    },
  },
  response: {
    200: post,
  },
};

const update = {
  params: {
    id: { type: "number" },
  },
  body: {
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string" },
    },
  },
  response: {
    200: post,
  },
};

const edit = {
  params: {
    id: { type: "number" },
  },
  body: {
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string" },
    },
  },
  response: {
    200: post,
  },
};

const del = {
  params: {
    id: { type: "number" },
  },
  response: {
    200: { type: "string" },
  },
};

const deleteAll = {
  response: {
    200: { type: "string" },
  },
};

module.exports = { post, all, one, create, update, edit, del, deleteAll };
