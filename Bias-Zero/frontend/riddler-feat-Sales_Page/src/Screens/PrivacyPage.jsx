import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { useDarkMode } from "../context/DarkModeContext";

const PrivacyPage = () => {
  const { isDarkMode } = useDarkMode();
  const bgClass = isDarkMode ? "bg-dark-mode-navy text-white" : "bg-white";
  const borderClass = isDarkMode ? "border-white" : "border-black";
  return (
    <>
      <Header />
      <div className={`${bgClass}`}>
        <div className="flex flex-col wrapper py-16">
          <div className="mb-4 text-center">
            <h1 className="text-5xl pt-24 font-bold underline">
              PRIVACY AND POLICY
            </h1>
          </div>
          <section
            className={`my-6 md:px-16 py-8 px-2 shadow-2xl border-2 border-solid ${borderClass} rounded-xl`}
          >
            <h2 className="text-lg font-semibold mb-4">Introduction</h2>
            <ul className="ml-4 mb-4">
              <li>
                Welcome to Bias Zero. Your privacy is of utmost importance to
                us. This Privacy Policy outlines how we collect, use, disclose,
                and protect your personal information when you use our Website.
              </li>
            </ul>

            <h2 className="text-lg font-semibold mb-4">
              Information We Collect
            </h2>
            <h3 className="text-lg font-semibold mb-4">
              1. Personal Information
            </h3>
            <ul className="list-disc ml-4 mb-4">
              <li className="ml-8">
                Registration Data: When you register, we may collect your name,
                email address, phone number, and other contact details.
              </li>
              <li className="ml-8">
                Usage Data: Information about how you use the Application, such
                as the features you use, your interview responses, and the time
                and duration of your sessions.
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-4">2. Technical Data</h3>
            <ul className="list-disc ml-4 mb-4">
              <li className="ml-8">
                Device Information: Information about the device you use to
                access the Application, including hardware model, operating
                system, and device identifiers.
              </li>
              <li className="ml-8">
                Log Data: Details about your use of the Application, such as IP
                address, browser type, and access times.
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-4">
              3. Cookies and Tracking Technologies
            </h3>
            <ul className="list-disc ml-4 mb-4">
              <li className="ml-8">
                We use cookies and similar technologies to enhance your
                experience, gather information about your usage, and provide
                tailored content.
              </li>
            </ul>

            <h2 className="text-lg font-semibold mb-4">
              How We Use Your Information
            </h2>
            <h3 className="text-lg font-semibold mb-4">
              1. To Provide and Improve Our Services
            </h3>
            <ul className="list-disc ml-4 mb-4">
              <li className="ml-8">Facilitate your use of the Application.</li>
              <li className="ml-8">
                Analyze usage to improve the functionality and user experience
                of the Application.
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-4">2. Communication</h3>
            <ul className="list-disc ml-4 mb-4">
              <li className="ml-8">
                Send you updates, notifications, and other information related
                to your use of the Application.
              </li>
              <li className="ml-8">
                Respond to your inquiries and provide customer support.
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-4">
              3. Compliance and Legal Obligations
            </h3>
            <ul className="list-disc ml-4 mb-4">
              <li className="ml-8">
                Ensure compliance with legal requirements and protect our legal
                rights.
              </li>
            </ul>

            <h2 className="text-lg font-semibold mb-4">
              How We Share Your Information
            </h2>
            <h3 className="text-lg font-semibold mb-4">1. Service Providers</h3>
            <ul className="list-disc ml-4 mb-4">
              <li className="ml-8">
                We may share your information with third-party service providers
                who assist us in operating the Application and providing our
                services.
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-4">
              2. Legal Requirements
            </h3>
            <ul className="list-disc ml-4 mb-4">
              <li className="ml-8">
                We may disclose your information if required by law or in
                response to legal processes.
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-4">
              3. Business Transfers
            </h3>
            <ul className="list-disc ml-4 mb-4">
              <li className="ml-8">
                In the event of a merger, acquisition, or sale of assets, your
                information may be transferred as part of the transaction.
              </li>
            </ul>

            <h2 className="text-lg font-semibold mb-4">
              Security of Your Information
            </h2>
            <ul className="ml-4 mb-4">
              <li className="ml-8">
                We take reasonable measures to protect your personal information
                from unauthorized access, use, or disclosure. However, no
                internet or email transmission is ever fully secure or
                error-free. Please take special care in deciding what
                information you send to us.
              </li>
            </ul>

            <h2 className="text-lg font-semibold mb-4">Your Choices</h2>
            <h3 className="text-lg font-semibold mb-4">
              1. Account Information
            </h3>
            <ul className="list-disc ml-4 mb-4">
              <li className="ml-8">
                You can update or correct your account information at any time
                by logging into your account.
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-4">2. Cookies</h3>
            <ul className="list-disc ml-4 mb-4">
              <li className="ml-8">
                Most web browsers are set to accept cookies by default. You can
                usually modify your browser settings to decline cookies if you
                prefer.
              </li>
              <li className="ml-8">
                Children's Privacy: Our Website is not intended for use by
                individuals under the age of 13. We do not knowingly collect
                personal information from children under 13. If we become aware
                that we have inadvertently received personal information from a
                child under the age of 13, we will delete such information from
                our records.
              </li>
            </ul>

            <h2 className="text-lg font-semibold mb-4">
              Changes to This Privacy Policy
            </h2>
            <ul className="list-disc ml-4 mb-4">
              <li className="ml-8">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Effective Date" at the top.
              </li>
            </ul>

            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <ul className="list-disc ml-4 mb-4">
              <li className="ml-8">
                If you have any questions or concerns about this Privacy Policy
                or our data practices, please contact us at:
              </li>
            </ul>

            <h3 className="text-md font-semibold mb-1">
              Email: [Insert Email Address]
            </h3>
            <h3 className="text-md font-semibold mb-4">
              Address: [Insert Physical Address]
            </h3>
            <ul className="ml-4 mb-4">
              <li>
                By using Bias Zero, you acknowledge that you have read and
                understood this Privacy Policy.
              </li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPage;
