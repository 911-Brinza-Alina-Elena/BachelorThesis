// page for when a patient logs in

import { DefaultButton, DocumentCard, DocumentCardActivity, DocumentCardDetails, DocumentCardTitle, DocumentCardType, IDocumentCardActivityPerson } from "@fluentui/react";
import { LoginRegisterButtonStyle } from "../../components/login-register/login-register-style";
import { logoutUser } from "../../services/auth-service";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Journal } from "../../models/journal";
import { getJournals } from "../../services/api-service";

export const PatientDashboard = () => {
    const navigate = useNavigate();
    const [journals, setJournals] = useState<Journal[]>([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            if (localStorage.getItem('userType') !== 'patient') {
                if (localStorage.getItem('userType') === 'therapist') {
                    navigate('/therapist');
                } else {
                    navigate('/login');
                }
            }
            getAndSetJournals();
        } else {
            navigate('/login');
        }
    }, [token]);

    const handleCardClick = (journalId: number) => {
        navigate(`/patient/journal/${journalId}`);
    };

    // get journals from database
    const getAndSetJournals = () => {
        const responseJournals = getJournals(token!);
        responseJournals.then((response) => {
            setJournals(response);
        }).catch((error) => {
            console.log(error);
            alert(error);
        });

    };

    const people: IDocumentCardActivityPerson[] = [
        { name: localStorage.getItem("username")!, profileImageSrc: '' }];


    console.log(journals);
    // map journals to journal cards
    const journalCards = journals.map((journal) => (
        <DocumentCard
        key = {journal._id} onClick={() => handleCardClick(journal._id!)}>
            <DocumentCardTitle title={journal.entry_title} />
            <DocumentCardDetails>
                <DocumentCardActivity 
                activity={journal.entry_date!.toString()} 
                people={people} />
            </DocumentCardDetails>
        </DocumentCard>
    ));

    const handleLogout = () => {
        logoutUser().then((response) => {
            if (response) {
                navigate('/login');
            }
        }).catch((error) => {
            console.log(error);
            navigate('/login');
        });
    };

    if (localStorage.getItem('userType') !== 'patient') {
        if (localStorage.getItem('userType') === 'therapist') {
            navigate('/therapist');
        } else {
            navigate('/login');
        }
    }
    return (
        <div>
            <h1>Patient Dashboard</h1>
            <h2>Journals</h2>
            {journalCards}
            <DefaultButton
            text="Logout"
            className={LoginRegisterButtonStyle}
            onClick={handleLogout}
            />
        </div>
    );
};