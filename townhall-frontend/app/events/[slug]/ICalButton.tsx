'use client';

interface ICalButtonProps {
  eventSlug: string;
  eventTitle: string;
  eventDescription: string;
  eventAddress: string;
  calendarDate: string;
}

export function ICalButton({
  eventSlug,
  eventTitle,
  eventDescription,
  eventAddress,
  calendarDate,
}: ICalButtonProps) {
  const handleDownload = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${calendarDate}T180000
DTEND:${calendarDate}T200000
SUMMARY:${eventTitle}
DESCRIPTION:${eventDescription}
LOCATION:${eventAddress}
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${eventSlug}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      className="block w-full px-4 py-2 text-center bg-gray-100 text-gray-700 font-semibold text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors"
      onClick={handleDownload}
    >
      Download .ics
    </button>
  );
}
