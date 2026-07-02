// ============================================================
// Gilgil Day Senior School — central mock data layer.
// Replace placeholder values here as real content becomes
// available. When a database (Supabase/PostgreSQL) is added,
// these exports become API queries with the same shapes.
// ============================================================

export const school = {
  name: "Gilgil Day Senior School",
  shortName: "Gilgil Day",
  motto: "Knowledge is Power",
  type: "Public Mixed Day Senior School",
  location: "Gilgil Town, Nakuru County, Kenya",
  phone: "+254 7XX XXX XXX", // placeholder
  email: "info@gilgildaysenior.sc.ke", // placeholder
  admissionsEmail: "admissions@gilgildaysenior.sc.ke", // placeholder
  poBox: "P.O. Box XXXX — 20116, Gilgil", // placeholder
  cohorts: ["Grade 10", "Form 3", "Form 4"],
  vision: "Vision statement placeholder — to be supplied by the school administration.",
  mission: "Mission statement placeholder — to be supplied by the school administration.",
  coreValues: ["Integrity", "Diligence", "Discipline", "Service", "Innovation"], // placeholder values
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

// ---------- Administration ----------
export type Person = {
  name: string;
  role: string;
  message?: string;
  bio?: string;
};

export const administration: Person[] = [
  { name: "Name Placeholder", role: "Principal", message: "Principal's message placeholder. A welcome note on the school's direction, values and CBE readiness will appear here." },
  { name: "Name Placeholder", role: "Deputy Principal — Administration" },
  { name: "Name Placeholder", role: "Deputy Principal — Academics" },
  { name: "Name Placeholder", role: "Director of Studies", bio: "Leads exams, assessment, academic progress tracking, career guidance coordination, results uploads, academic reports, exam timetables, assessment notices and career resources." },
  { name: "Name Placeholder", role: "Head of STEM Pathway" },
  { name: "Name Placeholder", role: "Head of Social Sciences Pathway" },
];

export const governance: Person[] = [
  { name: "Name Placeholder", role: "Board of Management — Chairperson", message: "Board of Management message placeholder." },
  { name: "Name Placeholder", role: "Parents' Association Representative", message: "PA representative message placeholder." },
];

// ---------- Pathways ----------
export type Pathway = {
  slug: string;
  name: string;
  summary: string;
  head: Person;
  tracks: { name: string; head: string; subjects: string[] }[];
  careers: string[];
};

export const pathways: Pathway[] = [
  {
    slug: "stem",
    name: "STEM Pathway",
    summary:
      "Science, Technology, Engineering and Mathematics. Structured around the Pure Sciences and Applied Sciences departments, preparing learners for scientific, technical and engineering careers.",
    head: { name: "Name Placeholder", role: "Head of STEM Pathway" },
    tracks: [
      { name: "Pure Sciences", head: "Head of Pure Sciences — placeholder", subjects: ["Mathematics", "Biology", "Chemistry", "Physics"] },
      { name: "Applied Sciences", head: "Head of Applied Sciences — placeholder", subjects: ["Agriculture", "Computer Studies", "Home Science placeholder"] },
    ],
    careers: ["Medicine & Health Sciences", "Engineering", "Computer Science & ICT", "Agriculture & Food Science", "Architecture & the Built Environment", "Actuarial Science & Data"],
  },
  {
    slug: "social-sciences",
    name: "Social Sciences Pathway",
    summary:
      "Languages, humanities and business studies. Structured around the Languages and Humanities & Business departments, preparing learners for careers in law, communication, business, governance and the social sector.",
    head: { name: "Name Placeholder", role: "Head of Social Sciences Pathway" },
    tracks: [
      { name: "Languages Department", head: "Head of Languages Track — placeholder", subjects: ["English", "Kiswahili"] },
      { name: "Humanities and Business Department", head: "Head of Humanities & Business Track — placeholder", subjects: ["Geography", "History", "CRE", "Business Studies"] },
    ],
    careers: ["Law & Governance", "Journalism & Communication", "Business, Finance & Entrepreneurship", "Education & Social Work", "Diplomacy & International Relations", "Tourism & Heritage"],
  },
];

// ---------- Departments (exactly six) ----------
export type Department = {
  slug: string;
  name: string;
  overview: string;
  head: string;
  items: string[]; // subjects or activities
  itemsLabel: string;
};

export const departments: Department[] = [
  { slug: "pure-sciences", name: "Pure Sciences", overview: "Mathematics and the core sciences within the STEM pathway.", head: "Head of Department — placeholder", itemsLabel: "Subjects", items: ["Mathematics", "Biology", "Chemistry", "Physics"] },
  { slug: "applied-sciences", name: "Applied Sciences", overview: "Applied and technical subjects within the STEM pathway.", head: "Head of Department — placeholder", itemsLabel: "Subjects", items: ["Agriculture", "Computer Studies"] },
  { slug: "languages", name: "Languages", overview: "Language instruction and literacy within the Social Sciences pathway.", head: "Head of Languages — placeholder", itemsLabel: "Subjects", items: ["English", "Kiswahili"] },
  { slug: "humanities-business", name: "Humanities and Business", overview: "Humanities and business subjects within the Social Sciences pathway.", head: "Head of Humanities & Business — placeholder", itemsLabel: "Subjects", items: ["Geography", "History", "CRE", "Business Studies"] },
  { slug: "exams-assessment-careers", name: "Exams / Assessment / Careers", overview: "Led by the Director of Studies. Coordinates exams, internal assessment, academic progress tracking, results and career guidance across both pathways.", head: "Director of Studies — placeholder", itemsLabel: "Functions", items: ["Exams office", "Assessment notices", "Exam timetables", "Results uploads", "Academic reports", "Career guidance", "Academic progress support"] },
  { slug: "contemporary-issues", name: "Contemporary Issues", overview: "In charge of non-academic departments, activities, clubs and societies — the co-curricular life of the school.", head: "Head of Contemporary Issues — placeholder", itemsLabel: "Areas", items: ["Games", "Guidance and Counselling", "Clubs", "Societies"] },
];

// ---------- Clubs & Societies (Contemporary Issues) ----------
export type Club = { slug: string; name: string; kind: "Activity" | "Club" | "Society"; blurb: string };

export const clubs: Club[] = [
  { slug: "games", name: "Games", kind: "Activity", blurb: "Ball games, athletics and inter-house competitions across the school calendar." },
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
    slug: "term-2-opening-2026",
    title: "Term 2 opening arrangements for Grade 10, Form 3 and Form 4",
    category: "Announcements",
    date: "2026-06-22",
    featured: true,
    excerpt: "Reporting dates, requirements and the first-week programme for all classes.",
    body: [
      "Placeholder article. This is where the school communicates official opening arrangements for the term, including reporting dates for Grade 10, Form 3 and Form 4.",
      "Replace this text with the official circular summary. The full circular can be attached in the Downloads centre under Circulars.",
    ],
  },
  {
    slug: "grade-10-career-week",
    title: "Grade 10 Career Week: choosing subjects with the end in mind",
    category: "Career Guidance",
    date: "2026-06-10",
    excerpt: "The Director of Studies leads a week of pathway-to-career sessions for Grade 10 learners.",
    body: ["Placeholder article on career guidance activities coordinated by the Exams / Assessment / Careers department."],
  },
  {
    slug: "mid-term-assessment-notice",
    title: "Mid-term internal assessment timetable released",
    category: "Assessment",
    date: "2026-06-02",
    excerpt: "Internal assessment dates for all classes are now available in the Downloads centre.",
    body: ["Placeholder article. Assessment notices are published here and mirrored in the Downloads centre and parent portal."],
  },
  {
    slug: "environment-club-tree-planting",
    title: "Environment Club plants 500 seedlings within the school compound",
    category: "Clubs & Sports",
    date: "2026-05-18",
    excerpt: "A greening initiative led by learners under the Contemporary Issues department.",
    body: ["Placeholder article celebrating co-curricular achievement."],
  },
  {
    slug: "ball-games-regionals",
    title: "School teams qualify for regional ball games",
    category: "Clubs & Sports",
    date: "2026-05-05",
    excerpt: "Congratulations to our teams and coaches on a strong showing.",
    body: ["Placeholder article on games and sports progress."],
  },
  {
    slug: "form-4-exam-preparation",
    title: "Form 4 examination preparation programme underway",
    category: "Academics",
    date: "2026-04-28",
    excerpt: "Structured revision, assessment cycles and academic progress tracking for the candidate class.",
    body: ["Placeholder article on the candidate-class academic programme."],
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
export const galleryFilters = ["Academics", "STEM", "Social Sciences", "Clubs", "Societies", "Sports", "Assemblies", "Labs", "Events", "Staff", "School compound"];

export type GalleryItem = { title: string; filter: string };
export const gallery: GalleryItem[] = [
  { title: "Morning assembly", filter: "Assemblies" },
  { title: "Chemistry practical session", filter: "Labs" },
  { title: "Grade 10 STEM class", filter: "STEM" },
  { title: "Debate club session", filter: "Clubs" },
  { title: "School compound — main block", filter: "School compound" },
  { title: "Ball games afternoon", filter: "Sports" },
  { title: "Geography fieldwork", filter: "Social Sciences" },
  { title: "Staff group portrait", filter: "Staff" },
  { title: "Music festival rehearsal", filter: "Clubs" },
  { title: "CU Sunday service", filter: "Societies" },
  { title: "Academic awards day", filter: "Events" },
  { title: "Library study session", filter: "Academics" },
];

// ---------- Students' Council ----------
export const studentsCouncil = {
  captainMessage:
    "Message from the School Captain — placeholder. A short address to fellow learners on leadership, discipline and the spirit of Gilgil Day Senior School will appear here.",
  members: [
    { name: "Name Placeholder", role: "School Captain" },
    { name: "Name Placeholder", role: "Deputy Captain — Girls" },
    { name: "Name Placeholder", role: "Deputy Captain — Boys" },
    { name: "Name Placeholder", role: "Academics Captain" },
    { name: "Name Placeholder", role: "Games Captain" },
    { name: "Name Placeholder", role: "Environment Captain" },
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
      { title: "Upload Notes", desc: "Share notes with your classes (PDF, DOCX, PPTX).", items: ["Rivers & Drainage — Grade 10 (uploaded 2 days ago)", "Climate of Kenya — Form 3 (uploaded last week)"], action: "Upload new notes" },
      { title: "Assignments", desc: "Post and track class assignments.", items: ["Grade 10: Map reading exercise — due Fri", "Form 3: Fieldwork report — due Mon"], action: "Post assignment" },
      { title: "Announcements", desc: "Post announcements to your classes.", items: ["Geography contest sign-up closes Wednesday"], action: "Post announcement" },
      { title: "Department Resources", desc: "Shared resources from your department.", items: ["Humanities & Business schemes of work", "Assessment rubric templates"], action: "Open library" },
      { title: "Messages & Meetings", desc: "Messages from administration and meeting requests from parents.", items: ["Admin: Staff briefing Friday 4:00 PM", "Parent meeting request — Form 3 learner (pending)"], action: "Open inbox" },
    ],
  },
  student: {
    heading: "Student LMS",
    sub: "Notes, assignments, quizzes and career resources for your pathway.",
    modules: [
      { title: "My Subjects", desc: "Subject pages for your class and pathway.", items: ["Mathematics", "Biology", "Chemistry", "Geography", "English", "Kiswahili"], action: "Open subjects" },
      { title: "Notes", desc: "Latest notes shared by your teachers.", items: ["Rivers & Drainage — Geography", "Cell Structure — Biology", "Insha: Mifano — Kiswahili"], action: "All notes" },
      { title: "Assignments", desc: "Submit work and view teacher feedback (placeholder).", items: ["Map reading exercise — due Fri", "Lab report — submitted, awaiting feedback"], action: "Open assignments" },
      { title: "Quizzes", desc: "Self-check quizzes per topic.", items: ["Geography: Drainage systems — 10 questions", "Chemistry: The mole — 15 questions"], action: "Take a quiz" },
      { title: "Past Papers", desc: "Download past papers for revision.", items: ["Form 4 mock papers pack", "Grade 10 term assessments"], action: "Downloads" },
      { title: "Progress & Careers", desc: "Track learning progress and explore pathway career links.", items: ["Term progress: placeholder chart", "STEM careers guide", "Social Sciences careers guide"], action: "View progress" },
    ],
  },
  parent: {
    heading: "Parent Portal",
    sub: "Announcements, results, fees and communication with the school.",
    modules: [
      { title: "Announcements & Circulars", desc: "Official school communication.", items: ["Term 2 opening circular", "Mid-term assessment notice"], action: "Download circulars" },
      { title: "Class Results", desc: "View uploaded class result files (view-only, not downloadable).", items: ["Term 1 Results — Form 3 (PDF, view in portal)", "CAT 2 Results — Grade 10 (PDF, view in portal)"], action: "View results" },
      { title: "Attendance Summary", desc: "Last term's attendance summary (placeholder).", items: ["Attendance: 96% — Term 1 (placeholder)"], action: "View details" },
      { title: "Fees", desc: "Fee statement placeholder and payment guidance.", items: ["Balance: placeholder", "M-Pesa payment instructions"], action: "View statement" },
      { title: "Meetings & Messages", desc: "Request meetings with the school or class teacher.", items: ["Request meeting — Class Teacher", "Request meeting — Administration", "Send a message to the school"], action: "New request" },
      { title: "Guidance & Calendar", desc: "Guidance and counselling information and the school calendar.", items: ["Term 2 school calendar", "Guidance & counselling contacts"], action: "Open calendar" },
    ],
  },
  admin: {
    heading: "Admin Dashboard",
    sub: "Manage users, content, results and every section of the platform.",
    modules: [
      { title: "Users & Profiles", desc: "Staff, student and parent accounts.", items: ["Staff profiles: 34", "Student profiles: placeholder", "Parent accounts: placeholder"], action: "Manage users" },
      { title: "News & Announcements", desc: "Publish news posts, announcements and events.", items: ["6 published posts", "1 draft — Sports day preview"], action: "New post" },
      { title: "Results Uploads", desc: "Upload class results as PDF or Excel. Parents view them in the portal (view-only).", items: ["Term 1 — Form 3.pdf (uploaded)", "CAT 2 — Grade 10.xlsx (uploaded)"], action: "Upload results" },
      { title: "Downloads Centre", desc: "Manage all download categories and files.", items: ["11 files across 10 categories"], action: "Manage files" },
      { title: "Academic Structure", desc: "Pathways, departments, clubs and societies.", items: ["2 pathways", "6 departments", "12 clubs & societies"], action: "Edit structure" },
      { title: "Meetings & Messages", desc: "Meeting requests and school messages.", items: ["3 pending parent meeting requests", "1 academic enquiry"], action: "Open queue" },
      { title: "Pages & Content", desc: "Homepage, About, Careers, Alumni, Support and Exams content.", items: ["Homepage hero", "Principal's message", "Support needs list"], action: "Edit content" },
      { title: "Gallery & Media", desc: "Manage gallery photos and the aerial hero video.", items: ["12 gallery items", "Hero video: placeholder"], action: "Manage media" },
    ],
  },
};
