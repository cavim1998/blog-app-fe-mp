import UserInfoCard from "./components/UserInfoCard"
import HistoryList from "./components/HistoryList"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function ProfilePage() {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto px-3 sm:px-4 md:px-4 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 py-6 sm:py-8 md:py-10">
                <div className="md:col-span-1">
                    <UserInfoCard />
                </div>
                <div className="md:col-span-2">
                    <HistoryList />
                </div>
            </div>
            <Footer />
        </div>

    )
}
