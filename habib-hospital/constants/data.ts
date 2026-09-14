export type Department = {
  id: string;
  name: string;
  summary: string;
  description: string;
  icon: keyof typeof departmentIcons;
};

export const departmentIcons = {
  pediatrics: 'baby-carriage',
  medicine: 'stethoscope',
  cardiology: 'heart-pulse',
  gynecology: 'human-female',
  dental: 'tooth',
  ophthalmology: 'eye',
  physiotherapy: 'walk',
  dermatology: 'face-man',
  emergency: 'ambulance',
  diagnostics: 'flask',
} as const;

export const hospital = {
  name: 'Habib Hospital',
  shortName: 'Habib',
  tagline: 'Compassionate care for every family in Karachi',
  description:
    'Habib Hospital delivers trusted multispecialty care from emergency and OPD to diagnostics, surgery, and family medicine — with a focus on pediatric excellence.',
  address: 'BS/3, Block 4, Karimabad, F.B. Area, Karachi',
  phone: '021-36349683',
  phoneDisplay: '021 3634 9683',
  emergencyPhone: '021-36349678',
  hours: 'Open daily · OPD 9 AM – 11 PM · Emergency 24/7',
  email: 'care@habibhospital.pk',
  established: '15+ years of community care',
  certifications: ['ISO Certified', '24/7 Emergency', 'In-house Diagnostics'],
};

export const departments: Department[] = [
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    summary: 'Child wellness, immunizations, and developmental care',
    description:
      'Comprehensive pediatric care from infancy through adolescence, including routine checkups, immunizations, illness management, and growth assessments.',
    icon: 'pediatrics',
  },
  {
    id: 'general-medicine',
    name: 'General Medicine',
    summary: 'Primary care for everyday and chronic conditions',
    description:
      'Diagnosis and treatment of common illnesses, chronic disease management, and coordinated referrals across specialties.',
    icon: 'medicine',
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    summary: 'Heart consultations and cardiac emergency support',
    description:
      'Specialist heart consultations, risk assessment, and rapid response pathways for cardiac emergencies.',
    icon: 'cardiology',
  },
  {
    id: 'gynecology',
    name: 'Gynecology & Obstetrics',
    summary: 'Women’s health, maternity, and labour care',
    description:
      'Prenatal care, gynaecology consultations, labour rooms, and personalized women’s health support.',
    icon: 'gynecology',
  },
  {
    id: 'dental',
    name: 'Dental Care',
    summary: 'Preventive, restorative, and cosmetic dentistry',
    description:
      'Dental checkups, restorations, and cosmetic treatments in a clean, family-friendly clinic setting.',
    icon: 'dental',
  },
  {
    id: 'optical',
    name: 'Optical Services',
    summary: 'Eye exams, prescriptions, and vision care',
    description:
      'Comprehensive eye examinations, prescription glasses, and contact lens guidance.',
    icon: 'ophthalmology',
  },
  {
    id: 'physiotherapy',
    name: 'Physiotherapy',
    summary: 'Rehab for mobility, injury, and recovery',
    description:
      'Rehabilitation programs for musculoskeletal disorders, post-operative recovery, and mobility support.',
    icon: 'physiotherapy',
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    summary: 'Skin consultations and dermatologic care',
    description:
      'Evaluation and treatment of common skin conditions with specialist dermatology consultations.',
    icon: 'dermatology',
  },
  {
    id: 'emergency',
    name: 'Emergency',
    summary: 'Round-the-clock urgent medical support',
    description:
      '24/7 emergency department with triage, cardiac emergency readiness, and rapid clinical response.',
    icon: 'emergency',
  },
  {
    id: 'diagnostics',
    name: 'Diagnostics & Lab',
    summary: 'Laboratory testing, imaging, and pathology',
    description:
      'On-site diagnostic laboratory, imaging support, and timely reports to guide clinical decisions.',
    icon: 'diagnostics',
  },
];

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  departmentId: string;
  experience: string;
  fee: string;
  availability: string;
  bio: string;
  languages: string[];
};

export const doctors: Doctor[] = [
  {
    id: 'tania-razi',
    name: 'Dr. Tania Razi',
    specialty: 'Child Specialist',
    departmentId: 'pediatrics',
    experience: '12+ years',
    fee: 'Rs. 1,000',
    availability: 'Mon–Sat · 10 AM – 2 PM',
    bio: 'Leads the pediatric department with a focus on compassionate, family-centered care for infants, children, and adolescents.',
    languages: ['English', 'Urdu'],
  },
  {
    id: 'summiya-manzoor',
    name: 'Dr. Summiya Manzoor',
    specialty: 'Consultant Physician',
    departmentId: 'general-medicine',
    experience: '10+ years',
    fee: 'Rs. 1,000',
    availability: 'Mon–Fri · 5 PM – 9 PM',
    bio: 'Experienced in adult primary care, chronic disease management, and coordinated specialist referrals.',
    languages: ['English', 'Urdu'],
  },
  {
    id: 'ahmed-farooq',
    name: 'Dr. Ahmed Farooq',
    specialty: 'Cardiologist',
    departmentId: 'cardiology',
    experience: '15+ years',
    fee: 'Rs. 1,500',
    availability: 'Tue & Thu · 4 PM – 8 PM',
    bio: 'Provides preventive cardiology consultations and supports urgent cardiac pathways at the hospital.',
    languages: ['English', 'Urdu'],
  },
  {
    id: 'sana-qureshi',
    name: 'Dr. Sana Qureshi',
    specialty: 'Gynecologist',
    departmentId: 'gynecology',
    experience: '11+ years',
    fee: 'Rs. 1,200',
    availability: 'Mon–Wed · 11 AM – 3 PM',
    bio: 'Specializes in women’s health, antenatal care, and supportive obstetric consultations.',
    languages: ['English', 'Urdu'],
  },
  {
    id: 'bilal-hassan',
    name: 'Dr. Bilal Hassan',
    specialty: 'Dental Surgeon',
    departmentId: 'dental',
    experience: '8+ years',
    fee: 'Rs. 800',
    availability: 'Daily · 3 PM – 7 PM',
    bio: 'Offers preventive dentistry, restorations, and comfortable care for adults and children.',
    languages: ['English', 'Urdu'],
  },
  {
    id: 'maria-khan',
    name: 'Dr. Maria Khan',
    specialty: 'Dermatologist',
    departmentId: 'dermatology',
    experience: '9+ years',
    fee: 'Rs. 1,200',
    availability: 'Fri & Sat · 12 PM – 4 PM',
    bio: 'Treats common dermatologic conditions with clear guidance and practical treatment plans.',
    languages: ['English', 'Urdu'],
  },
];

export const services = [
  {
    title: '24/7 Emergency',
    detail: 'Immediate triage and urgent care whenever you need it.',
  },
  {
    title: 'OPD & Specialist Clinics',
    detail: 'Book consultations across major medical specialties.',
  },
  {
    title: 'Diagnostics & Pharmacy',
    detail: 'Lab testing, imaging support, and on-site pharmacy.',
  },
  {
    title: 'Inpatient & OT',
    detail: 'Patient rooms, ICU readiness, and surgical theatres.',
  },
];

export const timeSlots = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
];
