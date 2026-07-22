import Anthropic from '@anthropic-ai/sdk';
import { env } from '../util/env';

const anthropic = new Anthropic({
  apiKey: env.ANTHROPIC_API_KEY,
});

/**
 * Schema for the structured data we want to extract from resumes
 */
export interface ParsedResume {
  name?: string;
  email?: string;
  phone?: string;
  skills?: string[];
  // experiences?: Array<{
  //   title: string;
  //   companyName?: string;
  //   employmentType?: 'FULL_TIME' | 'PART_TIME' | 'FREELANCE' | 'SELF_EMPLOYED';
  //   industry?: string;
  //   startDate?: string; // ISO date string
  //   endDate?: string; // ISO date string or null if currently working
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

/**
 * Extract structured data from resume text using Claude AI
 * @param resumeText - Raw text extracted from PDF
 * @returns Promise with parsed resume data
 */
export async function extractResumeData(
  resumeText: string
): Promise<ParsedResume> {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: `Please extract structured information from this resume text. Return the data as a JSON object with the following structure:

{
  "name": "full name if found",
  "email": "email address if found", 
  "phone": "phone number if found",
  "skills": ["skill1", "skill2", ...]
}

Important guidelines:
- Only include fields that you can confidently extract from the resume
- For dates, use ISO format (YYYY-MM-DD). If only year is available, use YYYY-01-01
- For employmentType, map to one of: FULL_TIME, PART_TIME, FREELANCE, SELF_EMPLOYED
- For degree, map to one of the specified enum values
- If a field cannot be determined, omit it from the JSON
- Return ONLY valid JSON, no additional text

Resume text:
${resumeText}`,
        },
      ],
    });

    // Extract the JSON response
    const content = message.content[0];
    if (content?.type === 'text') {
      const jsonMatch = content.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedData = JSON.parse(jsonMatch[0]) as ParsedResume;
        return parsedData;
      }
    }

    throw new Error('Failed to parse Claude response');
  } catch (error) {
    console.error('Claude extraction error:', error);
    throw new Error('Failed to extract data from resume using AI', {
      cause: error,
    });
  }
}

// "experiences": [
//     {
//       "title": "job title",
//       "companyName": "company name",
//       "employmentType": "FULL_TIME|PART_TIME|FREELANCE|SELF_EMPLOYED",
//       "industry": "industry name",
//       "startDate": "YYYY-MM-DD",
//       "endDate": "YYYY-MM-DD or null if currently working",
//       "currentlyWorking": true/false,
//       "description": "job description",
//       "skills": ["skill1", "skill2"]
//     }
//   ],
//   "education": [
//     {
//       "school": "school name",
//       "degree": "HIGH_SCHOOL|DIPLOMA|BSC|BCA|BCOM|BA|BTECH|BE|BPHARM|LLB|MBBS|MSC|MCA|MCOM|MA|MTECH|ME|MBA|MPHARM|LLM|MD|PHD|OTHER",
//       "fieldOfStudy": "field of study",
//       "country": "country",
//       "yearOfGraduation": "YYYY"
//     }
//   ]
