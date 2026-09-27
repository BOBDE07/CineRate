import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layout
import MainLayout from './components/layout/MainLayout';

// Route guards
import ProtectedRoute from './routes/ProtectedRoute';
import GuestRoute from './routes/GuestRoute';

// Pages — landing
import LandingPage from './pages/LandingPage';

// Pages — auth
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Pages — app
import SearchPage from './pages/movie/SearchPage';
import MovieDetailPage from './pages/movie/MovieDetailPage';
import MyReviewsPage from './pages/user/MyReviewsPage';
import ProfilePage from './pages/user/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* ── Public landing page — always visible ── */}
          <Route path="/" element={<LandingPage />} />

          {/* ── Guest-only routes (redirect to /search if already logged in) ── */}
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* ── Protected routes (redirect to /login if not logged in) ── */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/search" element={<SearchPage />} />
              <Route path="/movie/:omdbId" element={<MovieDetailPage />} />
              <Route path="/my-reviews" element={<MyReviewsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* ── 404 ── */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
