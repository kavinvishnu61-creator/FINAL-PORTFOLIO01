export const SECTIONS = [
  { id: "home", num: "00", label: "Home" },
  { id: "about", num: "01", label: "About" },
  { id: "experience", num: "02", label: "Experience" },
  { id: "skills", num: "03", label: "Skills" },
  { id: "projects", num: "04", label: "Projects" },
  { id: "contact", num: "05", label: "Contact" },
] as const;

export const MARQUEE_A = [
  "AUTOCAD",
  "SOLIDWORKS",
  "CATIA",
  "ANSYS",
  "CNC OPERATIONS",
  "MASTERCAM",
  "GD&T",
  "LEAN MANUFACTURING",
];

export const MARQUEE_B = [
  "IC ENGINES",
  "HYDRAULICS",
  "PNEUMATICS",
  "ENERGY AUDITING",
  "PRECISION MFG",
  "SERVICE ENGINEERING",
];

export type SkillCat = "ALL" | "DESIGN" | "CAE/CAM" | "MFG" | "PROCESS";

export const SKILLS: { name: string; cat: Exclude<SkillCat, "ALL">; lvl: number }[] = [
  { name: "AutoCAD", cat: "DESIGN", lvl: 3 },
  { name: "SolidWorks", cat: "DESIGN", lvl: 2 },
  { name: "CATIA", cat: "DESIGN", lvl: 2 },
  { name: "CNC Machines", cat: "MFG", lvl: 3 },
  { name: "Time Management", cat: "PROCESS", lvl: 4 },
  { name: "Quick Learner", cat: "PROCESS", lvl: 4 },
  { name: "Adaptability", cat: "PROCESS", lvl: 4 },
];

export interface RevItem {
  rev: string;
  role: string;
  company: string;
  date: string;
  current?: boolean;
  details: string;
  bullets: string[];
}

export const EXPERIENCE: RevItem[] = [
  {
    rev: "A",
    role: "Inplant Training",
    company: "TNSTC (RC Unit), Chithode",
    date: "15 DAYS",
    details: "Completed 15 days of practical inplant training.",
    bullets: [
      "Gained hands-on exposure to transport corporation operations and maintenance.",
    ],
  },
  {
    rev: "B",
    role: "Inplant Training",
    company: "Electric Loco Shed, Erode",
    date: "15 DAYS",
    details: "Completed 15 days of practical inplant training.",
    bullets: [
      "Learned about electric locomotive operations and maintenance routines.",
    ],
  },
  {
    rev: "C",
    role: "Workshop",
    company: "Karpagam College of Engineering",
    date: "COMPLETED",
    details: "Workshop on Dismantling & Assembly of Mahindra XUV300 Engine.",
    bullets: [
      "Participated in hands-on workshop focused on automotive engine teardown and assembly.",
    ],
  },
  {
    rev: "D",
    role: "Certification",
    company: "DMW CNC / C CUBE TECHNOLOGIES",
    date: "COMPLETED",
    details: "Certifications in CNC operations and Design Softwares.",
    bullets: [
      "Completed certification in CNC operations at DMW CNC Solutions India Private Limited.",
      "Learned Design Softwares including AutoCAD, SolidWorks, and CATIA at C CUBE TECHNOLOGIES, Erode."
    ],
  },
];

export const CONTACT = {
  email: "kavinram72@gmail.com",
  phone: "7867846661",
  phonePretty: "+91 78678 46661",
  linkedin: "https://www.linkedin.com/in/kavinvishnu72",
  resume: "/Kavin-Vishnu-Resume.pdf",
  report: "/Ponni-Sugars-Project-Report.pdf",
};
