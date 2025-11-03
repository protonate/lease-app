'use client';

import { useState, FormEvent } from 'react';
import { LeaseFormData } from '@/types';

export default function LeaseForm() {
  const [formData, setFormData] = useState<Partial<LeaseFormData>>({
    ownerName: 'Nathan Wolff',
    ownerPhone: '(917) 407-8610',
    ownerEmail: 'nathan.g.wolff@gmail.com',
    state: 'Oregon',
    zipCode: '97229',
    city: 'Portland',
    rentDueDay: '1st',
    tamperingFeeAmount: '250.00',
    dishonoredCheckFeeAmount: '35.00',
    lateUtilityFeeAmount: '50.00',
    wasteCleanupFeeAmount: '50.00',
    parkingViolationFeeAmount: '50.00',
    smokingViolationFeeAmount: '250.00',
    unauthorizedPetFeeAmount: '250.00',
    petsAllowed: 'No',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (field: keyof LeaseFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

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
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Oregon Fixed-Term Residential Lease Agreement</h1>

      {/* Tenant Information */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Tenant Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tenant Name 1 *</label>
            <input
              type="text"
              required
              value={formData.tenantName1 || ''}
              onChange={(e) => handleChange('tenantName1', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tenant Name 2</label>
            <input
              type="text"
              value={formData.tenantName2 || ''}
              onChange={(e) => handleChange('tenantName2', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Street Address *</label>
            <input
              type="text"
              required
              value={formData.streetAddress || ''}
              onChange={(e) => handleChange('streetAddress', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Unit Name</label>
            <input
              type="text"
              value={formData.unitName || ''}
              onChange={(e) => handleChange('unitName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City *</label>
            <input
              type="text"
              required
              value={formData.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">State *</label>
            <input
              type="text"
              required
              value={formData.state || ''}
              onChange={(e) => handleChange('state', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Zip Code *</label>
            <input
              type="text"
              required
              value={formData.zipCode || ''}
              onChange={(e) => handleChange('zipCode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number *</label>
            <input
              type="tel"
              required
              value={formData.phoneNumber || ''}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={formData.emailAddress || ''}
              onChange={(e) => handleChange('emailAddress', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </section>

      {/* Lease Term */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Fixed-Term Tenancy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date * (MM/DD/YYYY)</label>
            <input
              type="text"
              required
              placeholder="MM/DD/YYYY"
              value={formData.startDate || ''}
              onChange={(e) => handleChange('startDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date * (MM/DD/YYYY)</label>
            <input
              type="text"
              required
              placeholder="MM/DD/YYYY"
              value={formData.endDate || ''}
              onChange={(e) => handleChange('endDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Proration End Date (MM/DD/YYYY)</label>
            <input
              type="text"
              placeholder="MM/DD/YYYY"
              value={formData.prorationEndDate || ''}
              onChange={(e) => handleChange('prorationEndDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rent Due Day</label>
            <input
              type="text"
              value={formData.rentDueDay || '1st'}
              onChange={(e) => handleChange('rentDueDay', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Exclusive Space (e.g., East Bedroom)</label>
            <input
              type="text"
              value={formData.exclusiveSpace || ''}
              onChange={(e) => handleChange('exclusiveSpace', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </section>

      {/* Rent and Financial Information */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Rent & Financial Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Monthly Rent Amount * ($)</label>
            <input
              type="text"
              required
              placeholder="1200"
              value={formData.monthlyRentAmount || ''}
              onChange={(e) => handleChange('monthlyRentAmount', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Prorated Rent Amount ($)</label>
            <input
              type="text"
              placeholder="464.52"
              value={formData.proratedRentAmount || ''}
              onChange={(e) => handleChange('proratedRentAmount', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Security Deposit ($)</label>
            <input
              type="text"
              placeholder="1200"
              value={formData.securityDepositAmount || ''}
              onChange={(e) => handleChange('securityDepositAmount', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pet Deposit Amount ($)</label>
            <input
              type="text"
              placeholder="0"
              value={formData.petDepositAmount || ''}
              onChange={(e) => handleChange('petDepositAmount', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Other Deposits ($)</label>
            <input
              type="text"
              placeholder="0"
              value={formData.otherDepositAmount || '0'}
              onChange={(e) => handleChange('otherDepositAmount', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">1st Full Month's Rent ($)</label>
            <input
              type="text"
              placeholder="1200"
              value={formData.firstMonthRentAmount || ''}
              onChange={(e) => handleChange('firstMonthRentAmount', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Total Due ($)</label>
            <input
              type="text"
              placeholder="2864.52"
              value={formData.totalDueAmount || ''}
              onChange={(e) => handleChange('totalDueAmount', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Late Fee Amount ($)</label>
            <input
              type="text"
              placeholder="60"
              value={formData.lateFeeAmount || ''}
              onChange={(e) => handleChange('lateFeeAmount', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Utility Charge Amount ($)</label>
            <input
              type="text"
              placeholder="160.00"
              value={formData.utilityChargeAmount || ''}
              onChange={(e) => handleChange('utilityChargeAmount', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </section>

      {/* Bank Information */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Bank Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Bank Name</label>
            <input
              type="text"
              value={formData.bankName || ''}
              onChange={(e) => handleChange('bankName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Account Type</label>
            <input
              type="text"
              placeholder="Savings"
              value={formData.accountType || ''}
              onChange={(e) => handleChange('accountType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Bank Address</label>
            <input
              type="text"
              value={formData.bankAddress || ''}
              onChange={(e) => handleChange('bankAddress', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Emergency Contacts</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Emergency Contact 1</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={formData.emergencyContact1Name || ''}
                  onChange={(e) => handleChange('emergencyContact1Name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Relationship</label>
                <input
                  type="text"
                  value={formData.relationship1 || ''}
                  onChange={(e) => handleChange('relationship1', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  value={formData.emergencyContact1Address || ''}
                  onChange={(e) => handleChange('emergencyContact1Address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  value={formData.emergencyContact1City || ''}
                  onChange={(e) => handleChange('emergencyContact1City', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <input
                  type="text"
                  value={formData.emergencyContact1State || ''}
                  onChange={(e) => handleChange('emergencyContact1State', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Zip Code</label>
                <input
                  type="text"
                  value={formData.emergencyContact1Zip || ''}
                  onChange={(e) => handleChange('emergencyContact1Zip', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.emergencyContact1Phone || ''}
                  onChange={(e) => handleChange('emergencyContact1Phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={formData.emergencyContact1Email || ''}
                  onChange={(e) => handleChange('emergencyContact1Email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Emergency Contact 2</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={formData.emergencyContact2Name || ''}
                  onChange={(e) => handleChange('emergencyContact2Name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Relationship</label>
                <input
                  type="text"
                  value={formData.relationship2 || ''}
                  onChange={(e) => handleChange('relationship2', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  value={formData.emergencyContact2Address || ''}
                  onChange={(e) => handleChange('emergencyContact2Address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  value={formData.emergencyContact2City || ''}
                  onChange={(e) => handleChange('emergencyContact2City', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <input
                  type="text"
                  value={formData.emergencyContact2State || ''}
                  onChange={(e) => handleChange('emergencyContact2State', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Zip Code</label>
                <input
                  type="text"
                  value={formData.emergencyContact2Zip || ''}
                  onChange={(e) => handleChange('emergencyContact2Zip', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.emergencyContact2Phone || ''}
                  onChange={(e) => handleChange('emergencyContact2Phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={formData.emergencyContact2Email || ''}
                  onChange={(e) => handleChange('emergencyContact2Email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Information */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Parking / Vehicles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Number of Vehicles Allowed</label>
            <input
              type="text"
              value={formData.numberOfVehicles || '1'}
              onChange={(e) => handleChange('numberOfVehicles', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Vehicle Make</label>
            <input
              type="text"
              value={formData.vehicleMake || ''}
              onChange={(e) => handleChange('vehicleMake', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Vehicle Model</label>
            <input
              type="text"
              value={formData.vehicleModel || ''}
              onChange={(e) => handleChange('vehicleModel', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Vehicle Year</label>
            <input
              type="text"
              value={formData.vehicleYear || ''}
              onChange={(e) => handleChange('vehicleYear', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Vehicle Color</label>
            <input
              type="text"
              value={formData.vehicleColor || ''}
              onChange={(e) => handleChange('vehicleColor', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">License Plate Number</label>
            <input
              type="text"
              value={formData.licensePlateNumber || ''}
              onChange={(e) => handleChange('licensePlateNumber', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Specific Entrance Instructions</label>
            <input
              type="text"
              placeholder="e.g., Barn door main entrance"
              value={formData.specificEntranceInstructions || ''}
              onChange={(e) => handleChange('specificEntranceInstructions', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tenant Initials</label>
            <input
              type="text"
              value={formData.tenantInitials || ''}
              onChange={(e) => handleChange('tenantInitials', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pets Allowed</label>
            <select
              value={formData.petsAllowed || 'No'}
              onChange={(e) => handleChange('petsAllowed', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
      </section>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-lg font-semibold"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Lease Application'}
        </button>
      </div>

      {submitMessage && (
        <div className={`p-4 rounded-md ${submitMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {submitMessage}
        </div>
      )}
    </form>
  );
}

