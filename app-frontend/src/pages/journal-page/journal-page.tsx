import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Journal } from "../../models/journal";
import { deleteJournal, getJournal, updateJournal } from "../../services/api-service";
import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, TextField } from "@fluentui/react";
import React from "react";

export const JournalPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [initialJournal, setInitialJournal] = useState<Journal>();
    const [journal, setJournal] = useState<Journal>();
    const token = localStorage.getItem("token");
    const [editing, setEditing] = useState<boolean>(false);
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        updateJournal(token!, journal!).then((response) => {
            setEditing(false);
            window.location.reload();
        }).catch((error) => {
            console.log(error);
            alert(error);
        });
    };

    const handleCancel = () => {
        setJournal(initialJournal);
        setEditing(false);
    };

    const handleDelete = () => {
        deleteJournal(token!, journal!._id!).then((response) => {
            setConfirmDelete(false);
            navigate('/patient');
        }).catch((error) => {
            console.log(error);
            alert(error);
        });
    }

    const onChangeTitle = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
          setJournal(journal => ({...journal!, entry_title: newValue!}));
        },
        [],
    );

    const onChangeContent = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setJournal(journal => ({...journal!, entry_text: newValue!}));
        },
        [],
    );

    if (token) {
        if (localStorage.getItem('userType') !== 'patient') {
            if (localStorage.getItem('userType') === 'therapist') {
                navigate('/therapist');
            } else {
                navigate('/login');
            }
        }
    } else {
        navigate('/login');
    }

    useEffect(() => {
        const id_val = parseInt(id!);
        getJournal(token!, id_val!).then((response) => {
            setJournal(response);
            setInitialJournal(response);
        }).catch((error) => {
            console.log(error);
            alert(error);
        });
    }, [id, token]);

    return (<div>
        {editing 
        ? (<div>
            <TextField label="Title" value={journal?.entry_title} onChange={onChangeTitle}/>
            <TextField label="Content" multiline rows={5} value={journal?.entry_text} onChange={onChangeContent}/>
            <DefaultButton text="Save" onClick={handleSave}/>
            <DefaultButton text="Cancel" onClick={handleCancel}/>
        </div>)
        : (<div>
            <h2>{journal?.entry_title}</h2>
            <p>{journal?.entry_text}</p>
            <p>Emotion: {journal?.entry_emotion}</p>
            <p>Created on: {journal?.entry_date!.toString()}</p>
            <PrimaryButton text="Edit" onClick={handleEdit}/>
            <DefaultButton text="Delete" onClick={() => setConfirmDelete(true)}/>
        </div>)}
        <Dialog
            hidden={!confirmDelete}
            onDismiss={() => setConfirmDelete(false)}
            dialogContentProps={{
                type: DialogType.normal,
                title: 'Confirm Delete',
                subText: 'Are you sure you want to delete this journal entry?'
            }}>
            <DialogFooter>
                <PrimaryButton text="Delete" onClick={handleDelete}/>
                <DefaultButton text="Cancel" onClick={() => setConfirmDelete(false)}/>
            </DialogFooter>
            </Dialog>
    </div>);
};