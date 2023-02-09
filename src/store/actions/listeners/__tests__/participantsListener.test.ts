import { Member as Participant, MemberUpdateReason as ParticipantUpdateReason, User } from "twilio-chat";
import { waitFor } from "@testing-library/react";

import { Channel as Conversation } from "../../../../__mocks__/twilio-chat/channel";
import { initParticipantsListener } from "../participantsListener";
import { ACTION_ADD_PARTICIPANT, ACTION_REMOVE_PARTICIPANT, ACTION_UPDATE_PARTICIPANT } from "../../actionTypes";

describe("initParticipantsListener", () => {
    let conversation: Conversation;
    let participant: Participant;
    const user: User = {} as User;

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    beforeEach(() => {
        participant = {
            async getUser() {
                return Promise.resolve(user);
            }
        } as Participant;
        conversation = new Conversation(
            {
                channel: "chat",
                friendlyName: "chat",
                type: "web",
                entityName: "",
                uniqueName: "",
                attributes: {},
                lastConsumedMessageIndex: 0,
                dateCreated: new Date(),
                dateUpdated: new Date()
            },
            "sid",
            {
                self: "",
                messages: "",
                participants: ""
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {} as any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {} as any
        );
    });

    afterEach(() => {
        conversation.removeAllListeners();
    });

    it('adds a listener for the "memberJoined" event', async () => {
        const dispatch = jest.fn();

        initParticipantsListener(conversation, dispatch);
        const getUserSpy = jest.spyOn(participant, "getUser");
        conversation.emit("memberJoined", participant);
        await waitFor(() => {
            expect(getUserSpy).toHaveBeenCalled();
        });
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: ACTION_ADD_PARTICIPANT,
            payload: expect.objectContaining({ participant, user })
        });
    });

    it('adds a listener for the "memberLeft" event', () => {
        const dispatch = jest.fn();

        initParticipantsListener(conversation, dispatch);
        conversation.emit("memberLeft", participant);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: ACTION_REMOVE_PARTICIPANT,
            payload: expect.objectContaining({ participant })
        });
    });

    it('adds a listener for the "memberUpdated" event subset', () => {
        const dispatch = jest.fn();

        initParticipantsListener(conversation, dispatch);
        conversation.emit("memberUpdated", {
            member: participant,
            updateReasons: ["dateUpdated"] as ParticipantUpdateReason[]
        });
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: ACTION_UPDATE_PARTICIPANT,
            payload: expect.objectContaining({ participant })
        });
    });

    it('adds a listener for the "typingStarted" event subset', () => {
        const dispatch = jest.fn();

        initParticipantsListener(conversation, dispatch);
        conversation.emit("typingStarted", participant);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: ACTION_UPDATE_PARTICIPANT,
            payload: expect.objectContaining({ participant })
        });
    });

    it('adds a listener for the "typingEnded" event subset', () => {
        const dispatch = jest.fn();

        initParticipantsListener(conversation, dispatch);
        conversation.emit("typingEnded", participant);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: ACTION_UPDATE_PARTICIPANT,
            payload: expect.objectContaining({ participant })
        });
    });
});
