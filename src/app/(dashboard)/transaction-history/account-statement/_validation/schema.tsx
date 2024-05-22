import dayjs from 'dayjs';
import { z } from 'zod';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const expectedMinMaxDate = dayjs(dayjs().format('YYYY-MM-DD'));

// validate that the end date is less than the start date
// and possibly that no one can pick a date less than the date they created their katsu account
export const AccountStatementSchema = z
  .object({
    startDate: z
      .date({
        required_error: 'Please pick the start date',
        invalid_type_error: 'Please pick the start date',
      })
      .refine(value => dayjs(value).isSameOrBefore(expectedMinMaxDate), {
        message: 'Start date cannot be greater than today',
      })
      .transform(date => {
        const rawDate = new Date(date);
        rawDate.setHours(0, 0, 0, 0);
        return rawDate;
      }),
    endDate: z
      .date({
        required_error: 'Please pick the end date',
        invalid_type_error: 'Please pick the end date',
      })
      .refine(value => dayjs(value).isSameOrBefore(expectedMinMaxDate), {
        message: 'End date cannot be greater than today',
      })
      .transform(date => {
        const rawDate = new Date(date);
        rawDate.setHours(0, 0, 0, 0);
        return rawDate;
      }),
  })
  .superRefine((values, context) => {
    const { startDate, endDate } = values;
    const endDateIsValid = dayjs(endDate).isSameOrAfter(startDate);
    if (!endDateIsValid) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'End date cannot be before start date',
        path: ['endDate'],
      });
    }
  });
export type AccountStatementType = z.infer<typeof AccountStatementSchema>;
