const mongoose = require("mongoose");

// Define the model for User
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    phone: {
      type: String,
      unique: true,
    },
    role: String,
    details: Object,
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    certificates: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Certificate" },
    ],
    enrollments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Enrollment" }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    venues: [{ type: mongoose.Schema.Types.ObjectId, ref: "Venue" }],
    coupans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Coupan" }],
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Define the model for Event
const EventSchema = new mongoose.Schema(
  {
    description: String,
    title: String,
    thumbnail: String,
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    mediaId: { type: mongoose.Schema.Types.ObjectId, ref: "Media" },
  },
  { timestamps: true }
);

// Define the model for Enrollment
const EnrollmentSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    atLesson: String,
    status: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Define the model for Lesson
const LessonSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    thumbnail: String,
    mediaId: { type: mongoose.Schema.Types.ObjectId, ref: "Media" },
  },
  { timestamps: true }
);

// Define the model for Media
const MediaSchema = new mongoose.Schema(
  {
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

// Define the model for Image
const ImageSchema = new mongoose.Schema(
  {
    url: String,
    key: String,
    mediaId: { type: mongoose.Schema.Types.ObjectId, ref: "Media" },
  },
  { timestamps: true }
);

// Define the model for Video
const VideoSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    url: String,
    key: String,
    mediaId: { type: mongoose.Schema.Types.ObjectId, ref: "Media" },
  },
  { timestamps: true }
);

// Define the model for Certificate
const CertificateSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Define the model for Course
const CourseSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    thumbnail: String,
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    enrollments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Enrollment" }],
    mediaId: { type: mongoose.Schema.Types.ObjectId, ref: "Media" },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  },
  { timestamps: true }
);

// Define the model for Venue
const VenueSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Define the model for Coupan
const CoupanSchema = new mongoose.Schema(
  {
    name: String,
    expiryDate: Date,
    code: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Create and export the mongoose models
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export const EventModal =
  mongoose.models.Event || mongoose.model("Event", EventSchema);
export const Enrollment =
  mongoose.models.Enrollment || mongoose.model("Enrollment", EnrollmentSchema);
export const Lesson =
  mongoose.models.Lesson || mongoose.model("Lesson", LessonSchema);
export const Media =
  mongoose.models.Media || mongoose.model("Media", MediaSchema);
export const ImageModal =
  mongoose.models.Image || mongoose.model("Image", ImageSchema);
export const Video =
  mongoose.models.Video || mongoose.model("Video", VideoSchema);
export const Certificate =
  mongoose.models.Certificate ||
  mongoose.model("Certificate", CertificateSchema);
export const Course =
  mongoose.models.Course || mongoose.model("Course", CourseSchema);
export const Venue =
  mongoose.models.Venue || mongoose.model("Venue", VenueSchema);
export const Coupan =
  mongoose.models.Coupan || mongoose.model("Coupan", CoupanSchema);
