import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { useDarkMode } from "../context/DarkModeContext";

const TermsPage = () => {
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
              TERMS AND CONDITIONS
            </h1>
          </div>
          <section
            className={`my-6 md:px-16 py-8 px-2 shadow-2xl border-2 border-solid ${borderClass} rounded-xl`}
          >
            <h2 className="text-lg font-semibold mb-4">Last Updated: [Date]</h2>
            <p className="mb-4">
              Welcome to Bias Zero! By accessing or using our website, you agree
              to comply with and be bound by the following terms and conditions.
              Please read them carefully.
            </p>

            <h2 className="text-lg font-semibold mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="mb-4">
              By accessing or using the Bias Zero website, you agree to be
              legally bound by these terms of use. If you do not agree to these
              terms, please do not use our website.
            </p>

            <h2 className="text-lg font-semibold mb-4">2. Changes to Terms</h2>
            <p className="mb-4">
              Bias Zero reserves the right to modify these terms at any time.
              Your continued use of the website following the posting of changes
              constitutes your acceptance of such changes. Please review these
              terms regularly.
            </p>

            <h2 className="text-lg font-semibold mb-4">3. Privacy Policy</h2>
            <p className="mb-4">
              Your use of the website is also subject to our Privacy Policy.
              Please review our Privacy Policy to understand our practices
              regarding the collection, use, and disclosure of your personal
              information.
            </p>

            <h2 className="text-lg font-semibold mb-4">
              4. Use of the Website
            </h2>
            <p className="mb-4">
              You agree to use the website only for lawful purposes and in
              accordance with these terms. You agree not to:
            </p>
            <div className="ml-8 mb-4">
              <p>
                • Use the website in any way that violates any applicable
                federal, state, local, or international law or regulation.
              </p>
              <p>
                • Engage in any conduct that restricts or inhibits anyone’s use
                or enjoyment of the website, or which, as determined by Bias
                Zero, may harm Bias Zero or users of the website.
              </p>
              <p>
                • Use any robot, spider, or other automatic devices, processes,
                or means to access the website for any purpose, including
                monitoring or copying any of the material on the website.
              </p>
              <p>
                • Introduce any viruses, trojan horses, worms, logic bombs, or
                other material that is malicious or technologically harmful.
              </p>
            </div>

            <h2 className="text-lg font-semibold mb-4">
              5. Intellectual Property Rights
            </h2>
            <p className="mb-4">
              The content on the Bias Zero website, including text, graphics,
              logos, images, and software, is the property of Bias Zero and is
              protected by copyright, trademark, and other intellectual property
              laws. You may not use, reproduce, distribute, modify, or create
              derivative works based on any content without Bias Zero's express
              written permission.
            </p>

            <h2 className="text-lg font-semibold mb-4">
              6. User Contributions
            </h2>
            <p className="mb-4">
              If you provide any content to the website, you grant Bias Zero a
              non-exclusive, worldwide, royalty-free, perpetual, irrevocable
              license to use, reproduce, modify, adapt, publish, translate,
              create derivative works from, distribute, and display such content
              in any media. You represent and warrant that you own or have the
              necessary rights to the content you provide and that the content
              does not violate any intellectual property rights or privacy
              rights of others.
            </p>

            <h2 className="text-lg font-semibold mb-4">7. Third-Party Links</h2>
            <p className="mb-4">
              The website may contain links to third-party websites or services
              that are not owned or controlled by Bias Zero. Bias Zero has no
              control over, and assumes no responsibility for, the content,
              privacy policies, or practices of any third-party websites or
              services. You acknowledge and agree that Bias Zero is not
              responsible or liable for any damage or loss caused by or in
              connection with the use of any such content, goods, or services
              available on or through any such websites or services.
            </p>

            <h2 className="text-lg font-semibold mb-4">
              8. Disclaimer of Warranties
            </h2>
            <p className="mb-4">
              The Bias Zero website is provided on an "as is" and "as available"
              basis. Bias Zero makes no representations or warranties of any
              kind, express or implied, as to the operation of the website or
              the information, content, or materials included on the website. To
              the full extent permissible by applicable law, Bias Zero disclaims
              all warranties, express or implied, including but not limited to
              implied warranties of merchantability and fitness for a particular
              purpose.
            </p>

            <h2 className="text-lg font-semibold mb-4">
              9. Limitation of Liability
            </h2>
            <p className="mb-4">
              In no event shall Bias Zero, its directors, employees, or agents
              be liable for any direct, indirect, incidental, special, or
              consequential damages arising out of or in connection with your
              use of the website, whether based on warranty, contract, tort, or
              any other legal theory.
            </p>

            <h2 className="text-lg font-semibold mb-4">10. Indemnification</h2>
            <p className="mb-4">
              You agree to indemnify, defend, and hold harmless Bias Zero, its
              officers, directors, employees, and agents from and against any
              claims, liabilities, damages, judgments, awards, losses, costs,
              expenses, or fees (including reasonable attorneys' fees) arising
              out of or relating to your violation of these terms or your use of
              the website.
            </p>

            <h2 className="text-lg font-semibold mb-4">11. Governing Law</h2>
            <p className="mb-4">
              These terms and your use of the website shall be governed by and
              construed in accordance with the laws of [Your Country/State],
              without regard to its conflict of law principles.
            </p>

            <h2 className="text-lg font-semibold mb-4">
              12. Dispute Resolution
            </h2>
            <p className="mb-4">
              Any dispute arising out of or relating to these terms or the
              website shall be resolved through binding arbitration in
              accordance with the rules of the [Arbitration Association],
              conducted in [Your City/State]. Each party shall bear its own
              costs and attorneys' fees.
            </p>

            <h2 className="text-lg font-semibold mb-4">13. Severability</h2>
            <p className="mb-4">
              If any provision of these terms is found to be invalid or
              unenforceable, the remaining provisions shall continue to be valid
              and enforceable.
            </p>

            <h2 className="text-lg font-semibold mb-4">14. Entire Agreement</h2>
            <p className="mb-4">
              These terms constitute the entire agreement between you and Bias
              Zero regarding your use of the website and supersede all prior
              agreements and understandings, whether written or oral, regarding
              such use.
            </p>

            <h2 className="text-lg font-semibold mb-4">
              15. Contact Information
            </h2>
            <p className="mb-4">
              If you have any questions about these terms, please contact us at:
            </p>
            <p className="mb-4">Bias Zero</p>
            <p className="mb-4">[Your Address]</p>
            <p className="mb-4">[City, State, Zip Code]</p>
            <p className="mb-4">[Email Address]</p>
            <p className="mb-4">[Phone Number]</p>

            <p className="mb-4">
              By using the Bias Zero website, you acknowledge that you have
              read, understood, and agree to be bound by these terms of use.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsPage;
