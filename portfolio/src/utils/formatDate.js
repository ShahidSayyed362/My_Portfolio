/**
 * formatDate.js
 * Converts ISO date strings like "2023-01" → "Jan 2023"
 * Handles "Present" as a passthrough.
 */
export function formatDate(dateStr) {
  if (!dateStr || dateStr === 'Present') return 'Present';

  const [year, month] = dateStr.split('-');
  if (!month) return year;

  const date = new Date(`${year}-${month}-01`);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/**
 * formatDateRange — "Jan 2023 – Present"
 */
export function formatDateRange(startDate, endDate) {
  return `${formatDate(startDate)} – ${formatDate(endDate)}`;
}
