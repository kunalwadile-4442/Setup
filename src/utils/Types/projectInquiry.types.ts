export interface PhoneDetails {
  phone: string;
  foreman_phone_code: string;
  phone_code: string;
   dialCode?: string;
  countryCode?: string;
}

export interface projectInquiry {
  project_name: string;
  shipping_address: string;
  billing_address: string;
  owner_developer_name: string;
  owner_developer_email: string;
  general_contractor_name: string;
  general_contractor_email: string;
  concrete_contractor_name: string;
  concrete_contractor_email: string;
  accounts_paybal_name: string;
  accounts_paybal_email: string;
  foreman_name: string;
  foreman_phone: PhoneDetails;
  is_tax_exempt: string | boolean;
  notes: string;
}

export interface SubmissionPayload extends Omit<projectInquiry, 'foreman_phone' | 'is_tax_exempt'> {
  foreman_phone: string;
  foreman_phone_code: string;
  is_tax_exempt: boolean;
  recaptcha_token: string;
  invite_email?: string | null;
}
