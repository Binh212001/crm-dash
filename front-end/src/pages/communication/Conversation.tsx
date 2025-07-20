import { useAppDispatch } from "@/app/hook";
import type { RootState } from "@/app/store";
import { getRooms } from "@/services/room/room.action";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Conversation() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { rooms, loading } = useSelector((state: RootState) => state.rooms);
  const [selectedRoomId, setSelectedRoomId] = React.useState<string | null>(
    null
  );

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  useEffect(() => {
    if (rooms.length > 0 && !selectedRoomId) {
      setSelectedRoomId(rooms[0].id);
      navigate(`/inbox/${rooms[0].id}`);
    }
  }, [rooms, selectedRoomId, navigate]);

  const handleRoomClick = (roomId: string) => {
    setSelectedRoomId(roomId);
    navigate(`/inbox/${roomId}`);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {loading && <div className="p-4 text-gray-500">Loading...</div>}
      {!loading &&
        rooms.map((room) => (
          <div
            key={room.id}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-blue-50 transition ${
              selectedRoomId === room.id ? "bg-blue-100" : ""
            }`}
            onClick={() => handleRoomClick(room.id)}
          >
            <img
              src={
                room.members?.[1]?.avatar ||
                room.members?.[0]?.avatar ||
                `https://i.pravatar.cc/40?img=${
                  Math.floor(Math.random() * 70) + 1
                }`
              }
              alt={room.name || "Room"}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900">
                {room.name ||
                  room.members
                    ?.map((m) => m.name)
                    .filter(Boolean)
                    .join(", ")}
              </div>
              {/* You can add last message preview here if available */}
            </div>
          </div>
        ))}
      {!loading && rooms.length === 0 && (
        <div className="p-4 text-gray-500">No conversations found.</div>
      )}
    </div>
  );
}

export default Conversation;
