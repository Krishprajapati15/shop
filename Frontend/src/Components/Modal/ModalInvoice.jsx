import React from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

const ModalInvoice = (props) => {
    const { InvoiceDetails } = props;
    // Create styles
    const styles = StyleSheet.create({
        page: {
            backgroundColor: '#E4E4E4',
        },
        section: {
            margin: 10,
            padding: 10,
        },
        boxHeader: {
            margin: 10,
            padding: 10,
            backgroundColor: "#e0e0e0",
            height: "120px",
            width: "45%",
            fontSize: "11px"
        },
        // table:
        table: {
            marginLeft: 10,
            width: '100%',
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
        },
        header: {
            borderTop: 'none',
        },
        bold: {
            fontWeight: 'bold',
        },
        // So Declarative and unDRY 👌
        col1: {
            border: '1px solid #000000',
            width: '8%',
            fontSize: "11px",
            padding: "3px"
        },
        col2: {
            border: '1px solid #000000',
            width: '30%',
            fontSize: "11px",
            padding: "3px"
        },
        col3: {
            border: '1px solid #000000',
            width: '10%',
            fontSize: "11px",
            padding: "3px"
        },
        col4: {
            border: '1px solid #000000',
            width: '15%',
            fontSize: "11px",
            padding: "3px"
        },
        col5: {
            border: '1px solid #000000',
            width: '15%',
            fontSize: "11px",
            padding: "3px"
        },
        col1TotalView: {
            border: '1px solid #000000',
            width: '78%',
            fontSize: "11px",
            padding: "3px",
            textAlign: "right"
        },
        col1Amount: {
            border: '1px solid #000000',
            width: '15%',
            fontSize: "11px",
            padding: "3px"
        },
    });
    const DataTable = ({ data }) => {
        return (
            <View style={styles.table}>
                <View style={[styles.row, styles.bold, styles.header]}>
                    <Text style={styles.col1}>S.no</Text>
                    <Text style={styles.col2}>Description</Text>
                    <Text style={styles.col3}>Quantity</Text>
                    <Text style={styles.col4}>Unit Price</Text>
                    <Text style={styles.col5}>Discount</Text>
                    <Text style={styles.col5}>Amount</Text>
                </View>
                {data.map((row, i) => (
                    <View key={i} style={styles.row} wrap={false}>
                        <Text style={styles.col1}>{i + 1}</Text>
                        <Text style={styles.col2}>{row.c_name}</Text>
                        <Text style={styles.col3}>{row.c_quantity}</Text>
                        <Text style={styles.col4}>
                            <Text style={styles.bold}>{row.c_unit_price}</Text>
                        </Text>
                        <Text style={styles.col5}>{row.c_discount}%</Text>
                        <Text style={styles.col5}>{row.c_subtotal}</Text>
                    </View>
                ))}
                <View style={[styles.row, styles.bold, styles.header]}>
                    <Text style={styles.col1TotalView}>Total</Text>
                    <Text style={styles.col1Amount}>{InvoiceDetails.custmrDetails["cartItems"].reduce((acc, obj) => { return (parseFloat(acc) + parseFloat(obj.c_subtotal)).toFixed(2) }, 0)}</Text>
                </View>
            </View>
        )
    }
    const PDFDocument = () => {
        return (<Document title={`SH_OD${InvoiceDetails.custmrDetails.cust_order_id}`}>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Invoice No: SH_OD{InvoiceDetails.custmrDetails.cust_order_id}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={styles.boxHeader}>
                        <Text style={{ color: "rgb(107 114 128)", fontSize: "18px" }}>Billing Information</Text>
                        <Text style={{ margin: "3px" }}>Company Name</Text>
                        <Text style={{ margin: "3px" }}>123 Main Street</Text>
                        <Text style={{ margin: "3px" }}>Anytown, CA 12345</Text>
                        <Text style={{ margin: "3px" }}>(555) 555-5555</Text>
                    </View>
                    <View style={styles.boxHeader}>
                        <Text style={{ color: "rgb(107 114 128)", fontSize: "18px" }}>Client Information</Text>
                        <Text style={{ margin: "3px" }}>{InvoiceDetails.custmrDetails.cust_name} </Text>
                        <Text style={{ margin: "3px" }}>{InvoiceDetails.custmrDetails.cust_contact}</Text>
                        <Text style={{ margin: "3px" }}>{InvoiceDetails.custmrDetails.cust_email}</Text>
                    </View>
                </View>
                {/* table */}
                <Text style={{ color: "rgb(107 114 128)", fontSize: "18px", marginTop: 20, marginBottom: 20, marginLeft: 10 }}>Order Details</Text>
                <DataTable data={InvoiceDetails.custmrDetails["cartItems"]} />
            </Page>
        </Document>)
    }
    return (
        <dialog id={props.id} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{props.title}</h3>
                {/* <div>
                    <PDFViewer>
                    <PDFDocument />
                    </PDFViewer>
                </div> */}
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <PDFDownloadLink document={<PDFDocument />} fileName={`SH_OD${InvoiceDetails.custmrDetails.cust_order_id}.pdf`}>
                            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <div className="btn mx-2 px-6 btn-sm bg-success text-white">Download</div>
                            )}
                        </PDFDownloadLink>
                        
                        <button className="btn mx-2 px-6 btn-sm">cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default ModalInvoice