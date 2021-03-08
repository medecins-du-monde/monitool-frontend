export enum TimeSlotPeriodicity {
    free = 'free',
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
    year = 'year'
}

// this enum is used to compare time slots to decide if they are compatible
// the order of declaration is the order of how big the period is
export enum TimeSlotOrder {
    free = 0,
    day = 0,
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
}
