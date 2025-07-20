import { useAppDispatch } from "@/app/hook";
import type { RootState } from "@/app/store";
import { DropdownCustom } from "@/components/DropdownCustom";
import { createRoom } from "@/services/room/room.action";
import { getUsers, type User } from "@/services/user/user.action";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ConversationForm() {
  const dispatch = useAppDispatch();

  const { users } = useSelector((state: RootState) => state.users);
  const [userDropdownData, setUserDropdownData] = useState<
    { id: string; name: string }[]
  >([]);
  const [userSearch, setUserSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getUsers({ q: userSearch }));
  }, [userSearch, dispatch]);

  useEffect(() => {
    if (users && Array.isArray(users)) {
      setUserDropdownData(
        users.map((u: User) => ({
          id: u.id,
          name: u.name,
        }))
      );
    }
  }, [users]);

  const handleUserSearch = (value: string) => {
    setUserSearch(value);
    setUserDropdownData(
      users
        .filter((u: User) => u.name.toLowerCase().includes(value.toLowerCase()))
        .map((u: User) => ({
          id: u.id,
          name: u.name,
        }))
    );
  };

  const handleShowForm = () => setShowForm(true);
  const handleHideForm = () => {
    setShowForm(false);
    setSelectedUserId(undefined);
    setUserSearch("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) return;
    dispatch(createRoom({ memberId: selectedUserId }));
    handleHideForm();
  };

  return (
    <div className=" border-r border-gray-100 bg-gray-50 flex flex-col">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Cuộc trò chuyện</h2>
        <button
          className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
          title="Thêm cuộc trò chuyện"
          onClick={handleShowForm}
        >
          + Thêm
        </button>
      </div>
      {showForm && (
        <form
          className="p-4 border-b border-gray-100 bg-white flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          {/* Sử dụng DropdownCustom cho người nhận */}
          <DropdownCustom
            data={userDropdownData}
            placeholder="Chọn người nhận..."
            name="receiver"
            label="Người nhận"
            search={handleUserSearch}
            onChange={(id: string) => setSelectedUserId(id)}
            value={selectedUserId}
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Tạo
            </button>
            <button
              type="button"
              className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
              onClick={handleHideForm}
            >
              Hủy
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ConversationForm;
