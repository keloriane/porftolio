type TestimonialItem = {
  _updatedAt: string; // ISO date format
  testimonial: {
    title: string;
    testimonial: string;
    testimonialName: string;
    profilePic: {
      _type: "image";
      asset: {
        _ref: string;
        _type: "reference";
      };
      alt?: string;
    };
  }[];
  _createdAt: string; // ISO date format
  _rev: string;
  _type: "testimonials";
  _id: string;
  title: string;
};

type TestimonialsList = TestimonialItem[];
