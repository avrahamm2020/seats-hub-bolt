import React, { useState } from 'react';
import { Users, Calendar, Car, Check, X, Edit2 } from 'lucide-react';
import Button from '../components/Button';

type SuggestedSeat = {
  id: string;
  date: string;
  service: string;
  seats: number;
  section: 'men' | 'women';
  contributor: {
    name: string;
    email: string;
  };
  status: 'pending' | 'approved' | 'rejected';
};

const initialSuggestedSeats: SuggestedSeat[] = [
  {
    id: '1',
    date: '2025-06-20',
    service: 'Kabbalat Shabbat',
    seats: 3,
    section: 'men',
    contributor: {
      name: 'David Cohen',
      email: 'david.cohen@example.com'
    },
    status: 'pending'
  },
  {
    id: '2',
    date: '2025-06-21',
    service: 'Shacharit',
    seats: 2,
    section: 'women',
    contributor: {
      name: 'Sarah Levy',
      email: 'sarah.levy@example.com'
    },
    status: 'pending'
  },
  {
    id: '3',
    date: '2025-07-01',
    service: 'Mincha',
    seats: 4,
    section: 'men',
    contributor: {
      name: 'Michael Stern',
      email: 'michael.stern@example.com'
    },
    status: 'pending'
  },
  {
    id: '4',
    date: '2025-07-05',
    service: 'Kabbalat Shabbat',
    seats: 2,
    section: 'women',
    contributor: {
      name: 'Rachel Gold',
      email: 'rachel.gold@example.com'
    },
    status: 'pending'
  },
  {
    id: '7',
    date: '2025-07-12',
    service: 'Shacharit',
    seats: 5,
    section: 'men',
    contributor: {
      name: 'Benjamin Katz',
      email: 'benjamin.katz@example.com'
    },
    status: 'pending'
  },
  {
    id: '8',
    date: '2025-07-15',
    service: 'Mincha',
    seats: 3,
    section: 'women',
    contributor: {
      name: 'Hannah Weiss',
      email: 'hannah.weiss@example.com'
    },
    status: 'pending'
  },
  {
    id: '9',
    date: '2025-08-01',
    service: 'Kabbalat Shabbat',
    seats: 4,
    section: 'men',
    contributor: {
      name: 'Isaac Friedman',
      email: 'isaac.friedman@example.com'
    },
    status: 'pending'
  },
  {
    id: '10',
    date: '2025-08-02',
    service: 'Shacharit',
    seats: 3,
    section: 'women',
    contributor: {
      name: 'Rebecca Shapiro',
      email: 'rebecca.shapiro@example.com'
    },
    status: 'pending'
  }
];

const initialHistorySeats: SuggestedSeat[] = [
  {
    id: '5',
    date: '2024-02-15',
    service: 'Mincha',
    seats: 2,
    section: 'men',
    contributor: {
      name: 'Joseph Klein',
      email: 'joseph.klein@example.com'
    },
    status: 'approved'
  },
  {
    id: '6',
    date: '2024-02-14',
    service: 'Shacharit',
    seats: 1,
    section: 'women',
    contributor: {
      name: 'Leah Fisher',
      email: 'leah.fisher@example.com'
    },
    status: 'rejected'
  }
];

function AdminDashboard() {
  const [suggestedSeats, setSuggestedSeats] = useState<SuggestedSeat[]>(initialSuggestedSeats);
  const [historySeats, setHistorySeats] = useState<SuggestedSeat[]>(initialHistorySeats);
  const [editingSeat, setEditingSeat] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<SuggestedSeat>>({});

  const handleApprove = (id: string) => {
    setSuggestedSeats(prevSeats =>
      prevSeats.map(seat =>
        seat.id === id
          ? { ...seat, status: 'approved' }
          : seat
      )
    );
  };

  const handleReject = (id: string) => {
    setSuggestedSeats(prevSeats =>
      prevSeats.map(seat =>
        seat.id === id
          ? { ...seat, status: 'rejected' }
          : seat
      )
    );
  };

  const handleEdit = (seat: SuggestedSeat) => {
    setEditingSeat(seat.id);
    setEditForm(seat);
  };

  const handleSaveEdit = () => {
    if (!editingSeat || !editForm) return;

    setSuggestedSeats(prevSeats =>
      prevSeats.map(seat =>
        seat.id === editingSeat
          ? {
              ...seat,
              ...editForm,
              contributor: {
                ...seat.contributor,
                ...(editForm.contributor || {})
              }
            }
          : seat
      )
    );

    setHistorySeats(prevSeats =>
      prevSeats.map(seat =>
        seat.id === editingSeat
          ? {
              ...seat,
              ...editForm,
              contributor: {
                ...seat.contributor,
                ...(editForm.contributor || {})
              }
            }
          : seat
      )
    );

    setEditingSeat(null);
    setEditForm({});
  };

  const handleCancelEdit = () => {
    setEditingSeat(null);
    setEditForm({});
  };

  const today = new Date();
  const futureSuggestions = suggestedSeats.filter(seat => new Date(seat.date) >= today);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<Users className="h-8 w-8 text-primary-600" />}
          title="Total Members"
          value="156"
        />
        <StatCard
          icon={<Calendar className="h-8 w-8 text-primary-600" />}
          title="Active Events"
          value="12"
        />
        <StatCard
          icon={<Car className="h-8 w-8 text-primary-600" />}
          title="Ride Requests"
          value="8"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-blue-900 mb-6">Suggested Seats</h2>
          <div className="space-y-4">
            {futureSuggestions.map((seat) => (
              <div key={seat.id} className="border-b pb-4">
                {editingSeat === seat.id ? (
                  <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={editForm.date || ''}
                        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service
                      </label>
                      <select
                        value={editForm.service || ''}
                        onChange={(e) => setEditForm({ ...editForm, service: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="Kabbalat Shabbat">Kabbalat Shabbat</option>
                        <option value="Shacharit">Shacharit</option>
                        <option value="Mincha">Mincha</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section
                      </label>
                      <select
                        value={editForm.section || ''}
                        onChange={(e) => setEditForm({ ...editForm, section: e.target.value as 'men' | 'women' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="men">Men's Section</option>
                        <option value="women">Women's Section</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Seats
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={editForm.seats || ''}
                        onChange={(e) => setEditForm({ ...editForm, seats: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button
                        variant="outline"
                        size="small"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="small"
                        onClick={handleSaveEdit}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">{seat.service}</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          seat.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : seat.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {seat.status.charAt(0).toUpperCase() + seat.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(seat.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-blue-600">
                        {seat.section === 'men' ? "Men's Section" : "Women's Section"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {seat.seats} {seat.seats === 1 ? 'seat' : 'seats'} offered
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Suggested by: {seat.contributor.name}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {seat.status === 'pending' ? (
                        <>
                          <Button
                            variant="primary"
                            size="small"
                            onClick={() => handleApprove(seat.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="small"
                            onClick={() => handleReject(seat.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          size="small"
                          onClick={() => handleEdit(seat)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-blue-900 mb-6">History</h2>
          <div className="space-y-4">
            {historySeats.map((seat) => (
              <div key={seat.id} className="border-b pb-4">
                {editingSeat === seat.id ? (
                  <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={editForm.date || ''}
                        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service
                      </label>
                      <select
                        value={editForm.service || ''}
                        onChange={(e) => setEditForm({ ...editForm, service: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="Kabbalat Shabbat">Kabbalat Shabbat</option>
                        <option value="Shacharit">Shacharit</option>
                        <option value="Mincha">Mincha</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section
                      </label>
                      <select
                        value={editForm.section || ''}
                        onChange={(e) => setEditForm({ ...editForm, section: e.target.value as 'men' | 'women' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="men">Men's Section</option>
                        <option value="women">Women's Section</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Seats
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={editForm.seats || ''}
                        onChange={(e) => setEditForm({ ...editForm, seats: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button
                        variant="outline"
                        size="small"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="small"
                        onClick={handleSaveEdit}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">{seat.service}</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          seat.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {seat.status.charAt(0).toUpperCase() + seat.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(seat.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-blue-600">
                        {seat.section === 'men' ? "Men's Section" : "Women's Section"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {seat.seats} {seat.seats === 1 ? 'seat' : 'seats'} offered
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Suggested by: {seat.contributor.name}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="small"
                      onClick={() => handleEdit(seat)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Recent Member Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b pb-4">
                <p className="text-gray-800">New seat request for Shabbat morning</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-gray-800 ml-3">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-blue-900">{value}</p>
    </div>
  );
}

export default AdminDashboard;