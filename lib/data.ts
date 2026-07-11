// ============================================================
// Gilgil Day Senior School — central data layer.
// Real leadership names in place. Photos are placeholders
// (initials-on-gradient) until real portraits are uploaded.
// ============================================================

export const school = {
  name: "Gilgil Day Senior School",
  shortName: "Gilgil Day",
  motto: "Knowledge is Power",
  type: "Public Mixed Day Senior School",
  location: "Gilgil Town, Nakuru County, Kenya",
  phone: "0716 851 146",
  phoneRaw: "+254716851146",
  email: "gilgildaysecondaryschool@gmail.com",
  emailAlt: "info@gilgilday.co.ke",
  admissionsEmail: "info@gilgilday.co.ke",
  poBox: "P.O. Box 85 – 20116, Gilgil",
  constituency: "Naivasha Constituency",
  county: "Nakuru County",
  region: "Rift Valley",
  category: "Public Day Senior School (Sub-County / C4 under CBE)",
  cohorts: ["Grade 10", "Form 3", "Form 4"],
  vision: "To be a leading day senior school shaping disciplined, competent and forward-looking learners for Kenya and beyond.",
  mission: "To deliver quality Competency-Based Education through structured pathways, dedicated teachers, active co-curricular life and strong partnership with parents and community.",
  coreValues: ["Integrity", "Diligence", "Discipline", "Service", "Innovation"],
};

export type NavItem = { label: string; href: string; children?: NavItem[] };

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Pathways", href: "/pathways" },
  { label: "Departments", href: "/departments" },
  { label: "Exams & Assessment", href: "/exams" },
  { label: "Careers", href: "/careers" },
  {
    label: "Portals",
    href: "/portals",
    children: [
      { label: "Staff Portal", href: "/portals/staff" },
      { label: "Parent Portal", href: "/portals/parent" },
      { label: "Student LMS", href: "/portals/student" },
      { label: "Admin Login", href: "/portals/admin" },
    ],
  },
  { label: "News", href: "/news" },
  { label: "Downloads", href: "/downloads" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = [
  { label: "Admissions", href: "/admissions" },
  { label: "Staff", href: "/staff" },
  { label: "Students' Council", href: "/students-council" },
  { label: "Alumni", href: "/alumni" },
  { label: "Support a Student", href: "/support" },
  { label: "Careers Guidance", href: "/careers" },
];

// ---------- People ----------
export type Person = {
  name: string;
  role: string;
  short?: string;
  photo?: string;
  message?: string;
  bio?: string;
};

// Principal's message — replace/refine with the Principal's own words.
export const principalMessage = `Karibu sana to Gilgil Day Senior School — a public mixed day school serving Gilgil Town, Kikopey, Karunga, Kwa Muhia, Kongasis and the surrounding community. We opened our senior school gates to receive Grade 10 learners under the Competency-Based Curriculum, alongside our Form 3 and Form 4 candidates completing the 8-4-4 cycle.

We stand for something specific: an accessible, disciplined and academically serious day school where every learner — whether they follow the STEM or Social Sciences pathway — is guided by teachers who know them by name. Our organisation is deliberate. Two deputies. A Dean of Academics. Heads of pathway, track and subject. Class teachers who track progress week by week. Every corner of the school reports back so no learner is left behind.

To parents, we say: we walk this journey with you. To learners, we say: your effort meets our effort. To the Board, the Parents' Association and our sponsors, we say: your support is felt every single day. Knowledge is Power — and here, we put it to work.`;

export const principal: Person = {
  name: "David Muhia",
  role: "Principal",
  short: "Head of School",
  photo: "/photos/principal.jpg",
  message: principalMessage,
};

// Helper: assigns leader photo to every leadership Person that doesn't already have one.
const withLeaderPhoto = (people: Person[]): Person[] =>
  people.map((p) => (p.photo ? p : { ...p, photo: "/photos/leader.jpg" }));

// ---------- Leadership hierarchy (used on About and Leadership) ----------
// Ordered top-down. Groups nest under levels.
export const leadership = {
  governance: [
    { name: "Board of Management", role: "Governance — Chairperson & Members", short: "BoM" },
    { name: "Parents' Association", role: "Parent Partnership", short: "PA" },
  ] as Person[],

  executive: [principal] as Person[],

  deputies: withLeaderPhoto([
    { name: "Muriithi Grace", role: "Deputy Principal — Administration", short: "DP · Admin" },
    { name: "David Asiago", role: "Deputy Principal — Academics", short: "DP · Academics" },
  ]),

  academicLeadership: withLeaderPhoto([
    { name: "Tirus Kinyua", role: "Dean of Academics / Director of Studies", short: "Dean · DoS" },
    { name: "Peter Kamau", role: "School Bursar", short: "Finance" },
  ]),

  pathwayHeads: withLeaderPhoto([
    { name: "Abuodha Wyclif", role: "Head of STEM Pathway", short: "STEM" },
    { name: "Mwaora Peter", role: "Head of Social Sciences Pathway", short: "Social Sciences" },
    { name: "Njuguna J.", role: "Head of Contemporary Issues", short: "Contemporary Issues" },
  ]),

  trackHeads: withLeaderPhoto([
    { name: "Wainaina J.", role: "Head of Pure Sciences Track", short: "Pure Sciences" },
    { name: "Ochieng J.", role: "Head of Applied Sciences Track", short: "Applied Sciences" },
    { name: "Macharia Jane", role: "Head of Languages Track", short: "Languages" },
    { name: "Koech Richard", role: "Head of Humanities & Business Track", short: "Humanities & Business" },
  ]),

  coordinators: withLeaderPhoto([
    { name: "Masinde Mercy", role: "Head of Class Teachers", short: "Class Teachers" },
    { name: "Silvanus Gekonge", role: "Head of Games", short: "Games" },
  ]),
};

// Flat list used on Staff/About administration grids
export const administration: Person[] = [
  principal,
  ...leadership.deputies,
  ...leadership.academicLeadership,
  ...leadership.pathwayHeads,
  ...leadership.trackHeads,
  ...leadership.coordinators,
];

export const governance: Person[] = [
  { name: "Board of Management", role: "Governance", message: "The Board provides strategic direction, oversight of resources and accountability to the community and the Ministry of Education." },
  { name: "Parents' Association", role: "Parent Partnership", message: "The Parents' Association walks with the school on welfare, discipline, projects and the day-to-day partnership that makes a public day school work." },
];

// ---------- Pathways ----------
export type Pathway = {
  slug: string;
  name: string;
  summary: string;
  head: Person;
  tracks: { name: string; head: string; subjects: string[] }[];
  careers: string[];
  photo?: string;
};

export const pathways: Pathway[] = [
  {
    slug: "stem",
    name: "STEM Pathway",
    summary:
      "Science, Technology, Engineering and Mathematics. Structured around the Pure Sciences and Applied Sciences tracks, preparing learners for scientific, technical and engineering careers.",
    head: { name: "Abuodha Wyclif", role: "Head of STEM Pathway" },
    photo: "/photos/stem.jpg",
    tracks: [
      { name: "Pure Sciences", head: "Wainaina J.", subjects: ["Mathematics", "Biology", "Chemistry", "Physics"] },
      { name: "Applied Sciences", head: "Ochieng J.", subjects: ["Agriculture", "Computer Studies", "Home Science"] },
    ],
    careers: ["Medicine & Health Sciences", "Engineering", "Computer Science & ICT", "Agriculture & Food Science", "Architecture & the Built Environment", "Actuarial Science & Data"],
  },
  {
    slug: "social-sciences",
    name: "Social Sciences Pathway",
    summary:
      "Languages, humanities and business studies. Structured around the Languages and Humanities & Business tracks, preparing learners for law, communication, business, governance and the social sector.",
    head: { name: "Mwaora Peter", role: "Head of Social Sciences Pathway" },
    photo: "/photos/social.jpg",
    tracks: [
      { name: "Languages", head: "Macharia Jane", subjects: ["English", "Kiswahili"] },
      { name: "Humanities and Business", head: "Koech Richard", subjects: ["Geography", "History", "CRE", "Business Studies"] },
    ],
    careers: ["Law & Governance", "Journalism & Communication", "Business, Finance & Entrepreneurship", "Education & Social Work", "Diplomacy & International Relations", "Tourism & Heritage"],
  },
];

// ---------- Departments (exactly six) ----------
export type DepartmentTeacher = { name: string; subjects: string[] };
export type Department = {
  slug: string;
  name: string;
  overview: string;
  head: string;
  items: string[];
  itemsLabel: string;
  teachers?: DepartmentTeacher[];
};

export const departments: Department[] = [
  {
    slug: "pure-sciences", name: "Pure Sciences",
    overview: "Mathematics and the core sciences within the STEM pathway.",
    head: "Wainaina J. — Head of Pure Sciences",
    itemsLabel: "Subjects", items: ["Mathematics", "Biology", "Chemistry", "Physics"],
    // Teachers with any of: Maths, Biology, Chemistry, Physics
    teachers: [
      { name: "Mutinda Beatrice",  subjects: ["Maths", "Business"] },
      { name: "Oduol Bivan",       subjects: ["Maths", "Chemistry"] },
      { name: "Ndirangu David",    subjects: ["Maths", "Chemistry"] },
      { name: "Asiago David",      subjects: ["Agriculture", "Biology"] },
      { name: "Jeremiah Getange",  subjects: ["Maths", "Chemistry"] },
      { name: "Koech Gilbert",     subjects: ["Maths", "Physics"] },
      { name: "Bett Griffins",     subjects: ["Geography", "Biology"] },
      { name: "Ochieng Kevin",     subjects: ["Computer", "Maths"] },
      { name: "Wainaina Margaret", subjects: ["Agriculture", "Biology"] },
      { name: "Maina Mary",        subjects: ["Business", "Maths"] },
      { name: "Kitur Sharon",      subjects: ["Biology", "Agriculture"] },
      { name: "Gekonge Silvanus",  subjects: ["Maths", "Physics"] },
      { name: "Mwangi Stephen",    subjects: ["Maths", "Chemistry"] },
      { name: "Kinyua Tirus",      subjects: ["Maths", "Physics"] },
      { name: "Onyango Wickliffe", subjects: ["Maths", "Business"] },
    ],
  },
  {
    slug: "applied-sciences", name: "Applied Sciences",
    overview: "Applied and technical subjects within the STEM pathway.",
    head: "Ochieng J. — Head of Applied Sciences",
    itemsLabel: "Subjects", items: ["Agriculture", "Computer Studies"],
    // Teachers with any of: Agriculture, Computer
    teachers: [
      { name: "Asiago David",      subjects: ["Agriculture", "Biology"] },
      { name: "Ochieng Kevin",     subjects: ["Computer", "Maths"] },
      { name: "Wainaina Margaret", subjects: ["Agriculture", "Biology"] },
      { name: "Kitur Sharon",      subjects: ["Biology", "Agriculture"] },
    ],
  },
  {
    slug: "languages", name: "Languages",
    overview: "Language instruction and literacy within the Social Sciences pathway.",
    head: "Macharia Jane — Head of Languages",
    itemsLabel: "Subjects", items: ["English", "Kiswahili", "Literature"],
    // Teachers with any of: English, Kiswahili, Literature
    teachers: [
      { name: "Mureithi Alex",     subjects: ["English", "Literature"] },
      { name: "Muli Annah",        subjects: ["Kiswahili", "CRE"] },
      { name: "Oteki Diana",       subjects: ["History", "Kiswahili"] },
      { name: "Macharia Jane",     subjects: ["English", "Literature"] },
      { name: "Muthoni Jerusha",   subjects: ["Kiswahili", "History"] },
      { name: "Robert Kibet",      subjects: ["Kiswahili", "CRE"] },
      { name: "Njeri Margaret",    subjects: ["CRE", "Kiswahili"] },
      { name: "Juliet Nelly",      subjects: ["English", "Literature"] },
      { name: "Teresiah Njuguna",  subjects: ["Kiswahili", "History"] },
      { name: "Kemunto Onduso",    subjects: ["Kiswahili", "CRE"] },
      { name: "Mwaura Peter",      subjects: ["Kiswahili", "Geography"] },
      { name: "Mburu Rahab",       subjects: ["English", "Literature"] },
      { name: "Morara Sylvanus",   subjects: ["English", "Literature"] },
    ],
  },
  {
    slug: "humanities-business", name: "Humanities and Business",
    overview: "Humanities and business subjects within the Social Sciences pathway.",
    head: "Koech Richard — Head of Humanities & Business",
    itemsLabel: "Subjects", items: ["Geography", "History", "CRE", "Business Studies"],
    // Teachers with any of: Geography, History, CRE, Business (or Economics)
    teachers: [
      { name: "Willy Alicious",    subjects: ["Geography", "CRE"] },
      { name: "Muli Annah",        subjects: ["Kiswahili", "CRE"] },
      { name: "Mutinda Beatrice",  subjects: ["Maths", "Business"] },
      { name: "Oteki Diana",       subjects: ["History", "Kiswahili"] },
      { name: "Muriithi Grace",    subjects: ["Business", "Economics"] },
      { name: "Bett Griffins",     subjects: ["Geography", "Biology"] },
      { name: "Korir Hillary",     subjects: ["Geography", "CRE"] },
      { name: "Muthoni Jerusha",   subjects: ["Kiswahili", "History"] },
      { name: "Robert Kibet",      subjects: ["Kiswahili", "CRE"] },
      { name: "Richard Koech",     subjects: ["Geography", "CRE"] },
      { name: "Njeri Margaret",    subjects: ["CRE", "Kiswahili"] },
      { name: "Maina Mary",        subjects: ["Business", "Maths"] },
      { name: "Masinde Mercy",     subjects: ["History", "CRE"] },
      { name: "David Muhia",       subjects: ["Geography", "Business"] },
      { name: "Teresiah Njuguna",  subjects: ["Kiswahili", "History"] },
      { name: "Kemunto Onduso",    subjects: ["Kiswahili", "CRE"] },
      { name: "Mwaura Peter",      subjects: ["Kiswahili", "Geography"] },
      { name: "Onyango Wickliffe", subjects: ["Maths", "Business"] },
    ],
  },
  { slug: "exams-assessment-careers", name: "Exams / Assessment / Careers", overview: "Led by the Dean of Academics / Director of Studies. Coordinates exams, internal assessment, academic progress tracking, results and career guidance across both pathways.", head: "Tirus Kinyua — Dean of Academics / DoS", itemsLabel: "Functions", items: ["Exams office", "Assessment notices", "Exam timetables", "Results uploads", "Academic reports", "Career guidance", "Academic progress support"] },
  { slug: "contemporary-issues", name: "Contemporary Issues", overview: "Non-academic departments, activities, clubs and societies — the co-curricular life of the school. Head of Games: Silvanus Gekonge.", head: "Njuguna J. — Head of Contemporary Issues", itemsLabel: "Areas", items: ["Games", "Guidance and Counselling", "Clubs", "Societies"] },
];

// ---------- Clubs & Societies (Contemporary Issues) ----------
export type Club = { slug: string; name: string; kind: "Activity" | "Club" | "Society"; blurb: string; patron?: string };

export const clubs: Club[] = [
  { slug: "games", name: "Games", kind: "Activity", blurb: "Ball games, athletics and inter-house competitions across the school calendar.", patron: "Silvanus Gekonge — Head of Games" },
  { slug: "guidance-counselling", name: "Guidance and Counselling", kind: "Activity", blurb: "Confidential learner support, mentorship and wellbeing programmes." },
  { slug: "journalism", name: "Journalism Club", kind: "Club", blurb: "School news, writing, media literacy and the school bulletin." },
  { slug: "first-responders", name: "First Responders / Red Cross Club", kind: "Club", blurb: "First aid, emergency preparedness and community health service." },
  { slug: "scouts", name: "Scouts Club", kind: "Club", blurb: "Leadership, discipline, outdoor skills and national scouting events." },
  { slug: "environment", name: "Environment Club", kind: "Club", blurb: "Tree planting, conservation and school greening projects." },
  { slug: "debating", name: "Debating Club", kind: "Club", blurb: "Public speaking, argumentation and inter-school debate competitions." },
  { slug: "music", name: "Music Club", kind: "Club", blurb: "Choral music, festivals and set-piece performance." },
  { slug: "drama", name: "Drama Club", kind: "Club", blurb: "Stage performance, festivals and creative expression." },
  { slug: "cu", name: "Christian Union (CU)", kind: "Society", blurb: "Christian fellowship, worship and service." },
  { slug: "sda", name: "SDA", kind: "Society", blurb: "Seventh-Day Adventist fellowship and programmes." },
  { slug: "muslim-society", name: "Muslim Society", kind: "Society", blurb: "Islamic fellowship, prayers and programmes." },
];

// ---------- News ----------
export type NewsPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  body: string[];
  featured?: boolean;
};

export const newsCategories = ["Announcements", "Events", "Academics", "Clubs & Sports", "Assessment", "Career Guidance"];

export const news: NewsPost[] = [
  {
    slug: "kcse-2025-results",
    title: "KCSE 2025: Our candidates deliver a strong national performance",
    category: "Academics",
    date: "2026-01-09",
    featured: true,
    excerpt: "Gilgil Day Senior School congratulates the 2025 KCSE candidate class, their teachers and parents on a strong showing that anchors the school's academic direction.",
    body: [
      "The Principal, Mr. David Muhia, congratulated the 2025 KCSE candidate class on a strong national performance across sciences, humanities and languages.",
      "Top performers are profiled on our Alumni page. Full result files are available in the Parents' Portal (view-only).",
    ],
  },
  {
    slug: "term-2-opening-2026",
    title: "Term 2 opening arrangements for Grade 10, Form 3 and Form 4",
    category: "Announcements",
    date: "2026-06-22",
    excerpt: "Reporting dates, requirements and the first-week programme for all classes.",
    body: [
      "Official opening arrangements for Term 2, including reporting dates for Grade 10, Form 3 and Form 4.",
      "The full circular is attached in the Downloads centre under Circulars.",
    ],
  },
  {
    slug: "grade-10-career-week",
    title: "Grade 10 Career Week: choosing subjects with the end in mind",
    category: "Career Guidance",
    date: "2026-06-10",
    excerpt: "The Dean of Academics leads a week of pathway-to-career sessions for Grade 10 learners.",
    body: ["Pathway-to-career activities coordinated by the Exams / Assessment / Careers department under Dean Tirus Kinyua."],
  },
  {
    slug: "mid-term-assessment-notice",
    title: "Mid-term internal assessment timetable released",
    category: "Assessment",
    date: "2026-06-02",
    excerpt: "Internal assessment dates for all classes are now available in the Downloads centre.",
    body: ["Assessment notices are published here and mirrored in the Downloads centre and parent portal."],
  },
  {
    slug: "environment-club-tree-planting",
    title: "Environment Club plants 500 seedlings within the school compound",
    category: "Clubs & Sports",
    date: "2026-05-18",
    excerpt: "A greening initiative led by learners under the Contemporary Issues department.",
    body: ["A co-curricular achievement led by learners under Head of Contemporary Issues Njuguna J."],
  },
  {
    slug: "ball-games-regionals",
    title: "School teams qualify for regional ball games",
    category: "Clubs & Sports",
    date: "2026-05-05",
    excerpt: "Congratulations to our teams and coaches under Head of Games Silvanus Gekonge.",
    body: ["Games and sports progress under the Contemporary Issues department."],
  },
];

// ---------- Downloads ----------
export const downloadCategories = [
  "Admission documents",
  "Circulars",
  "Academic resources",
  "Timetables",
  "Past papers",
  "School policies",
  "Club forms",
  "Results files",
  "Career guidance documents",
  "Assessment documents",
] as const;

export type DownloadItem = { name: string; category: (typeof downloadCategories)[number]; size: string; restricted?: boolean };

export const downloads: DownloadItem[] = [
  { name: "Grade 10 Admission Letter Template (placeholder)", category: "Admission documents", size: "PDF · 120 KB" },
  { name: "Grade 10 Reporting Checklist (placeholder)", category: "Admission documents", size: "PDF · 85 KB" },
  { name: "Term 2 Opening Circular (placeholder)", category: "Circulars", size: "PDF · 96 KB" },
  { name: "Class Timetable — Grade 10 (placeholder)", category: "Timetables", size: "PDF · 140 KB" },
  { name: "Exam Timetable — Mid-Term (placeholder)", category: "Timetables", size: "PDF · 110 KB" },
  { name: "Form 4 Past Papers Pack (placeholder)", category: "Past papers", size: "ZIP · 4.2 MB" },
  { name: "School Rules & Policies (placeholder)", category: "School policies", size: "PDF · 210 KB" },
  { name: "Club Membership Form (placeholder)", category: "Club forms", size: "PDF · 60 KB" },
  { name: "Grade 10 Subject & Career Guide (placeholder)", category: "Career guidance documents", size: "PDF · 300 KB" },
  { name: "Internal Assessment Policy (placeholder)", category: "Assessment documents", size: "PDF · 150 KB" },
  { name: "Term 1 Class Results — Form 3 (parents' portal only)", category: "Results files", size: "PDF · restricted", restricted: true },
];

// ---------- Gallery ----------
export const galleryFilters = ["Academics", "STEM", "Social Sciences", "Clubs", "Societies", "Sports", "Assemblies", "Labs", "Events", "Staff", "School compound", "School farm", "Agriculture"];

export type GalleryItem = { title: string; filter: string; photo?: string };
export const gallery: GalleryItem[] = [
  { title: "Morning assembly",           filter: "Assemblies",       photo: "/photos/students.jpg" },
  { title: "Chemistry practical session",filter: "Labs",             photo: "/photos/stem.jpg" },
  { title: "Grade 10 STEM class",        filter: "STEM",             photo: "/photos/stem.jpg" },
  { title: "Debate club session",        filter: "Clubs" },
  { title: "School compound — main block", filter: "School compound", photo: "/photos/photo1.jpg" },
  { title: "School compound — landscape",  filter: "School compound", photo: "/photos/photo2.jpg" },
  { title: "Ball games afternoon",       filter: "Sports" },
  { title: "Geography fieldwork",        filter: "Social Sciences",  photo: "/photos/social.jpg" },
  { title: "Staff group portrait",       filter: "Staff" },
  { title: "Music festival rehearsal",   filter: "Clubs" },
  { title: "CU Sunday service",          filter: "Societies" },
  { title: "Academic awards day",        filter: "Events" },
  { title: "Library study session",      filter: "Academics" },
  { title: "School AGM",                 filter: "Events",           photo: "/photos/photo4.jpg" },
  { title: "School Farm",                filter: "School farm" },
  { title: "Agriculture Project",        filter: "Agriculture" },
];

// ---------- Site photos (single source of truth for image swaps) ----------
// Change any path here and it updates everywhere on the site.
export const sitePhotos = {
  hero:      "/photos/photo1.jpg",   // top of landing page (large landscape)
  compound:  "/photos/photo2.jpg",   // main school building
  assembly:  "/photos/students.jpg", // students in parade formation
  student:   "/photos/photo4.jpg",   // used across KCSE performer cards
  students:  "/photos/students.jpg", // students council group photo, student body
  stem:      "/photos/stem.jpg",     // STEM pathway card (science lab)
  social:    "/photos/social.jpg",   // Social Sciences pathway card (geography fieldwork)
  principal: "/photos/principal.jpg",// David Muhia's portrait
  leader:    "/photos/leader.jpg",   // used for deputies, DoS, heads, coordinators
  teacher:   "/photos/teacher.jpg",  // used for teachers in staff listings
};

// ---------- KCSE 2025 top performers (Alumni page) ----------
export type Performer = { position: string; grade: string; note?: string; destination?: string; photo?: string };

export const kcse2025 = {
  headline: "KCSE 2025 — Our University-Bound Class",
  summary: "Congratulations to the 2025 candidate class and their teachers. These 24 learners scored C+ and above — the KUCCPS threshold for direct university placement. Portraits are updated from the Admin dashboard as the school uploads each learner's photo.",
  performers: [
    // ---- B (4) ----
    { position: "Lazaro Brian Suku",         grade: "B",  destination: "University pathway — pending KUCCPS placement" },
    { position: "Wangare Gichungu Samuel",   grade: "B",  destination: "University pathway — pending KUCCPS placement" },
    { position: "Chege Naomi Nyambura",      grade: "B",  destination: "University pathway — pending KUCCPS placement" },
    { position: "Waithera Kelvin Mwaniki",   grade: "B",  destination: "University pathway — pending KUCCPS placement" },
    // ---- B- (12) ----
    { position: "Faith Wanjiku Macharia",    grade: "B-", destination: "University pathway — pending KUCCPS placement" },
    { position: "Waithera Hellen Wambui",    grade: "B-", destination: "University pathway — pending KUCCPS placement" },
    { position: "Anyango Abdi Suleiman",     grade: "B-", destination: "University pathway — pending KUCCPS placement" },
    { position: "Wakanyi Elizabeth Ruhiu",   grade: "B-", destination: "University pathway — pending KUCCPS placement" },
    { position: "Wakonyu Leskar Gakou",      grade: "B-", destination: "University pathway — pending KUCCPS placement" },
    { position: "Wangari Mary Wanjiku",      grade: "B-", destination: "University pathway — pending KUCCPS placement" },
    { position: "Wambui Francis Maigua",     grade: "B-", destination: "University pathway — pending KUCCPS placement" },
    { position: "Njenga Josphat Kimani",     grade: "B-", destination: "University pathway — pending KUCCPS placement" },
    { position: "Kienje Purity Wangare",     grade: "B-", destination: "University pathway — pending KUCCPS placement" },
    { position: "Macharia Maryann Njeri",    grade: "B-", destination: "University pathway — pending KUCCPS placement" },
    { position: "Nanjala Evon Naliaka",      grade: "B-", destination: "University pathway — pending KUCCPS placement" },
    { position: "Kamau Joseph Karanja",      grade: "B-", destination: "University pathway — pending KUCCPS placement" },
    // ---- C+ (8) ----
    { position: "Maingi Peter Kariri",       grade: "C+", destination: "University pathway — pending KUCCPS placement" },
    { position: "Wambui Francis Gatehi",     grade: "C+", destination: "University pathway — pending KUCCPS placement" },
    { position: "Ryan Murimi Gichira",       grade: "C+", destination: "University pathway — pending KUCCPS placement" },
    { position: "Ondieki Peacenate Nyaboke", grade: "C+", destination: "University pathway — pending KUCCPS placement" },
    { position: "Macharia Dennis Mwangi",    grade: "C+", destination: "University pathway — pending KUCCPS placement" },
    { position: "Rotich Edwin Kimutai",      grade: "C+", destination: "University pathway — pending KUCCPS placement" },
    { position: "Kimani Esther Watiri",      grade: "C+", destination: "University pathway — pending KUCCPS placement" },
    { position: "Gitonga Junior Njoroge",    grade: "C+", destination: "University pathway — pending KUCCPS placement" },
  ] as Performer[],
};

// ---------- KCSE 5-year history (university joiners) ----------
// Structured for real photo/name/grade/university uploads via Admin dashboard.
// Focus: candidates who transitioned to university (C+ and above under the old
// entry threshold; refined per KUCCPS cut-off each year).
export type UniJoiner = { grade: string; course?: string; university?: string; note?: string };
export type KcseYear = {
  year: number;
  candidates: number;
  mean: string;      // school mean grade (e.g. "C+", "B-")
  meanScore?: string; // e.g. "6.42"
  universityJoiners: number;
  featured: UniJoiner[]; // placeholder card slots
};

export const kcseHistory: KcseYear[] = [
  {
    year: 2025,
    candidates: 0,
    mean: "—",
    meanScore: "—",
    universityJoiners: 0,
    featured: [
      { grade: "A",  course: "Medicine",           university: "University placement — pending" },
      { grade: "A-", course: "Engineering",        university: "University placement — pending" },
      { grade: "A-", course: "Actuarial Science",  university: "University placement — pending" },
      { grade: "B+", course: "Bachelor of Education", university: "University placement — pending" },
      { grade: "B+", course: "Business",           university: "University placement — pending" },
      { grade: "B",  course: "Agriculture",        university: "University placement — pending" },
    ],
  },
  {
    year: 2024,
    candidates: 0,
    mean: "—",
    meanScore: "—",
    universityJoiners: 0,
    featured: [
      { grade: "A-", course: "Computer Science",   university: "—" },
      { grade: "B+", course: "Nursing",            university: "—" },
      { grade: "B+", course: "Economics",          university: "—" },
      { grade: "B",  course: "Bachelor of Education", university: "—" },
      { grade: "B",  course: "Journalism",         university: "—" },
      { grade: "B-", course: "Sociology",          university: "—" },
    ],
  },
  {
    year: 2023,
    candidates: 0,
    mean: "—",
    meanScore: "—",
    universityJoiners: 0,
    featured: [
      { grade: "A-", course: "Law",                university: "—" },
      { grade: "B+", course: "Pharmacy",           university: "—" },
      { grade: "B+", course: "Actuarial Science",  university: "—" },
      { grade: "B",  course: "Business",           university: "—" },
      { grade: "B",  course: "Agriculture",        university: "—" },
      { grade: "B-", course: "Bachelor of Education", university: "—" },
    ],
  },
  {
    year: 2022,
    candidates: 0,
    mean: "—",
    meanScore: "—",
    universityJoiners: 0,
    featured: [
      { grade: "A-", course: "Engineering",        university: "—" },
      { grade: "B+", course: "Computer Science",   university: "—" },
      { grade: "B+", course: "Bachelor of Education", university: "—" },
      { grade: "B",  course: "Business",           university: "—" },
      { grade: "B",  course: "Communication",      university: "—" },
      { grade: "B-", course: "Geography",          university: "—" },
    ],
  },
  {
    year: 2021,
    candidates: 0,
    mean: "—",
    meanScore: "—",
    universityJoiners: 0,
    featured: [
      { grade: "B+", course: "Nursing",            university: "—" },
      { grade: "B+", course: "Bachelor of Education", university: "—" },
      { grade: "B",  course: "Business",           university: "—" },
      { grade: "B",  course: "Agriculture",        university: "—" },
      { grade: "B",  course: "Community Health",   university: "—" },
      { grade: "B-", course: "Social Work",        university: "—" },
    ],
  },
];

// ---------- Students' Council ----------
export const studentsCouncil = {
  captainMessage:
    "As School Captain, I speak on behalf of every Grade 10, Form 3 and Form 4 learner at Gilgil Day. We take pride in our school, our teachers and each other. We show up on time, we work hard, we play hard and we look after one another. Knowledge is Power — and every day, we prove it.",
  // Top tier: School Captain + Deputies (Boy & Girl)
  executive: [
    { name: "Name — placeholder", role: "School Captain" },
    { name: "Name — placeholder", role: "Deputy School Captain — Boy" },
    { name: "Name — placeholder", role: "Deputy School Captain — Girl" },
  ],
  // Area councils: each has a Captain + Deputy
  areas: [
    "Academics",
    "Environment",
    "Furniture",
    "Laboratory",
    "First Responders",
    "Dining",
    "Games",
    "Computer Lab",
    "Peer Counselling",
  ],
  // Flat members list (kept for backward compatibility / DB fallback)
  members: [
    { name: "Name — placeholder", role: "School Captain" },
    { name: "Name — placeholder", role: "Deputy School Captain — Boy" },
    { name: "Name — placeholder", role: "Deputy School Captain — Girl" },
    { name: "Name — placeholder", role: "Academics Captain" },
    { name: "Name — placeholder", role: "Academics Deputy" },
    { name: "Name — placeholder", role: "Environment Captain" },
    { name: "Name — placeholder", role: "Environment Deputy" },
    { name: "Name — placeholder", role: "Furniture Captain" },
    { name: "Name — placeholder", role: "Furniture Deputy" },
    { name: "Name — placeholder", role: "Laboratory Captain" },
    { name: "Name — placeholder", role: "Laboratory Deputy" },
    { name: "Name — placeholder", role: "First Responders Captain" },
    { name: "Name — placeholder", role: "First Responders Deputy" },
    { name: "Name — placeholder", role: "Dining Captain" },
    { name: "Name — placeholder", role: "Dining Deputy" },
    { name: "Name — placeholder", role: "Games Captain" },
    { name: "Name — placeholder", role: "Games Deputy" },
    { name: "Name — placeholder", role: "Computer Lab Captain" },
    { name: "Name — placeholder", role: "Computer Lab Deputy" },
    { name: "Name — placeholder", role: "Peer Counselling Captain" },
    { name: "Name — placeholder", role: "Peer Counselling Deputy" },
  ],
};

// ---------- Careers content ----------
export const careerArticles = [
  { title: "Choosing between STEM and Social Sciences: a Grade 10 guide", tag: "Grade 10" },
  { title: "Subject combinations and the university courses they open", tag: "Pathways" },
  { title: "Careers in health sciences from the STEM pathway", tag: "STEM" },
  { title: "Law, media and governance careers from Social Sciences", tag: "Social Sciences" },
];

// ---------- Support / Donations ----------
export const supportNeeds = [
  { name: "Fee support", desc: "Helps a learner facing fee arrears stay in class for a full term." },
  { name: "Uniform support", desc: "Provides a complete uniform set for a learner in need." },
  { name: "Learning materials", desc: "Exercise books, set texts, calculators and revision material." },
  { name: "Meals & welfare", desc: "Supports the lunch programme for day scholars in need." },
];

export const mpesa = {
  paybill: "XXXXXX (placeholder)",
  account: "SUPPORT / FEES (placeholder)",
  note: "M-Pesa integration is future-ready. The Daraja API can be connected later without changing this page's structure.",
};

// ---------- Demo authentication ----------
export type Role = "staff" | "student" | "parent" | "admin";

export const demoAccounts: Record<Role, { email: string; password: string; name: string; title: string }> = {
  staff:   { email: "teacher@gilgilday.demo", password: "staff2026",   name: "Demo Teacher", title: "Teacher — Geography" },
  student: { email: "learner@gilgilday.demo", password: "learner2026", name: "Demo Learner", title: "Grade 10 — STEM" },
  parent:  { email: "parent@gilgilday.demo",  password: "parent2026",  name: "Demo Parent",  title: "Parent — Form 3 learner" },
  admin:   { email: "admin@gilgilday.demo",   password: "admin2026",   name: "Demo Admin",   title: "System Administrator" },
};

// ---------- Dashboard module configs ----------
export type DashModule = { title: string; desc: string; items: string[]; action?: string };

export const dashboards: Record<Role, { heading: string; sub: string; modules: DashModule[] }> = {
  staff: {
    heading: "Staff Dashboard",
    sub: "Teaching resources, communication and class administration.",
    modules: [
      { title: "My Timetable", desc: "Your teaching timetable for the current term.", items: ["Mon 8:00 — Geography, Grade 10 East", "Tue 10:20 — Geography, Form 3 West", "Thu 11:40 — CRE, Form 4 North"], action: "View full timetable" },
      { title: "Upload Notes", desc: "Share notes with your classes (PDF, DOCX, PPTX).", items: ["Rivers & Drainage — Grade 10 (2 days ago)", "Climate of Kenya — Form 3 (last week)"], action: "Upload new notes" },
      { title: "Assignments", desc: "Post and track class assignments.", items: ["Grade 10: Map reading exercise — due Fri", "Form 3: Fieldwork report — due Mon"], action: "Post assignment" },
      { title: "Announcements", desc: "Post announcements to your classes.", items: ["Geography contest sign-up closes Wednesday"], action: "Post announcement" },
      { title: "Department Resources", desc: "Shared resources from your department.", items: ["Humanities & Business schemes of work", "Assessment rubric templates"], action: "Open library" },
      { title: "Messages & Meetings", desc: "Messages from administration and parent meeting requests.", items: ["Admin: Staff briefing Friday 4:00 PM", "Parent meeting request — Form 3 learner (pending)"], action: "Open inbox" },
    ],
  },
  student: {
    heading: "Student LMS",
    sub: "Notes, assignments, quizzes and career resources for your pathway.",
    modules: [
      { title: "My Subjects", desc: "Subject pages for your class and pathway.", items: ["Mathematics", "Biology", "Chemistry", "Geography", "English", "Kiswahili"], action: "Open subjects" },
      { title: "Notes", desc: "Latest notes shared by your teachers.", items: ["Rivers & Drainage — Geography", "Cell Structure — Biology", "Insha: Mifano — Kiswahili"], action: "All notes" },
      { title: "Assignments", desc: "Submit work and view teacher feedback.", items: ["Map reading exercise — due Fri", "Lab report — awaiting feedback"], action: "Open assignments" },
      { title: "Quizzes", desc: "Self-check quizzes per topic.", items: ["Geography: Drainage systems — 10 questions", "Chemistry: The mole — 15 questions"], action: "Take a quiz" },
      { title: "Past Papers", desc: "Download past papers for revision.", items: ["Form 4 mock papers pack", "Grade 10 term assessments"], action: "Downloads" },
      { title: "Progress & Careers", desc: "Track learning progress and explore pathway career links.", items: ["Term progress", "STEM careers guide", "Social Sciences careers guide"], action: "View progress" },
    ],
  },
  parent: {
    heading: "Parent Portal",
    sub: "Announcements, results, fees and communication with the school.",
    modules: [
      { title: "Announcements & Circulars", desc: "Official school communication.", items: ["Term 2 opening circular", "Mid-term assessment notice"], action: "Download circulars" },
      { title: "Class Results", desc: "View uploaded class result files (view-only, not downloadable).", items: ["Term 1 Results — Form 3 (view in portal)", "CAT 2 Results — Grade 10 (view in portal)"], action: "View results" },
      { title: "Attendance Summary", desc: "Last term's attendance summary.", items: ["Attendance: 96% — Term 1"], action: "View details" },
      { title: "Fees", desc: "Fee statement and payment guidance.", items: ["Balance: —", "M-Pesa payment instructions"], action: "View statement" },
      { title: "Meetings & Messages", desc: "Request meetings with the school or class teacher.", items: ["Request meeting — Class Teacher", "Request meeting — Administration", "Send a message to the school"], action: "New request" },
      { title: "Guidance & Calendar", desc: "Guidance & counselling information and the school calendar.", items: ["Term 2 school calendar", "Guidance & counselling contacts"], action: "Open calendar" },
    ],
  },
  admin: {
    heading: "Admin Dashboard",
    sub: "Manage users, content, results and every section of the platform.",
    modules: [
      { title: "Leadership Hierarchy", desc: "Manage the full leadership chart — BoM & PA, Principal, Deputies, DoS, Heads of Pathway, Track, Subject, Class Teachers, NTS, Students' Council.", items: ["7 leadership tiers", "14 named leaders"], action: "Edit hierarchy" },
      { title: "Users & Profiles", desc: "Staff, student and parent accounts.", items: ["Staff profiles", "Student profiles", "Parent accounts"], action: "Manage users" },
      { title: "News & Announcements", desc: "Publish news posts, announcements and events.", items: ["6 published posts", "1 draft"], action: "New post" },
      { title: "Results Uploads", desc: "Upload class results as PDF or Excel. Parents view them in the portal.", items: ["Term 1 — Form 3.pdf", "CAT 2 — Grade 10.xlsx"], action: "Upload results" },
      { title: "KCSE 2025 Performers", desc: "Upload photos, names, grades and destinations of top performers.", items: ["8 performer slots", "0 photos uploaded"], action: "Upload performers" },
      { title: "Downloads Centre", desc: "Manage all download categories and files.", items: ["11 files · 10 categories"], action: "Manage files" },
      { title: "Academic Structure", desc: "Pathways, departments, clubs and societies.", items: ["2 pathways", "6 departments", "12 clubs & societies"], action: "Edit structure" },
      { title: "Meetings & Messages", desc: "Meeting requests and school messages.", items: ["3 pending parent meeting requests"], action: "Open queue" },
      { title: "Pages & Content", desc: "Homepage, About, Careers, Alumni, Support and Exams content.", items: ["Homepage hero", "Principal's message", "Support needs"], action: "Edit content" },
      { title: "Gallery & Media", desc: "Manage gallery photos and the aerial hero video.", items: ["12 gallery items", "Hero video: placeholder"], action: "Manage media" },
    ],
  },
};
