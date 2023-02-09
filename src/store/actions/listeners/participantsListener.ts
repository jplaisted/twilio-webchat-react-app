import { Channel, Member } from "twilio-chat";
import { Dispatch } from "redux";

import { ACTION_ADD_PARTICIPANT, ACTION_REMOVE_PARTICIPANT, ACTION_UPDATE_PARTICIPANT } from "../actionTypes";

export const initParticipantsListener = (conversation: Channel, dispatch: Dispatch) => {
    conversation.addListener("memberJoined", async (participant: Member) => {
        const user = await participant.getUser();
        dispatch({
            type: ACTION_ADD_PARTICIPANT,
            payload: { participant, user }
        });
    });

    conversation.addListener("memberLeft", (participant: Member) => {
        dispatch({
            type: ACTION_REMOVE_PARTICIPANT,
            payload: { participant }
        });
    });

    const dispatchParticipantUpdate = (participant: Member) => {
        dispatch({
            type: ACTION_UPDATE_PARTICIPANT,
            payload: { participant }
        });
    };
    conversation.addListener("memberUpdated", ({ member }) => dispatchParticipantUpdate(member));
    conversation.addListener("typingStarted", dispatchParticipantUpdate);
    conversation.addListener("typingEnded", dispatchParticipantUpdate);
};
