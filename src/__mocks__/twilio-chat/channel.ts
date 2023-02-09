/* eslint-disable @typescript-eslint/no-unused-vars */

import type {
    Message,
    NotificationLevel,
    Member,
    SendMediaOptions,
    Channel as ChannelType
} from "twilio-chat";

import { MockedPaginator } from "../../test-utils";

const { Channel: OriginalChannel } =
    jest.requireActual<{ Channel: typeof ChannelType }>("twilio-chat");

export class Channel extends OriginalChannel {
    /**
     * Add a participant to the conversation by its identity.
     * @param identity Identity of the Client to add.
     * @param attributes Attributes to be attached to the participant.
     */
    async add(identity: string, attributes?: Record<string, unknown>): Promise<void> {
        return Promise.resolve();
    }

    /**
     * Advance the conversation's last read message index to the current read horizon.
     * Rejects if the user is not a participant of the conversation.
     * Last read message index is updated only if the new index value is higher than the previous.
     * @param index Message index to advance to.
     * @return Resulting unread messages count in the conversation.
     */
    async advanceLastReadMessageIndex(index: number): Promise<number> {
        return Promise.resolve(42);
    }

    /**
     * Delete the conversation and unsubscribe from its events.
     */
    async delete(): Promise<Channel> {
        return this as unknown as Channel;
    }

    /**
     * Get the custom attributes of this Conversation.
     */
    async getAttributes(): Promise<Record<string, unknown>> {
        return Promise.resolve({});
    }

    /**
     * Returns messages from the conversation using the paginator interface.
     * @param pageSize Number of messages to return in a single chunk. Default is 30.
     * @param anchor Index of the newest message to fetch. Default is from the end.
     * @param direction Query direction. By default it queries backwards
     * from newer to older. The `"forward"` value will query in the opposite direction.
     * @return A page of messages.
     */
    async getMessages(
        pageSize?: number,
        anchor?: number,
        direction?: "backwards" | "forward"
    ): Promise<MockedPaginator<Message>> {
        return Promise.resolve(new MockedPaginator());
    }

    /**
     * Get a list of all the participants who are joined to this conversation.
     */
    async getMembers(): Promise<Member[]> {
        return Promise.resolve([]);
    }

    /**
     * Get conversation participants count.
     *
     * This method is semi-realtime. This means that this data will be eventually correct,
     * but will also be possibly incorrect for a few seconds. The Conversations system does not
     * provide real time events for counter values changes.
     *
     * This is useful for any UI badges, but it is not recommended to build any core application
     * logic based on these counters being accurate in real time.
     */
    async getMemberCount(): Promise<number> {
        return (await this.getMembers()).length;
    }

    /**
     * Get a participant by its SID.
     * @param participantSid Participant SID.
     */
    async getMemberBySid(participantSid: string): Promise<Member> {
        return Promise.resolve({} as Member);
    }

    /**
     * Get a participant by its identity.
     * @param identity Participant identity.
     */
    async getMemberByIdentity(identity: string): Promise<Member> {
        return Promise.resolve({} as Member);
    }

    /**
     * Get the total message count in the conversation.
     *
     * This method is semi-realtime. This means that this data will be eventually correct,
     * but will also be possibly incorrect for a few seconds. The Conversations system does not
     * provide real time events for counter values changes.
     *
     * This is useful for any UI badges, but it is not recommended to build any core application
     * logic based on these counters being accurate in real time.
     */
    async getMessagesCount(): Promise<number> {
        return 0;
    }

    /**
     * Get unread messages count for the user if they are a participant of this conversation.
     * Rejects if the user is not a participant of the conversation.
     *
     * Use this method to obtain the number of unread messages together with
     * {@link Conversation.updateLastReadMessageIndex} instead of relying on the
     * message indices which may have gaps. See {@link Message.index} for details.
     *
     * This method is semi-realtime. This means that this data will be eventually correct,
     * but will also be possibly incorrect for a few seconds. The Conversations system does not
     * provide real time events for counter values changes.
     *
     * This is useful for any UI badges, but it is not recommended to build any core application
     * logic based on these counters being accurate in real time.
     */
    async getUnreadMessagesCount(): Promise<number | null> {
        return Promise.resolve(0);
    }

    /**
     * Join the conversation and subscribe to its events.
     */
    async join(): Promise<Channel> {
        return this;
    }

    /**
     * Leave the conversation.
     */
    async leave(): Promise<Channel> {
        return this;
    }

    /**
     * Remove a participant from the conversation. When a string is passed as the
     * argument, it will assume that the string is an identity or SID.
     * @param participant Identity, SID or the participant object to remove.
     */
    async removeMember(participant: string | Member): Promise<void> {
        return Promise.resolve();
    }

    /**
     * Send a message to the conversation.
     * @param message Message body for the text message,
     * `FormData` or {@link SendMediaOptions} for media content. Sending FormData is supported only with the browser engine.
     * @param messageAttributes Attributes for the message.
     * @param emailOptions Email options for the message.
     * @return Index of the new message.
     */
    async sendMessage(
        message: string | FormData | SendMediaOptions | null,
        messageAttributes?: Record<string, unknown>,
    ): Promise<number> {
        return Promise.resolve(1);
    }

    /**
     * Set last read message index of the conversation to the index of the last known message.
     * @return Resulting unread messages count in the conversation.
     */
    async setAllMessagesRead(): Promise<number> {
        return Promise.resolve(0);
    }

    /**
     * Set all messages in the conversation unread.
     * @return Resulting unread messages count in the conversation.
     */
    async setAllMessagesUnread(): Promise<number> {
        return Promise.resolve(0);
    }

    /**
     * Set user notification level for this conversation.
     * @param notificationLevel New user notification level.
     */
    async setUserNotificationLevel(notificationLevel: NotificationLevel): Promise<void> {
        return Promise.resolve();
    }

    /**
     * Send a notification to the server indicating that this client is currently typing in this conversation.
     * Typing ended notification is sent after a while automatically, but by calling this method again you ensure that typing ended is not received.
     */
    async typing(): Promise<void> {
        return Promise.resolve();
    }

    /**
     * Update the attributes of the conversation.
     * @param attributes New attributes.
     */
    async updateAttributes(attributes: Record<string, unknown>): Promise<Channel> {
        return this;
    }

    /**
     * Update the friendly name of the conversation.
     * @param friendlyName New friendly name.
     */
    async updateFriendlyName(friendlyName: string): Promise<Channel> {
        return this;
    }

    /**
     * Set the last read message index to the current read horizon.
     * @param index Message index to set as last read.
     * If null is provided, then the behavior is identical to {@link Conversation.setAllMessagesUnread}.
     * @returns Resulting unread messages count in the conversation.
     */
    async updateLastReadMessageIndex(index: number | null): Promise<number> {
        return Promise.resolve(0);
    }

    /**
     * Update the unique name of the conversation.
     * @param uniqueName New unique name for the conversation. Setting unique name to null removes it.
     */
    async updateUniqueName(uniqueName: string | null): Promise<Channel> {
        return this;
    }

    /**
     * Load and subscribe to this conversation and do not subscribe to its participants and messages.
     * This or _subscribeStreams will need to be called before any events on conversation will fire.
     * @internal
     */
    async _subscribe(): Promise<unknown> {
        return Promise.resolve({});
    }
}
