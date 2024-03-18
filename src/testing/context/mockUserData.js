export const mockUserData = {
  userData: {
    user: {
      _id: "65cb2d924f2fe54ecfbaaa8f",
      email: "colinjohnclarke@hotmail.com",
      emailVerified: false,
      totalXP: 70,
      preferences: {
        notificationPreferences: {
          email: true,
          pushNotifications: true,
        },
        personalizedSettings: {
          dailyXPGoal: 150,
        },
        language: "English",
      },
      blocksCompleted: [
        {
          blockName: "Understanding Fractions",
          percentageScores: 0,
          subject: "Maths",
          courseName: "Maths Primary",
          XPScored: 0,
          _id: "65e1a601350e8dbbd7b1e23c",
        },
        // ... other blocksCompleted entries
      ],
      quizScores: [
        {
          blockName: "Understanding Fractions",
          subject: "Maths",
          courseName: "Maths Primary",
          score: 0,
          percentageScore: 0,
          completionStatus: true,
          timeElapsed: 17352,
          XPScored: 0,
          _id: "65e1a601350e8dbbd7b1e235",
          timeStamp: "2024-03-01T09:55:13.650Z",
        },
        // ... other quizScores entries
      ],
      enrolledCourses: [
        {
          courseName: "Maths Primary",
          completionStatus: false,
          percentageProgress: 0,
          XPForCurrentCourse: 0,
          timeElapsedForCurrentCourse: 0,
          dateCourseStarted: "2024-02-29T08:41:41.771Z",
          questionsAttemptedForCurrentCourse: 0,
          _id: "65e04345723344ad7b1a4932",
        },
        // ... other enrolledCourses entries
      ],
      interactions: [],
      __v: 0,
      schoolDetails: {
        localAuthority: "",
        name: "Wellies Children's Centre",
        postcode: "CV35 9NF",
        town: "Warwick",
        id: "65cb2e943554819ed6b5e94b",
      },
      yearGroup: "U1",
      totalQuestionsAttempted: 7,
      totalTimeElapsed: 159899,
      firstName: "testFirstName",
      lastName: "testLastName",
    },
  },
  darkThemeActive: true,
  userAuth0: {
    nickname: "colinjohnclarke",
    name: "colinjohnclarke@hotmail.com",
    picture:
      "https://s.gravatar.com/avatar/e4b4b88a201499f331141fee777c221e?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fco.png",
    updated_at: "2024-03-07T08:41:42.371Z",
    email: "colinjohnclarke@hotmail.com",
    email_verified: false,
    sub: "auth0|6537822572a4168055ca5ea9",
  },
  selectedNav: {
    Dashboard: "true",
    Courses: "false",
    Profile: "false",
    Settings: "false",
    courseView: "false",
  },
  silentModeActive: true,
};
