// app/auth/signin/page.jsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumb';
import { useAuth } from '@/app/context/AuthContext';
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
  const { login } = useAuth();
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
    
    try {
      const loginData = isLoginWithPhone ? formData.phone : formData.email;
      const result = await login(loginData, formData.password);
      
      if (result?.success) {
       // router.push('/account/profile');
       const redirect = new URLSearchParams(window.location.search).get('redirect');
router.push(redirect || '/account/profile');

      } else {
        setErrors({ submit: result?.error || 'Invalid credentials. Please try again.' });
      }
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
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
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

              {errors.submit && (
                <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-700 font-medium">{errors.submit}</p>
                  </div>
                </div>
              )}

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

              <form onSubmit={handleSubmit} className="space-y-5">
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

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    
                  </div>
                </div>

                
              </form>

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








