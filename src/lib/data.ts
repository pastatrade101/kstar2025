import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    throw new Error(`Image with id "${id}" not found.`);
  }
  return image;
};

export const courses = [
  {
    id: 'C001',
    title: 'Introduction to Modern Art',
    instructor: 'Dr. Evelyn Reed',
    description: 'Explore the revolutionary art movements of the 20th century, from Cubism to Pop Art. This course provides a comprehensive overview of the key artists, theories, and masterpieces that defined modern art.',
    schedule: 'Mon, Wed, Fri 10:00 AM - 11:30 AM',
    image: findImage('course-1'),
  },
  {
    id: 'C002',
    title: 'Advanced Quantum Physics',
    instructor: 'Dr. Samuel Chen',
    description: 'A deep dive into the principles of quantum mechanics, including wave-particle duality, quantum entanglement, and the Schrödinger equation. Prerequisite: PHYS-201.',
    schedule: 'Tue, Thu 1:00 PM - 2:30 PM',
    image: findImage('course-2'),
  },
  {
    id: 'C003',
    title: 'The Roman Empire',
    instructor: 'Dr. Maria Garcia',
    description: 'Trace the rise and fall of one of history\'s greatest empires. This course covers the political, social, and cultural history of Rome from the Republic to the fall of the Western Empire.',
    schedule: 'Mon, Wed 9:00 AM - 10:30 AM',
    image: findImage('course-3'),
  },
  {
    id: 'C004',
    title: 'Data Structures and Algorithms',
    instructor: 'Dr. Ben Carter',
    description: 'Learn the fundamental data structures and algorithms that are the building blocks of modern software. Topics include arrays, linked lists, trees, graphs, sorting, and searching.',
    schedule: 'Tue, Thu 11:00 AM - 12:30 PM',
    image: findImage('course-4'),
  },
  {
    id: 'C005',
    title: 'Shakespearean Literature',
    instructor: 'Dr. Evelyn Reed',
    description: 'An in-depth study of William Shakespeare\'s major plays, including tragedies, comedies, and histories. We will analyze language, theme, and historical context.',
    schedule: 'Fri 1:00 PM - 4:00 PM',
    image: findImage('course-5'),
  },
  {
    id: 'C006',
    title: 'Calculus III',
    instructor: 'Dr. Samuel Chen',
    description: 'This course covers multivariable calculus, including partial derivatives, multiple integrals, and vector calculus. It provides the mathematical foundation for advanced studies in science and engineering.',
    schedule: 'Mon, Wed, Fri 2:00 PM - 3:00 PM',
    image: findImage('course-6'),
  },
];

export const faculty = [
  {
    id: 'F001',
    name: 'Dr. Evelyn Reed',
    title: 'Professor of Art History',
    email: 'e.reed@edupro.edu',
    bio: 'Dr. Reed is a leading expert in 20th-century art, with numerous publications on Surrealism and Abstract Expressionism. She has curated exhibitions for major museums and is a passionate educator.',
    researchInterests: ['Modern Art', 'Surrealism', 'Feminist Art History'],
    image: findImage('faculty-1'),
  },
  {
    id: 'F002',
    name: 'Dr. Samuel Chen',
    title: 'Professor of Physics',
    email: 's.chen@edupro.edu',
    bio: 'Dr. Chen’s research in quantum computing has been recognized with the prestigious Innovator\'s Award. He enjoys making complex topics accessible to students of all levels.',
    researchInterests: ['Quantum Mechanics', 'String Theory', 'Cosmology'],
    image: findImage('faculty-2'),
  },
  {
    id: 'F003',
    name: 'Dr. Maria Garcia',
    title: 'Associate Professor of History',
    email: 'm.garcia@edupro.edu',
    bio: 'Specializing in ancient civilizations, Dr. Garcia has led archaeological digs in both Rome and Athens. Her work focuses on the daily life of ordinary people in the ancient world.',
    researchInterests: ['Roman History', 'Ancient Greek Culture', 'Archaeology'],
    image: findImage('faculty-3'),
  },
  {
    id: 'F004',
    name: 'Dr. Ben Carter',
    title: 'Professor of Computer Science',
    email: 'b.carter@edupro.edu',
    bio: 'With a background in software engineering at top tech companies, Dr. Carter brings a wealth of practical experience to his teaching. His research focuses on machine learning and AI ethics.',
    researchInterests: ['Artificial Intelligence', 'Algorithm Design', 'Tech Ethics'],
    image: findImage('faculty-4'),
  },
];
