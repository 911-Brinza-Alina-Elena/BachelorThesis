// page for when a patient logs in

import { DefaultButton, DocumentCard, DocumentCardActivity, DocumentCardDetails, DocumentCardTitle, IDocumentCardActivityPerson } from "@fluentui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

    return (
        <div>
            <div>
                <h1>Patient Dashboard</h1>
                <DefaultButton
                    iconProps={{iconName: 'Add'}}
                    text="New Journal"
                    onClick={() => navigate('/patient/add-journal')}
                />
            </div>
            <h2>Journals</h2>
                {journalCards}
        </div>
    );
};