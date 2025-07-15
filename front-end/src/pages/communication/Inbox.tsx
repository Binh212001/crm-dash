import React, { useState } from 'react';
import { useGetRoomsQuery } from '../../services/room.service';
import { useNavigate } from 'react-router';

// --- SHADCN UI DIALOG COMPONENTS ---
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useCreateRoomMutation } from '../../services/room.service';

// You may need to adjust the import paths above to match your project structure

const getInitials = (name?: string) => {
  if (!name) return '';
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || '';
  return (parts[0][0] + (parts[1][0] || '')).toUpperCase();
};

const Inbox = () => {
  const { data, isLoading, error } = useGetRoomsQuery();
  const navigate = useNavigate();

  // State for dialog
  const [open, setOpen] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [creating, setCreating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [createRoom] = useCreateRoomMutation();

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!roomName.trim()) {
      setErrorMsg('Room name is required');
      return;
    }
    setCreating(true);
    try {
      await createRoom({
        name: roomName,
        description: roomDescription,
        members: [],
        type: 'GROUP',
      }).unwrap();
      setOpen(false);
      setRoomName('');
      setRoomDescription('');
      // Optionally, refetch rooms here
    } catch  {
      setErrorMsg('Failed to create room');
    } finally {
      setCreating(false);
    }
  };

  // Fix: handle possible undefined data from useGetRoomsQuery
  const rooms = Array.isArray(data) ? data : [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inbox</h1>
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Rooms</h2>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="default">New Room</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Room</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateRoom} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="room-name">
                      Room Name
                    </label>
                    <Input
                      id="room-name"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                      placeholder="Enter room name"
                      required
                      disabled={creating}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="room-description">
                      Description
                    </label>
                    <Textarea
                      id="room-description"
                      value={roomDescription}
                      onChange={(e) => setRoomDescription(e.target.value)}
                      placeholder="Optional description"
                      disabled={creating}
                    />
                  </div>
                  {errorMsg && (
                    <div className="text-red-500 text-sm">{errorMsg}</div>
                  )}
                  <DialogFooter>
                    <Button type="submit" disabled={creating}>
                      {creating ? 'Creating...' : 'Create'}
                    </Button>
                    <DialogClose asChild>
                      <Button type="button" variant="outline" disabled={creating}>
                        Cancel
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="divide-y">
          {isLoading ? (
            <div className="p-4 text-gray-500">Loading...</div>
          ) : error ? (
            <div className="p-4 text-red-500">Failed to load rooms.</div>
          ) : rooms.length === 0 ? (
            <div className="p-4 text-gray-500">No rooms found.</div>
          ) : (
            rooms.map((room) => (
              <div
                key={room.id}
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/inbox/${room.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {getInitials(room.name || 'Room')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{room.name || 'Untitled Room'}</p>
                      <p className="text-sm text-gray-600">
                        {room.description || 'No description'}
                      </p>
                    </div>
                  </div>
                  {/* Optionally, you could show the number of members or last message time here */}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;