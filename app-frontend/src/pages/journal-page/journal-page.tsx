import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, TextField } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ANGER_COLOR, FEAR_COLOR, JOY_COLOR, LOVE_COLOR, SADNESS_COLOR, SURPRISE_COLOR } from "../../constants";
import { Journal } from "../../models/journal";
import { deleteJournal, getJournal, updateJournal } from "../../services/api-service";
import { buttonsClassName, cancelButtonClassName, deleteButtonClassName, editButtonClassName, editButtonsClassName, editInputClassName, editTitleInputStyle, editJournalClassName, saveButtonClassName, viewJournalClassName, editContentInputStyle, confirmationsClassName, cofirmationStyle, confirmationDeleteButtonClassName, confirmationCancelButtonClassName } from "./journal-page-style";

export const JournalPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [initialJournal, setInitialJournal] = useState<Journal>();
    const [journal, setJournal] = useState<Journal>();
    const token = localStorage.getItem("token");
    const [editing, setEditing] = useState<boolean>(false);
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

    const [emotionColor, setEmotionColor] = useState<string>();

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

    const handleEmotionColor = () => {
        if (journal?.entry_emotion === "anger") {
            setEmotionColor(ANGER_COLOR);
        } else if (journal?.entry_emotion === "fear") {
            setEmotionColor(FEAR_COLOR);
        } else if (journal?.entry_emotion === "joy") {
            setEmotionColor(JOY_COLOR);
        } else if (journal?.entry_emotion === "love") {
            setEmotionColor(LOVE_COLOR);
        } else if (journal?.entry_emotion === "sadness") {
            setEmotionColor(SADNESS_COLOR);
        } else if (journal?.entry_emotion === "surprise") {
            setEmotionColor(SURPRISE_COLOR);
        }
    }

    useEffect(() => {
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
        const id_val = parseInt(id!);
        getJournal(token!, id_val!).then((response) => {
            setJournal(response);
            setInitialJournal(response);
        }).catch((error) => {
            console.log(error);
            alert(error);
        });
    }, [id, token]);

    useEffect(() => {
        handleEmotionColor();
    }, [journal]);

    return (
      <div>
        {editing ? (
          <div className={editJournalClassName}>
            <TextField
              className={editInputClassName}
              label="Title"
              value={journal?.entry_title}
              onChange={onChangeTitle}
              styles={editTitleInputStyle}
            />
            <TextField
              className={editInputClassName}
              label="Content"
              multiline
              rows={10}
              value={journal?.entry_text}
              onChange={onChangeContent}
              styles={editContentInputStyle}
            />
            <div className={editButtonsClassName}>
              <DefaultButton
                className={saveButtonClassName}
                text="Save"
                onClick={handleSave}
              />
              <DefaultButton
                className={cancelButtonClassName}
                text="Cancel"
                onClick={handleCancel}
              />
            </div>
          </div>
        ) : (
          <div className={viewJournalClassName}>
            <h1>{journal?.entry_title}</h1>
            <p>{journal?.entry_text}</p>
            <p style={{ color: emotionColor }}>
              Emotion: {journal?.entry_emotion}
            </p>
            <p>Created on: {journal?.entry_date!.toString()}</p>
            <div className={buttonsClassName}>
              <PrimaryButton
                className={editButtonClassName}
                text="Edit"
                onClick={handleEdit}
              />
              <DefaultButton
                iconProps={{ iconName: "Delete" }}
                className={deleteButtonClassName}
                text="Delete"
                onClick={() => setConfirmDelete(true)}
              />
            </div>
          </div>
        )}
        <Dialog
          modalProps={{
            className: confirmationsClassName,
          }}
          hidden={!confirmDelete}
          onDismiss={() => setConfirmDelete(false)}
          dialogContentProps={{
            type: DialogType.normal,
            title: "Confirm Delete",
            subText: "Are you sure you want to delete this journal entry?",
            className: confirmationsClassName,
          }}
          styles={cofirmationStyle}
        >
          <DialogFooter>
            <PrimaryButton
              className={confirmationDeleteButtonClassName}
              text="Delete"
              onClick={handleDelete}
            />
            <DefaultButton
              className={confirmationCancelButtonClassName}
              text="Cancel"
              onClick={() => setConfirmDelete(false)}
            />
          </DialogFooter>
        </Dialog>
      </div>
    );
};