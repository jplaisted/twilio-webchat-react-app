import { Channel } from "twilio-chat";
import { Dispatch } from "redux";

import { ACTION_UPDATE_CONVERSATION_STATE } from "../actionTypes";

export const initConversationListener = (conversation: Channel, dispatch: Dispatch) => {
    conversation.addListener("updated", ({ channel: updatedConversation, updateReasons }) => {
        // we are listening only to a subset of events.
        if (updateReasons?.includes("attributes")) {
            dispatch({
                type: ACTION_UPDATE_CONVERSATION_STATE,
                payload: { conversationState: (updatedConversation?.attributes as any).status?.toLowerCase() }
            });
        }
    });
};
