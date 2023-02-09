import { Client, Channel, Member, Message, User } from "twilio-chat";
import { GenericThemeShape } from "@twilio-paste/theme";
import { AlertVariants } from "@twilio-paste/core/alert";

import { FileAttachmentConfig, TranscriptConfig } from "../definitions";

export enum EngagementPhase {
    PreEngagementForm = "PreEngagementForm",
    MessagingCanvas = "MessagingCanvas",
    Loading = "Loading"
}

export type ChatState = {
    conversationsClient?: Client;
    conversation?: Channel;
    participants?: Member[];
    users?: User[];
    messages?: Message[];
    attachedFiles?: File[];
    conversationState?: string;
};

export type PreEngagementData = { name: string; email: string; query: string };

export type SessionState = {
    currentPhase: EngagementPhase;
    expanded: boolean;
    token?: string;
    conversationSid?: string;
    conversationsClient?: Client;
    conversation?: Channel;
    users?: User[];
    participants?: Member[];
    messages?: Message[];
    conversationState?: "active" | "inactive" | "closed";
    preEngagementData?: PreEngagementData;
};

export type ConfigState = {
    serverUrl?: string;
    theme?: {
        isLight?: boolean;
        overrides?: Partial<GenericThemeShape>;
    };
    fileAttachment?: FileAttachmentConfig;
    transcript?: TranscriptConfig;
};

export type Notification = {
    dismissible: boolean;
    id: string;
    onDismiss?: () => void;
    message: string;
    timeout?: number;
    type: AlertVariants;
};

export type NotificationState = Notification[];

export type AppState = {
    chat: ChatState;
    config: ConfigState;
    session: SessionState;
    notifications: NotificationState;
};
