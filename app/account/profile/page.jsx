// app/account/profile/page.jsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumb';
import { useAuth } from '@/app/context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Save,
  Edit2,
  X,
  Home,
  Building,
  Hash,
  Globe,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  // const { user, updateUser } = useAuth();
  const { user, loading } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });

  useEffect(() => {
  if (!loading && !user) {
    router.push('/auth/signin');
  }

  if (!loading && user) {
    setProfileData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      dateOfBirth: user.dateOfBirth || '',
      address: user.address || '',
      city: user.city || '',
      state: user.state || '',
      zipCode: user.zipCode || '',
      country: user.country || 'India'
    });
  }
}, [user, loading, router]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateUser(profileData);
    setIsEditing(false);
    setIsSaving(false);
    setSaveSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  const handleCancel = () => {
    setProfileData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      dateOfBirth: user.dateOfBirth || '',
      address: user.address || '',
      city: user.city || '',
      state: user.state || '',
      zipCode: user.zipCode || '',
      country: user.country || 'India'
    });
    setIsEditing(false);
  };

if (loading) {
  return <div className="p-10 text-center">Loading...</div>;
}

if (!user) {
  return null;
}


  return (
    <>
      <Navbar />
      
      <Breadcrumbs 
        items={[
          { name: "Home", href: "/" },
          { name: "Account", href: "/account" },
          { name: "Profile", href: null }
        ]}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Success Message */}
          {saveSuccess && (
            <div className="mb-6 animate-fadeIn">
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-green-800">Profile updated successfully!</p>
                  <p className="text-sm text-green-600">Your changes have been saved.</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#8B0035]/10 to-[#F4C430]/10 p-8 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#8B0035] to-[#F4C430] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {user.firstName} {user.lastName}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{user.phone}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Member since {new Date(user.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-70"
                      >
                        {isSaving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Personal Information */}
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 rounded-full bg-[#8B0035]/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-[#8B0035]" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                    </div>

                    <div className="space-y-5">
                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        {isEditing ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <input
                                type="text"
                                name="firstName"
                                value={profileData.firstName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none transition-all text-gray-900 bg-white"
                                placeholder="First Name"
                                style={{ color: 'black' }}
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                name="lastName"
                                value={profileData.lastName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none transition-all text-gray-900 bg-white"
                                placeholder="Last Name"
                                style={{ color: 'black' }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-lg">
                            <p className="text-gray-900 font-medium">{user.firstName} {user.lastName}</p>
                          </div>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email Address
                        </label>
                        {isEditing ? (
                          <div className="relative">
                            <input
                              type="email"
                              name="email"
                              value={profileData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none transition-all text-gray-900 bg-white"
                              style={{ color: 'black' }}
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-lg">
                            <p className="text-gray-900">{user.email}</p>
                          </div>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline mr-2" />
                          Phone Number
                        </label>
                        {isEditing ? (
                          <div className="relative">
                            <input
                              type="tel"
                              name="phone"
                              value={profileData.phone}
                              onChange={handleChange}
                              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none transition-all text-gray-900 bg-white"
                              placeholder="9876543210"
                              style={{ color: 'black' }}
                            />
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-lg">
                            <p className="text-gray-900">{user.phone}</p>
                          </div>
                        )}
                      </div>

                      {/* Date of Birth */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Date of Birth
                        </label>
                        {isEditing ? (
                          <div className="relative">
                            <input
                              type="date"
                              name="dateOfBirth"
                              value={profileData.dateOfBirth}
                              onChange={handleChange}
                              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none transition-all text-gray-900 bg-white"
                              style={{ color: 'black' }}
                            />
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-lg">
                            <p className="text-gray-900">
                              {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              }) : 'Not set'}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Address Information */}
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 rounded-full bg-[#8B0035]/10 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-[#8B0035]" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">Address Information</h2>
                    </div>

                    <div className="space-y-5">
                      {/* Address */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Home className="w-4 h-4 inline mr-2" />
                          Street Address
                        </label>
                        {isEditing ? (
                          <div className="relative">
                            <textarea
                              name="address"
                              value={profileData.address}
                              onChange={handleChange}
                              rows="4"
                              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none transition-all text-gray-900 bg-white resize-none"
                              placeholder="Enter your complete address"
                              style={{ 
                                color: 'black',
                                minHeight: '100px'
                              }}
                            />
                            <Home className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
                          </div>
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-lg min-h-[100px]">
                            <p className="text-gray-900 whitespace-pre-line">
                              {user.address || 'No address saved'}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* City, State, ZIP */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Building className="w-4 h-4 inline mr-2" />
                            City
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="city"
                              value={profileData.city}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none transition-all text-gray-900 bg-white"
                              style={{ color: 'black' }}
                            />
                          ) : (
                            <div className="px-4 py-3 bg-gray-50 rounded-lg">
                              <p className="text-gray-900">{user.city || '—'}</p>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Globe className="w-4 h-4 inline mr-2" />
                            State
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="state"
                              value={profileData.state}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none transition-all text-gray-900 bg-white"
                              style={{ color: 'black' }}
                            />
                          ) : (
                            <div className="px-4 py-3 bg-gray-50 rounded-lg">
                              <p className="text-gray-900">{user.state || '—'}</p>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Hash className="w-4 h-4 inline mr-2" />
                            ZIP Code
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="zipCode"
                              value={profileData.zipCode}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none transition-all text-gray-900 bg-white"
                              style={{ color: 'black' }}
                            />
                          ) : (
                            <div className="px-4 py-3 bg-gray-50 rounded-lg">
                              <p className="text-gray-900">{user.zipCode || '—'}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Country */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        {isEditing ? (
                          <select
                            name="country"
                            value={profileData.country}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none transition-all text-gray-900 bg-white"
                            style={{ color: 'black' }}
                          >
                            <option value="India">India</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                            <option value="Other">Other</option>
                          </select>
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-lg">
                            <p className="text-gray-900">{user.country || 'India'}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link
                    href="/account/orders"
                    className="p-4 bg-gradient-to-r from-[#8B0035]/5 to-[#F4C430]/5 rounded-xl hover:from-[#8B0035]/10 hover:to-[#F4C430]/10 transition-all border border-transparent hover:border-[#8B0035]/20 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="w-6 h-6 bg-[#8B0035] rounded-md"></div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">My Orders</p>
                        <p className="text-xs text-gray-500">View order history</p>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/cart"
                    className="p-4 bg-gradient-to-r from-[#8B0035]/5 to-[#F4C430]/5 rounded-xl hover:from-[#8B0035]/10 hover:to-[#F4C430]/10 transition-all border border-transparent hover:border-[#8B0035]/20 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="w-6 h-6 bg-[#F4C430] rounded-md"></div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">View Cart</p>
                        <p className="text-xs text-gray-500">{user.cartCount || 0} items</p>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/account/settings"
                    className="p-4 bg-gradient-to-r from-[#8B0035]/5 to-[#F4C430]/5 rounded-xl hover:from-[#8B0035]/10 hover:to-[#F4C430]/10 transition-all border border-transparent hover:border-[#8B0035]/20 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="w-6 h-6 bg-[#8B0035] rounded-full"></div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Settings</p>
                        <p className="text-xs text-gray-500">Account preferences</p>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/products"
                    className="p-4 bg-gradient-to-r from-[#8B0035]/5 to-[#F4C430]/5 rounded-xl hover:from-[#8B0035]/10 hover:to-[#F4C430]/10 transition-all border border-transparent hover:border-[#8B0035]/20 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="w-6 h-6 bg-gradient-to-r from-[#8B0035] to-[#F4C430] rounded-md"></div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Shop Now</p>
                        <p className="text-xs text-gray-500">Browse products</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        textarea {
          color: black !important;
        }
        
        input, select {
          color: black !important;
        }
        
        input::placeholder, textarea::placeholder {
          color: #9ca3af !important;
        }
      `}</style>
    </>
  );
}














