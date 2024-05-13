import { Types } from "mongoose";
type TVenue = {
  _id: string;
  name: string;
  description: string;
  userId: string;
  location: string;
  media: string | TMedia;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type TUser = {
  _id:string,
  name: string;
  email: string;
  password: string|null;
  phone: string;
  role: string;
  details: Record<string, any>;
  teachers: Types.ObjectId[];
  students: Types.ObjectId[];
  courses: Types.ObjectId[];
  certificates: Types.ObjectId[];
  enrollments: Types.ObjectId[];
  events: Types.ObjectId[];
  venues: Types.ObjectId[];
  coupans: Types.ObjectId[];
  adminId: Types.ObjectId;
  teacherId: Types.ObjectId;
  admin: Types.ObjectId;
  teacher: Types.ObjectId;
  earnings: Types.ObjectId[];
  createdAt: string;
};

type TEarning = {
  course: Types.ObjectId;
  amount: number;
  student: Types.ObjectId;
  createdAt: string;
};

type TEvent = {
  description: string;
  title: string;
  thumbnail: string;
  adminId: Types.ObjectId;
  admin: Types.ObjectId;
  mediaId: Types.ObjectId;
  createdAt: string;
};

type TEnrollment = {
  courseId: Types.ObjectId;
  atLesson: Types.ObjectId;
  completed: boolean;
  userId: Types.ObjectId;
  createdAt: string;
};

type TLesson = {
  title: string;
  description: string;
  thumbnail: string;
  mediaId: Types.ObjectId;
  createdAt: string;
};

type TMedia = {
  videos: TVideo[];
  images: TImage[];
  event: Types.ObjectId;
  lesson: Types.ObjectId;
  course: Types.ObjectId;
  createdAt: string;
};

type TImage = {
  url: string;
  key: string;
  mediaId: Types.ObjectId;
  createdAt: string;
};

type TVideo = {
  title: string;
  description: string;
  url: string;
  key: string;
  mediaId: Types.ObjectId;
  createdAt: string;
};

type TCertificate = {
  studentId: Types.ObjectId;
  createdAt: string;
};

type TReview = {
  by: Types.ObjectId;
  course: Types.ObjectId;
  message: string;
  ratings: number;
  createdAt: string;
};

type TCourse = {
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  teacherId: Types.ObjectId;
  enrollments: Types.ObjectId[];
  mediaId: Types.ObjectId;
  lessons: Types.ObjectId[];
  reviews: Types.ObjectId[];
  createdAt: string;
};

type TVenue = {
  name: string;
  description: string;
  userId: Types.ObjectId;
  location: string;
  media: Types.ObjectId;
  createdAt: string;
};

type TSession = {
  _id: string;
  title: string;
  description: string;
  author: string;
  type: string;
  members: { _id: string; name: string; email: string }[];
  timestamp: { from: string; to: string };
  links: string[];
  venue: { _id: string; name: string };
  createdAt: string;
};

type TCoupan = {
  name: string;
  expiryDate: Date;
  code: string;
  userId: Types.ObjectId;
  createdAt: string;
};

export {
  TUser,
  TEarning,
  TEvent,
  TEnrollment,
  TLesson,
  TMedia,
  TImage,
  TVideo,
  TCertificate,
  TReview,
  TCourse,
  TVenue,
  TSession,
  TCoupan,
};
