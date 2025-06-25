import React, { useState } from 'react';
import { Calendar, Plus } from 'lucide-react';
import Button from './Button';

type Service = {
  id: string;
  date: string;
  name: string;
  seats: number;
  section: 'men' | 'women';
};

export default function SeatContribution() {
  const [services, setServices] = useState<Service[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newService, setNewService] = useState({
    date: '',
    name: '',
    seats: 1,
    section: 'men' as 'men' | 'women',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const service: Service = {
      id: Date.now().toString(),
      ...newService,
    };
    setServices([...services, service]);
    setShowForm(false);
    setNewService({ date: '', name: '', seats: 1, section: 'men' });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-blue-900">My Contributed Seats</h2>
        <Button
          variant="outline"
          size="small"
          onClick={() => setShowForm(true)}
          className="flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Seats
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="space-y-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="date"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={newService.date}
                onChange={(e) => setNewService({ ...newService, date: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                Service
              </label>
              <select
                id="service"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              >
                <option value="">Select a service</option>
                <option value="Kabbalat Shabbat">Kabbalat Shabbat</option>
                <option value="Shacharit">Shacharit</option>
                <option value="Mincha">Mincha</option>
              </select>
            </div>
            <div>
              <label htmlFor="section" className="block text-sm font-medium text-gray-700">
                Section
              </label>
              <select
                id="section"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={newService.section}
                onChange={(e) => setNewService({ ...newService, section: e.target.value as 'men' | 'women' })}
              >
                <option value="men">Men's Section</option>
                <option value="women">Women's Section</option>
              </select>
            </div>
            <div>
              <label htmlFor="seats" className="block text-sm font-medium text-gray-700">
                Number of Seats
              </label>
              <input
                type="number"
                id="seats"
                min="1"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={newService.seats}
                onChange={(e) => setNewService({ ...newService, seats: parseInt(e.target.value) })}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button
              variant="outline"
              size="small"
              type="button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
            <Button size="small" type="submit">
              Contribute Seats
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {services.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No seats contributed yet. Click "Add Seats\" to share your seats with the community.
          </p>
        ) : (
          services.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">{service.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(service.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-sm text-blue-600">{service.section === 'men' ? "Men's Section" : "Women's Section"}</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {service.seats} {service.seats === 1 ? 'seat' : 'seats'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}