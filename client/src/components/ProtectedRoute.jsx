import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import api from '../services/api';

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const isGuest = localStorage.getItem('auditflow_guest_mode') === 'true';

  useEffect(() => {
    const syncUserToPostgres = async () => {
      try {
        if (isGuest) {
          await api.post('/api/auth/sync', {
            userId: 'guest-evaluator',
            email: 'evaluator@auditflow.ai',
            fullName: 'Guest Evaluator',
            role: 'evaluator'
          });
          return;
        }

        if (isSignedIn && user) {
          const email = user.primaryEmailAddress?.emailAddress || '';
          const fullName = user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim();
          await api.post('/api/auth/sync', {
            userId: user.id,
            email,
            fullName,
            role: 'user'
          });
        }
      } catch (err) {
        console.warn('Postgres user sync warning:', err.message);
      }
    };

    if (isGuest || (isLoaded && isSignedIn)) {
      syncUserToPostgres();
    }
  }, [isGuest, isLoaded, isSignedIn, user]);

  if (isGuest) {
    return children;
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] text-[#111111]">
        <div className="text-xl font-bold font-mono tracking-wider animate-pulse">Initializing Auditflow Secure Session...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
