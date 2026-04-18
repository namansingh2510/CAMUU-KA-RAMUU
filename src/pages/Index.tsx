import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { RoleLayout } from "@/components/layout/RoleLayout";

// Student pages
import StudentDashboard from "./student/StudentDashboard";
import StudentAttendance from "./student/StudentAttendance";
import StudentMarks from "./student/StudentMarks";
import StudentFeedback from "./student/StudentFeedback";
import StudentSchedule from "./student/StudentSchedule";
import StudentProfile from "./student/StudentProfile";

// Teacher pages
import TeacherDashboard from "./teacher/TeacherDashboard";
import TeacherStudentRecords from "./teacher/TeacherStudentRecords";
import TeacherAttendance from "./teacher/TeacherAttendance";
import TeacherMarks from "./teacher/TeacherMarks";
import TeacherParentDetails from "./teacher/TeacherParentDetails";
import TeacherSchedule from "./teacher/TeacherSchedule";

// Admin pages
import AdminDashboard from "./admin/AdminDashboard";
import ManageStudents from "./admin/ManageStudents";
import ManageTeachers from "./admin/ManageTeachers";
import AdminReports from "./admin/AdminReports";
import AdminSchedule from "./admin/AdminSchedule";
import AllRecords from "./admin/AllRecords";

function StudentRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<StudentDashboard />} />
      <Route path="attendance" element={<StudentAttendance />} />
      <Route path="marks" element={<StudentMarks />} />
      <Route path="feedback" element={<StudentFeedback />} />
      <Route path="schedule" element={<StudentSchedule />} />
      <Route path="profile" element={<StudentProfile />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function TeacherRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<TeacherDashboard />} />
      <Route path="student-records" element={<TeacherStudentRecords />} />
      <Route path="attendance-manage" element={<TeacherAttendance />} />
      <Route path="marks-manage" element={<TeacherMarks />} />
      <Route path="parent-details" element={<TeacherParentDetails />} />
      <Route path="schedule" element={<TeacherSchedule />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="manage-students" element={<ManageStudents />} />
      <Route path="manage-teachers" element={<ManageTeachers />} />
      <Route path="reports" element={<AdminReports />} />
      <Route path="schedule-manage" element={<AdminSchedule />} />
      <Route path="all-records" element={<AllRecords />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function Index() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <RoleLayout>
      {user.role === "student" && <StudentRoutes />}
      {user.role === "teacher" && <TeacherRoutes />}
      {user.role === "admin" && <AdminRoutes />}
    </RoleLayout>
  );
}
