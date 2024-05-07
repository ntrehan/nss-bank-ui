import Layout from '../../../components/UserLayout';
import StudentLoanAccountGrid from '../../../components/UserStudentLoanAccountGrid'


export default function ListAccounts() {
    return (
        <Layout>
            <section>
                <StudentLoanAccountGrid />
                </section>
        </Layout>
    );
}
