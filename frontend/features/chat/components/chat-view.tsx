"use client";

import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormAlert } from "@/components/form/form-alert";
import { useSession } from "@/features/auth/auth.hooks";
import { getErrorMessage } from "@/lib/api/errors";
import { useChatHistory, useChatStream } from "../chat.hooks";
import { ChatComposer } from "./chat-composer";
import { ChatEmptyState } from "./chat-empty-state";
import { MessageList } from "./message-list";
import { MessageListSkeleton } from "./message-list-skeleton";

export function ChatView() {
  const { user } = useSession();
  const history = useChatHistory();
  const { send, stop, pending, isStreaming } = useChatStream();

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] flex-col bg-background">
      {history.isPending ? (
        <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
          <MessageListSkeleton />
        </div>
      ) : history.isError ? (
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-4 px-4">
          <FormAlert message={getErrorMessage(history.error, "Couldn't load your conversation.")} />
          <Button variant="outline" onClick={() => history.refetch()}>
            <RotateCw />
            Try again
          </Button>
        </div>
      ) : (
        <MessageList
          messages={history.messages}
          pending={pending}
          hasOlder={history.hasNextPage}
          isLoadingOlder={history.isFetchingNextPage}
          onLoadOlder={() => history.fetchNextPage()}
          empty={<ChatEmptyState userName={user?.name} onSuggestion={send} />}
        />
      )}

      <div className="bg-linear-to-t from-background via-background to-transparent pt-2 pb-4">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <ChatComposer isStreaming={isStreaming} onSend={send} onStop={stop} />
          <p className="mt-2 text-center text-xs text-muted-foreground">
            AIMemory can make mistakes. Memories are saved after each reply.
          </p>
        </div>
      </div>
    </div>
  );
}
