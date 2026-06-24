export function toISODuration (value: number, unit: 'min' | 'hr') {
    const totalMinutes = unit === 'hr' ? value * 60 : value;

    if(totalMinutes === 0) return 'PT0M';

    let iso = 'PT';
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if(hours > 0) iso += `${hours}H`;
    if(minutes > 0) iso += `${minutes}M`;

    return iso;

}