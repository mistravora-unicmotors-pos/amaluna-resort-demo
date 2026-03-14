import { Link } from 'react-router-dom';
import { Home, Compass, ArrowLeft, Phone, MapPin } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] px-4 py-14 md:py-20">
      <div className="pointer-events-none absolute -top-24 -left-12 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-orange-500/15 blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 lg:flex-row lg:items-stretch">
        <div className="w-full max-w-xl text-white lg:pt-8">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em]">
            Lost in Amaluna
          </p>
          <h1 className="text-5xl font-heading font-bold leading-tight md:text-7xl">
            404
          </h1>
          <h2 className="mt-2 text-2xl font-heading font-semibold text-white/95 md:text-3xl">Page Not Found</h2>
          <p className="mt-5 max-w-md text-white/75 font-body">
            This path drifted off-course. Jump back to the resort and keep exploring your next stay.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link to="/" className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
              <Home className="h-4 w-4" /> Back to Home
            </Link>
            <Link to="/rooms" className="border border-white/40 text-white hover:bg-white hover:text-slate-900 px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center">
              <ArrowLeft className="h-4 w-4" /> View Rooms
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-white/70">
            <a href="tel:+94312230000" className="flex items-center gap-2 hover:text-amber-300 transition-colors">
              <Phone className="h-4 w-4" /> +94 31 223 0000
            </a>
            <Link to="/contact" className="flex items-center gap-2 hover:text-amber-300 transition-colors">
              <MapPin className="h-4 w-4" /> Contact Us
            </Link>
          </div>
        </div>

        <div className="w-full max-w-lg [perspective:1400px]">
          <div className="relative h-[420px] animate-float [transform-style:preserve-3d]">
            <div className="absolute inset-0 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl [transform:rotateY(-12deg)_rotateX(8deg)]" />
            <div className="absolute left-6 right-6 top-10 rounded-2xl border border-white/30 bg-gradient-to-br from-white/20 to-white/5 p-6 [transform:translateZ(70px)]">
              <div className="flex items-center justify-between text-white/85">
                <p className="text-sm uppercase tracking-widest">Navigation Beacon</p>
                <Compass className="h-5 w-5 text-amber-300" />
              </div>
              <div className="mt-6 rounded-xl bg-slate-950/50 p-5">
                <p className="text-white text-sm">Current Coordinates</p>
                <p className="mt-2 text-2xl font-heading font-bold text-amber-300">404.000</p>
                <p className="mt-3 text-white/70 text-sm">Route unavailable. Redirecting to safe resort paths.</p>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  { name: 'Offers', path: '/offers' },
                  { name: 'Dining', path: '/dining' },
                  { name: 'Pool', path: '/pool' },
                  { name: 'Gallery', path: '/gallery' },
                ].map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-center text-sm text-white/90 transition-all duration-200 hover:bg-white/20"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="absolute -right-5 bottom-8 h-24 w-24 rounded-2xl border border-cyan-300/50 bg-cyan-400/20 backdrop-blur-md [transform:translateZ(110px)_rotate(12deg)]" />
            <div className="absolute -left-4 top-20 h-14 w-14 rounded-xl border border-amber-300/40 bg-amber-300/20 backdrop-blur-md [transform:translateZ(90px)_rotate(-10deg)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
