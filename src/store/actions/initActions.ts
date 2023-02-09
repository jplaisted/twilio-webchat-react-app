import { Client } from "twilio-chat";
import { Dispatch } from "redux";
import log from "loglevel";

import { initMessagesListener } from "./listeners/messagesListener";
import { initParticipantsListener } from "./listeners/participantsListener";
import { initConversationListener } from "./listeners/conversationListener";
import { ConfigState, EngagementPhase } from "../definitions";
import { initClientListeners } from "./listeners/clientListener";
import { notifications } from "../../notifications";
import { ACTION_START_SESSION, ACTION_LOAD_CONFIG } from "./actionTypes";
import { addNotification, changeEngagementPhase } from "./genericActions";
import { MESSAGES_LOAD_COUNT } from "../../constants";

export function initConfig(config: ConfigState) {
    return {
        type: ACTION_LOAD_CONFIG,
        payload: config
    };
}

export function initSession({ token, conversationSid }: { token: string; conversationSid: string }) {
    return async (dispatch: Dispatch) => {
        let conversationsClient: Client;
        let conversation;
        let participants;
        let users;
        let messages;

        try {
            conversationsClient = await Client.create(token);
            try {
                conversation = await conversationsClient.getChannelBySid(conversationSid);
            } catch (e) {
                dispatch(addNotification(notifications.failedToInitSessionNotification("Couldn't load conversation")));
                dispatch(changeEngagementPhase({ phase: EngagementPhase.PreEngagementForm }));
                return;
            }

            participants = await conversation.getMembers();
            users = await Promise.all(participants.map(async (p) => p.getUser()));
            messages = (await conversation.getMessages(MESSAGES_LOAD_COUNT)).items;
        } catch (e) {
            log.error("Something went wrong when initializing session", e);
            throw e;
        }

        const cs = (conversation.attributes as any)?.status?.toLowerCase();

        console.log(conversation);
        console.log(conversation.state);
        console.log(`wtf is the state 000 ${cs}`);

        dispatch({
            type: ACTION_START_SESSION,
            payload: {
                token,
                conversationSid,
                conversationsClient,
                conversation,
                users,
                participants,
                messages,
                /* eslint-disable  @typescript-eslint/no-explicit-any */
                conversationState: cs,
                currentPhase: EngagementPhase.MessagingCanvas
            }
        });

        initClientListeners(conversationsClient, dispatch);
        initConversationListener(conversation, dispatch);
        initMessagesListener(conversation, dispatch);
        initParticipantsListener(conversation, dispatch);
    };
}
