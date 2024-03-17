"use client";

import { PlanType } from "@/models/plan-models";
/* eslint-disable jsx-a11y/alt-text */
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({ family: "Inter", src: "/assets/Inter-Regular.otf" });

const styles = StyleSheet.create({
  page: {
    paddingTop: 20,
    fontFamily: "Inter",
    width: "100%",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
});

export const PDFDocument = ({ plan }: { plan?: PlanType }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text wrap={false} style={{ alignSelf: "flex-end" }}>
            Goodbye,
            world!hgdkljfhsalhgfljadhsgflhasdlhfgsaljdhgflhasgflhgasdl;hfg;aksdjgf;kjsdahf;kjhasd;kjhf;kjashdf;kjhasd;kjfhjks;adhfkjhsadk;jfhaskjdhfkjsahdfkjhsadkj;hfkjsdhfkjhasd;kjhfkjsadhfkjhsda;kjh;
          </Text>
        </View>
        <View style={styles.section}>
          <Text>{plan?.title}</Text>
        </View>
        <View style={styles.section}>
          <Text>{plan?.description}</Text>
        </View>
        <View style={styles.section}>
          {plan?.locations.map((location) => (
            <Text key={location}>{location}</Text>
          ))}
        </View>
        <View style={styles.section}>
          {plan?.participants.map((participant) => (
            <Text key={participant}>{participant}</Text>
          ))}
        </View>
        <View style={styles.section}>
          <Image src="/vercel.svg" />
        </View>
      </Page>
    </Document>
  );
};
