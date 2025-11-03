import fs from 'fs';
import path from 'path';
import { LeaseFormData } from '@/types';

export function populateLeaseTemplate(data: LeaseFormData): string {
  const templatePath = path.join(process.cwd(), 'lease_template.md');
  let template = fs.readFileSync(templatePath, 'utf-8');

  // Helper function to safely replace placeholders
  const replace = (placeholder: string, value: string) => {
    const regex = new RegExp(`\\[${placeholder}\\]`, 'g');
    template = template.replace(regex, value || '');
  };

  // Tenant Information
  replace('TENANT NAME 1', data.tenantName1 || '');
  replace('TENANT NAME 2', data.tenantName2 || '');
  replace('STREET ADDRESS', data.streetAddress || '');
  replace('UNIT NAME', data.unitName || '');
  replace('CITY', data.city || '');
  replace('STATE', data.state || '');
  replace('ZIP CODE', data.zipCode || '');
  replace('PHONE NUMBER', data.phoneNumber || '');
  replace('EMAIL ADDRESS', data.emailAddress || '');

  // Lease Term
  replace('START DATE', data.startDate || '');
  replace('END DATE', data.endDate || '');
  replace('PRORATION END DATE', data.prorationEndDate || '');
  replace('DAY', data.rentDueDay || '1st');

  // Financial Information
  replace('MONTHLY RENT AMOUNT', data.monthlyRentAmount || '');
  replace('PRORATED RENT AMOUNT', data.proratedRentAmount || '');
  replace('SECURITY DEPOSIT AMOUNT', data.securityDepositAmount || '');
  replace('PET DEPOSIT AMOUNT', data.petDepositAmount || data.petDepositAmountForm || '0');
  replace('OTHER DEPOSIT AMOUNT', data.otherDepositAmount || '0');
  replace('FIRST MONTH RENT AMOUNT', data.firstMonthRentAmount || '');
  replace('TOTAL DUE AMOUNT', data.totalDueAmount || '');
  replace('LATE FEE AMOUNT', data.lateFeeAmount || '');
  replace('UTILITY CHARGE AMOUNT', data.utilityChargeAmount || '');
  replace('PET MONTHLY RENT AMOUNT', data.petMonthlyRentAmount || '0');

  // Fees
  replace('TAMPERING FEE AMOUNT', data.tamperingFeeAmount || '');
  replace('DISHONORED CHECK FEE AMOUNT', data.dishonoredCheckFeeAmount || '');
  replace('LATE UTILITY FEE AMOUNT', data.lateUtilityFeeAmount || '');
  replace('WASTE CLEANUP FEE AMOUNT', data.wasteCleanupFeeAmount || '');
  replace('PARKING VIOLATION FEE AMOUNT', data.parkingViolationFeeAmount || '');
  replace('SMOKING VIOLATION FEE AMOUNT', data.smokingViolationFeeAmount || '');
  replace('UNAUTHORIZED PET FEE AMOUNT', data.unauthorizedPetFeeAmount || '');

  // Property Details
  replace('EXCLUSIVE SPACE', data.exclusiveSpace || '');
  replace('SPECIFIC ENTRANCE INSTRUCTIONS', data.specificEntranceInstructions || '');
  replace('TENANT INITIALS', data.tenantInitials || '');
  replace('YES/NO', data.petsAllowed || 'No');

  // Bank Information
  replace('BANK NAME', data.bankName || '');
  replace('BANK ADDRESS', data.bankAddress || '');
  replace('ACCOUNT TYPE', data.accountType || '');

  // Emergency Contacts
  replace('EMERGENCY CONTACT 1 NAME', data.emergencyContact1Name || '');
  replace('RELATIONSHIP 1', data.relationship1 || '');
  replace('EMERGENCY CONTACT 1 ADDRESS', data.emergencyContact1Address || '');
  replace('EMERGENCY CONTACT 1 CITY', data.emergencyContact1City || '');
  replace('EMERGENCY CONTACT 1 STATE', data.emergencyContact1State || '');
  replace('EMERGENCY CONTACT 1 ZIP', data.emergencyContact1Zip || '');
  replace('EMERGENCY CONTACT 1 PHONE', data.emergencyContact1Phone || '');
  replace('EMERGENCY CONTACT 1 EMAIL', data.emergencyContact1Email || '');

  replace('EMERGENCY CONTACT 2 NAME', data.emergencyContact2Name || '');
  replace('RELATIONSHIP 2', data.relationship2 || '');
  replace('EMERGENCY CONTACT 2 ADDRESS', data.emergencyContact2Address || '');
  replace('EMERGENCY CONTACT 2 CITY', data.emergencyContact2City || '');
  replace('EMERGENCY CONTACT 2 STATE', data.emergencyContact2State || '');
  replace('EMERGENCY CONTACT 2 ZIP', data.emergencyContact2Zip || '');
  replace('EMERGENCY CONTACT 2 PHONE', data.emergencyContact2Phone || '');
  replace('EMERGENCY CONTACT 2 EMAIL', data.emergencyContact2Email || '');

  // Vehicle Information
  replace('NUMBER', data.numberOfVehicles || '1');
  replace('VEHICLE MAKE', data.vehicleMake || '');
  replace('VEHICLE MODEL', data.vehicleModel || '');
  replace('VEHICLE YEAR', data.vehicleYear || '');
  replace('VEHICLE COLOR', data.vehicleColor || '');
  replace('LICENSE PLATE NUMBER', data.licensePlateNumber || '');
  replace('VEHICLE MAKE 2', data.vehicleMake2 || '');
  replace('VEHICLE MODEL 2', data.vehicleModel2 || '');
  replace('VEHICLE YEAR 2', data.vehicleYear2 || '');
  replace('VEHICLE COLOR 2', data.vehicleColor2 || '');
  replace('LICENSE PLATE NUMBER 2', data.licensePlateNumber2 || '');

  // Parking
  replace('TAG ID', data.tagId || '');
  replace('TAG DISPLAY LOCATION', data.tagDisplayLocation || '');
  replace('TOW COMPANY NAME', data.towCompanyName || '');
  replace('TOW COMPANY ADDRESS', data.towCompanyAddress || '');
  replace('TOW COMPANY PHONE', data.towCompanyPhone || '');
  replace('RESERVED PARKING LOCATION', data.reservedParkingLocation || '');
  replace('VISITOR PARKING LOCATION', data.visitorParkingLocation || '');

  // Pet Information
  replace('PET TYPE/BREED 1', data.petTypeBreed1 || '');
  replace('PET NAME 1', data.petName1 || '');
  replace('PET SIZE 1', data.petSize1 || '');
  replace('PET WEIGHT 1', data.petWeight1 || '');
  replace('PET AGE 1', data.petAge1 || '');
  replace('PET COLOR 1', data.petColor1 || '');
  replace('PET LICENSE 1', data.petLicense1 || '');
  replace('PET TYPE/BREED 2', data.petTypeBreed2 || '');
  replace('PET NAME 2', data.petName2 || '');
  replace('PET SIZE 2', data.petSize2 || '');
  replace('PET WEIGHT 2', data.petWeight2 || '');
  replace('PET AGE 2', data.petAge2 || '');
  replace('PET COLOR 2', data.petColor2 || '');
  replace('PET LICENSE 2', data.petLicense2 || '');
  replace('EMERGENCY PET CARETAKER PHONE', data.emergencyPetCaretakerPhone || '');
  replace('EMERGENCY PET CARETAKER ADDRESS', data.emergencyPetCaretakerAddress || '');

  // Owner Information
  replace('OWNER NAME', data.ownerName || 'Nathan Wolff');
  replace('OWNER PHONE', data.ownerPhone || '(917) 407-8610');
  replace('OWNER EMAIL', data.ownerEmail || 'nathan.g.wolff@gmail.com');

  // Additional
  replace('OTHER CONTAMINANTS TESTED', data.otherContaminantsTested || '');
  replace('WELL TEST DATE', data.wellTestDate || '');
  replace('RECYCLING COLLECTION TIME', data.recyclingCollectionTime || '');
  replace('RECYCLING DAY', data.recyclingDay || '');
  replace('RECYCLING FREQUENCY', data.recyclingFrequency || '');

  return template;
}

