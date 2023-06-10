import { DefaultButton, Dialog, DialogFooter, DialogType, IconButton, List, Persona, PersonaSize, PrimaryButton, TextField } from "@fluentui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../../models/user";
import { addPatient, deletePatient, getTherapistPatients } from "../../services/api-service";
import { get } from "http";
import { addButtonClassName, deleteIconClassName, patientDivClassName, patientPersonaClassName, patientsDivClassName, therapistDashboardMainDivClassName } from "./therapist-dashboard-style";

// page for when the therapist logs in
export const TherapistDashboard = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState<User[]>([]);
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const [deletePatientId, setDeletePatientId] = useState<number>();
    const [newPatientEmail, setNewPatientEmail] = useState<string>("");
    const [addPatientDialogOpen, setAddPatientDialogOpen] = useState<boolean>(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            if (localStorage.getItem('userType') !== 'therapist') {
                if (localStorage.getItem('userType') === 'patient') {
                    navigate('/patient');
                } else {
                    navigate('/login');
                }
            }
            getAndSetPatients();
        } else {
            navigate('/login');
        }
    }, [token]);

    const getAndSetPatients = () => {
        getTherapistPatients(token!).then((response) => {
            setPatients(response);
        })
        .catch((error) => {
            console.log(error);
            alert(error);
        });
    };

    const handlePatientClick = (patientId: number) => {
        navigate(`/therapist/patient/${patientId}`);
    };

    const handleDeletePatient = (patientId: number) => {
        deletePatient(token!, patientId).then(() => {
            getAndSetPatients();
            handleDeletePatientDialogClose();
        })
        .catch((error) => {
            console.log(error);
            alert(error);
        }
        );
    };

    const renderPatientItem = (patient?: User) => {
        return (
          <div className={patientDivClassName}>
            <Persona
              className={patientPersonaClassName}
              text={`${patient?.first_name} ${patient?.last_name}`}
              secondaryText={`Email: ${patient?.email}`}
              size={PersonaSize.size72}
              onClick={() => handlePatientClick(patient?.id!)}
            />
            <IconButton
              className={deleteIconClassName}
              iconProps={{ iconName: "Delete" }}
              title="Delete"
              ariaLabel="Delete"
              onClick={() => {
                setDeletePatientId(patient?.id!);
                setConfirmDelete(true);
              }}
            />
          </div>
        );
    };

    const handleAddPatientClick = () => {
        setAddPatientDialogOpen(true);
    };

    const handleAddPatientDialogClose = () => {
        setAddPatientDialogOpen(false);
        setNewPatientEmail("");
    };

    const handleAddPatientDialogSubmit = () => {
        addPatient(token!, newPatientEmail).then(() => {
            handleAddPatientDialogClose();
            getAndSetPatients();
        })
        .catch((error) => {
            console.log(error);
            alert(error);
        });
    };

    const handleDeletePatientDialogClose = () => {
        setConfirmDelete(false);
        setDeletePatientId(undefined);
    };

    return (
        <div className={therapistDashboardMainDivClassName}>
            <h1>Therapist Dashboard</h1>
            <div className={patientsDivClassName}>
                <h2>Patients</h2>
                <List items={patients} onRenderCell={(item) => renderPatientItem(item)} />
            </div>
            <DefaultButton
                className={addButtonClassName}
                text="Add patient"
                iconProps={{ iconName: "Add" }}
                    onClick={handleAddPatientClick} />
            <Dialog
                hidden={!addPatientDialogOpen}
                onDismiss={handleAddPatientDialogClose}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: "Add Patient",
                    subText: "Enter the email of the patient you want to add.",
                }}
                modalProps={{
                    isBlocking: true,
                }}
            >
                <TextField
                    label="Email"
                    value={newPatientEmail}
                    onChange={(event, newValue) => setNewPatientEmail(newValue!)}
                />
                <DialogFooter>
                    <PrimaryButton text="Add" onClick={handleAddPatientDialogSubmit} />
                    <DefaultButton text="Cancel" onClick={handleAddPatientDialogClose} />
                </DialogFooter>
            </Dialog>
            <Dialog
              hidden={!confirmDelete}
              onDismiss={() => setConfirmDelete(false)}
              dialogContentProps={{
                type: DialogType.normal,
                title: "Confirm Delete",
                subText: "Are you sure you want to delete this patient?",
              }}
            >
              <DialogFooter>
                <PrimaryButton text="Delete" onClick={() =>handleDeletePatient(deletePatientId!)} />
                <DefaultButton
                  text="Cancel"
                  onClick={handleDeletePatientDialogClose}
                />
              </DialogFooter>
            </Dialog>
        </div>
    );
};