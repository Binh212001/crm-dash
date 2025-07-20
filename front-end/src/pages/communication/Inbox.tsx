import { Outlet } from "react-router";
import Conversation from "./Conversation";
import ConversationForm from "./ConversationForm";

const Inbox = () => {
  return (
    <div className="flex h-[90vh]  mt-2 bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      {/* Left: Conversation List */}
      <div className="w-1/3 border-r border-gray-100 bg-gray-50 flex flex-col">
        <ConversationForm />
        <Conversation />
      </div>
      {/* Right: Chat Messages */}
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
};

export default Inbox;
