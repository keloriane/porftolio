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
      type: "string",
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
              type: "text",
              title: "Description",
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
