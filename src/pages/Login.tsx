import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Eye, EyeOff, Gift, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const Login = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '', remember: false });
  const [registerData, setRegisterData] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '', consent: false,
    _h: '' // honeypot
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', { email: loginData.email, remember: loginData.remember });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData._h) return; // honeypot check
    if (registerData.password !== registerData.confirmPassword) return;
    console.log('Registration submitted:', { email: registerData.email, name: `${registerData.firstName} ${registerData.lastName}` });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-amber-50/30">
      <div className="container-luxury section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Branding */}
            <ScrollReveal direction="left">
              <div className="hidden lg:block">
                <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6">
                  Welcome to<br />
                  <span className="text-gradient-gold">Amaluna Resorts</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 font-body">
                  Sign in to manage your bookings, earn loyalty points, and unlock exclusive member benefits.
                </p>

                {/* Loyalty teaser */}
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-6">
                  <div className="flex items-center mb-3">
                    <Gift className="h-6 w-6 text-amber-600 mr-2" />
                    <h3 className="font-heading font-semibold text-gray-900 text-lg">Amaluna Rewards</h3>
                  </div>
                  <p className="text-gray-600 font-body mb-4">
                    Earn points on every booking and visit. Redeem for free pool tickets, room upgrades, and dining discounts.
                  </p>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-white rounded-xl p-3">
                      <div className="text-2xl font-bold text-amber-600">1pt</div>
                      <div className="text-xs text-gray-500">per LKR 100</div>
                    </div>
                    <div className="bg-white rounded-xl p-3">
                      <div className="text-2xl font-bold text-amber-600">500</div>
                      <div className="text-xs text-gray-500">sign-up bonus</div>
                    </div>
                    <div className="bg-white rounded-xl p-3">
                      <div className="text-2xl font-bold text-amber-600">2x</div>
                      <div className="text-xs text-gray-500">birthday points</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right side - Form */}
            <ScrollReveal direction="right">
              <div className="bg-white rounded-3xl shadow-luxury-lg p-8 md:p-10">
                {/* Mobile heading */}
                <div className="lg:hidden text-center mb-6">
                  <h1 className="text-2xl font-heading font-bold text-gray-900">Welcome Back</h1>
                </div>

                {/* Tab Switcher */}
                <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
                  <button
                    onClick={() => setActiveTab('login')}
                    className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                      activeTab === 'login'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setActiveTab('register')}
                    className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                      activeTab === 'register'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Register
                  </button>
                </div>

                {/* Login Form */}
                {activeTab === 'login' && (
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={loginData.email}
                          onChange={e => setLoginData(p => ({ ...p, email: e.target.value }))}
                          className="input-luxury pl-12"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={loginData.password}
                          onChange={e => setLoginData(p => ({ ...p, password: e.target.value }))}
                          className="input-luxury pl-12 pr-12"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={loginData.remember}
                          onChange={e => setLoginData(p => ({ ...p, remember: e.target.checked }))}
                          className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded mr-2"
                        />
                        Remember me
                      </label>
                      <button type="button" className="text-sm text-amber-600 hover:text-amber-700 font-medium">
                        Forgot password?
                      </button>
                    </div>

                    <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                      Sign In <ArrowRight className="h-4 w-4" />
                    </button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-4 bg-white text-sm text-gray-500">or continue with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                        <span className="text-sm font-medium text-gray-700">Google</span>
                      </button>
                      <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        <span className="text-sm font-medium text-gray-700">Facebook</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Register Form */}
                {activeTab === 'register' && (
                  <form onSubmit={handleRegister} className="space-y-4">
                    {/* Honeypot - hidden from users */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={registerData._h}
                        onChange={e => setRegisterData(p => ({ ...p, _h: e.target.value }))}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            required
                            value={registerData.firstName}
                            onChange={e => setRegisterData(p => ({ ...p, firstName: e.target.value }))}
                            className="input-luxury pl-12"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          required
                          value={registerData.lastName}
                          onChange={e => setRegisterData(p => ({ ...p, lastName: e.target.value }))}
                          className="input-luxury"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={registerData.email}
                          onChange={e => setRegisterData(p => ({ ...p, email: e.target.value }))}
                          className="input-luxury pl-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          required
                          value={registerData.phone}
                          onChange={e => setRegisterData(p => ({ ...p, phone: e.target.value }))}
                          className="input-luxury pl-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          minLength={8}
                          value={registerData.password}
                          onChange={e => setRegisterData(p => ({ ...p, password: e.target.value }))}
                          className="input-luxury pl-12 pr-12"
                          placeholder="Min 8 characters"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                      <input
                        type="password"
                        required
                        value={registerData.confirmPassword}
                        onChange={e => setRegisterData(p => ({ ...p, confirmPassword: e.target.value }))}
                        className="input-luxury"
                      />
                      {registerData.confirmPassword && registerData.password !== registerData.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                      )}
                    </div>

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        required
                        checked={registerData.consent}
                        onChange={e => setRegisterData(p => ({ ...p, consent: e.target.checked }))}
                        className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 text-sm text-gray-600">
                        I agree to the <a href="/terms" className="text-amber-600 hover:underline">Terms & Conditions</a> and{' '}
                        <a href="/privacy-policy" className="text-amber-600 hover:underline">Privacy Policy</a>.
                      </label>
                    </div>

                    <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                      Create Account <ArrowRight className="h-4 w-4" />
                    </button>

                    <div className="text-center">
                      <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                        <Gift className="h-4 w-4 text-amber-600" />
                        Earn 500 bonus points when you sign up!
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
