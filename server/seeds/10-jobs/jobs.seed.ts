import { getObjectId } from 'mongo-seeding';
import { Types } from 'mongoose';

import { JobBase } from '../../models';
import { Generator } from '../generator';

interface JobSeed extends JobBase {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _v: Number;
}

function generateJobs(): JobSeed[] {
  const jobs: JobSeed[] = [];
  for (var i = 0; i < 10; i++) {
    const type = Generator.randomJobType();
    const company = Generator.randomCompany();
    const title = `${type} hos ${company.name}`;
    const job: JobSeed = {
      _id: getObjectId(`job-${i}`),
      title,
      company: company.name,
      type,
      startdate: Generator.randomDate(),
      deadline: Generator.randomDate(),
      places: Generator.randomLocations(),
      description: Generator.generateDescription(Math.floor(Math.random() * 5)),
      grades: Generator.randomGrades(),
      image: company.logo,
      link: company.link,
      studyfields: Generator.randomStudyFields(),
      createdAt: new Date(),
      updatedAt: new Date(),
      _v: 0,
    };
    jobs.push(job);
  }

  return jobs;
}

export = generateJobs();
