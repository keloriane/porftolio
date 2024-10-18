import { defineType } from "sanity";

export const projects = defineType({
  name: "projects",
  title: "Projects",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },

    {
      name: "projectList",
      title: "Project List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "projectTitle",
              title: "Project Title",
              type: "string",
            },
            {
              name: "body",
              title: "Body Content",
              type: "array",
              of: [{ type: "block" }],
            },
            {
              name: "leftBody",
              title: "Left Body Content",
              type: "array",
              of: [{ type: "block" }],
            },
            {
              name: "intro",
              title: "Introduction",
              type: "string",
            },
            {
              name: "color",
              title: "Color",
              type: "string",
            },
            {
              name: "challenge",
              type: "array",
              of: [
                {
                  type: "block",
                },
                {
                  type: "image",
                  fields: [
                    {
                      type: "text",
                      name: "alt",
                      title: "Alternative text",
                      description: `Some of your visitors cannot see images, 
            be they blind, color-blind, low-sighted; 
            alternative text is of great help for those 
            people that can rely on it to have a good idea of 
            what\'s on your page.`,
                      options: {
                        isHighlighted: true,
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: "challengeTitle",
              title: "Challenge Title",
              type: "string",
            },
            {
              name: "preview",
              title: "Preview Image",
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: "alt",
                  title: "Alternative text",
                  type: "string",
                },
              ],
            },
            {
              name: "previewSecond",
              title: "Second Preview Image",
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: "alt",
                  title: "Alternative text",
                  type: "string",
                },
              ],
            },
            {
              name: "previewThird",
              title: "Third Preview Image",
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: "alt",
                  title: "Alternative text",
                  type: "string",
                },
              ],
            },
            {
              name: "previewFourth",
              title: "Fourth Preview Image",
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: "alt",
                  title: "Alternative text",
                  type: "string",
                },
              ],
            },
            {
              name: "previewFifth",
              title: "Fifth Preview Image",
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: "alt",
                  title: "Alternative text",
                  type: "string",
                },
              ],
            },
            {
              name: "previewSixth",
              title: "Sixth Preview Image",
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: "alt",
                  title: "Alternative text",
                  type: "string",
                },
              ],
            },
            {
              name: "projectUrl",
              title: "Project URL",
              type: "url",
            },
            {
              name: "slug",
              title: "Slug",
              type: "slug",
              options: {
                source: "projectTitle",
                maxLength: 96,
              },
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
            {
              name: "description",
              title: "Project Description",
              type: "text",
            },
            {
              name: "image",
              title: "Project Image",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Alt Text", type: "string" }],
            },
            {
              name: "tech",
              title: "Technologies",
              type: "array",
              of: [
                {
                  type: "image",
                  options: { hotspot: true },
                  fields: [{ name: "alt", title: "Alt Text", type: "string" }],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
