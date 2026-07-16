import { Degree, EmploymentType } from '../index';

export interface Experience {
  id: string;
  title: string;
  employmentType: EmploymentType;
  companyName: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
  skills: string[]; // I think we need to change this as we have changed the schema
  industry: string;
}

export interface Education {
  id: string;
  country: string;
  school: string;
  degree: Degree;
  fieldOfStudy: string; // eg information technology
  yearOfGraduation: string;
}
