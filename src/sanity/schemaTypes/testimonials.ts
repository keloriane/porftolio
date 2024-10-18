export const testimonials = {
  name: "testimonials",
  title: "Testimonials",
  type: "document",
  fields: [
    {
      title: "Titlte",
      name: "title",
      type: "string",
    },
    {
      name: "testimonial",
      title: "Testimonial",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "testimonial",
              title: "Testimonial",
              type: "text",
            },
            {
              name: "testimonialName",
              title: "Testimonial Name",
              type: "string",
            },
            {
              name: "profilePic",
              type: "image",
              title: "Profile Picture",
              options: { hotspot: true },
              fields: [
                {
                  name: "alt",
                  type: "string",
                  title: "Alt Text",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
