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
        <Text style={styles.title}>MEB Kayıt Formu</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Ad Soyad</Text>
          <Text>{student.fullName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>T.C. Kimlik No</Text>
          <Text>{student.nationalId}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Ehliyet sınıfı</Text>
          <Text>{student.licenseClass}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>MEB evrak durumu</Text>
          <Text>{student.mebLabel()}</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function buildMebPdf(student: Student): Promise<Buffer> {
  return renderToBuffer(<MebDocument student={student} />);
}
