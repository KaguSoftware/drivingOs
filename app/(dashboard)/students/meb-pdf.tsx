import { Document, Page, Text, View, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import type { Student } from "./student.model";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12 },
  title: { fontSize: 18, marginBottom: 20 },
  row: { flexDirection: "row", marginBottom: 8 },
  label: { width: 160, fontWeight: 700 },
});

function MebDocument({ student }: { student: Student }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>MEB Enrollment Form</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Full name</Text>
          <Text>{student.fullName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>National ID</Text>
          <Text>{student.nationalId}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>License class</Text>
          <Text>{student.licenseClass}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>MEB paperwork status</Text>
          <Text>{student.mebLabel()}</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function buildMebPdf(student: Student): Promise<Buffer> {
  return renderToBuffer(<MebDocument student={student} />);
}
