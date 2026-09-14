import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

export type Appointment = {
  id: string;
  patientName: string;
  phone: string;
  departmentId: string;
  doctorId?: string;
  dateLabel: string;
  time: string;
  reason: string;
  createdAt: string;
};

type AppointmentsContextValue = {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => Appointment;
};

const AppointmentsContext = createContext<AppointmentsContextValue | null>(null);

export function AppointmentsProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const value = useMemo<AppointmentsContextValue>(
    () => ({
      appointments,
      addAppointment: (input) => {
        const appointment: Appointment = {
          ...input,
          id: `apt-${Date.now()}`,
          createdAt: new Date().toISOString(),
        };
        setAppointments((prev) => [appointment, ...prev]);
        return appointment;
      },
    }),
    [appointments],
  );

  return (
    <AppointmentsContext.Provider value={value}>{children}</AppointmentsContext.Provider>
  );
}

export function useAppointments() {
  const ctx = useContext(AppointmentsContext);
  if (!ctx) {
    throw new Error('useAppointments must be used within AppointmentsProvider');
  }
  return ctx;
}
