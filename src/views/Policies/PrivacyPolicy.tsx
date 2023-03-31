import PolicyPage from "./PolicyPage";

const policy = {
  "title": "Privacy Policy",
  "content": [
    {
      "title": "Types of information collected",
      "body": [
        {
          "t": "paragraph",
          "content": "We may collect the following types of information from users:"
        },
        {
          "t": "list_item",
          "content": "Name and contact information, such as email address or phone number."
        },
        {
          "t": "list_item",
          "content": "Usage data, such as pages visited, clickstream data, and search queries."
        },
        {
          "t": "list_item",
          "content": "Device and browser information, such as IP address, operating system, and browser type."
        }
      ]
    },
    {
      "title": "Purpose of collection",
      "body": [
        {
          "t": "paragraph",
          "content": "We collect this information for the following purposes:"
        },
        {
          "t": "list_item",
          "content": "To provide and improve our web application."
        },
        {
          "t": "list_item",
          "content": "To communicate with users about our services."
        },
        {
          "t": "list_item",
          "content": "To personalize content or advertisements based on users' interests or behavior."
        }
      ]
    },
    {
      "title": "Methods of collection",
      "body": [
        {
          "t": "paragraph",
          "content": "We collect information from users in the following ways:"
        },
        {
          "t": "list_item",
          "content": "Through web forms and input fields on our web application."
        },
        {
          "t": "list_item",
          "content": "Through cookies or similar technologies."
        },
        {
          "t": "list_item",
          "content": "From third-party sources, such as social media platforms or data brokers."
        }
      ]
    },
    {
      "title": "Storage and security",
      "body": [
        {
          "t": "paragraph",
          "content": "We take the following measures to store and secure user data:"
        },
        {
          "t": "list_item",
          "content": "Encrypting sensitive data in transit and at rest."
        },
        {
          "t": "list_item",
          "content": "Regularly backing up data to prevent data loss."
        },
        {
          "t": "list_item",
          "content": "Restricting access to user data to authorized personnel."
        }
      ]
    },
    {
      "title": "Sharing of information",
      "body": [
        {
          "t": "paragraph",
          "content": "We may share user data with the following types of third parties:"
        },
        {
          "t": "list_item",
          "content": "Service providers who assist us in providing and improving our web application."
        },
        {
          "t": "list_item",
          "content": "Advertisers who help us deliver personalized content or advertisements."
        },
        {
          "t": "list_item",
          "content": "Law enforcement or government agencies in response to legal requests or subpoenas."
        }
      ]
    },  {
      "title": "User rights",
      "body": [
        {
          "t": "paragraph",
          "content": "Users have the following rights with respect to their data:"
        },
        {
          "t": "list_item",
          "content": "The right to access their data."
        },
        {
          "t": "list_item",
          "content": "The right to correct inaccurate data."
        },
        {
          "t": "list_item",
          "content": "The right to delete their data."
        }
      ]
    },
    {
      "title": "Opt-out options",
      "body": [
        {
          "t": "paragraph",
          "content": "Users have the following options to opt-out of certain data collection or use practices:"
        },
        {
          "t": "list_item",
          "content": "Users can unsubscribe from marketing emails by following the instructions in the email."
        },
        {
          "t": "list_item",
          "content": "Users can adjust their browser settings to block cookies or similar technologies."
        },
        {
          "t": "list_item",
          "content": "Users can contact us directly to request that we stop using their data for certain purposes."
        }
      ]
    },
    {
      "title": "Data retention",
      "body": [
        {
          "t": "paragraph",
          "content": "We retain user data for the following periods of time:"
        },
        {
          "t": "list_item",
          "content": "Account data: Until the user requests deletion or closes their account."
        },
        {
          "t": "list_item",
          "content": "Usage data: 12 months from the date of collection."
        },
        {
          "t": "list_item",
          "content": "Payment data: As required by law."
        }
      ]
    },
    {
      "title": "Children's privacy",
      "body": [
        {
          "t": "paragraph",
          "content": "Our web application is not intended for use by children under the age of 13. We do not knowingly collect or solicit personal information from children under the age of 13. If we become aware that we have collected personal information from a child under the age of 13, we will take steps to delete the information as soon as possible."
        }
      ]
    },
    {
      "title": "Changes to the policy",
      "body": [
        {
          "t": "paragraph",
          "content": "We may update this privacy policy from time to time. When we do, we will notify users by email or by posting a notice on our web application."
        }
      ]
    }
  ]
}

const PrivacyPolicy = (props) => (
  <PolicyPage policy={policy}/>
)

export default PrivacyPolicy;