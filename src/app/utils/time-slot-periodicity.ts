export enum TimeSlotPeriodicity {
    day = 'day',
    month_week_sat = 'month_week_sat',
    month_week_sun = 'month_week_sun',
    month_week_mon = 'month_week_mon',
    week_sat = 'week_sat',
    week_sun = 'week_sun',
    week_mon = 'week_mon',
    month = 'month',
    quarter = 'quarter',
    semester = 'semester',
    year = 'year',
    free = 'free'
}

// this enum is used to compare time slots to decide if they are compatible
// the order of declaration is the order of how big the period is
export enum TimeSlotOrder {
    day,
    month_week_sat,
    month_week_sun,
    month_week_mon,
    week_sat,
    week_sun,
    week_mon,
    month,
    quarter,
    semester,
    year,
    free
}