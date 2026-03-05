export type School = {
  id: string;
  name: string;
  slug: string;
  city: string;
  country: string;
  brandColor: string;
  logo: string;
};

export const schools: School[] = [
  {
    id: "cbs",
    name: "Columbia Business School",
    slug: "columbia",
    city: "New York",
    country: "USA",
    brandColor: "#0033A0",
    logo: "/logos/cbs.png",
  },
  {
    id: "wharton",
    name: "The Wharton School",
    slug: "wharton",
    city: "Philadelphia",
    country: "USA",
    brandColor: "#990000",
    logo: "/logos/wharton.png",
  },
  {
    id: "hbs",
    name: "Harvard Business School",
    slug: "harvard",
    city: "Boston",
    country: "USA",
    brandColor: "#A41034",
    logo: "/logos/hbs.png",
  },
  {
    id: "booth",
    name: "Chicago Booth",
    slug: "booth",
    city: "Chicago",
    country: "USA",
    brandColor: "#800000",
    logo: "/logos/booth.png",
  },
  {
    id: "kellogg",
    name: "Kellogg School of Management",
    slug: "kellogg",
    city: "Evanston",
    country: "USA",
    brandColor: "#4E2A84",
    logo: "/logos/kellogg.png",
  },
  {
    id: "stanford",
    name: "Stanford GSB",
    slug: "stanford",
    city: "Stanford",
    country: "USA",
    brandColor: "#8C1515",
    logo: "/logos/stanford.png",
  },
  {
    id: "lbs",
    name: "London Business School",
    slug: "lbs",
    city: "London",
    country: "UK",
    brandColor: "#002147",
    logo: "/logos/lbs.png",
  },
];

export const getSchoolBySlug = (slug: string) => schools.find((s) => s.slug === slug);
export const getSchoolById = (id: string) => schools.find((s) => s.id === id);
