import { createSlice } from "@reduxjs/toolkit";
const initialState = [
  {
    username: "alex",
    email: "alex@example.com",
    password: "securepass",
    gender: "Male",
    age: "22",
    phone: "+1-555-123-4567",
    college: "Tech University",
    city: "San Francisco",
    attended: "Yes",
    percentage: "85",
    skills: [
      {
        title: "Eye Ball Tracking Score",
        value: "75%",
        report: "Candidate displayed good focus during the eye tracking test.",
        percentage: 75,
      },
      {
        title: "Confidence Meter",
        value: "85%",
        report:
          "Candidate exhibited high confidence levels throughout the interview.",
        percentage: 85,
      },
      {
        title: "Image Verification",
        value: "Positive",
        report: "Image and Identity verified successfully",
        percentage: null,
      },
      {
        title: "Technical Skills",
        value: "90%",
        report:
          "Candidate demonstrated strong technical proficiency in coding exercises.",
        percentage: 90,
      },
      {
        title: "Communication Skills",
        value: "80%",
        report:
          "Candidate effectively conveyed ideas and thoughts during the interview.",
        percentage: 80,
      },
    ],
  },
  {
    username: "emma",
    email: "emma@example.com",
    password: "p@ssw0rd",
    gender: "Female",
    age: "24",
    phone: "+44-123-456-7890",
    college: "Code Academy",
    city: "London",
    attended: "No",
    percentage: "72",
    skills: [
      {
        title: "Eye Ball Tracking Score",
        value: "45%",
        report: "Candidate displayed good focus during the eye tracking test.",
        percentage: 95,
      },
      {
        title: "Confidence Meter",
        value: "85%",
        report:
          "Candidate exhibited high confidence levels throughout the interview.",
        percentage: 85,
      },
      {
        title: "Image Verification",
        value: "Positive",
        report: "Image and Identity verified successfully",
        percentage: null,
      },
      {
        title: "Technical Skills",
        value: "90%",
        report:
          "Candidate demonstrated strong technical proficiency in coding exercises.",
        percentage: 90,
      },
      {
        title: "Communication Skills",
        value: "80%",
        report:
          "Candidate effectively conveyed ideas and thoughts during the interview.",
        percentage: 80,
      },
    ],
  },
  {
    username: "john",
    email: "john.doe@example.com",
    password: "password123",
    gender: "Male",
    age: "30",
    phone: "+1-555-987-6543",
    college: "State University",
    city: "New York",
    attended: "Yes",
    percentage: "60",
    skills: [
      {
        title: "Eye Ball Tracking Score",
        value: "75%",
        report: "Candidate displayed good focus during the eye tracking test.",
        percentage: 75,
      },
      {
        title: "Confidence Meter",
        value: "85%",
        report:
          "Candidate exhibited high confidence levels throughout the interview.",
        percentage: 85,
      },
      {
        title: "Image Verification",
        value: "Positive",
        report: "Image and Identity verified successfully",
        percentage: null,
      },
      {
        title: "Technical Skills",
        value: "90%",
        report:
          "Candidate demonstrated strong technical proficiency in coding exercises.",
        percentage: 90,
      },
      {
        title: "Communication Skills",
        value: "80%",
        report:
          "Candidate effectively conveyed ideas and thoughts during the interview.",
        percentage: 80,
      },
    ],
  },
  {
    username: "jane",
    email: "jane.doe@example.com",
    password: "mysecurepassword",
    gender: "Female",
    age: "28",
    phone: "1-555-234-5678",
    college: "Nationalcollege",
    city: "Los Angeles",
    attended: "No",
    percentage: "68",
    skills: [
      {
        title: "Eye Ball Tracking Score",
        value: "75%",
        report: "Candidate displayed good focus during the eye tracking test.",
        percentage: 75,
      },
      {
        title: "Confidence Meter",
        value: "85%",
        report:
          "Candidate exhibited high confidence levels throughout the interview.",
        percentage: 85,
      },
      {
        title: "Image Verification",
        value: "Positive",
        report: "Image and Identity verified successfully",
        percentage: null,
      },
      {
        title: "Technical Skills",
        value: "90%",
        report:
          "Candidate demonstrated strong technical proficiency in coding exercises.",
        percentage: 90,
      },
      {
        title: "Communication Skills",
        value: "80%",
        report:
          "Candidate effectively conveyed ideas and thoughts during the interview.",
        percentage: 80,
      },
    ],
  },
  {
    username: "mike",
    email: "mike.ross@example.com",
    password: "m1k3r0ss",
    gender: "Male",
    age: "26",
    phone: "+1-555-345-6789",
    college: "Harvard University",
    city: "Boston",
    attended: "Yes",
    percentage: "77",
    skills: [
      {
        title: "Eye Ball Tracking Score",
        value: "75%",
        report: "Candidate displayed good focus during the eye tracking test.",
        percentage: 75,
      },
      {
        title: "Confidence Meter",
        value: "85%",
        report:
          "Candidate exhibited high confidence levels throughout the interview.",
        percentage: 85,
      },
      {
        title: "Image Verification",
        value: "Positive",
        report: "Image and Identity verified successfully",
        percentage: null,
      },
      {
        title: "Technical Skills",
        value: "90%",
        report:
          "Candidate demonstrated strong technical proficiency in coding exercises.",
        percentage: 90,
      },
      {
        title: "Communication Skills",
        value: "80%",
        report:
          "Candidate effectively conveyed ideas and thoughts during the interview.",
        percentage: 80,
      },
    ],
  },
  {
    username: "sara",
    email: "sara.connor@example.com",
    password: "connorsara",
    gender: "Female",
    age: "32",
    phone: "+1-555-456-7890",
    college: "MIT",
    city: "Cambridge",
    attended: "No",
    percentage: "55",
    skills: [
      {
        title: "Eye Ball Tracking Score",
        value: "75%",
        report: "Candidate displayed good focus during the eye tracking test.",
        percentage: 75,
      },
      {
        title: "Confidence Meter",
        value: "85%",
        report:
          "Candidate exhibited high confidence levels throughout the interview.",
        percentage: 85,
      },
      {
        title: "Image Verification",
        value: "Positive",
        report: "Image and Identity verified successfully",
        percentage: null,
      },
      {
        title: "Technical Skills",
        value: "90%",
        report:
          "Candidate demonstrated strong technical proficiency in coding exercises.",
        percentage: 90,
      },
      {
        title: "Communication Skills",
        value: "80%",
        report:
          "Candidate effectively conveyed ideas and thoughts during the interview.",
        percentage: 80,
      },
    ],
  },
  {
    username: "chris",
    email: "chris.evans@example.com",
    password: "chr1sev4ns",
    gender: "Male",
    age: "29",
    phone: "+1-555-567-8901",
    college: "Stanford University",
    city: "Palo Alto",
    attended: "Yes",
    percentage: "82",
    skills: [
      {
        title: "Eye Ball Tracking Score",
        value: "75%",
        report: "Candidate displayed good focus during the eye tracking test.",
        percentage: 75,
      },
      {
        title: "Confidence Meter",
        value: "85%",
        report:
          "Candidate exhibited high confidence levels throughout the interview.",
        percentage: 85,
      },
      {
        title: "Image Verification",
        value: "Positive",
        report: "Image and Identity verified successfully",
        percentage: null,
      },
      {
        title: "Technical Skills",
        value: "90%",
        report:
          "Candidate demonstrated strong technical proficiency in coding exercises.",
        percentage: 90,
      },
      {
        title: "Communication Skills",
        value: "80%",
        report:
          "Candidate effectively conveyed ideas and thoughts during the interview.",
        percentage: 80,
      },
    ],
  },
  {
    username: "lisa",
    email: "lisa.simpson@example.com",
    password: "l1s4s1mp50n",
    gender: "Female",
    age: "21",
    phone: "+1-555-678-9012",
    college: "Springfield college",
    city: "Springfield",
    attended: "No",
    percentage: "63",
    skills: [
      {
        title: "Eye Ball Tracking Score",
        value: "75%",
        report: "Candidate displayed good focus during the eye tracking test.",
        percentage: 75,
      },
      {
        title: "Confidence Meter",
        value: "85%",
        report:
          "Candidate exhibited high confidence levels throughout the interview.",
        percentage: 85,
      },
      {
        title: "Image Verification",
        value: "Positive",
        report: "Image and Identity verified successfully",
        percentage: null,
      },
      {
        title: "Technical Skills",
        value: "90%",
        report:
          "Candidate demonstrated strong technical proficiency in coding exercises.",
        percentage: 90,
      },
      {
        title: "Communication Skills",
        value: "80%",
        report:
          "Candidate effectively conveyed ideas and thoughts during the interview.",
        percentage: 80,
      },
    ],
  },
  {
    username: "paul",
    email: "paul.mccartney@example.com",
    password: "p@ulmc",
    gender: "Male",
    age: "35",
    phone: "+1-555-789-0123",
    college: "Liverpool University",
    city: "Liverpool",
    attended: "Yes",
    percentage: "79",
    skills: [
      {
        title: "Eye Ball Tracking Score",
        value: "75%",
        report: "Candidate displayed good focus during the eye tracking test.",
        percentage: 75,
      },
      {
        title: "Confidence Meter",
        value: "85%",
        report:
          "Candidate exhibited high confidence levels throughout the interview.",
        percentage: 85,
      },
      {
        title: "Image Verification",
        value: "Positive",
        report: "Image and Identity verified successfully",
        percentage: null,
      },
      {
        title: "Technical Skills",
        value: "90%",
        report:
          "Candidate demonstrated strong technical proficiency in coding exercises.",
        percentage: 90,
      },
      {
        title: "Communication Skills",
        value: "80%",
        report:
          "Candidate effectively conveyed ideas and thoughts during the interview.",
        percentage: 80,
      },
    ],
  },
  {
    username: "anna",
    email: "anna.karenina@example.com",
    password: "annak123",
    gender: "Female",
    age: "27",
    phone: "+1-555-890-1234",
    college: "University of Moscow",
    city: "Moscow",
    attended: "No",
    percentage: "70",
    skills: [
      {
        title: "Eye Ball Tracking Score",
        value: "75%",
        report: "Candidate displayed good focus during the eye tracking test.",
        percentage: 75,
      },
      {
        title: "Confidence Meter",
        value: "85%",
        report:
          "Candidate exhibited high confidence levels throughout the interview.",
        percentage: 85,
      },
      {
        title: "Image Verification",
        value: "Positive",
        report: "Image and Identity verified successfully",
        percentage: null,
      },
      {
        title: "Technical Skills",
        value: "90%",
        report:
          "Candidate demonstrated strong technical proficiency in coding exercises.",
        percentage: 90,
      },
      {
        title: "Communication Skills",
        value: "80%",
        report:
          "Candidate effectively conveyed ideas and thoughts during the interview.",
        percentage: 80,
      },
    ],
  },
  {
    username: "james",
    email: "james.bond@example.com",
    password: "007bond",
    gender: "Male",
    age: "40",
    phone: "+44-789-456-1230",
    college: "British Intelligence Academy",
    city: "London",
    attended: "Yes",
    percentage: "88",
    skills: [
      {
        title: "Eye Ball Tracking Score",
        value: "75%",
        report: "Candidate displayed good focus during the eye tracking test.",
        percentage: 75,
      },
      {
        title: "Confidence Meter",
        value: "85%",
        report:
          "Candidate exhibited high confidence levels throughout the interview.",
        percentage: 85,
      },
      {
        title: "Image Verification",
        value: "Positive",
        report: "Image and Identity verified successfully",
        percentage: null,
      },
      {
        title: "Technical Skills",
        value: "90%",
        report:
          "Candidate demonstrated strong technical proficiency in coding exercises.",
        percentage: 90,
      },
      {
        title: "Communication Skills",
        value: "80%",
        report:
          "Candidate effectively conveyed ideas and thoughts during the interview.",
        percentage: 80,
      },
    ],
  },
  {
    username: "maria",
    email: "maria.curie@example.com",
    password: "mariecurie",
    gender: "Female",
    age: "33",
    phone: "+33-123-456-7890",
    college: "University of Paris",
    city: "Paris",
    attended: "No",
    percentage: "59",
    skills: [
      {
        title: "Eye Ball Tracking Score",
        value: "75%",
        report: "Candidate displayed good focus during the eye tracking test.",
        percentage: 75,
      },
      {
        title: "Confidence Meter",
        value: "85%",
        report:
          "Candidate exhibited high confidence levels throughout the interview.",
        percentage: 85,
      },
      {
        title: "Image Verification",
        value: "Positive",
        report: "Image and Identity verified successfully",
        percentage: null,
      },
      {
        title: "Technical Skills",
        value: "90%",
        report:
          "Candidate demonstrated strong technical proficiency in coding exercises.",
        percentage: 90,
      },
      {
        title: "Communication Skills",
        value: "80%",
        report:
          "Candidate effectively conveyed ideas and thoughts during the interview.",
        percentage: 80,
      },
    ],
  },
  {
    username: "luke",
    email: "luke.skywalker@example.com",
    password: "force123",
    gender: "Male",
    age: "25",
    phone: "+1-555-901-2345",
    college: "Jedi Academy",
    city: "Tatooine",
    attended: "Yes",
    percentage: "75",
    skills: [
      {
        title: "Eye Ball Tracking Score",
        value: "75%",
        report: "Candidate displayed good focus during the eye tracking test.",
        percentage: 75,
      },
      {
        title: "Confidence Meter",
        value: "85%",
        report:
          "Candidate exhibited high confidence levels throughout the interview.",
        percentage: 85,
      },
      {
        title: "Image Verification",
        value: "Positive",
        report: "Image and Identity verified successfully",
        percentage: null,
      },
      {
        title: "Technical Skills",
        value: "90%",
        report:
          "Candidate demonstrated strong technical proficiency in coding exercises.",
        percentage: 90,
      },
      {
        title: "Communication Skills",
        value: "80%",
        report:
          "Candidate effectively conveyed ideas and thoughts during the interview.",
        percentage: 80,
      },
    ],
  },
  {
    username: "leia",
    email: "leia.organa@example.com",
    password: "princessleia",
    gender: "Female",
    age: "28",
    phone: "+1-555-012-3456",
    college: "Alderaan University",
    city: "Alderaan",
    attended: "No",
    percentage: "67",
    skills: [
      {
        title: "Eye Ball Tracking Score",
        value: "75%",
        report: "Candidate displayed good focus during the eye tracking test.",
        percentage: 75,
      },
      {
        title: "Confidence Meter",
        value: "85%",
        report:
          "Candidate exhibited high confidence levels throughout the interview.",
        percentage: 85,
      },
      {
        title: "Image Verification",
        value: "Positive",
        report: "Image and Identity verified successfully",
        percentage: null,
      },
      {
        title: "Technical Skills",
        value: "90%",
        report:
          "Candidate demonstrated strong technical proficiency in coding exercises.",
        percentage: 90,
      },
      {
        title: "Communication Skills",
        value: "80%",
        report:
          "Candidate effectively conveyed ideas and thoughts during the interview.",
        percentage: 80,
      },
    ],
  },
  {
    username: "tony",
    email: "tony.stark@example.com",
    password: "ironman",
    gender: "Male",
    age: "38",
    phone: "+1-555-123-8901",
    college: "MIT",
    city: "New York",
    attended: "Yes",
    percentage: "81",
    skills: [
      {
        title: "Eye Ball Tracking Score",
        value: "75%",
        report: "Candidate displayed good focus during the eye tracking test.",
        percentage: 75,
      },
      {
        title: "Confidence Meter",
        value: "85%",
        report:
          "Candidate exhibited high confidence levels throughout the interview.",
        percentage: 85,
      },
      {
        title: "Image Verification",
        value: "Positive",
        report: "Image and Identity verified successfully",
        percentage: null,
      },
      {
        title: "Technical Skills",
        value: "90%",
        report:
          "Candidate demonstrated strong technical proficiency in coding exercises.",
        percentage: 90,
      },
      {
        title: "Communication Skills",
        value: "80%",
        report:
          "Candidate effectively conveyed ideas and thoughts during the interview.",
        percentage: 80,
      },
    ],
  },
  {
    username: "natasha",
    email: "natasha.romanoff@example.com",
    password: "blackwidow",
    gender: "Female",
    age: "31",
    phone: "+7-123-456-7890",
    college: "KGB Training Academy",
    city: "St. Petersburg",
    attended: "No",
    percentage: "73",
    skills: [
      {
        title: "Eye Ball Tracking Score",
        value: "75%",
        report: "Candidate displayed good focus during the eye tracking test.",
        percentage: 75,
      },
      {
        title: "Confidence Meter",
        value: "85%",
        report:
          "Candidate exhibited high confidence levels throughout the interview.",
        percentage: 85,
      },
      {
        title: "Image Verification",
        value: "Positive",
        report: "Image and Identity verified successfully",
        percentage: null,
      },
      {
        title: "Technical Skills",
        value: "90%",
        report:
          "Candidate demonstrated strong technical proficiency in coding exercises.",
        percentage: 90,
      },
      {
        title: "Communication Skills",
        value: "80%",
        report:
          "Candidate effectively conveyed ideas and thoughts during the interview.",
        percentage: 80,
      },
    ],
  },
  {
    username: "clark",
    email: "clark.kent@example.com",
    password: "superman",
    gender: "Male",
    age: "35",
    phone: "+1-555-678-0123",
    college: "Metropolis University",
    city: "Metropolis",
    attended: "Yes",
    percentage: "90",
    skills: [
      {
        title: "Eye Ball Tracking Score",
        value: "75%",
        report: "Candidate displayed good focus during the eye tracking test.",
        percentage: 75,
      },
      {
        title: "Confidence Meter",
        value: "85%",
        report:
          "Candidate exhibited high confidence levels throughout the interview.",
        percentage: 85,
      },
      {
        title: "Image Verification",
        value: "Positive",
        report: "Image and Identity verified successfully",
        percentage: null,
      },
      {
        title: "Technical Skills",
        value: "90%",
        report:
          "Candidate demonstrated strong technical proficiency in coding exercises.",
        percentage: 90,
      },
      {
        title: "Communication Skills",
        value: "80%",
        report:
          "Candidate effectively conveyed ideas and thoughts during the interview.",
        percentage: 80,
      },
    ],
  },
  {
    username: "diana",
    email: "diana.prince@example.com",
    password: "wonderwoman",
    gender: "Female",
    age: "28",
    phone: "+1-555-789-2345",
    college: "Themyscira Academy",
    city: "Themyscira",
    attended: "No",
    percentage: "65",
    skills: [
      {
        title: "Eye Ball Tracking Score",
        value: "75%",
        report: "Candidate displayed good focus during the eye tracking test.",
        percentage: 75,
      },
      {
        title: "Confidence Meter",
        value: "85%",
        report:
          "Candidate exhibited high confidence levels throughout the interview.",
        percentage: 85,
      },
      {
        title: "Image Verification",
        value: "Positive",
        report: "Image and Identity verified successfully",
        percentage: null,
      },
      {
        title: "Technical Skills",
        value: "90%",
        report:
          "Candidate demonstrated strong technical proficiency in coding exercises.",
        percentage: 90,
      },
      {
        title: "Communication Skills",
        value: "80%",
        report:
          "Candidate effectively conveyed ideas and thoughts during the interview.",
        percentage: 80,
      },
    ],
  },
  {
    username: "bruce",
    email: "bruce.wayne@example.com",
    password: "batman",
    gender: "Male",
    age: "34",
    phone: "+1-555-890-3456",
    college: "Gotham University",
    city: "Gotham",
    attended: "Yes",
    percentage: "83",
    skills: [
      {
        title: "Eye Ball Tracking Score",
        value: "75%",
        report: "Candidate displayed good focus during the eye tracking test.",
        percentage: 75,
      },
      {
        title: "Confidence Meter",
        value: "85%",
        report:
          "Candidate exhibited high confidence levels throughout the interview.",
        percentage: 85,
      },
      {
        title: "Image Verification",
        value: "Positive",
        report: "Image and Identity verified successfully",
        percentage: null,
      },
      {
        title: "Technical Skills",
        value: "90%",
        report:
          "Candidate demonstrated strong technical proficiency in coding exercises.",
        percentage: 90,
      },
      {
        title: "Communication Skills",
        value: "80%",
        report:
          "Candidate effectively conveyed ideas and thoughts during the interview.",
        percentage: 80,
      },
    ],
  },
  {
    username: "selina",
    email: "selina.kyle@example.com",
    password: "catwoman",
    gender: "Female",
    age: "30",
    phone: "+1-555-901-4567",
    college: "Gotham State",
    city: "Gotham",
    attended: "No",
    percentage: "62",
    skills: [
      {
        title: "Eye Ball Tracking Score",
        value: "75%",
        report: "Candidate displayed good focus during the eye tracking test.",
        percentage: 75,
      },
      {
        title: "Confidence Meter",
        value: "85%",
        report:
          "Candidate exhibited high confidence levels throughout the interview.",
        percentage: 85,
      },
      {
        title: "Image Verification",
        value: "Positive",
        report: "Image and Identity verified successfully",
        percentage: null,
      },
      {
        title: "Technical Skills",
        value: "90%",
        report:
          "Candidate demonstrated strong technical proficiency in coding exercises.",
        percentage: 90,
      },
      {
        title: "Communication Skills",
        value: "80%",
        report:
          "Candidate effectively conveyed ideas and thoughts during the interview.",
        percentage: 80,
      },
    ],
  },
];

const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {},
});
export default candidateSlice;
