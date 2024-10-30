export type ExpertiseTag = {
  tagTitle: string;
  tagImage: {
    _type: "image";
    alt: string;
    asset: {
      _ref?: string; // Adjust this based on your actual asset object structure
      _type: string;
    };
  };
  _key: string;
};

export type Expertise = {
  expertiseTitle: string;
  expertisesDescription: [];
  _key: string;
  tags: ExpertiseTag[];
};

export type ExpertiseItem = {
  _type: "expertises";
  description: string;
  _id: string;
  title: string;
  _updatedAt: string; // ISO date format
  expertises: Expertise[];
};
