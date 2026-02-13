




// edpharma-webshop\app\auth\signup\page.jsx
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
  User,
  Smartphone,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  UserPlus,
  Shield
} from 'lucide-react';
import Link from 'next/link';

export default function SignUpPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    newsletter: true
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
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
  const result = await signup(formData);

  // if (result?.success) {
  //   router.push('/account/profile');
  // } else {
  //   setErrors({ submit: 'Signup failed' });
  // }
  if (result?.success) {
  router.push('/account/profile');
} else {
  setErrors({ submit: result?.error || 'Signup failed' });
}

} catch (error) {
  setErrors({ submit: 'Registration failed. Please try again.' });
} finally {
  setIsLoading(false);
}


  };

  return (
    <>
      <Navbar />
      
      <Breadcrumbs 
        items={[
          { name: "Home", href: "/" },
          { name: "Account", href: "/account" },
          { name: "Create Account", href: null }
        ]}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#8B0035]/5 to-[#F4C430]/5 p-6 sm:p-8 border-b border-gray-200">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#8B0035] to-[#F4C430] flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Create Your Account
                </h1>
                <p className="text-gray-600">
                  Join EdPharma for exclusive benefits and personalized experience
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Form */}
                <div>
                  {/* Error Message */}
                  {errors.submit && (
                    <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-red-700 font-medium">{errors.submit}</p>
                      </div>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="w-5 h-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="John"
                            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none transition-all text-gray-900 ${
                              errors.firstName ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                        </div>
                        {errors.firstName && (
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Doe"
                          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none transition-all text-gray-900 ${
                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.lastName && (
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
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
                          className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none transition-all text-gray-900 ${
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

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Smartphone className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="9876543210"
                          className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none transition-all text-gray-900 ${
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

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create a strong password"
                          className={`w-full pl-10 pr-12 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none transition-all text-gray-900 ${
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
                      <div className="mt-2 text-xs text-gray-500">
                        Password must be at least 8 characters with uppercase, lowercase, and numbers.
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                          className={`w-full pl-10 pr-12 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none transition-all text-gray-900 ${
                            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5 text-gray-400" />
                          ) : (
                            <Eye className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="acceptTerms"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          className="w-4 h-4 text-[#8B0035] border-gray-300 rounded focus:ring-[#8B0035] mt-1"
                        />
                        <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-700">
                          I agree to the{' '}
                          <Link href="/terms" className="text-[#8B0035] hover:underline">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link href="/privacy" className="text-[#8B0035] hover:underline">
                            Privacy Policy
                          </Link>
                          *
                        </label>
                      </div>
                      {errors.acceptTerms && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.acceptTerms}
                        </p>
                      )}

                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="newsletter"
                          name="newsletter"
                          checked={formData.newsletter}
                          onChange={handleChange}
                          className="w-4 h-4 text-[#8B0035] border-gray-300 rounded focus:ring-[#8B0035] mt-1"
                        />
                        <label htmlFor="newsletter" className="ml-2 text-sm text-gray-700">
                          Subscribe to our newsletter for updates and offers
                        </label>
                      </div>
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
                          Creating Account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    {/* Sign In Link */}
                    <div className="text-center pt-4">
                      <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link
                          href="/auth/signin"
                          className="text-[#8B0035] font-semibold hover:underline"
                        >
                          Sign In
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>

                {/* Right Column - Benefits */}
                <div className="lg:pl-8 lg:border-l border-gray-200">
                  <div className="bg-gradient-to-br from-[#8B0035]/5 to-[#F4C430]/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Why Create an Account?
                    </h3>
                    
                    <div className="space-y-4">
                      {[
                        {
                          title: "Prescription Management",
                          description: "Securely upload and manage your prescriptions for easy refills."
                        },
                        {
                          title: "Fast Reordering",
                          description: "Reorder your medications with just one click from order history."
                        },
                        {
                          title: "Health Reminders",
                          description: "Set reminders for medication schedules and refills."
                        },
                        {
                          title: "Doctor Consultations",
                          description: "Access licensed healthcare professionals for consultations."
                        },
                        {
                          title: "Lab Test Booking",
                          description: "Book diagnostic tests and view results online."
                        },
                        {
                          title: "Insurance Support",
                          description: "Manage insurance claims and reimbursement."
                        }
                      ].map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#8B0035]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-4 h-4 text-[#8B0035]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                            <p className="text-sm text-gray-600">{benefit.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Security Info */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="w-5 h-5 text-green-500" />
                        <span className="font-semibold text-gray-900">Your data is secure with us</span>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• HIPAA compliant data storage</li>
                        <li>• End-to-end encryption</li>
                        <li>• GDPR compliant</li>
                        <li>• Regular security audits</li>
                      </ul>
                    </div>
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