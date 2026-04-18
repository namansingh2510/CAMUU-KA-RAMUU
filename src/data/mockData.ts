export type Role = "admin" | "teacher" | "student";

export interface StudentRecord {
  id: number;
  name: string;
  rollNo: string;
  course: string;
  semester: number;
  marks: Record<string, number>;
  attendance: Record<string, number>; // subject -> percentage
  parentName: string;
  parentPhone: string;
  parentEmail: string;
}

export interface TeacherRecord {
  id: number;
  name: string;
  email: string;
  department: string;
  subjects: string[];
}

export const subjects = ["Mathematics", "Physics", "Chemistry", "English", "Computer Science"];

export const students: StudentRecord[] = [
  { id: 1, name: "Alice Johnson", rollNo: "CS2024001", course: "B.Tech CSE", semester: 4, marks: { Mathematics: 92, Physics: 85, Chemistry: 78, English: 88, "Computer Science": 95 }, attendance: { Mathematics: 90, Physics: 85, Chemistry: 92, English: 88, "Computer Science": 96 }, parentName: "Robert Johnson", parentPhone: "+1-555-0101", parentEmail: "robert.j@email.com" },
  { id: 2, name: "Bob Smith", rollNo: "CS2024002", course: "B.Tech CSE", semester: 4, marks: { Mathematics: 78, Physics: 72, Chemistry: 68, English: 82, "Computer Science": 80 }, attendance: { Mathematics: 82, Physics: 78, Chemistry: 75, English: 90, "Computer Science": 88 }, parentName: "Mary Smith", parentPhone: "+1-555-0102", parentEmail: "mary.s@email.com" },
  { id: 3, name: "Carol White", rollNo: "CS2024003", course: "B.Tech CSE", semester: 4, marks: { Mathematics: 65, Physics: 60, Chemistry: 55, English: 70, "Computer Science": 72 }, attendance: { Mathematics: 70, Physics: 65, Chemistry: 60, English: 75, "Computer Science": 78 }, parentName: "James White", parentPhone: "+1-555-0103", parentEmail: "james.w@email.com" },
  { id: 4, name: "David Brown", rollNo: "CS2024004", course: "B.Tech CSE", semester: 4, marks: { Mathematics: 88, Physics: 90, Chemistry: 82, English: 76, "Computer Science": 91 }, attendance: { Mathematics: 95, Physics: 92, Chemistry: 88, English: 80, "Computer Science": 94 }, parentName: "Linda Brown", parentPhone: "+1-555-0104", parentEmail: "linda.b@email.com" },
  { id: 5, name: "Eva Martinez", rollNo: "CS2024005", course: "B.Tech CSE", semester: 4, marks: { Mathematics: 45, Physics: 50, Chemistry: 42, English: 55, "Computer Science": 48 }, attendance: { Mathematics: 55, Physics: 50, Chemistry: 48, English: 60, "Computer Science": 52 }, parentName: "Carlos Martinez", parentPhone: "+1-555-0105", parentEmail: "carlos.m@email.com" },
  { id: 6, name: "Frank Lee", rollNo: "CS2024006", course: "B.Tech CSE", semester: 4, marks: { Mathematics: 95, Physics: 92, Chemistry: 90, English: 94, "Computer Science": 98 }, attendance: { Mathematics: 98, Physics: 96, Chemistry: 94, English: 97, "Computer Science": 99 }, parentName: "Susan Lee", parentPhone: "+1-555-0106", parentEmail: "susan.l@email.com" },
  { id: 7, name: "Grace Kim", rollNo: "CS2024007", course: "B.Tech CSE", semester: 4, marks: { Mathematics: 72, Physics: 68, Chemistry: 74, English: 80, "Computer Science": 76 }, attendance: { Mathematics: 78, Physics: 72, Chemistry: 80, English: 85, "Computer Science": 82 }, parentName: "Daniel Kim", parentPhone: "+1-555-0107", parentEmail: "daniel.k@email.com" },
  { id: 8, name: "Henry Davis", rollNo: "CS2024008", course: "B.Tech CSE", semester: 4, marks: { Mathematics: 58, Physics: 55, Chemistry: 60, English: 62, "Computer Science": 64 }, attendance: { Mathematics: 65, Physics: 60, Chemistry: 68, English: 70, "Computer Science": 72 }, parentName: "Patricia Davis", parentPhone: "+1-555-0108", parentEmail: "patricia.d@email.com" },
];

export const teachers: TeacherRecord[] = [
  { id: 1, name: "Dr. Sarah Wilson", email: "sarah.wilson@college.edu", department: "Computer Science", subjects: ["Computer Science", "Mathematics"] },
  { id: 2, name: "Prof. Michael Chen", email: "michael.chen@college.edu", department: "Physics", subjects: ["Physics"] },
  { id: 3, name: "Dr. Emily Taylor", email: "emily.taylor@college.edu", department: "Chemistry", subjects: ["Chemistry"] },
  { id: 4, name: "Prof. John Anderson", email: "john.anderson@college.edu", department: "English", subjects: ["English"] },
];

export const schedule = {
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  slots: ["9:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "1:00 - 2:00", "2:00 - 3:00"],
  timetable: [
    ["Mathematics", "Physics", "Chemistry", "English", "Computer Science"],
    ["Computer Science", "Mathematics", "Physics", "Chemistry", "English"],
    ["English", "Computer Science", "Mathematics", "Physics", "Chemistry"],
    ["Chemistry", "English", "Computer Science", "Mathematics", "Physics"],
    ["Physics", "Chemistry", "English", "Computer Science", "Mathematics"],
  ],
};

export function getGrade(marks: number): string {
  if (marks >= 90) return "A+";
  if (marks >= 80) return "A";
  if (marks >= 70) return "B";
  if (marks >= 60) return "C";
  if (marks >= 50) return "D";
  return "F";
}

export function getOverallAttendance(student: StudentRecord): number {
  const values = Object.values(student.attendance);
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

export function getOverallMarks(student: StudentRecord): number {
  const values = Object.values(student.marks);
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}
