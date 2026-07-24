import { Navigate } from 'react-router-dom';
import { isAdminAuthed } from '../../utils/auth.js';

export default function RequireAdmin({ children }) {
  if (!isAdminAuthed()) return <Navigate to="/admin" replace />;
  return children;
}
