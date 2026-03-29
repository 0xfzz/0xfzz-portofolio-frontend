import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Link 
} from "@react-pdf/renderer";

// Define styles for ATS-friendly layout
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#323235",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#1a1a1a",
  },
  title: {
    fontSize: 14,
    color: "#5F5F61",
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    fontSize: 9,
    color: "#5F5F61",
  },
  link: {
    color: "#777E65",
    textDecoration: "none",
  },
  section: {
    marginTop: 12,
    marginBottom: 8,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 3,
    marginBottom: 8,
    color: "#1a1a1a",
  },
  entry: {
    marginBottom: 10,
    width: "100%",
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  entryTitle: {
    fontSize: 10,
    fontWeight: "bold",
  },
  entrySubtitle: {
    fontSize: 10,
    color: "#5F5F61",
    marginBottom: 3,
  },
  entryPeriod: {
    fontSize: 9,
    color: "#5F5F61",
  },
  bulletPointContainer: {
    marginTop: 2,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 1,
    paddingLeft: 8,
  },
  bullet: {
    width: 8,
    fontSize: 9,
  },
  bulletText: {
    fontSize: 9,
    lineHeight: 1.4,
  },
  bulletTextFlex: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.4,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.4,
    marginBottom: 4,
  },
  skillCategory: {
    marginBottom: 4,
  },
  skillLabel: {
    fontWeight: "bold",
  },
});

const cleanUrl = (url: string) => {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
};

interface ResumePDFProps {
  data: {
    name: string;
    title: string;
    contact: any;
    summary: string;
    work: any[];
    otherExperiences: any[];
    education: any[];
    skills: any;
    awards: any[];
  };
}

export function ResumePDF({ data }: ResumePDFProps) {
  return (
    <Document title={`${data.name} - Resume`}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.contactRow}>
            {data.contact.methods.map((method: any, idx: number) => (
              <View key={method.platform} style={{ flexDirection: "row" }}>
                {idx > 0 && <Text>  |  </Text>}
                <Text>{method.platform === "Email" ? "" : `${method.platform}: `}</Text>
                <Link src={method.href} style={styles.link}>
                  {cleanUrl(method.href)}
                </Link>
              </View>
            ))}
          </View>
        </View>

        {/* Professional Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summaryText}>{data.summary}</Text>
        </View>

        {/* Work Activity */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {data.work.map((exp, idx) => (
            <View key={idx} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{exp.role}</Text>
                <Text style={styles.entryPeriod}>{exp.period}</Text>
              </View>
              <Text style={styles.entrySubtitle}>{exp.company}</Text>
              <View style={styles.bulletPointContainer}>
                {exp.description.map((point: string, pIdx: number) => (
                  <View key={pIdx} style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletTextFlex}>{point}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Other Experience */}
        {data.otherExperiences && data.otherExperiences.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>Other Experience</Text>
            {data.otherExperiences.map((exp: any, idx: number) => (
              <View key={idx} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{exp.role}</Text>
                  <Text style={styles.entryPeriod}>{exp.period}</Text>
                </View>
                <Text style={styles.entrySubtitle}>{exp.company}</Text>
                <View style={styles.bulletPointContainer}>
                  {exp.description.map((point: string, pIdx: number) => (
                    <View key={pIdx} style={styles.bulletPoint}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletTextFlex}>{point}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, idx) => (
            <View key={idx} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{edu.degree}</Text>
                <Text style={styles.entryPeriod}>{edu.period}</Text>
              </View>
              <Text style={styles.entrySubtitle}>{edu.institution} {edu.location ? `| ${edu.location}` : ""}</Text>
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Skills & Expertise</Text>
          <View style={styles.skillCategory}>
            <Text style={styles.summaryText}>
              <Text style={styles.skillLabel}>Technical: </Text>
              {data.skills.hard.join(", ")}
            </Text>
          </View>
          <View style={styles.skillCategory}>
            <Text style={styles.summaryText}>
              <Text style={styles.skillLabel}>Tools: </Text>
              {data.skills.tools.join(", ")}
            </Text>
          </View>
          <View style={styles.skillCategory}>
            <Text style={styles.summaryText}>
              <Text style={styles.skillLabel}>Interpersonal: </Text>
              {data.skills.soft.join(", ")}
            </Text>
          </View>
        </View>

        {/* Awards */}
        {data.awards.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>Awards & Achievements</Text>
            {data.awards.map((award, idx) => (
              <View key={idx} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{award.title}</Text>
                  <Text style={styles.entryPeriod}>{award.date}</Text>
                </View>
                <Text style={styles.entrySubtitle}>{award.issuer}</Text>
                <Text style={styles.bulletText}>{award.description}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
