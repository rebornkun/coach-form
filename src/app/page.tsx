"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";

// Define interface for form questions
interface FormQuestion {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
}

// Form sections and their questions
// Chicago Giants team colors - Used in inline styling throughout the app
// These values are applied directly in the component styles

const formSections = [
  {
    id: 1,
    title: "Personal Details",
    questions: [
      { id: "fullName", label: "Fan Name", type: "text", required: true },
      { id: "email", label: "Email address", type: "email", required: true },
      { id: "phone", label: "Phone number", type: "tel", required: true },
      {
        id: "socialMedia",
        label: "Social media handles (X, Facebook, Instagram)",
        type: "text",
      },
      {
        id: "sex",
        label: "Sex",
        type: "select",
        options: ["Select", "Male", "Female", "Prefer not to say"],
        required: true,
      },
      { id: "age", label: "Age", type: "number", required: true },
      {
        id: "maritalStatus",
        label: "Marital status",
        type: "select",
        options: [
          "Select",
          "Single",
          "Married",
          "Divorced",
          "Widowed",
          "Prefer not to say",
        ],
        required: true,
      },
      {
        id: "address",
        label: "Home address",
        type: "textarea",
        required: true,
      },
    ],
  },
  {
    id: 2,
    title: "Fan Engagement Experience",
    questions: [
      {
        id: "prevExperience",
        label:
          "Have you previously worked as a fan coach or in a similar role? If yes, please describe your experience.",
        type: "textarea",
        required: true,
      },
      {
        id: "engagementPlan",
        label: "How do you plan to engage with fans and promote team spirit?",
        type: "textarea",
        required: true,
      },
      {
        id: "socialMediaUse",
        label:
          "What social media platforms do you use to connect with fans, and how do you intend to leverage them for fan coaching?",
        type: "textarea",
        required: true,
      },
    ],
  },
  {
    id: 3,
    title: "Team Knowledge and Passion",
    questions: [
      {
        id: "motivation",
        label:
          "Why do you want to be a fan coach for Willy Adames with the Chicago Giants?",
        type: "textarea",
        required: true,
      },
      {
        id: "playerKnowledge",
        label:
          "As a potential fan coach, what do you know about Willy Adames' baseball career, statistics, and recent performance with the Chicago Giants?",
        type: "textarea",
        required: true,
      },
      {
        id: "stayUpdated",
        label:
          "How do you stay updated about the player's activities and developments?",
        type: "textarea",
        required: true,
      },
    ],
  },
  {
    id: 4,
    title: "Coaching and Leadership Skills",
    questions: [
      {
        id: "coachingExperience",
        label:
          "Do you have any experience in coaching or leading groups? If yes, please elaborate.",
        type: "textarea",
        required: true,
      },
      {
        id: "conflictHandling",
        label: "How would you handle conflicts or disagreements among fans?",
        type: "textarea",
        required: true,
      },
      {
        id: "motivationStrategies",
        label:
          "What strategies would you use to motivate and inspire fans to support Willy Adames during home and away games?",
        type: "textarea",
        required: true,
      },
    ],
  },
  {
    id: 5,
    title: "Availability and Commitment",
    questions: [
      {
        id: "weeklyHours",
        label: "How many hours per week can you dedicate to fan coaching?",
        type: "number",
        required: true,
      },
      {
        id: "eventAvailability",
        label:
          "Are you available to attend games, events, or online meetings? If yes, please specify your availability.",
        type: "textarea",
        required: true,
      },
      {
        id: "commitmentDuration",
        label: "How long do you plan to commit to being a fan coach?",
        type: "textarea",
        required: true,
      },
    ],
  },
  {
    id: 6,
    title: "Additional Information",
    questions: [
      {
        id: "additionalInfo",
        label:
          "Is there anything else you'd like to share about yourself or your qualifications as a fan coach?",
        type: "textarea",
      },
    ],
  },
];

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateSection = () => {
    const currentQuestions = formSections[currentSection].questions;
    const newErrors: { [key: string]: string | null } = {};
    let isValid = true;

    currentQuestions.forEach((question) => {
      if (question.required && !formData[question.id]) {
        newErrors[question.id] = `${question.label} is required`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  console.log(currentSection);
  console.log(formSections.length);

  const nextSection = () => {
    if (validateSection()) {
      if (currentSection < formSections.length) {
        setCurrentSection((prev) => prev + 1);
        window.scrollTo(0, 0);
      }
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all form sections, not just the current one
    const newErrors: { [key: string]: string | null } = {};
    let isValid = true;
    let firstInvalidSection = -1;

    // Loop through all sections and validate each required field
    formSections.forEach((section, sectionIndex) => {
      section.questions.forEach((question) => {
        if (question.required && !formData[question.id]) {
          newErrors[question.id] = `${question.label} is required`;
          isValid = false;

          // Keep track of the first section with an error
          if (firstInvalidSection === -1) {
            firstInvalidSection = sectionIndex;
          }
        }
      });
    });

    setErrors(newErrors);

    if (isValid) {
      try {
        // Send data to email API endpoint
        const response = await fetch("/api/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formData,
            formSections,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to send email");
        }

        console.log("Form submitted and email sent:", result);
        setSubmitted(true);

        // Reset form
        // setCurrentSection(0);
        setFormData({});
        setErrors({});
      } catch (error) {
        console.error("Error sending email:", error);
        alert("Failed to send your application. Please try again.");
      }
    } else if (
      firstInvalidSection !== -1 &&
      firstInvalidSection !== currentSection
    ) {
      // Navigate to the first section with errors
      setCurrentSection(firstInvalidSection);
      window.scrollTo(0, 0);
    }
  };

  const renderFormField = (question: FormQuestion) => {
    // Define a base class and a class for error state
    const baseClass =
      "w-full px-4 py-2 text-black-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#CC0000]";
    const errorClass = errors[question.id]
      ? "border-red-500"
      : "border-gray-300";

    switch (question.type) {
      case "text":
      case "email":
      case "tel":
      case "number":
        return (
          <input
            type={question.type}
            id={question.id}
            name={question.id}
            value={formData[question.id] || ""}
            onChange={handleChange}
            className={`${baseClass} ${errorClass}`}
            required={question.required}
          />
        );
      case "textarea":
        return (
          <textarea
            id={question.id}
            name={question.id}
            value={formData[question.id] || ""}
            onChange={handleChange}
            rows={4}
            className={`${baseClass} ${errorClass}`}
            required={question.required}
          ></textarea>
        );
      case "select":
        return (
          <select
            id={question.id}
            name={question.id}
            value={formData[question.id] || ""}
            onChange={handleChange}
            className={`${baseClass} ${errorClass}`}
            required={question.required}
          >
            {question.options?.map((option, index) => (
              <option key={index} value={option === "Select" ? "" : option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-gray-50 p-4"
        style={{
          backgroundImage: "url('/baseball-texture-bg.jpg')",
          backgroundSize: "cover",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(245,245,245,0.92)",
        }}
      >
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center border-4 border-[#0E3386]">
          <div className="mb-6 relative">
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
              <Image
                src="/baseball-logo.png"
                alt="Chicago Giants Logo"
                width={80}
                height={80}
                className="mx-auto"
              />
            </div>
            <Image
              src="/willy-adames.png"
              alt="Willy Adames"
              objectFit="cover"
              objectPosition="center top"
              width={150}
              height={150}
              className="mx-auto rounded-full border-4 border-[#0E3386]"
            />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-[#0E3386]">
            Application Submitted!
          </h2>
          <p className="mt-3 text-lg">
            We&apos;ve received your application and we&apos;ll be in touch
            soon!
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Thank you for your interest in being a fan coach for Willy Adames!
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setCurrentSection(0);
              setFormData({});
            }}
            className="px-6 py-2 bg-[#0E3386] text-white font-medium rounded-md hover:bg-[#092a6b] transition duration-300 border-2 border-[#CC0000]"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-satoshi"
      style={{
        backgroundImage: "url('/baseball-texture-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "bottom center",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0,0,0,0.22)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="mb-4 mx-auto w-24 h-24 relative">
            <Image
              src="/baseball-logo.png"
              alt="Chicago Giants Logo"
              width={1000}
              height={1000}
              className="mx-auto"
            />
          </div>
          <h1 className="font-helvetica_compressed text-3xl font-bold text-[#0E3386] sm:text-4xl">
            CHICAGO GIANTS
          </h1>
          <h2 className=" text-2xl font-bold text-[#CC0000] mt-2">
            Fan Coach Application
          </h2>
          <p className="mt-3 text-lg text-white-50">
            Become a <span className="font-semibold">Fan Coach</span> for Willy
            Adames
          </p>
          <div className="flex justify-center mt-4">
            <div className="px-4 py-1 bg-[#FFD700] rounded-full text-[#0E3386] font-bold inline-block">
              #20 | Shortstop
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {formSections.map((section, index) => (
              <div
                key={section.id}
                className={`flex flex-col items-center ${
                  index <= currentSection ? "text-[#CC0000]" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 flex text-white-50 items-center justify-center rounded-full border-2 ${
                    index <= currentSection
                      ? "border-[#0E3386] bg-[#0E3386] text-white"
                      : "border-gray-300"
                  } mb-1`}
                >
                  {index < currentSection ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="text-xs text-white-50 hidden sm:block">
                  {section.title}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-[#CC0000] h-2.5 rounded-full"
              style={{
                width: `${(currentSection / formSections.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Form */}

        <div className="bg-white-500/60 backdrop-blur-[3px] shadow overflow-hidden rounded-[14px] border-4 border-[#0E3386]">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl font-semibold mb-6 text-[#0E3386] flex items-center">
              <span>
                Section {currentSection + 1}:{" "}
                {formSections[currentSection].title}
              </span>
            </h2>

            <form>
              <div className="space-y-6">
                {formSections[currentSection]?.questions.map((question) => (
                  <div key={question?.id} className="space-y-2">
                    <label
                      htmlFor={question?.id}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {question?.label}{" "}
                      {question?.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    {renderFormField(question)}
                    {errors[question?.id] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[question?.id]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-between">
                {currentSection > 0 && (
                  <button
                    type="button"
                    onClick={prevSection}
                    className="px-5 py-2 border border-[#0E3386] rounded-md shadow-sm text-sm font-medium text-[#0E3386] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E3386]"
                  >
                    Previous
                  </button>
                )}
                <div className="flex-1"></div>
                <button
                  type="button"
                  onClick={
                    currentSection === formSections.length - 1
                      ? (e) => {
                          // Create synthetic form event to pass to handleSubmit
                          const form = e.currentTarget.closest("form");
                          if (form) {
                            const formEvent = new Event("submit", {
                              bubbles: true,
                              cancelable: true,
                            }) as unknown as FormEvent<HTMLFormElement>;
                            handleSubmit(formEvent);
                          }
                        }
                      : nextSection
                  }
                  className="px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#CC0000] hover:bg-[#a80000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD700]"
                >
                  {currentSection === formSections.length - 1
                    ? "Submit Application"
                    : "Next"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
