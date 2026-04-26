"use client";

export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Faiz Nurdiana",
    "alternateName": "0xfzz",
    "url": "https://www.0xfzz.my.id",
    "jobTitle": "Backend Developer",
    "description": "Student and Backend Developer with an interest in Cybersecurity.",
    "sameAs": [
      "https://github.com/0xfzz",
      "https://www.linkedin.com/in/faiz-nurdiana-b02965231/"
    ],
    "knowsAbout": [
      "Backend Development",
      "Cybersecurity",
      "Software Engineering"
    ]
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@id": "https://www.0xfzz.my.id/#person"
    }
  };

  // Add ID to person schema for reference
  (personSchema as any)["@id"] = "https://www.0xfzz.my.id/#person";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}
