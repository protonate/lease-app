'use client';

import { useState, FormEvent } from 'react';
import { LeaseFormData } from '@/types';

export default function LeaseForm() {
  const [formData, setFormData] = useState<Partial<LeaseFormData>>({
    ownerName: 'Nathan Wolff',
    ownerPhone: '(917) 407-8610',
    ownerEmail: 'nathan.g.wolff@gmail.com',
    streetAddress: '12821 NW Springville Rd',
    unitName: 'South Room',
    state: 'Oregon',
    zipCode: '97229',
    city: 'Portland',
    startDate: '10/24/2025',
    endDate: '2/28/2025',
    prorationEndDate: '10/31/2025',
    exclusiveSpace: 'South Room',
    rentDueDay: '1st of the month',
    monthlyRentAmount: '1000',
    securityDepositAmount: '1000',
    proratedRentAmount: '258',
    petDepositAmount: '0',
    otherDepositAmount: '0',
    firstMonthRentAmount: '1000',
    totalDueAmount: '2258',
    lateFeeAmount: '60',
    utilityChargeAmount: '80',
    bankName: 'OnPoint',
    accountType: 'Savings',
    bankAddress: '2755 SW Cedar Hills Blvd #100, Beaverton, OR 97005',
    numberOfVehicles: '1',
    specificEntranceInstructions: 'door code provided',
    petsAllowed: 'Yes',
    tamperingFeeAmount: '250.00',
    dishonoredCheckFeeAmount: '35.00',
    lateUtilityFeeAmount: '50.00',
    wasteCleanupFeeAmount: '50.00',
    parkingViolationFeeAmount: '50.00',
    smokingViolationFeeAmount: '250.00',
    unauthorizedPetFeeAmount: '250.00',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Phone number mask function - formats as (XXX) XXX-XXXX
  const formatPhoneNumber = (value: string): string => {
    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length === 0) return '';
    if (phoneNumber.length <= 3) return `(${phoneNumber}`;
    if (phoneNumber.length <= 6) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  // Validate phone number format
  const validatePhoneNumber = (phone: string): boolean => {
    const phoneNumber = phone.replace(/\D/g, '');
    return phoneNumber.length === 10;
  };

  // Validate email address
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate street address - must contain at least a number and street name
  const validateStreetAddress = (address: string): boolean => {
    if (!address || address.trim().length === 0) return false;
    // Basic validation: must contain at least one digit and some letters
    const hasNumber = /\d/.test(address);
    const hasLetters = /[a-zA-Z]/.test(address);
    return hasNumber && hasLetters && address.trim().length >= 5;
  };

  const handleChange = (field: keyof LeaseFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handlePhoneChange = (field: keyof LeaseFormData, value: string) => {
    const formatted = formatPhoneNumber(value);
    handleChange(field, formatted);
  };

  const handleEmailChange = (field: keyof LeaseFormData, value: string) => {
    handleChange(field, value);
    if (value && !validateEmail(value)) {
      setErrors(prev => ({ ...prev, [field]: 'Please enter a valid email address' }));
    }
  };

  const handleStreetAddressChange = (field: keyof LeaseFormData, value: string) => {
    handleChange(field, value);
    if (value && !validateStreetAddress(value)) {
      setErrors(prev => ({ ...prev, [field]: 'Please enter a valid street address (e.g., 123 Main St)' }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    const newErrors: Record<string, string> = {};
    
    if (formData.streetAddress && !validateStreetAddress(formData.streetAddress)) {
      newErrors.streetAddress = 'Please enter a valid street address (e.g., 123 Main St)';
    }
    
    if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    
    if (formData.emailAddress && !validateEmail(formData.emailAddress)) {
      newErrors.emailAddress = 'Please enter a valid email address';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitMessage('Please fix the validation errors before submitting.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage('');
    setErrors({});

    try {
      const response = await fetch('/api/submit-lease', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage('Lease application submitted successfully! The lease document has been sent via email.');
        // Optionally reset form
        // setFormData({});
      } else {
        setSubmitMessage(`Error: ${result.error || 'Failed to submit lease application'}`);
      }
    } catch (error) {
      setSubmitMessage('Error submitting lease application. Please try again.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 px-2 text-gray-900">Springville Farms Fixed-Term Residential Lease Agreement</h1>

      {/* Tenant Information */}
      <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900">Tenant Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Tenant Name 1 *</label>
            <input
              type="text"
              required
              value={formData.tenantName1 || ''}
              onChange={(e) => handleChange('tenantName1', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Tenant Name 2</label>
            <input
              type="text"
              disabled
              value={formData.tenantName2 || ''}
              onChange={(e) => handleChange('tenantName2', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1 text-gray-900">Street Address *</label>
            <input
              type="text"
              required
              disabled
              value={formData.streetAddress || '12821 NW Springville Rd'}
              onChange={(e) => handleStreetAddressChange('streetAddress', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Unit Name</label>
            <input
              type="text"
              disabled
              value={formData.unitName || 'South Room'}
              onChange={(e) => handleChange('unitName', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">City *</label>
            <input
              type="text"
              required
              disabled
              value={formData.city || 'Portland'}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">State *</label>
            <input
              type="text"
              required
              disabled
              value={formData.state || 'Oregon'}
              onChange={(e) => handleChange('state', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Zip Code *</label>
            <input
              type="text"
              required
              disabled
              value={formData.zipCode || '97229'}
              onChange={(e) => handleChange('zipCode', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Phone Number *</label>
            <input
              type="tel"
              required
              value={formData.phoneNumber || ''}
              onChange={(e) => handlePhoneChange('phoneNumber', e.target.value)}
              onBlur={(e) => {
                if (e.target.value && !validatePhoneNumber(e.target.value)) {
                  setErrors(prev => ({ ...prev, phoneNumber: 'Please enter a valid 10-digit phone number' }));
                }
              }}
              maxLength={14}
              className={`w-full px-3 py-2.5 sm:py-2 border-2 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.phoneNumber ? 'border-red-500' : 'border-gray-400'
              }`}
              placeholder="(123) 456-7890"
            />
            {errors.phoneNumber && (
              <p className="text-red-600 text-xs sm:text-sm mt-1 font-medium">{errors.phoneNumber}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Email Address *</label>
            <input
              type="email"
              required
              value={formData.emailAddress || ''}
              onChange={(e) => handleEmailChange('emailAddress', e.target.value)}
              onBlur={(e) => {
                if (e.target.value && !validateEmail(e.target.value)) {
                  setErrors(prev => ({ ...prev, emailAddress: 'Please enter a valid email address' }));
                }
              }}
              className={`w-full px-3 py-2.5 sm:py-2 border-2 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.emailAddress ? 'border-red-500' : 'border-gray-400'
              }`}
              placeholder="example@email.com"
            />
            {errors.emailAddress && (
              <p className="text-red-600 text-xs sm:text-sm mt-1 font-medium">{errors.emailAddress}</p>
            )}
          </div>
        </div>
      </section>

      {/* Lease Term */}
      <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900">Fixed-Term Tenancy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Start Date * (MM/DD/YYYY)</label>
            <input
              type="text"
              required
              disabled
              placeholder="MM/DD/YYYY"
              value={formData.startDate || '10/24/2025'}
              onChange={(e) => handleChange('startDate', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">End Date * (MM/DD/YYYY)</label>
            <input
              type="text"
              required
              disabled
              placeholder="MM/DD/YYYY"
              value={formData.endDate || '2/28/2025'}
              onChange={(e) => handleChange('endDate', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Proration End Date (MM/DD/YYYY)</label>
            <input
              type="text"
              disabled
              placeholder="MM/DD/YYYY"
              value={formData.prorationEndDate || '10/31/2025'}
              onChange={(e) => handleChange('prorationEndDate', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Rent Due Day</label>
            <input
              type="text"
              disabled
              value={formData.rentDueDay || '1st of the month'}
              onChange={(e) => handleChange('rentDueDay', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Exclusive Space</label>
            <input
              type="text"
              disabled
              value={formData.exclusiveSpace || 'South Room'}
              onChange={(e) => handleChange('exclusiveSpace', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
        </div>
      </section>

      {/* Rent and Financial Information */}
      <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900">Rent & Financial Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Monthly Rent Amount * ($)</label>
            <input
              type="text"
              required
              disabled
              placeholder="1200"
              value={formData.monthlyRentAmount || '1000'}
              onChange={(e) => handleChange('monthlyRentAmount', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Prorated Rent Amount ($)</label>
            <input
              type="text"
              disabled
              placeholder="464.52"
              value={formData.proratedRentAmount || '258'}
              onChange={(e) => handleChange('proratedRentAmount', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Security Deposit ($)</label>
            <input
              type="text"
              disabled
              placeholder="1200"
              value={formData.securityDepositAmount || '1000'}
              onChange={(e) => handleChange('securityDepositAmount', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Pet Deposit Amount ($)</label>
            <input
              type="text"
              disabled
              value={formData.petDepositAmount || '0'}
              onChange={(e) => handleChange('petDepositAmount', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Other Deposits ($)</label>
            <input
              type="text"
              disabled
              value={formData.otherDepositAmount || '0'}
              onChange={(e) => handleChange('otherDepositAmount', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">1st Full Month's Rent ($)</label>
            <input
              type="text"
              disabled
              value={formData.firstMonthRentAmount || '1000'}
              onChange={(e) => handleChange('firstMonthRentAmount', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Total Due ($)</label>
            <input
              type="text"
              disabled
              value={formData.totalDueAmount || '2258'}
              onChange={(e) => handleChange('totalDueAmount', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Late Fee Amount ($)</label>
            <input
              type="text"
              disabled
              value={formData.lateFeeAmount || '60'}
              onChange={(e) => handleChange('lateFeeAmount', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Utility Charge Amount ($)</label>
            <input
              type="text"
              disabled
              value={formData.utilityChargeAmount || '80'}
              onChange={(e) => handleChange('utilityChargeAmount', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
        </div>
      </section>

      {/* Bank Information */}
      <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900">Bank Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Bank Name</label>
            <input
              type="text"
              disabled
              value={formData.bankName || 'OnPoint'}
              onChange={(e) => handleChange('bankName', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Account Type</label>
            <input
              type="text"
              disabled
              value={formData.accountType || 'Savings'}
              onChange={(e) => handleChange('accountType', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1 text-gray-900">Bank Address</label>
            <input
              type="text"
              disabled
              value={formData.bankAddress || '2755 SW Cedar Hills Blvd #100, Beaverton, OR 97005'}
              onChange={(e) => handleChange('bankAddress', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900">Emergency Contacts</h2>
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-900">Emergency Contact 1</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-900">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.emergencyContact1Name || ''}
                  onChange={(e) => handleChange('emergencyContact1Name', e.target.value)}
                  className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-900">Relationship *</label>
                <input
                  type="text"
                  required
                  value={formData.relationship1 || ''}
                  onChange={(e) => handleChange('relationship1', e.target.value)}
                  className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1 text-gray-900">Address *</label>
                <input
                  type="text"
                  required
                  value={formData.emergencyContact1Address || ''}
                  onChange={(e) => handleChange('emergencyContact1Address', e.target.value)}
                  className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-900">City *</label>
                <input
                  type="text"
                  required
                  value={formData.emergencyContact1City || ''}
                  onChange={(e) => handleChange('emergencyContact1City', e.target.value)}
                  className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-900">State *</label>
                <input
                  type="text"
                  required
                  value={formData.emergencyContact1State || ''}
                  onChange={(e) => handleChange('emergencyContact1State', e.target.value)}
                  className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-900">Zip Code *</label>
                <input
                  type="text"
                  required
                  value={formData.emergencyContact1Zip || ''}
                  onChange={(e) => handleChange('emergencyContact1Zip', e.target.value)}
                  className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-900">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.emergencyContact1Phone || ''}
                  onChange={(e) => handleChange('emergencyContact1Phone', e.target.value)}
                  className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-900">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.emergencyContact1Email || ''}
                  onChange={(e) => handleChange('emergencyContact1Email', e.target.value)}
                  className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-900">Emergency Contact 2</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-900">Name</label>
                <input
                  type="text"
                  disabled
                  value={formData.emergencyContact2Name || ''}
                  onChange={(e) => handleChange('emergencyContact2Name', e.target.value)}
                  className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-900">Relationship</label>
                <input
                  type="text"
                  disabled
                  value={formData.relationship2 || ''}
                  onChange={(e) => handleChange('relationship2', e.target.value)}
                  className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1 text-gray-900">Address</label>
                <input
                  type="text"
                  disabled
                  value={formData.emergencyContact2Address || ''}
                  onChange={(e) => handleChange('emergencyContact2Address', e.target.value)}
                  className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-900">City</label>
                <input
                  type="text"
                  disabled
                  value={formData.emergencyContact2City || ''}
                  onChange={(e) => handleChange('emergencyContact2City', e.target.value)}
                  className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-900">State</label>
                <input
                  type="text"
                  disabled
                  value={formData.emergencyContact2State || ''}
                  onChange={(e) => handleChange('emergencyContact2State', e.target.value)}
                  className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-900">Zip Code</label>
                <input
                  type="text"
                  disabled
                  value={formData.emergencyContact2Zip || ''}
                  onChange={(e) => handleChange('emergencyContact2Zip', e.target.value)}
                  className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-900">Phone</label>
                <input
                  type="tel"
                  disabled
                  value={formData.emergencyContact2Phone || ''}
                  onChange={(e) => handleChange('emergencyContact2Phone', e.target.value)}
                  className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-900">Email</label>
                <input
                  type="email"
                  disabled
                  value={formData.emergencyContact2Email || ''}
                  onChange={(e) => handleChange('emergencyContact2Email', e.target.value)}
                  className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Information */}
      <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900">Parking / Vehicles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Number of Vehicles Allowed</label>
            <input
              type="text"
              disabled
              value={formData.numberOfVehicles || '1'}
              onChange={(e) => handleChange('numberOfVehicles', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Vehicle Make *</label>
            <input
              type="text"
              required
              value={formData.vehicleMake || ''}
              onChange={(e) => handleChange('vehicleMake', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Vehicle Model *</label>
            <input
              type="text"
              required
              value={formData.vehicleModel || ''}
              onChange={(e) => handleChange('vehicleModel', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Vehicle Year *</label>
            <input
              type="text"
              required
              value={formData.vehicleYear || ''}
              onChange={(e) => handleChange('vehicleYear', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Vehicle Color *</label>
            <input
              type="text"
              required
              value={formData.vehicleColor || ''}
              onChange={(e) => handleChange('vehicleColor', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">License Plate Number *</label>
            <input
              type="text"
              required
              value={formData.licensePlateNumber || ''}
              onChange={(e) => handleChange('licensePlateNumber', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900">Additional Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Specific Entrance Instructions</label>
            <input
              type="text"
              disabled
              value={formData.specificEntranceInstructions || 'door code provided'}
              onChange={(e) => handleChange('specificEntranceInstructions', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Tenant Initials *</label>
            <input
              type="text"
              required
              value={formData.tenantInitials || ''}
              onChange={(e) => handleChange('tenantInitials', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Pets Allowed</label>
            <select
              disabled
              value={formData.petsAllowed || 'Yes'}
              onChange={(e) => handleChange('petsAllowed', e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border-2 border-gray-400 rounded-md bg-gray-200 cursor-not-allowed text-base text-gray-600"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
      </section>

      {/* Submit Button */}
      <div className="flex justify-center px-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3.5 sm:py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-base sm:text-lg font-semibold min-h-[44px] touch-manipulation"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Lease Application'}
        </button>
      </div>

      {submitMessage && (
        <div className={`p-4 rounded-md text-sm sm:text-base font-medium ${submitMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {submitMessage}
        </div>
      )}
    </form>
  );
}

