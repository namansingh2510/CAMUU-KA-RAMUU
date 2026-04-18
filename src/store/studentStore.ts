import { useState } from "react";

export interface Student {
  id: number;
  name: string;
  marks: number;
  rating: number;
}

const initialStudents: Student[] = [
  { id: 1, name: "Alice Johnson", marks: 92, rating: 5 },
  { id: 2, name: "Bob Smith", marks: 78, rating: 4 },
  { id: 3, name: "Carol White", marks: 65, rating: 3 },
  { id: 4, name: "David Brown", marks: 88, rating: 4 },
  { id: 5, name: "Eva Martinez", marks: 45, rating: 2 },
  { id: 6, name: "Frank Lee", marks: 95, rating: 5 },
  { id: 7, name: "Grace Kim", marks: 72, rating: 3 },
  { id: 8, name: "Henry Davis", marks: 58, rating: 2 },
];

export function useStudents() {
  const [students, setStudents] = useState<Student[]>(initialStudents);

  const addStudent = (name: string, marks: number, rating: number) => {
    setStudents((prev) => [
      ...prev,
      { id: Date.now(), name, marks, rating },
    ]);
  };

  const totalStudents = students.length;
  const averageMarks = totalStudents > 0 ? Math.round(students.reduce((s, st) => s + st.marks, 0) / totalStudents) : 0;
  const highestScore = totalStudents > 0 ? Math.max(...students.map((s) => s.marks)) : 0;
  const lowestScore = totalStudents > 0 ? Math.min(...students.map((s) => s.marks)) : 0;

  return { students, addStudent, totalStudents, averageMarks, highestScore, lowestScore };
}
