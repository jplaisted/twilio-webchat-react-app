import { Conversation } from "@twilio/conversations";
import { Dispatch } from "redux";

import { ACTION_UPDATE_CONVERSATION_STATE } from "../actionTypes";

export const initConversationListener = (conversation: Conversation, dispatch: Dispatch) => {
    conversation.addListener("updated", ({ conversation: updatedConversation, updateReasons }) => {
        console.log(`got update ${updateReasons}`);
        // we are listening only to a subset of events.
        if (updateReasons?.includes("state") || updateReasons?.includes("attributes")) {
            dispatch({
                type: ACTION_UPDATE_CONVERSATION_STATE,
                payload: {
                    conversationState:
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        updatedConversation?.state?.current || (updatedConversation as any)?.channelState.attributes.status?.toLowerCase()
                }
            });
        }
    });
};
