






// edpharma-webshop\app\auth\signin\page.jsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumb';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  UserPlus, 
  AlertCircle,
  CheckCircle,
  Smartphone,
  User
} from 'lucide-react';
import Link from 'next/link';

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginWithPhone, setIsLoginWithPhone] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (isLoginWithPhone) {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }
    } else {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, simulate successful login
      console.log('Login attempt with:', formData);
      
      // Redirect to home or dashboard
      router.push('/account/profile');
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLoginMethod = () => {
    setIsLoginWithPhone(!isLoginWithPhone);
    setFormData(prev => ({ ...prev, email: '', phone: '' }));
    setErrors(prev => ({ ...prev, email: '', phone: '' }));
  };

  return (
    <>
      <Navbar />
      
      <Breadcrumbs 
        items={[
          { name: "Home", href: "/" },
          { name: "Account", href: "/account" },
          { name: "Sign In", href: null }
        ]}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Form */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#8B0035]/10 to-[#F4C430]/10 flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-[#8B0035]" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-600">
                  Sign in to access your account and continue shopping
                </p>
              </div>

              {/* Error Message */}
              {errors.submit && (
                <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-700 font-medium">{errors.submit}</p>
                  </div>
                </div>
              )}

              {/* Login Method Toggle */}
              <div className="mb-6">
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setIsLoginWithPhone(false)}
                    className={`flex-1 py-3 text-center font-medium transition-colors ${
                      !isLoginWithPhone
                        ? 'bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsLoginWithPhone(true)}
                    className={`flex-1 py-3 text-center font-medium transition-colors ${
                      isLoginWithPhone
                        ? 'bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      Phone
                    </div>
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email/Phone Field */}
                {isLoginWithPhone ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">+91</span>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        className={`w-full pl-14 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none transition-all ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none transition-all ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                )}

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm text-[#8B0035] hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none transition-all ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#8B0035] border-gray-300 rounded focus:ring-[#8B0035]"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                    Remember me for 30 days
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                  <button
                    type="button"
                    className="py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </button>
                </div>
              </form>

              {/* Sign Up Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    href="/auth/signup"
                    className="text-[#8B0035] font-semibold hover:underline"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </div>

            {/* Right Column - Benefits */}
            <div className="bg-gradient-to-br from-[#8B0035] to-[#6b0028] rounded-2xl shadow-lg p-6 sm:p-8 text-white">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Benefits of Your Account
                </h2>
                <p className="opacity-90">
                  Create an account to enjoy these exclusive benefits and enhance your shopping experience.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Fast Checkout",
                    description: "Save your details for quicker purchases with one-click checkout."
                  },
                  {
                    title: "Order Tracking",
                    description: "Track your orders in real-time and receive delivery updates."
                  },
                  {
                    title: "Wishlist",
                    description: "Save products you love and get notified when they're back in stock."
                  },
                  {
                    title: "Exclusive Offers",
                    description: "Get access to member-only discounts and early access to sales."
                  },
                  {
                    title: "Order History",
                    description: "View and reorder your previous purchases easily."
                  },
                  {
                    title: "Prescription Management",
                    description: "Securely store and manage your prescriptions for easy reordering."
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{benefit.title}</h3>
                      <p className="opacity-90 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="mt-10 pt-8 border-t border-white/20">
                <h3 className="font-semibold text-lg mb-4">Secure & Trusted</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold mb-1">100%</div>
                    <div className="text-xs opacity-90">Secure Payment</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold mb-1">24/7</div>
                    <div className="text-xs opacity-90">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}