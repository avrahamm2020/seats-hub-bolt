import React, { useState } from 'react';
import { Calendar, Search, Edit2, X } from 'lucide-react';
import Button from './Button';

type AvailableSeat = {
  id: string;
  date: string;
  service: string;
  seats: number;
  contributor: string;
  section: 'men' | 'women';
};

type Reservation = {
  seatId: string;
  quantity: number;
};

const mockAvailableSeats: AvailableSeat[] = [
  {
    id: '1',
    date: '2025-03-21',
    service: 'Kabbalat Shabbat',
    seats: 2,
    contributor: 'David Cohen',
    section: 'men'
  },
  {
    id: '2',
    date: '2025-03-22',
    service: 'Shacharit',
    seats: 3,
    contributor: 'Sarah Levy',
    section: 'women'
  },
  {
    id: '3',
    date: '2025-03-22',
    service: 'Mincha',
    seats: 1,
    contributor: 'Michael Stern',
    section: 'men'
  },
  {
    id: '4',
    date: '2025-03-23',
    service: 'Shacharit',
    seats: 4,
    contributor: 'Rachel Gold',
    section: 'women'
  },
  {
    id: '5',
    date: '2025-03-23',
    service: 'Mincha',
    seats: 2,
    contributor: 'Joseph Klein',
    section: 'men'
  },
  {
    id: '6',
    date: '2025-03-24',
    service: 'Shacharit',
    seats: 3,
    contributor: 'Leah Fisher',
    section: 'women'
  },
  {
    id: '7',
    date: '2025-03-24',
    service: 'Mincha',
    seats: 2,
    contributor: 'Daniel Roth',
    section: 'men'
  }
];

export default function SeatReservations() {
  const [searchDate, setSearchDate] = useState('');
  const [searchService, setSearchService] = useState('');
  const [searchSection, setSearchSection] = useState<'men' | 'women' | ''>('');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [editingReservation, setEditingReservation] = useState<string | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredSeats = mockAvailableSeats
    .filter(seat => {
      const seatDate = new Date(seat.date);
      seatDate.setHours(0, 0, 0, 0);
      
      const isFuture = seatDate >= today;
      const dateMatch = !searchDate || seat.date === searchDate;
      const serviceMatch = !searchService || seat.service === searchService;
      const sectionMatch = !searchSection || seat.section === searchSection;
      
      return isFuture && dateMatch && serviceMatch && sectionMatch;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleReserve = (seatId: string) => {
    if (editingReservation === seatId) {
      setReservations(prev => 
        prev.map(res => 
          res.seatId === seatId 
            ? { ...res, quantity: selectedQuantity }
            : res
        )
      );
      setEditingReservation(null);
    } else {
      setReservations(prev => [...prev, { seatId, quantity: selectedQuantity }]);
    }
    setSelectedQuantity(1);
  };

  const handleCancelReservation = (seatId: string) => {
    setReservations(prev => prev.filter(res => res.seatId !== seatId));
    setEditingReservation(null);
    setSelectedQuantity(1);
  };

  const getReservation = (seatId: string) => 
    reservations.find(res => res.seatId === seatId);

  const getRemainingSeats = (seat: AvailableSeat) => {
    const reservation = getReservation(seat.id);
    return seat.seats - (reservation?.quantity || 0);
  };

  const startEdit = (seatId: string) => {
    const reservation = getReservation(seatId);
    if (reservation) {
      setSelectedQuantity(reservation.quantity);
      setEditingReservation(seatId);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-blue-900">Available Seats</h2>
        <div className="flex space-x-4">
          <input
            type="date"
            min={new Date().toISOString().split('T')[0]}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <select
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={searchService}
            onChange={(e) => setSearchService(e.target.value)}
          >
            <option value="">All Services</option>
            <option value="Kabbalat Shabbat">Kabbalat Shabbat</option>
            <option value="Shacharit">Shacharit</option>
            <option value="Mincha">Mincha</option>
          </select>
          <select
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={searchSection}
            onChange={(e) => setSearchSection(e.target.value as 'men' | 'women' | '')}
          >
            <option value="">All Sections</option>
            <option value="men">Men's Section</option>
            <option value="women">Women's Section</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredSeats.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No available seats found for the selected criteria.
          </p>
        ) : (
          filteredSeats.map((seat) => {
            const reservation = getReservation(seat.id);
            const isReserved = !!reservation;
            const isEditing = editingReservation === seat.id;
            const remainingSeats = getRemainingSeats(seat);

            return (
              <div
                key={seat.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">{seat.service}</p>
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
                    <p className="text-sm text-gray-500">Offered by: {seat.contributor}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {remainingSeats} available
                  </span>
                  
                  {(isReserved || isEditing) && (
                    <input
                      type="number"
                      min="1"
                      max={isEditing ? seat.seats : undefined}
                      value={selectedQuantity}
                      onChange={(e) => setSelectedQuantity(Math.min(parseInt(e.target.value) || 1, seat.seats))}
                      className="w-16 px-2 py-1 border border-gray-300 rounded-md"
                      disabled={!isEditing}
                    />
                  )}

                  {isReserved ? (
                    <div className="flex space-x-2">
                      {isEditing ? (
                        <Button
                          variant="primary"
                          size="small"
                          onClick={() => handleReserve(seat.id)}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="small"
                          onClick={() => startEdit(seat.id)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="secondary"
                        size="small"
                        onClick={() => handleCancelReservation(seat.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="1"
                        max={seat.seats}
                        value={selectedQuantity}
                        onChange={(e) => setSelectedQuantity(Math.min(parseInt(e.target.value) || 1, seat.seats))}
                        className="w-16 px-2 py-1 border border-gray-300 rounded-md"
                      />
                      <Button
                        variant="primary"
                        size="small"
                        onClick={() => handleReserve(seat.id)}
                        disabled={selectedQuantity > seat.seats}
                      >
                        Reserve
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}