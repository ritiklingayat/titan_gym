import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout.jsx';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Plans from '../pages/Plans.jsx';
import FeeStructure from '../pages/FeeStructure.jsx';
import Programs from '../pages/Programs.jsx';
import Trainers from '../pages/Trainers.jsx';
import Gallery from '../pages/Gallery.jsx';
import Contact from '../pages/Contact.jsx';
import AdminLogin from '../pages/AdminLogin.jsx';
import AdminDashboard from '../pages/AdminDashboard.jsx';
import Members from '../pages/Members.jsx';
import PaymentsAdmin from '../pages/PaymentsAdmin.jsx';
import Enquiries from '../pages/Enquiries.jsx';
import TrainersManagement from '../pages/TrainersManagement.jsx';
import NotFound from '../pages/NotFound.jsx';
import RequireAdmin from '../components/auth/RequireAdmin.jsx';

const Public = ({ children }) => <PublicLayout>{children}</PublicLayout>;

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Public><Home /></Public>} />
      <Route path="/about" element={<Public><About /></Public>} />
      <Route path="/plans" element={<Public><Plans /></Public>} />
      <Route path="/fee-structure" element={<Public><FeeStructure /></Public>} />
      <Route path="/programs" element={<Public><Programs /></Public>} />
      <Route path="/trainers" element={<Public><Trainers /></Public>} />
      <Route path="/gallery" element={<Public><Gallery /></Public>} />
      <Route path="/contact" element={<Public><Contact /></Public>} />

      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
      <Route path="/admin/members" element={<RequireAdmin><Members /></RequireAdmin>} />
      <Route path="/admin/payments" element={<RequireAdmin><PaymentsAdmin /></RequireAdmin>} />
      <Route path="/admin/enquiries" element={<RequireAdmin><Enquiries /></RequireAdmin>} />
      <Route path="/admin/trainers" element={<RequireAdmin><TrainersManagement /></RequireAdmin>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
