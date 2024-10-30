export const expertises = {
  name: "expertises",
  type: "document",
  title: "Expertises",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }], // Rich text editor field
    },
    {
      name: "expertises",
      title: "Expertises",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "expertiseTitle",
              type: "string",
              title: "Title",
            },
            {
              name: "expertisesDescription",
              title: "Description",
              type: "array",
              of: [{ type: "block" }], // Rich text editor field
            },
            {
              name: "tags",
              title: "Tags",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "tagTitle",
                      title: "tagTitle",
                      type: "string",
                    },
                    {
                      name: "tagImage",
                      title: "tagImage",
                      type: "image",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
