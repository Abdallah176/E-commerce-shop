import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Title from "../components/Title";
import ContactTitle from "../components/Contact/ContactTitle";
import ContactForm from "../components/Contact/ContactForm";
import GoogleMap from "../components/Contact/GoogleMap";

export default function Contact() {
    return (
        <div className="px-4 sm:px-8 md:px-16">
            <ToastContainer position="top-right" autoClose={3000} />
            <ContactTitle />
            <ContactForm />
            <GoogleMap />
        </div>
    );
}

