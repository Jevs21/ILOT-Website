import PolicyPage from "./PolicyPage";

const policy = {
  "title": "Terms and Conditions",
  "content": [
    {
      "title": "Purpose of the application",
      "body": [
        {
          "t": "paragraph",
          "content": "This web application is a platform for users to connect with other users and share information related to [insert purpose here]. The application is intended for personal, non-commercial use only."
        }
      ]
    },
    {
      "title": "Eligibility",
      "body": [
        {
          "t": "paragraph",
          "content": "To use this application, users must be at least 18 years old and have the legal capacity to enter into a contract."
        }
      ]
    },
    {
      "title": "Account registration",
      "body": [
        {
          "t": "paragraph",
          "content": "Users can create an account by providing their name, email address, and password. By creating an account, users agree to provide accurate and complete information and to keep their account information up-to-date."
        },
        {
          "t": "paragraph",
          "content": "Users are responsible for maintaining the security of their account and password. The application is not liable for any unauthorized access to a user's account or any loss or damage arising from a user's failure to comply with this requirement."
        }
      ]
    },
    {
      "title": "User conduct",
      "body": [
        {
          "t": "paragraph",
          "content": "Users are prohibited from using the application for any illegal or unauthorized purpose. Users must comply with all applicable laws and regulations while using the application."
        },
        {
          "t": "paragraph",
          "content": "Users are also prohibited from engaging in any behavior that may harm or disrupt the application or its users, including but not limited to: spamming, hacking, distributing viruses or other malicious code, or interfering with the operation of the application."
        },
        {
          "t": "paragraph",
          "content": "The application reserves the right to investigate and take appropriate legal action against anyone who violates these user conduct rules."
        }
      ]
    },
    {
      "title": "Intellectual property",
      "body": [
        {
          "t": "paragraph",
          "content": "The application and its content, including but not limited to text, graphics, logos, and images, are the property of the application or its licensors and are protected by applicable intellectual property laws."
        },
        {
          "t": "paragraph",
          "content": "Users are prohibited from copying, modifying, distributing, selling, or creating derivative works based on the application or its content without the express written consent of the application."
        },
        {
          "t": "paragraph",
          "content": "Any use of the application or its content not expressly authorized in these terms and conditions is a violation of these terms and conditions and may violate applicable laws."
        }
      ]
    },
    {
      "title": "Content standards",
      "body": [
        {
          "t": "paragraph",
          "content": "Users are solely responsible for any content they post or share on the application, including but not limited to text, images, and videos."
        },
        {
          "t": "paragraph",
          "content": "Users must not post or share any content that is illegal, obscene, defamatory, or violates the rights of any third party. The application reserves the right to remove any content that violates these content standards."
        },
        {
          "t": "paragraph",
          "content": "By posting or sharing content on the application, users grant the application a non-exclusive, royalty-free, perpetual, and irrevocable license to use, reproduce, modify, adapt, publish, and distribute the content in any form or medium."
        }
      ]
    },
    {
      "title": "User-generated content",
      "body": [
        {
          "t": "paragraph",
          "content": "The application may allow users to create or share content, such as comments or reviews, on the application. By posting or sharing user-generated content, users grant the application a non-exclusive, royalty-free, perpetual, and irrevocable license to use, reproduce, modify, adapt, publish, and distribute the content in any form or medium."
        },
        {
          "t": "paragraph",
          "content": "The application is not responsible for any user-generated content and does not endorse any opinions expressed in such content. The application reserves the right to remove any user-generated content that violates these terms and conditions or any applicable laws."
        }
      ]
    },
    {
      "title": "Fees and payments",
      "body": [
        {
          "t": "paragraph",
          "content": "Some features of the application may require payment of fees. By using these features, users agree to pay all applicable fees and any taxes or other charges associated with such use."
        },
        {
          "t": "paragraph",
          "content": "The application reserves the right to change its fees and payment policies at any time, and any such changes will be posted on the application."
        }
      ]
    },
    {
      "title": "Termination",
      "body": [
        {
          "t": "paragraph",
          "content": "The application reserves the right to terminate or suspend a user's account or access to the application at any time and for any reason, including but not limited to: violation of these terms and conditions, violation of applicable laws, or conduct that is harmful to the application or its users."
        },
        {
          "t": "paragraph",
          "content": "The application is not liable to any user or third party for any termination or suspension of a user's account or access to the application."
        }
      ]
    },
    {
      "title": "Disclaimers and liability limitations",
      "body": [
        {
          "t": "paragraph",
          "content": "The application is provided on an 'as is' and 'as available' basis without any warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement."
        },
        {
          "t": "paragraph",
          "content": "The application is not liable to any user or third party for any direct, indirect, incidental, special, or consequential damages arising from the use of the application or any content or services provided through the application."
        },
        {
          "t": "paragraph",
          "content": "Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of liability for incidental or consequential damages, so the above limitations or exclusions may not apply to all users."
        }
      ]
    }
  ]
}

const TermsConditions = (props) => (
  <PolicyPage policy={policy}/>
)

export default TermsConditions;