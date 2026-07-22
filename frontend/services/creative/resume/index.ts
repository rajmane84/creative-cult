import axios from '@/lib/axios';

export interface ParsedResumeData {
  name?: string;
  email?: string;
  phone?: string;
  skills?: string[];
  // experiences?: Array<{
  //   title: string;
  //   companyName?: string;
  //   employmentType?: 'FULL_TIME' | 'PART_TIME' | 'FREELANCE' | 'SELF_EMPLOYED';
  //   industry?: string;
  //   startDate?: string;
  //   endDate?: string | null;
  //   currentlyWorking?: boolean;
  //   description?: string;
  //   skills?: string[];
  // }>;
  // education?: Array<{
  //   school: string;
  //   degree: 'HIGH_SCHOOL' | 'DIPLOMA' | 'BSC' | 'BCA' | 'BCOM' | 'BA' | 'BTECH' | 'BE' | 'BPHARM' | 'LLB' | 'MBBS' | 'MSC' | 'MCA' | 'MCOM' | 'MA' | 'MTECH' | 'ME' | 'MBA' | 'MPHARM' | 'LLM' | 'MD' | 'PHD' | 'OTHER';
  //   fieldOfStudy: string;
  //   country: string;
  //   yearOfGraduation: string;
  // }>;
}

export interface CloudinaryInfo {
  url: string;
  publicId: string;
  fileName?: string;
}

export interface ResumeParseResponse {
  parsedData: ParsedResumeData;
  cloudinary: CloudinaryInfo;
}

export const resumeService = {
  parseResume: async (file: File): Promise<ResumeParseResponse> => {
    const formData = new FormData();
    formData.append('resume', file);

    const response = await axios.post('/api/v1/resume/parse', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data;
  },
};
