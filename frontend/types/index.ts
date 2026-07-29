export enum Degree {
  HIGH_SCHOOL = 'HIGH_SCHOOL',
  DIPLOMA = 'DIPLOMA',
  BSC = 'BSC',
  BCA = 'BCA',
  BCOM = 'BCOM',
  BA = 'BA',
  BTECH = 'BTECH',
  BE = 'BE',
  BPHARM = 'BPHARM',
  LLB = 'LLB',
  MBBS = 'MBBS',
  MSC = 'MSC',
  MCA = 'MCA',
  MCOM = 'MCOM',
  MA = 'MA',
  MTECH = 'MTECH',
  ME = 'ME',
  MBA = 'MBA',
  MPHARM = 'MPHARM',
  LLM = 'LLM',
  MD = 'MD',
  PHD = 'PHD',
  OTHER = 'OTHER',
}

export enum SkillExpertiseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  EXPERT = 'EXPERT',
}

// Alias for backward compatibility
export const SkillLevel = SkillExpertiseLevel;

export enum EmploymentType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  FREELANCE = 'FREELANCE',
  SELF_EMPLOYED = 'SELF_EMPLOYED',
}

export enum UserRole {
  CREATIVE = 'CREATIVE',
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
}

export enum JoinAs {
  FREELANCER = 'FREELANCER',
  COLLECTIVE = 'COLLECTIVE',
  CLIENT = 'CLIENT',
}

export enum AvailabilityStatus {
  AVAILABLE = 'AVAILABLE',
  BUSY = 'BUSY',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
}

export enum ClientType {
  INDIVIDUAL = 'INDIVIDUAL',
  COMPANY = 'COMPANY',
}

export enum CompanySize {
  SOLO = 'SOLO',
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  ENTERPRISE = 'ENTERPRISE',
}

export enum Industry {
  ADVERTISING_MARKETING = 'ADVERTISING_MARKETING',
  FASHION_APPAREL = 'FASHION_APPAREL',
  FILM_TV_ENTERTAINMENT = 'FILM_TV_ENTERTAINMENT',
  MUSIC_AUDIO = 'MUSIC_AUDIO',
  GAMING = 'GAMING',
  PUBLISHING_MEDIA = 'PUBLISHING_MEDIA',
  PHOTOGRAPHY_STUDIO = 'PHOTOGRAPHY_STUDIO',
  TECHNOLOGY_SOFTWARE = 'TECHNOLOGY_SOFTWARE',
  ECOMMERCE_RETAIL = 'ECOMMERCE_RETAIL',
  REAL_ESTATE = 'REAL_ESTATE',
  HOSPITALITY_TRAVEL = 'HOSPITALITY_TRAVEL',
  FOOD_BEVERAGE = 'FOOD_BEVERAGE',
  BEAUTY_COSMETICS = 'BEAUTY_COSMETICS',
  HEALTH_WELLNESS = 'HEALTH_WELLNESS',
  SPORTS_FITNESS = 'SPORTS_FITNESS',
  EDUCATION = 'EDUCATION',
  FINANCE_BANKING = 'FINANCE_BANKING',
  NONPROFIT_NGO = 'NONPROFIT_NGO',
  ARCHITECTURE_INTERIOR_DESIGN = 'ARCHITECTURE_INTERIOR_DESIGN',
  AUTOMOTIVE = 'AUTOMOTIVE',
  EVENTS_WEDDINGS = 'EVENTS_WEDDINGS',
  OTHER = 'OTHER',
}

export const INDUSTRY_LABELS: Record<Industry, string> = {
  [Industry.ADVERTISING_MARKETING]: 'Advertising & Marketing',
  [Industry.FASHION_APPAREL]: 'Fashion & Apparel',
  [Industry.FILM_TV_ENTERTAINMENT]: 'Film, TV & Entertainment',
  [Industry.MUSIC_AUDIO]: 'Music & Audio',
  [Industry.GAMING]: 'Gaming',
  [Industry.PUBLISHING_MEDIA]: 'Publishing & Media',
  [Industry.PHOTOGRAPHY_STUDIO]: 'Photography & Studio',
  [Industry.TECHNOLOGY_SOFTWARE]: 'Technology & Software',
  [Industry.ECOMMERCE_RETAIL]: 'E-commerce & Retail',
  [Industry.REAL_ESTATE]: 'Real Estate',
  [Industry.HOSPITALITY_TRAVEL]: 'Hospitality & Travel',
  [Industry.FOOD_BEVERAGE]: 'Food & Beverage',
  [Industry.BEAUTY_COSMETICS]: 'Beauty & Cosmetics',
  [Industry.HEALTH_WELLNESS]: 'Health & Wellness',
  [Industry.SPORTS_FITNESS]: 'Sports & Fitness',
  [Industry.EDUCATION]: 'Education',
  [Industry.FINANCE_BANKING]: 'Finance & Banking',
  [Industry.NONPROFIT_NGO]: 'Nonprofit & NGO',
  [Industry.ARCHITECTURE_INTERIOR_DESIGN]: 'Architecture & Interior Design',
  [Industry.AUTOMOTIVE]: 'Automotive',
  [Industry.EVENTS_WEDDINGS]: 'Events & Weddings',
  [Industry.OTHER]: 'Other',
};

export const COMPANY_SIZE_LABELS: Record<CompanySize, string> = {
  [CompanySize.SOLO]: 'Just me',
  [CompanySize.SMALL]: '2–10 employees',
  [CompanySize.MEDIUM]: '11–50 employees',
  [CompanySize.LARGE]: '51–200 employees',
  [CompanySize.ENTERPRISE]: '201+ employees',
};

export interface User {
  id: string;
  email: string;
  emailVerified?: boolean;
  name: string;
  role?: string;
  username?: string;
  image?: string;
  creativeProfile?: {
    onboardingCompleted?: boolean;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}
