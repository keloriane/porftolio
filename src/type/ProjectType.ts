export interface ProjectList {
  title: string;
  _updatedAt: string; // ISO date string format
  projectList: Project[];
  _createdAt: string; // ISO date string format
  _rev: string;
  _type: "projects";
  _id: string;
}
export interface Project {
  projectUrl: string;
  description: string;
  tags: string[];
  _key: string;
  slug: {
    current: string;
    _type: "slug";
  };
  projectTitle: string;
  tech: Array<{ [key: string]: any }>; // Define this based on your tech structure
  image: {
    _type: "image";
    alt: string;
    asset: {
      _ref?: string; // Adjust this based on your actual asset object structure
      _type: string;
    };
  };
  preview: {
    _type: "image";
    alt: string;
    asset: {
      _ref?: string; // Adjust this based on your actual asset object structure
      _type: string;
    };
  };
  previewSecond: {
    _type: "image";
    alt: string;
    asset: {
      _ref?: string; // Adjust this based on your actual asset object structure
      _type: string;
    };
  };

  challenge: any[];
  body: any[];
  technologies: [];
}
