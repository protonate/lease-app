export interface LeaseFormData {
  // Tenant Information
  tenantName1: string;
  tenantName2: string;
  streetAddress: string;
  unitName: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  emailAddress: string;

  // Lease Term
  startDate: string;
  endDate: string;
  prorationEndDate: string;
  rentDueDay: string;

  // Financial Information
  monthlyRentAmount: string;
  proratedRentAmount: string;
  securityDepositAmount: string;
  petDepositAmount: string;
  otherDepositAmount: string;
  firstMonthRentAmount: string;
  totalDueAmount: string;
  lateFeeAmount: string;
  utilityChargeAmount: string;

  // Fees
  tamperingFeeAmount: string;
  dishonoredCheckFeeAmount: string;
  lateUtilityFeeAmount: string;
  wasteCleanupFeeAmount: string;
  parkingViolationFeeAmount: string;
  smokingViolationFeeAmount: string;
  unauthorizedPetFeeAmount: string;

  // Property Details
  exclusiveSpace: string;
  specificEntranceInstructions: string;
  tenantInitials: string;
  petsAllowed: string;

  // Bank Information
  bankName: string;
  bankAddress: string;
  accountType: string;

  // Emergency Contacts
  emergencyContact1Name: string;
  relationship1: string;
  emergencyContact1Address: string;
  emergencyContact1City: string;
  emergencyContact1State: string;
  emergencyContact1Zip: string;
  emergencyContact1Phone: string;
  emergencyContact1Email: string;

  emergencyContact2Name: string;
  relationship2: string;
  emergencyContact2Address: string;
  emergencyContact2City: string;
  emergencyContact2State: string;
  emergencyContact2Zip: string;
  emergencyContact2Phone: string;
  emergencyContact2Email: string;

  // Vehicle Information
  numberOfVehicles: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
  licensePlateNumber: string;
  vehicleMake2: string;
  vehicleModel2: string;
  vehicleYear2: string;
  vehicleColor2: string;
  licensePlateNumber2: string;

  // Parking
  tagId: string;
  tagDisplayLocation: string;
  towCompanyName: string;
  towCompanyAddress: string;
  towCompanyPhone: string;
  reservedParkingLocation: string;
  visitorParkingLocation: string;

  // Pet Information
  petDepositAmountForm: string;
  petMonthlyRentAmount: string;
  petTypeBreed1: string;
  petName1: string;
  petSize1: string;
  petWeight1: string;
  petAge1: string;
  petColor1: string;
  petLicense1: string;
  petTypeBreed2: string;
  petName2: string;
  petSize2: string;
  petWeight2: string;
  petAge2: string;
  petColor2: string;
  petLicense2: string;
  emergencyPetCaretakerPhone: string;
  emergencyPetCaretakerAddress: string;

  // Owner Information (typically static but might want to allow override)
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;

  // Additional
  otherContaminantsTested: string;
  wellTestDate: string;
  recyclingCollectionTime: string;
  recyclingDay: string;
  recyclingFrequency: string;
}

