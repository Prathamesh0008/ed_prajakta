// edpharma-webshop/app/account/profile/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumb';
import { 
  User, 
  Mail, 
  Smartphone, 
  MapPin, 
  Calendar,
  Shield,
  Package,
  Heart,
  CreditCard,
  Bell,
  Settings,
  Edit2,
  Save,
  X,
  Camera,
  CheckCircle
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, updateUser, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfBirth: ''
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [loading, isAuthenticated, router]);

  // Initialize edit form with user data
  useEffect(() => {
    if (user) {
      setEditForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zipCode || '',
        dateOfBirth: user.dateOfBirth || ''
      });
    }
  }, [user]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      // In a real app, you would make an API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateUser(editForm);
      setIsEditing(false);
      setSavedSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditForm({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      city: user.city || '',
      state: user.state || '',
      zipCode: user.zipCode || '',
      dateOfBirth: user.dateOfBirth || ''
    });
    setIsEditing(false);
  };

  const getUserInitials = () => {
    if (!user) return "";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getUserFullName = () => {
    if (!user) return "";
    return `${user.firstName || ''} ${user.lastName || ''}`.trim();
  };

  const profileSections = [
    {
      title: "Orders",
      icon: <Package className="w-5 h-5" />,
      description: "Track & manage your orders",
      count: 0,
      href: "/account/orders"
    },
    {
      title: "Wishlist",
      icon: <Heart className="w-5 h-5" />,
      description: "Your saved items",
      count: 0,
      href: "/account/wishlist"
    },
    {
      title: "Payments",
      icon: <CreditCard className="w-5 h-5" />,
      description: "Manage payment methods",
      count: 0,
      href: "/account/payments"
    },
    {
      title: "Notifications",
      icon: <Bell className="w-5 h-5" />,
      description: "Configure alerts",
      count: 0,
      href: "/account/notifications"
    },
    {
      title: "Security",
      icon: <Shield className="w-5 h-5" />,
      description: "Privacy & security settings",
      count: 0,
      href: "/account/security"
    },
    {
      title: "Settings",
      icon: <Settings className="w-5 h-5" />,
      description: "Account preferences",
      count: 0,
      href: "/account/settings"
    }
  ];

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#8B0035] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
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
        <div className="max-w-7xl mx-auto px-4">
          {/* Success Message */}
          {savedSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 animate-slideDown">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium text-green-800">Profile updated successfully!</p>
                <p className="text-sm text-green-600">Your changes have been saved.</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Overview */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-[#8B0035] to-[#6b0028] p-6 sm:p-8 text-white">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
                        {getUserInitials()}
                      </div>
                      {isEditing && (
                        <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
                          <Camera className="w-5 h-5 text-gray-700" />
                        </button>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                            {getUserFullName() || "Your Profile"}
                          </h1>
                          <p className="opacity-90">Welcome back to your EdPharma account</p>
                        </div>
                        
                        <button
                          onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-white text-[#8B0035] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          {isEditing ? (
                            <>
                              <Save className="w-4 h-4" />
                              Save Changes
                            </>
                          ) : (
                            <>
                              <Edit2 className="w-4 h-4" />
                              Edit Profile
                            </>
                          )}
                        </button>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm">Active Member</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 opacity-80" />
                          <span className="text-sm">
                            Joined {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="p-6 sm:p-8">
                  {isEditing ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={editForm.firstName}
                            onChange={handleEditChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={editForm.lastName}
                            onChange={handleEditChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none text-gray-900"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="email"
                            name="email"
                            value={editForm.email}
                            onChange={handleEditChange}
                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none text-gray-900"
                          />
                          <span className="px-3 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-lg">
                            Verified
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={editForm.phone}
                          onChange={handleEditChange}
                          placeholder="+91 9876543210"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none text-gray-900"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={editForm.dateOfBirth}
                          onChange={handleEditChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none text-gray-900"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={editForm.city}
                            onChange={handleEditChange}
                            placeholder="Enter your city"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={editForm.state}
                            onChange={handleEditChange}
                            placeholder="Enter your state"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none text-gray-900"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <textarea
                          name="address"
                          value={editForm.address}
                          onChange={handleEditChange}
                          rows="3"
                          placeholder="Enter your full address"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none text-gray-900 resize-none"
                        />
                      </div>

                      <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <button
                          onClick={handleSaveProfile}
                          className="px-6 py-3 bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          Save Changes
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                          <div className="w-10 h-10 rounded-full bg-[#8B0035]/10 flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-[#8B0035]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-700">Full Name</h3>
                            <p className="text-gray-900">{getUserFullName() || "Not set"}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                          <div className="w-10 h-10 rounded-full bg-[#8B0035]/10 flex items-center justify-center flex-shrink-0">
                            <Mail className="w-5 h-5 text-[#8B0035]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-700">Email Address</h3>
                            <p className="text-gray-900">{user.email || "Not set"}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                          <div className="w-10 h-10 rounded-full bg-[#8B0035]/10 flex items-center justify-center flex-shrink-0">
                            <Smartphone className="w-5 h-5 text-[#8B0035]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-700">Phone Number</h3>
                            <p className="text-gray-900">{user.phone || "Not set"}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                          <div className="w-10 h-10 rounded-full bg-[#8B0035]/10 flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-5 h-5 text-[#8B0035]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-700">Date of Birth</h3>
                            <p className="text-gray-900">
                              {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : "Not set"}
                            </p>
                          </div>
                        </div>

                        {user.address && (
                          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg md:col-span-2">
                            <div className="w-10 h-10 rounded-full bg-[#8B0035]/10 flex items-center justify-center flex-shrink-0">
                              <MapPin className="w-5 h-5 text-[#8B0035]" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-700">Address</h3>
                              <p className="text-gray-900">{user.address}</p>
                              {(user.city || user.state || user.zipCode) && (
                                <p className="text-gray-600 text-sm mt-1">
                                  {[user.city, user.state, user.zipCode].filter(Boolean).join(', ')}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Quick Links & Stats */}
            <div className="space-y-6">
              {/* Account Overview */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Account Overview</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-[#8B0035]/5 to-[#F4C430]/5 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">0</div>
                    <div className="text-sm text-gray-600">Orders</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#8B0035]/5 to-[#F4C430]/5 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">0</div>
                    <div className="text-sm text-gray-600">Wishlist</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">Account Level</span>
                      <span className="px-2 py-1 bg-[#8B0035] text-white text-xs font-medium rounded">
                        Member
                      </span>
                    </div>
                  </button>
                  
                  <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">Loyalty Points</span>
                      <span className="font-bold text-[#8B0035]">0</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  {profileSections.map((section, index) => (
                    <button
                      key={index}
                      onClick={() => router.push(section.href)}
                      className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#8B0035]/10 flex items-center justify-center mb-2 group-hover:bg-[#8B0035]/20 transition-colors">
                        {section.icon}
                      </div>
                      <span className="font-medium text-gray-900 text-sm">{section.title}</span>
                      <span className="text-xs text-gray-500 mt-1">{section.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Health Info */}
              <div className="bg-gradient-to-br from-[#8B0035] to-[#6b0028] rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6" />
                  <h3 className="text-lg font-bold">Health Profile</h3>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full text-left p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <div className="flex items-center justify-between">
                      <span>Prescriptions</span>
                      <span className="text-sm opacity-80">Manage</span>
                    </div>
                  </button>
                  
                  <button className="w-full text-left p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <div className="flex items-center justify-between">
                      <span>Medical History</span>
                      <span className="text-sm opacity-80">View</span>
                    </div>
                  </button>
                  
                  <button className="w-full text-left p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <div className="flex items-center justify-between">
                      <span>Allergies</span>
                      <span className="text-sm opacity-80">Update</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
}