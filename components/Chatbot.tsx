"use client";

import { useState } from "react";

const topics = [
  ["Reporting", "Grade 10 reporting requirements are on the Admissions page, with a downloadable checklist in the Downloads centre."],
  ["Downloads", "Open the Downloads centre from the main menu — files are grouped into ten categories including circulars and past papers."],
  ["Timetables", "Class and exam timetables are published under Downloads → Timetables, and in the Exams & Assessment section."],
  ["Contacts", "Phone, email and location details are on the Contact page. You can also send the school a message from there."],
  ["Meeting requests", "Parents can request a meeting with the school or class teacher from the Parent Portal, or via the Contact page form."],
  ["Pathways", "We offer STEM and Social Sciences. See the Pathways page for subjects, tracks and career links."],
  ["School events", "Upcoming events and updates are published in the News section."],
  ["Parent portal help", "Log in at Portals → Parent Portal using the demo credentials shown on the login page."],
  ["Student LMS help", "Learners log in at Portals → Student LMS for notes, assignments, quizzes and past papers."],
  ["Exams & assessment", "The Exams & Assessment section, led by the Director of Studies, has notices, timetables and results information."],
  ["Career guidance", "Career guidance for Grade 10 and pathway-to-career resources are on the Careers page."],
] as const;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 w-[320px] max-w-[calc(100vw-2.5rem)] border border-mist-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-maroon-700 px-4 py-3 text-white">
            <p className="text-sm font-semibold">School Assistant</p>
            <span className="text-[10px] uppercase tracking-widest text-maroon-100">Demo</span>
          </div>
          <div className="max-h-[380px] overflow-y-auto p-4">
            <p className="text-[13px] text-mist-600">
              Hello! I answer common questions from parents and students. Pick a topic:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {topics.map(([t]) => (
                <button
                  key={t}
                  onClick={() => setAnswer(t)}
                  className={`border px-2.5 py-1.5 text-[11px] font-semibold ${
                    answer === t ? "border-maroon-700 bg-maroon-700 text-white" : "border-mist-300 text-charcoal-800 hover:border-maroon-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            {answer && (
              <p className="mt-4 border-l-2 border-maroon-700 bg-mist-50 p-3 text-[13px] leading-relaxed">
                {topics.find(([t]) => t === answer)?.[1]}
              </p>
            )}
            <p className="mt-4 text-[11px] text-mist-500">
              Placeholder chatbot. A live AI assistant can be connected here later.
            </p>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="ml-auto flex items-center gap-2 bg-charcoal-900 px-4 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-charcoal-800"
        aria-expanded={open}
      >
        <span className="grid h-2 w-2 place-items-center rounded-full bg-emerald-400" aria-hidden />
        {open ? "Close assistant" : "Ask the school"}
      </button>
    </div>
  );
}
