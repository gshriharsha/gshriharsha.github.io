export interface Education {
  degree: string;
  field: string;
  institution: string;
  location: string;
  year: string;
}

export const education: Education[] = [
  {
    degree: "Master's",
    field: "Electrical Engineering",
    institution: "Wright State University",
    location: "Ohio, USA",
    year: "2016",
  },
  {
    degree: "Bachelor of Technology",
    field: "Electronics Engineering",
    institution: "VNR Vignana Jyothi Institute of Technology",
    location: "Hyderabad, India",
    year: "2015",
  },
];
