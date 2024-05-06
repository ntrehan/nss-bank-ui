import Layout from '../../../components/Layout';
import CheckingAccountGrid from '../../../components/CheckingAccountGrid';
import SavingAccountGrid from '../../../components/SavingAccountGrid';
import HomeLoanAccountGrid from '../../../components/HomeLoanAccountGrid';
import StudentLoanAccountGrid from '../../../components/StudentLoanAccountGrid';

export default function ListAccounts() {
    return (
        <Layout>
            <section>
                <CheckingAccountGrid />
            </section>
            <section className="mt-8">
                <SavingAccountGrid />
            </section>
            <section className="mt-8">
                <HomeLoanAccountGrid />
            </section>
            <section className="mt-8">
                <StudentLoanAccountGrid />
            </section>
        </Layout>
    );
}
