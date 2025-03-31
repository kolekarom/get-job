import axios from 'axios';

class JobBoardService {
  constructor() {
    this.linkedInApi = axios.create({
      baseURL: 'https://api.linkedin.com/v2',
    });

    this.indeedApi = axios.create({
      baseURL: 'https://apis.indeed.com/v2',
    });

    this.glassdoorApi = axios.create({
      baseURL: 'https://api.glassdoor.com/v1',
    });
  }

  setLinkedInToken(token) {
    this.linkedInApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  setIndeedToken(token) {
    this.indeedApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  async searchJobs(query, location, filters = {}) {
    const jobs = {
      linkedin: [],
      indeed: [],
      glassdoor: [],
    };

    try {
      // LinkedIn Jobs Search
      const linkedInResponse = await this.linkedInApi.get('/jobs/search', {
        params: {
          keywords: query,
          location: location,
          ...filters,
        },
      });
      jobs.linkedin = linkedInResponse.data.elements;

      // Indeed Jobs Search
      const indeedResponse = await this.indeedApi.get('/jobs/search', {
        params: {
          q: query,
          l: location,
          ...filters,
        },
      });
      jobs.indeed = indeedResponse.data.results;

      // Glassdoor Jobs Search
      const glassdoorResponse = await this.glassdoorApi.get('/jobs/search', {
        params: {
          keyword: query,
          location: location,
          ...filters,
        },
      });
      jobs.glassdoor = glassdoorResponse.data.response.jobs;

    } catch (error) {
      console.error('Error fetching jobs:', error);
    }

    return jobs;
  }

  async autoFillApplication(jobId, userProfile, platform = 'linkedin') {
    try {
      let applicationData;
      
      switch (platform) {
        case 'linkedin':
          applicationData = await this.linkedInApi.get(`/jobs/${jobId}/application-details`);
          break;
        case 'indeed':
          applicationData = await this.indeedApi.get(`/jobs/${jobId}/apply`);
          break;
        default:
          throw new Error('Unsupported platform');
      }

      // Map user profile data to application fields
      const mappedData = this.mapProfileToApplication(userProfile, applicationData.data);
      
      return mappedData;
    } catch (error) {
      console.error('Error auto-filling application:', error);
      throw error;
    }
  }

  mapProfileToApplication(userProfile, applicationFields) {
    const mapping = {
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.email,
      phone: userProfile.phone,
      resume: userProfile.resumeUrl,
      experience: userProfile.experience,
      education: userProfile.education,
      skills: userProfile.skills,
    };

    return Object.entries(applicationFields).reduce((acc, [field, value]) => {
      acc[field] = mapping[field] || value;
      return acc;
    }, {});
  }

  async getSalaryInsights(jobTitle, location) {
    try {
      const glassdoorResponse = await this.glassdoorApi.get('/salaries/search', {
        params: {
          jobTitle,
          location,
        },
      });

      return {
        median: glassdoorResponse.data.response.salaries[0].median,
        range: {
          low: glassdoorResponse.data.response.salaries[0].low,
          high: glassdoorResponse.data.response.salaries[0].high,
        },
        currency: glassdoorResponse.data.response.salaries[0].currency,
      };
    } catch (error) {
      console.error('Error fetching salary insights:', error);
      throw error;
    }
  }
}

export default new JobBoardService();
